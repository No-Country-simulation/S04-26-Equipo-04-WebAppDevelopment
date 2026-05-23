# Script de prueba funcional: Vacantes, Buscador de Talentos, Algoritmo de Match y Postulaciones (Fase 3 - Corregido)

$baseUrl = "http://localhost:5187"

# Generar emails unicos
$candidateEmail = "cand_" + (Get-Random) + "@example.com"
$employerEmail = "emp_" + (Get-Random) + "@example.com"
$otherEmployerEmail = "emp_other_" + (Get-Random) + "@example.com"
$password = "Password123!"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "1. REGISTRANDO E INICIANDO CANDIDATO PROFESIONAL..." -ForegroundColor Cyan
Write-Host "Email Profesional: $candidateEmail"

$candRegisterBody = @{
    Nombre = "Roberto"
    Apellido = "Soto"
    Email = $candidateEmail
    Password = $password
    TipoUsuario = "profesional"
} | ConvertTo-Json

try {
    $candRegResponse = Invoke-RestMethod -Uri "$baseUrl/api/Auth/register" -Method Post -ContentType "application/json" -Body $candRegisterBody
    $candToken = $candRegResponse.token
    $candId = $candRegResponse.id
    Write-Host "Candidato registrado con exito. ID: $candId" -ForegroundColor Green
} catch {
    Write-Host "Error en registro de candidato:" -ForegroundColor Red
    Write-Error $_
    Exit
}

$candHeaders = @{
    "Authorization" = "Bearer $candToken"
}

# Realizar diagnostico
Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "2. COMPLETANDO DIAGNOSTICO DEL CANDIDATO..." -ForegroundColor Cyan

try {
    $diagInit = Invoke-RestMethod -Uri "$baseUrl/api/Diagnostico/iniciar" -Method Post -Headers $candHeaders -ContentType "application/json"
    $diagId = $diagInit.id

    $preguntasAgrupadas = Invoke-RestMethod -Uri "$baseUrl/api/Diagnostico/preguntas" -Method Get -Headers $candHeaders
    $respuestas = @()
    foreach ($grupo in $preguntasAgrupadas) {
        foreach ($pregunta in $grupo.preguntas) {
            # Seleccionamos la primera opcion (menor puntaje) para forzar brechas y ruta de aprendizaje
            $respuestas += @{
                preguntaId = $pregunta.id
                opcionId = $pregunta.opciones[0].id
            }
        }
    }

    $responderBody = @{
        diagnosticoId = $diagId
        respuestas = $respuestas
    } | ConvertTo-Json -Depth 5

    $resultadoDiag = Invoke-RestMethod -Uri "$baseUrl/api/Diagnostico/responder" -Method Post -Headers $candHeaders -ContentType "application/json" -Body $responderBody
    Write-Host "Diagnostico completado." -ForegroundColor Green
} catch {
    Write-Host "Error en diagnostico:" -ForegroundColor Red
    Write-Error $_
    Exit
}

# Generar ruta y completar clases
Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "3. GENERANDO Y COMPLETANDO RUTA DE APRENDIZAJE..." -ForegroundColor Cyan

try {
    $ruta = Invoke-RestMethod -Uri "$baseUrl/api/Rutas/generar/$diagId" -Method Post -Headers $candHeaders
    Write-Host "Ruta activa creada. ID: $($ruta.id)" -ForegroundColor Green

    # Completar todas las clases de todos los cursos recomendados
    foreach ($pm in $ruta.progresos) {
        $detalle = Invoke-RestMethod -Uri "$baseUrl/api/Rutas/progreso/$($pm.id)/clases" -Method Get -Headers $candHeaders
        foreach ($pc in $detalle.progresosClase) {
            $null = Invoke-RestMethod -Uri "$baseUrl/api/Rutas/progreso/clase/$($pc.id)" -Method Put -Headers $candHeaders
        }
        Write-Host "Curso completado: $($pm.modulo.titulo)" -ForegroundColor Green
    }
} catch {
    Write-Host "Error al completar ruta:" -ForegroundColor Red
    Write-Error $_
    Exit
}

# Verificar perfil
Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "4. VERIFICANDO PERFIL DE CANDIDATO Y OBTENIENDO SKILL IDs..." -ForegroundColor Cyan

try {
    $perfil = Invoke-RestMethod -Uri "$baseUrl/api/Perfiles/mi-perfil" -Method Get -Headers $candHeaders
    Write-Host "Visible en el Marketplace: $($perfil.visibleMarketplace)" -ForegroundColor Yellow
    
    # Extraer los IDs de las skills validadas
    $skillIA = $perfil.skills | Where-Object { $_.skillNombre -eq "Uso de Inteligencia Artificial (ChatGPT/Prompts)" }
    $skillExcel = $perfil.skills | Where-Object { $_.skillNombre -like "*Reportes Financieros*" }

    $skillIAId = $skillIA.skillId
    $skillExcelId = $skillExcel.skillId

    Write-Host "Skill IA ID: $skillIAId (Nivel Validado: $($skillIA.nivel))"
    Write-Host "Skill Excel ID: $skillExcelId (Nivel Validado: $($skillExcel.nivel))"
} catch {
    Write-Host "Error al obtener perfil:" -ForegroundColor Red
    Write-Error $_
    Exit
}

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "5. REGISTRANDO E INICIANDO EMPRESAS..." -ForegroundColor Cyan
Write-Host "Email Empresa 1: $employerEmail"
Write-Host "Email Empresa 2 (Otra): $otherEmployerEmail"

$empRegisterBody = @{
    Nombre = "Global"
    Apellido = "Recruiting"
    Email = $employerEmail
    Password = $password
    TipoUsuario = "empresa"
} | ConvertTo-Json

$otherEmpRegisterBody = @{
    Nombre = "Tech"
    Apellido = "Solutions"
    Email = $otherEmployerEmail
    Password = $password
    TipoUsuario = "empresa"
} | ConvertTo-Json

try {
    $empRegResponse = Invoke-RestMethod -Uri "$baseUrl/api/Auth/register" -Method Post -ContentType "application/json" -Body $empRegisterBody
    $empToken = $empRegResponse.token
    $empId = $empRegResponse.id
    Write-Host "Empresa 1 registrada con exito. ID: $empId" -ForegroundColor Green

    $otherEmpRegResponse = Invoke-RestMethod -Uri "$baseUrl/api/Auth/register" -Method Post -ContentType "application/json" -Body $otherEmpRegisterBody
    $otherEmpToken = $otherEmpRegResponse.token
    $otherEmpId = $otherEmpRegResponse.id
    Write-Host "Empresa 2 registrada con exito. ID: $otherEmpId" -ForegroundColor Green
} catch {
    Write-Host "Error en registro de empresas:" -ForegroundColor Red
    Write-Error $_
    Exit
}

$empHeaders = @{
    "Authorization" = "Bearer $empToken"
}

$otherEmpHeaders = @{
    "Authorization" = "Bearer $otherEmpToken"
}

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "6. CONSULTANDO BUSCADOR DE TALENTOS (MARKETPLACE)..." -ForegroundColor Cyan

try {
    $talentos = Invoke-RestMethod -Uri "$baseUrl/api/Marketplace/talentos" -Method Get -Headers $empHeaders
    $candidatoEncontrado = $talentos | Where-Object { $_.usuarioId -eq $candId }
    if ($candidatoEncontrado) {
        Write-Host "Candidato encontrado en el buscador publico! Nombre: $($candidatoEncontrado.nombre) $($candidatoEncontrado.apellido)" -ForegroundColor Green
    } else {
        Write-Error "Error: El candidato no aparece en el buscador publico a pesar de haber completado la ruta."
        Exit
    }
} catch {
    Write-Host "Error al obtener buscador de talentos:" -ForegroundColor Red
    Write-Error $_
    Exit
}

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "7. PUBLICANDO NUEVA VACANTE Y VALIDANDO ESTADOS..." -ForegroundColor Cyan

$vacanteBody = @{
    Titulo = "Especialista en Automatizacion y Reportes de IA"
    Descripcion = "Buscamos un profesional senior con experiencia en automatizacion e IA."
    Ubicacion = "Buenos Aires (Hibrido)"
    Modalidad = "hibrido"
    RangoSalarial = "2000 - 3000 USD"
    SkillsRequeridas = @(
        @{
            SkillId = $skillIAId
            NivelRequerido = "basico"
        },
        @{
            SkillId = $skillExcelId
            NivelRequerido = "avanzado"
        }
    )
} | ConvertTo-Json -Depth 5

try {
    $vacante = Invoke-RestMethod -Uri "$baseUrl/api/Vacantes" -Method Post -Headers $empHeaders -ContentType "application/json" -Body $vacanteBody
    $vacanteId = $vacante.id
    Write-Host "Vacante publicada con exito. ID: $vacanteId" -ForegroundColor Green
} catch {
    Write-Host "Error al publicar vacante:" -ForegroundColor Red
    Write-Error $_
    Exit
}

# 7.1 Validar que no se puede cambiar estado a valor invalido
Write-Host "7.1 Intentando actualizar estado de vacante a valor invalido (ej. 'banana')..." -ForegroundColor Yellow
$updateVacanteInvalida = @{
    Titulo = "Especialista en Automatizacion y Reportes de IA"
    Descripcion = "Buscamos un profesional senior con experiencia en automatizacion e IA."
    Ubicacion = "Buenos Aires (Hibrido)"
    Modalidad = "hibrido"
    RangoSalarial = "2000 - 3000 USD"
    Estado = "banana"
    SkillsRequeridas = @(
        @{
            SkillId = $skillIAId
            NivelRequerido = "basico"
        }
    )
} | ConvertTo-Json -Depth 5

try {
    $null = Invoke-RestMethod -Uri "$baseUrl/api/Vacantes/$vacanteId" -Method Put -Headers $empHeaders -ContentType "application/json" -Body $updateVacanteInvalida
    Write-Error "Error: Se permitio actualizar la vacante con un estado invalido!"
    Exit
} catch {
    $response = $_.Exception.Response
    if ($response.StatusCode -eq [System.Net.HttpStatusCode]::BadRequest) {
        Write-Host "Asercion Correcta: Se bloqueo el cambio de estado invalido en la vacante con 400 Bad Request." -ForegroundColor Green
    } else {
        Write-Error "Error: Se esperaba 400 Bad Request al cambiar estado a invalido, se obtuvo $($response.StatusCode)"
        Exit
    }
}

# 7.2 Validar cambio de estado correcto a 'cerrada' y luego revertir a 'abierta'
Write-Host "7.2 Verificando actualizacion a estado 'cerrada' y 'abierta'..." -ForegroundColor Yellow
$updateVacanteCerrada = @{
    Titulo = "Especialista en Automatizacion y Reportes de IA"
    Descripcion = "Buscamos un profesional senior con experiencia en automatizacion e IA."
    Ubicacion = "Buenos Aires (Hibrido)"
    Modalidad = "hibrido"
    RangoSalarial = "2000 - 3000 USD"
    Estado = "cerrada"
    SkillsRequeridas = @(
        @{
            SkillId = $skillIAId
            NivelRequerido = "basico"
        }
    )
} | ConvertTo-Json -Depth 5

$updateVacanteAbierta = @{
    Titulo = "Especialista en Automatizacion y Reportes de IA"
    Descripcion = "Buscamos un profesional senior con experiencia en automatizacion e IA."
    Ubicacion = "Buenos Aires (Hibrido)"
    Modalidad = "hibrido"
    RangoSalarial = "2000 - 3000 USD"
    Estado = "abierta"
    SkillsRequeridas = @(
        @{
            SkillId = $skillIAId
            NivelRequerido = "basico"
        }
    )
} | ConvertTo-Json -Depth 5

try {
    $vCerrada = Invoke-RestMethod -Uri "$baseUrl/api/Vacantes/$vacanteId" -Method Put -Headers $empHeaders -ContentType "application/json" -Body $updateVacanteCerrada
    Write-Host "Vacante modificada a estado 'cerrada' con exito." -ForegroundColor Green

    $vAbierta = Invoke-RestMethod -Uri "$baseUrl/api/Vacantes/$vacanteId" -Method Put -Headers $empHeaders -ContentType "application/json" -Body $updateVacanteAbierta
    Write-Host "Vacante modificada de nuevo a estado 'abierta' con exito." -ForegroundColor Green
} catch {
    Write-Host "Error al probar transiciones de estado validas de vacantes:" -ForegroundColor Red
    Write-Error $_
    Exit
}

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "8. EJECUTANDO COINCIDENCIA (MATCH) DESDE LA EMPRESA..." -ForegroundColor Cyan

try {
    $matches = Invoke-RestMethod -Uri "$baseUrl/api/Marketplace/vacantes/$vacanteId/match" -Method Get -Headers $empHeaders
    $candMatch = $matches | Where-Object { $_.usuarioId -eq $candId }

    if ($candMatch) {
        Write-Host "Match calculado para el candidato:" -ForegroundColor Green
        Write-Host "  - Porcentaje de Coincidencia: $($candMatch.porcentajeMatch)%" -ForegroundColor Yellow
        Write-Host "  - Habilidades Coincidentes: $($candMatch.skillsCoincidentes -join ', ')"
        Write-Host "  - Habilidades Faltantes: $($candMatch.skillsFaltantes -join ', ')"

        if ($candMatch.porcentajeMatch -eq 100.0) {
            Write-Host "Asercion Correcta: El porcentaje de match es 100% (se actualizo la vacante para requerir solo IA en los pasos previos)!" -ForegroundColor Green
        } else {
            Write-Error "Error: El porcentaje de match es $($candMatch.porcentajeMatch)%, se esperaba 100.0%"
            Exit
        }
    } else {
        Write-Error "Error: No se encontro el candidato en los matches de la vacante."
        Exit
    }
} catch {
    Write-Host "Error al obtener match de la vacante:" -ForegroundColor Red
    Write-Error $_
    Exit
}

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "9. PROBANDO EL MODULO DE POSTULACIONES Y FEEDBACK..." -ForegroundColor Cyan

$postBody = @{
    VacanteId = $vacanteId
} | ConvertTo-Json

# 9.0 Verificar restriccion: Profesional no visible no puede postularse
Write-Host "9.0 Verificando restriccion: Profesional no visible no puede postularse..." -ForegroundColor Yellow
$novisEmail = "novis_" + (Get-Random) + "@example.com"
$novisRegisterBody = @{
    Nombre = "Pedro"
    Apellido = "Perez"
    Email = $novisEmail
    Password = $password
    TipoUsuario = "profesional"
} | ConvertTo-Json

try {
    $novisRegResponse = Invoke-RestMethod -Uri "$baseUrl/api/Auth/register" -Method Post -ContentType "application/json" -Body $novisRegisterBody
    $novisToken = $novisRegResponse.token
    $novisHeaders = @{
        "Authorization" = "Bearer $novisToken"
    }

    try {
        $null = Invoke-RestMethod -Uri "$baseUrl/api/Postulaciones" -Method Post -Headers $novisHeaders -ContentType "application/json" -Body $postBody
        Write-Error "Error: Se permitio postularse a un profesional sin perfil visible!"
        Exit
    } catch {
        $response = $_.Exception.Response
        if ($response.StatusCode -eq [System.Net.HttpStatusCode]::BadRequest) {
            Write-Host "Asercion Correcta: Se bloqueo la postulacion del usuario no visible con un 400 Bad Request." -ForegroundColor Green
        } else {
            Write-Error "Error: Se esperaba 400 Bad Request, se obtuvo $($response.StatusCode)"
            Exit
        }
    }
} catch {
    Write-Host "Error en registro de profesional no visible o verificacion:" -ForegroundColor Red
    Write-Error $_
    Exit
}

# 9.1 Profesional se postula a la vacante
Write-Host "9.1 Postulando al candidato (visible) a la vacante..." -ForegroundColor Yellow

try {
    $postulacion = Invoke-RestMethod -Uri "$baseUrl/api/Postulaciones" -Method Post -Headers $candHeaders -ContentType "application/json" -Body $postBody
    $postulacionId = $postulacion.id
    Write-Host "Postulacion exitosa. ID de postulacion: $postulacionId, Estado actual: $($postulacion.estadoSeleccion)" -ForegroundColor Green
} catch {
    Write-Host "Error al postularse a la vacante:" -ForegroundColor Red
    Write-Error $_
    Exit
}

# 9.2 Intentar postularse de nuevo (debe fallar por base de datos o validacion)
Write-Host "9.2 Verificando restriccion de duplicados (postularse dos veces)..." -ForegroundColor Yellow
try {
    $null = Invoke-RestMethod -Uri "$baseUrl/api/Postulaciones" -Method Post -Headers $candHeaders -ContentType "application/json" -Body $postBody
    Write-Error "Error: Se permitio postularse dos veces a la misma vacante!"
    Exit
} catch {
    $response = $_.Exception.Response
    if ($response.StatusCode -eq [System.Net.HttpStatusCode]::BadRequest) {
        Write-Host "Asercion Correcta: Se bloqueo la postulacion duplicada con un 400 Bad Request." -ForegroundColor Green
    } else {
        Write-Error "Error: Se esperaba 400 Bad Request, se obtuvo $($response.StatusCode)"
        Exit
    }
}

# 9.3 Profesional ve sus postulaciones (comprobando ruta mis-aplicaciones)
Write-Host "9.3 Profesional consultando sus postulaciones (usando endpoint mis-aplicaciones)..." -ForegroundColor Yellow
try {
    $misPostulaciones = Invoke-RestMethod -Uri "$baseUrl/api/Postulaciones/mis-aplicaciones" -Method Get -Headers $candHeaders
    $miPost = $misPostulaciones | Where-Object { $_.id -eq $postulacionId }
    if ($miPost) {
        Write-Host "Postulacion encontrada en las del profesional. Vacante: $($miPost.vacanteTitulo) | Empresa: $($miPost.empresaNombre)" -ForegroundColor Green
    } else {
        Write-Error "Error: No se encontro la postulacion en las postulaciones del profesional."
        Exit
    }
} catch {
    Write-Host "Error al listar mis postulaciones:" -ForegroundColor Red
    Write-Error $_
    Exit
}

# 9.4 Empresa duena de la vacante ve postulantes
Write-Host "9.4 Empresa duena consultando postulantes a su vacante..." -ForegroundColor Yellow
try {
    $postulantes = Invoke-RestMethod -Uri "$baseUrl/api/Postulaciones/vacante/$vacanteId" -Method Get -Headers $empHeaders
    $postulante = $postulantes | Where-Object { $_.id -eq $postulacionId }
    if ($postulante) {
        Write-Host "Postulante encontrado. Profesional: $($postulante.profesionalNombre) | Email: $($postulante.profesionalEmail)" -ForegroundColor Green
    } else {
        Write-Error "Error: La empresa duena no pudo ver la postulacion."
        Exit
    }
} catch {
    Write-Host "Error al obtener postulantes por vacante:" -ForegroundColor Red
    Write-Error $_
    Exit
}

# 9.5 Otra empresa no puede ver los postulantes
Write-Host "9.5 Verificando restriccion de seguridad: Otra empresa consultando postulantes..." -ForegroundColor Yellow
try {
    $null = Invoke-RestMethod -Uri "$baseUrl/api/Postulaciones/vacante/$vacanteId" -Method Get -Headers $otherEmpHeaders
    Write-Error "Error: Se permitio a otra empresa consultar los postulantes!"
    Exit
} catch {
    $response = $_.Exception.Response
    if ($response.StatusCode -eq [System.Net.HttpStatusCode]::BadRequest) {
        Write-Host "Asercion Correcta: Se bloqueo el acceso de otra empresa con un 400 Bad Request." -ForegroundColor Green
    } else {
        Write-Error "Error: Se esperaba 400 Bad Request, se obtuvo $($response.StatusCode)"
        Exit
    }
}

# 9.6 Modificar estado de postulacion a "en_proceso" (feedback opcional)
Write-Host "9.6 Cambiando estado a 'en_proceso'..." -ForegroundColor Yellow
$estadoBody = @{
    EstadoSeleccion = "en_proceso"
} | ConvertTo-Json

try {
    $actualizada = Invoke-RestMethod -Uri "$baseUrl/api/Postulaciones/$postulacionId/estado" -Method Put -Headers $empHeaders -ContentType "application/json" -Body $estadoBody
    Write-Host "Estado cambiado a 'en_proceso' con exito. Estado: $($actualizada.estadoSeleccion)" -ForegroundColor Green
} catch {
    Write-Host "Error al cambiar estado a 'en_proceso':" -ForegroundColor Red
    Write-Error $_
    Exit
}

# 9.7 Modificar estado a "rechazado" SIN feedback (debe fallar)
Write-Host "9.7 Verificando feedback obligatorio al rechazar..." -ForegroundColor Yellow
$estadoRechazadoSinFeedback = @{
    EstadoSeleccion = "rechazado"
} | ConvertTo-Json

try {
    $null = Invoke-RestMethod -Uri "$baseUrl/api/Postulaciones/$postulacionId/estado" -Method Put -Headers $empHeaders -ContentType "application/json" -Body $estadoRechazadoSinFeedback
    Write-Error "Error: Se permitio cambiar a 'rechazado' sin dejar feedback!"
    Exit
} catch {
    $response = $_.Exception.Response
    if ($response.StatusCode -eq [System.Net.HttpStatusCode]::BadRequest) {
        Write-Host "Asercion Correcta: Se bloqueo el cambio a 'rechazado' sin feedback con un 400 Bad Request." -ForegroundColor Green
    } else {
        Write-Error "Error: Se esperaba 400 Bad Request, se obtuvo $($response.StatusCode)"
        Exit
    }
}

# 9.8 Modificar estado a "rechazado" CON feedback (debe funcionar)
Write-Host "9.8 Cambiando a 'rechazado' con feedback valido..." -ForegroundColor Yellow
$feedbackMsg = "El candidato demostro buenos conocimientos tecnicos, pero buscamos a alguien con mayor nivel en Reportes Financieros en Excel."
$estadoRechazadoConFeedback = @{
    EstadoSeleccion = "rechazado"
    FeedbackEmpresa = $feedbackMsg
} | ConvertTo-Json

try {
    $actualizada = Invoke-RestMethod -Uri "$baseUrl/api/Postulaciones/$postulacionId/estado" -Method Put -Headers $empHeaders -ContentType "application/json" -Body $estadoRechazadoConFeedback
    if ($actualizada.estadoSeleccion -eq "rechazado" -and $actualizada.feedbackEmpresa -eq $feedbackMsg) {
        Write-Host "Estado cambiado a 'rechazado' con feedback verificado!" -ForegroundColor Green
        Write-Host "  - Feedback: $($actualizada.feedbackEmpresa)"
        Write-Host "  - Fecha Feedback: $($actualizada.fechaFeedback)"
    } else {
        Write-Error "Error: El estado o el feedback no se guardaron correctamente."
        Exit
    }
} catch {
    Write-Host "Error al cambiar estado a 'rechazado' con feedback:" -ForegroundColor Red
    Write-Error $_
    Exit
}

# 9.9 Modificar estado a "seleccionado" CON feedback (debe funcionar)
Write-Host "9.9 Cambiando a 'seleccionado' con feedback valido..." -ForegroundColor Yellow
$feedbackSelMsg = "Felicitaciones! Has completado el proceso y fuiste seleccionado para la posicion."
$estadoSeleccionadoConFeedback = @{
    EstadoSeleccion = "seleccionado"
    FeedbackEmpresa = $feedbackSelMsg
} | ConvertTo-Json

try {
    $actualizada = Invoke-RestMethod -Uri "$baseUrl/api/Postulaciones/$postulacionId/estado" -Method Put -Headers $empHeaders -ContentType "application/json" -Body $estadoSeleccionadoConFeedback
    if ($actualizada.estadoSeleccion -eq "seleccionado" -and $actualizada.feedbackEmpresa -eq $feedbackSelMsg) {
        Write-Host "Estado cambiado a 'seleccionado' con feedback verificado!" -ForegroundColor Green
        Write-Host "  - Feedback: $($actualizada.feedbackEmpresa)"
        Write-Host "  - Fecha Feedback: $($actualizada.fechaFeedback)"
    } else {
        Write-Error "Error: El estado o el feedback no se guardaron correctamente."
        Exit
    }
} catch {
    Write-Host "Error al cambiar estado a 'seleccionado' con feedback:" -ForegroundColor Red
    Write-Error $_
    Exit
}

# 9.10 Profesional ve su postulacion actualizada con el feedback
Write-Host "9.10 Profesional consultando su postulacion para ver el feedback..." -ForegroundColor Yellow
try {
    $misPostulaciones = Invoke-RestMethod -Uri "$baseUrl/api/Postulaciones/mis-aplicaciones" -Method Get -Headers $candHeaders
    $miPostActualizada = $misPostulaciones | Where-Object { $_.id -eq $postulacionId }
    if ($miPostActualizada -and $miPostActualizada.estadoSeleccion -eq "seleccionado" -and $miPostActualizada.feedbackEmpresa -eq $feedbackSelMsg) {
        Write-Host "Asercion Correcta! El profesional puede ver su feedback constructivo de seleccion." -ForegroundColor Green
    } else {
        Write-Error "Error: El profesional no recibio el feedback esperado."
        Exit
    }
} catch {
    Write-Host "Error al consultar postulacion actualizada:" -ForegroundColor Red
    Write-Error $_
    Exit
}

Write-Host "========================================================" -ForegroundColor Green
Write-Host "PRUEBAS DE VACANTES, MATCH Y POSTULACIONES COMPLETADAS CON EXITO!" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green

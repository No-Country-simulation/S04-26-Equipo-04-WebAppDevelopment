# Script de prueba funcional: Flujo completo del Diagnostico a las Rutas y CV Vivo (ASCII)

$email = "test_" + (Get-Random) + "@example.com"
$password = "Password123!"

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "1. REGISTRANDO NUEVO USUARIO PROFESIONAL..." -ForegroundColor Cyan
Write-Host "Email: $email"

$registerBody = @{
    Nombre = "Riki"
    Apellido = "Senior"
    Email = $email
    Password = $password
    TipoUsuario = "profesional"
} | ConvertTo-Json

try {
    $regResponse = Invoke-RestMethod -Uri "http://localhost:5187/api/Auth/register" -Method Post -ContentType "application/json" -Body $registerBody
    $token = $regResponse.token
    Write-Host "Usuario registrado con exito. ID: $($regResponse.id)" -ForegroundColor Green
} catch {
    Write-Host "Error en registro:" -ForegroundColor Red
    Write-Error $_
    Exit
}

$headers = @{
    "Authorization" = "Bearer $token"
}

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "2. VERIFICANDO CREACION AUTOMATICA DE PERFIL PROFESIONAL..." -ForegroundColor Cyan

try {
    $perfil = Invoke-RestMethod -Uri "http://localhost:5187/api/Perfiles/mi-perfil" -Method Get -Headers $headers
    Write-Host "Perfil encontrado. ID Perfil: $($perfil.id)" -ForegroundColor Green
    Write-Host "Visible en el Marketplace: $($perfil.visibleMarketplace)" -ForegroundColor Yellow
} catch {
    Write-Host "Error al obtener perfil:" -ForegroundColor Red
    Write-Error $_
    Exit
}

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "3. INICIANDO DIAGNOSTICO PROFESIONAL..." -ForegroundColor Cyan

try {
    $diagInit = Invoke-RestMethod -Uri "http://localhost:5187/api/Diagnostico/iniciar" -Method Post -Headers $headers -ContentType "application/json"
    $diagId = $diagInit.id
    Write-Host "Diagnostico iniciado con exito. ID Diagnostico: $diagId" -ForegroundColor Green
} catch {
    Write-Host "Error al iniciar diagnostico:" -ForegroundColor Red
    Write-Error $_
    Exit
}

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "4. OBTENIENDO PREGUNTAS Y RESPONDIENDO CON BAJO PUNTAJE PARA CREAR BRECHAS..." -ForegroundColor Cyan

try {
    $preguntasAgrupadas = Invoke-RestMethod -Uri "http://localhost:5187/api/Diagnostico/preguntas" -Method Get -Headers $headers
    $respuestas = @()
    
    foreach ($grupo in $preguntasAgrupadas) {
        Write-Host "Categoria: $($grupo.categoria)" -ForegroundColor Gray
        foreach ($pregunta in $grupo.preguntas) {
            # Seleccionamos siempre la primera opcion (Nulo/Tradicional, puntaje = 1) para forzar brechas
            $opcion = $pregunta.opciones[0]
            $respuestas += @{
                preguntaId = $pregunta.id
                opcionId = $opcion.id
            }
        }
    }

    $responderBody = @{
        diagnosticoId = $diagId
        respuestas = $respuestas
    } | ConvertTo-Json -Depth 5

    $resultadoDiag = Invoke-RestMethod -Uri "http://localhost:5187/api/Diagnostico/responder" -Method Post -Headers $headers -ContentType "application/json" -Body $responderBody
    Write-Host "Diagnostico respondido. Estado: $($resultadoDiag.estado)" -ForegroundColor Green
    
    Write-Host "Resultados de Nivel por Categoria:" -ForegroundColor Yellow
    foreach ($res in $resultadoDiag.resultados) {
        Write-Host "  - $($res.categoria): Nivel: $($res.nivel) | Puntaje: $($res.puntajeObtenido)/$($res.puntajeMaximo)"
    }
} catch {
    Write-Host "Error al responder diagnostico:" -ForegroundColor Red
    Write-Error $_
    Exit
}

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "5. GENERANDO RUTA DE APRENDIZAJE PERSONALIZADA..." -ForegroundColor Cyan

try {
    $ruta = Invoke-RestMethod -Uri "http://localhost:5187/api/Rutas/generar/$diagId" -Method Post -Headers $headers
    Write-Host "Ruta de aprendizaje generada con exito. ID Ruta: $($ruta.id) | Estado: $($ruta.estado)" -ForegroundColor Green
    Write-Host "Cursos recomendados en la ruta:" -ForegroundColor Yellow
    foreach ($pm in $ruta.progresos) {
        Write-Host "  * Modulo: $($pm.modulo.titulo) (Dificultad: $($pm.modulo.nivelDificultad))"
        Write-Host "    Total Clases: $($pm.progresosClase.Count)"
    }
} catch {
    Write-Host "Error al generar ruta:" -ForegroundColor Red
    Write-Error $_
    Exit
}

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "6. COMPLETANDO TODAS LAS LECCIONES DE LA RUTA..." -ForegroundColor Cyan

try {
    # Hacemos loop para completar todas las clases de todos los modulos recomendados
    foreach ($pm in $ruta.progresos) {
        Write-Host "Comenzando curso: $($pm.modulo.titulo)" -ForegroundColor Yellow
        
        # Consultar las lecciones detalladas usando el endpoint de clases
        $progresoModuloDetalle = Invoke-RestMethod -Uri "http://localhost:5187/api/Rutas/progreso/$($pm.id)/clases" -Method Get -Headers $headers
        
        foreach ($pc in $progresoModuloDetalle.progresosClase) {
            Write-Host "  - Marcando Clase completada: $($pc.clase.titulo)"
            $resClase = Invoke-RestMethod -Uri "http://localhost:5187/api/Rutas/progreso/clase/$($pc.id)" -Method Put -Headers $headers
        }
        Write-Host "Curso completado!" -ForegroundColor Green
    }
} catch {
    Write-Host "Error al completar clases:" -ForegroundColor Red
    Write-Error $_
    Exit
}

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "7. COMPROBANDO ACTUALIZACION DEL CV VIVO Y MARKETPLACE..." -ForegroundColor Cyan

try {
    # 1. Comprobar ruta completa (deberia dar 404 porque no esta activa)
    try {
        $rutaFinal = Invoke-RestMethod -Uri "http://localhost:5187/api/Rutas/mi-ruta" -Method Get -Headers $headers
        Write-Host "Estado de la Ruta final: $($rutaFinal.estado)" -ForegroundColor Green
    } catch {
        if ($_.Exception.Response.StatusCode -eq 404) {
            Write-Host "Ruta activa no encontrada (es correcto, la ruta fue completada con exito y ya no esta activa)." -ForegroundColor Green
        } else {
            throw $_
        }
    }

    # 2. Comprobar perfil del usuario
    $perfilFinal = Invoke-RestMethod -Uri "http://localhost:5187/api/Perfiles/mi-perfil" -Method Get -Headers $headers
    Write-Host "Visible en el Marketplace: $($perfilFinal.visibleMarketplace)" -ForegroundColor Green
    
    Write-Host "Habilidades validadas y acreditadas en el CV Vivo:" -ForegroundColor Yellow
    foreach ($s in $perfilFinal.skills) {
        Write-Host "  - $($s.skillNombre) | Categoria: $($s.categoriaNombre) | Origen: $($s.origen) | Validada: $($s.validada)"
    }
} catch {
    Write-Host "Error al comprobar CV Vivo final:" -ForegroundColor Red
    Write-Error $_
    Exit
}

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "8. ANADIENDO EXPERIENCIA LABORAL AL CV VIVO..." -ForegroundColor Cyan

try {
    $expBody = @{
        Empresa = "Global Tech"
        Cargo = "Gerente de Operaciones"
        FechaInicio = "2018-05-10T00:00:00Z"
        FechaFin = "2024-03-31T00:00:00Z"
        Descripcion = "Lidere equipos multidisciplinarios y optimice procesos comerciales un 25%."
    } | ConvertTo-Json

    $expResponse = Invoke-RestMethod -Uri "http://localhost:5187/api/Perfiles/experiencia" -Method Post -Headers $headers -ContentType "application/json" -Body $expBody
    Write-Host "Experiencia laboral guardada. ID: $($expResponse.id)" -ForegroundColor Green

    # Ver perfil completo de nuevo
    $perfilCompleto = Invoke-RestMethod -Uri "http://localhost:5187/api/Perfiles/mi-perfil" -Method Get -Headers $headers
    Write-Host "Trayectoria Profesional en el CV Vivo:" -ForegroundColor Yellow
    foreach ($e in $perfilCompleto.experiencias) {
        $fechaFinTexto = "Presente"
        if ($e.fechaFin) {
            $fechaFinTexto = $e.fechaFin
        }
        Write-Host "  - Cargo: $($e.cargo) en $($e.empresa) ($($e.fechaInicio) a $fechaFinTexto)"
        Write-Host "    Logros: $($e.descripcion)"
    }
} catch {
    Write-Host "Error al anadir experiencia laboral:" -ForegroundColor Red
    Write-Error $_
    Exit
}

Write-Host "--------------------------------------------------------" -ForegroundColor Green
Write-Host "TEST COMPLETADO CON EXITO!" -ForegroundColor Green
Write-Host "--------------------------------------------------------" -ForegroundColor Green

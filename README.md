# TalentRenew

TalentRenew es una plataforma de empleabilidad para profesionales +45. El objetivo del MVP es conectar diagnostico, aprendizaje y oportunidades laborales en un solo flujo: el profesional identifica brechas, completa cursos, acredita skills en su CV vivo y puede vincularse con vacantes compatibles.

## Contexto del Problema

Muchos profesionales mayores de 45 anos tienen trayectoria, experiencia y habilidades valiosas, pero el mercado laboral cambio rapidamente por el avance tecnologico. Hoy las empresas piden herramientas digitales, inteligencia artificial, metodologias agiles, presencia profesional online y capacidad de adaptacion.

El problema no es la falta de experiencia, sino la dificultad para saber que actualizar, como demostrarlo y como conectar con empresas que valoren ese talento. TalentRenew busca resolver esa desconexion.

## Propuesta de Valor

Para profesionales:

- Diagnostico inicial de habilidades.
- Ruta de aprendizaje personalizada.
- Cursos cortos con clases y videos.
- Skills acreditadas automaticamente al completar modulos.
- Perfil profesional dinamico o CV vivo.
- Oportunidades laborales con porcentaje de compatibilidad.

Para empresas:

- Publicacion y gestion de vacantes.
- Seleccion de skills requeridas y nivel minimo.
- Matching entre vacantes y perfiles profesionales.
- Gestion de postulaciones y estados del proceso.

## Enlaces del Proyecto

Documentacion API:

- Swagger: https://s04-26-equipo-04-webappdevelopment.onrender.com/swagger/index.html

Produccion:

- Frontend: https://talentrenew.netlify.app/
- Backend API: https://s04-26-equipo-04-webappdevelopment.onrender.com/api

## Stack Tecnologico

### Frontend

- Next.js
- React
- TypeScript
- Zustand
- Axios
- React Hook Form
- Zod
- Tailwind CSS
- Deploy sugerido: Netlify

### Backend

- ASP.NET Core
- Entity Framework Core
- PostgreSQL / Supabase
- JWT Authentication
- Swagger

## Flujo Principal del Profesional

1. El usuario se registra como `profesional`.
2. Inicia sesion.
3. Completa el diagnostico.
4. El backend genera una ruta de aprendizaje.
5. El profesional entra a `Mi Ruta`.
6. Completa clases dentro de un modulo.
7. Al completar un modulo, se acreditan skills en su perfil.
8. Con al menos una skill validada, puede postularse a vacantes.
9. Al completar toda la ruta, el perfil queda visible para empresas en marketplace.

## Flujo Principal de Empresa

1. La empresa se registra como `empresa`.
2. Inicia sesion.
3. Crea una vacante.
4. Define skills requeridas y nivel minimo.
5. Puede editar, cerrar o eliminar vacantes.
6. Puede consultar candidatos compatibles.
7. Puede revisar postulaciones.
8. Puede cambiar estado de postulacion y dejar feedback.

## Reglas de Negocio Importantes

- Solo existen dos tipos de usuario validos: `profesional` y `empresa`.
- El diagnostico genera resultados por categoria.
- La ruta de aprendizaje se genera desde un diagnostico completado.
- Las skills se acreditan cuando se completa un modulo completo.
- Para postularse, el profesional debe tener al menos una skill validada.
- `visibleMarketplace` pasa a `true` cuando el profesional completa toda su ruta.
- El marketplace de talentos de empresa muestra perfiles con `visibleMarketplace: true`.
- Las vacantes deben tener al menos una skill requerida.
- No se puede repetir la misma skill dentro de una vacante.
- No se puede postular dos veces a la misma vacante.

### Autenticacion

- Registro de profesional y empresa.
- Login con JWT.
- Redireccion segun rol.
- Proteccion de rutas por token.

### Diagnostico

- Preguntas agrupadas por categoria.
- Seleccion de area principal.
- Preguntas generales y especificas.
- Resultado con niveles y recomendaciones.

### Rutas de Aprendizaje

- Generacion de ruta desde diagnostico.
- Cursos con clases integradas.
- Progreso por clase.
- Progreso por modulo.
- Acreditacion de skills al completar modulos.

### CV Vivo / Perfil Profesional

- Perfil creado automaticamente para profesionales.
- Edicion de titular, biografia y LinkedIn.
- Gestion de experiencia laboral.
- Visualizacion de skills validadas.
- Activacion de visibilidad marketplace al completar toda la ruta.

### Vacantes

- Crear vacante.
- Editar vacante.
- Eliminar vacante.
- Listar vacantes de la empresa.
- Definir skills requeridas y nivel minimo.

### Matching

- Match de vacantes para profesionales.
- Match de candidatos para una vacante de empresa.
- Calculo basado en skills requeridas y niveles.
- Match parcial cuando el candidato tiene la skill en nivel menor.

### Postulaciones

- Profesional puede postularse con al menos una skill validada.
- Empresa puede listar postulantes por vacante.
- Empresa puede actualizar estado:
  - `aplicado`
  - `en_proceso`
  - `rechazado`
  - `seleccionado`
- Feedback obligatorio al rechazar o seleccionar.

## Endpoints Principales

Base URL:

```txt
https://s04-26-equipo-04-webappdevelopment.onrender.com/api
```

## Estado del MVP

El MVP cubre el recorrido principal:

- Profesional se registra.
- Completa diagnostico.
- Recibe ruta.
- Completa cursos.
- Acredita habilidades.
- Ve oportunidades compatibles.
- Se postula.
- Empresa crea vacantes y puede gestionar postulaciones.

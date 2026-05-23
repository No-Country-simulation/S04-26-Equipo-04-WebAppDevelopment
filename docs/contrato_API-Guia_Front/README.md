# Contrato API - Guia Frontend

Documentacion practica para integrar el frontend con el backend Talent.

## Lectura rapida

1. Empezar por [00-Indice-y-Configuracion.md](./00-Indice-y-Configuracion.md).
2. Configurar Axios con token JWT.
3. Seguir las guias segun pantalla:
   - Login/registro: [01-Guia-Autenticacion.md](./01-Guia-Autenticacion.md)
   - Diagnostico: [02-Guia-Diagnostico.md](./02-Guia-Diagnostico.md)
   - Ruta/cursos: [03-Guia-Rutas-Aprendizaje.md](./03-Guia-Rutas-Aprendizaje.md)
   - CV vivo: [04-Guia-Perfil-CV-Vivo.md](./04-Guia-Perfil-CV-Vivo.md)
   - Vacantes/marketplace: [05-Guia-Vacantes-Marketplace.md](./05-Guia-Vacantes-Marketplace.md)
   - Postulaciones: [06-Guia-Postulaciones.md](./06-Guia-Postulaciones.md)

## Checklist de integracion

### Profesional

- Registro/login con `tipoUsuario: "profesional"`.
- Completar diagnostico.
- Generar ruta desde `diagnosticoId`.
- Mostrar modulos y clases.
- Completar clases.
- Mostrar CV vivo y permitir editar perfil/experiencias.
- Mostrar vacantes y match.
- Permitir postulacion solo cuando `visibleMarketplace` sea `true`.
- Mostrar estado de postulaciones y feedback recibido.

### Empresa

- Registro/login con `tipoUsuario: "empresa"`.
- Crear y editar vacantes.
- Ver talentos visibles.
- Ver match de candidatos por vacante.
- Ver postulantes.
- Cambiar estado de postulacion.
- Exigir feedback al rechazar o seleccionar.

## Notas para Frontend

- Los nombres JSON salen en camelCase.
- Las rutas de Axios deben omitir `/api` si `baseURL` ya lo incluye.
- Guardar el token en `localStorage` para el interceptor sugerido.
- Usar los mensajes de error del backend para mostrar feedback claro al usuario.

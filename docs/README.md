# Documentacion del Proyecto

Esta carpeta contiene documentacion de producto, alcance MVP y contrato de integracion con frontend.

## Producto y alcance

- [contexto-problema.md](./contexto-problema.md): contexto del problema y oportunidad.
- [segmento-prioritario-mvp.md](./segmento-prioritario-mvp.md): usuario objetivo del MVP.
- [prd-mvp-v1.md](./prd-mvp-v1.md): alcance funcional del MVP.

## Contrato API para Frontend

La guia principal para integrar pantallas con el backend esta en:

- [contrato_API-Guia_Front/README.md](./contrato_API-Guia_Front/README.md)

Incluye:

- Autenticacion y roles.
- Diagnostico.
- Rutas de aprendizaje, modulos y clases.
- CV vivo.
- Vacantes, marketplace y match.
- Postulaciones y feedback.

## Estado backend documentado

El contrato refleja el backend actual con:

- JWT y roles `profesional` / `empresa`.
- Validacion de registro para impedir roles no permitidos.
- Perfil visible en marketplace solo al completar ruta.
- Vacantes con estados `abierta` / `cerrada`.
- Postulaciones unicas por usuario y vacante.
- Feedback obligatorio para `rechazado` y `seleccionado`.

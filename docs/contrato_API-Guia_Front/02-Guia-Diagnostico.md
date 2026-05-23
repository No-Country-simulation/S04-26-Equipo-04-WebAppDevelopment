# Guia 02: Diagnostico Profesional

Todos los endpoints de diagnostico requieren token.

## Flujo recomendado

1. Pedir preguntas con `GET /Diagnostico/preguntas`.
2. Opcionalmente filtrar en frontend por area elegida por el usuario.
3. Iniciar sesion de diagnostico con `POST /Diagnostico/iniciar`.
4. Enviar respuestas con `POST /Diagnostico/responder`.
5. Guardar `diagnosticoId` completado para generar ruta de aprendizaje.

## 1. Obtener preguntas

**Endpoint:** `GET /api/Diagnostico/preguntas`

**Auth:** requiere token.

### Respuesta 200

```json
[
  {
    "categoria": "Ventas y Marketing",
    "preguntas": [
      {
        "id": 1,
        "texto": "Que experiencia tiene en ventas por internet o marketing digital?",
        "opciones": [
          { "id": 1, "texto": "Nulo / Totalmente tradicional", "orden": 1 },
          { "id": 2, "texto": "Basico / Uso herramientas intermedias", "orden": 2 },
          { "id": 3, "texto": "Avanzado / Uso tecnologia moderna", "orden": 3 }
        ]
      }
    ]
  }
]
```

### Ejemplo React

```javascript
const loadQuestions = async (areaElegida) => {
  const { data } = await api.get('/Diagnostico/preguntas');
  const generales = ['Liderazgo', 'Gestion Estrategica', 'Adaptabilidad', 'Marca Personal'];

  return data.filter(
    (grupo) => grupo.categoria === areaElegida || generales.includes(grupo.categoria)
  );
};
```

## 2. Iniciar diagnostico

**Endpoint:** `POST /api/Diagnostico/iniciar`

**Auth:** requiere token.

No requiere body.

### Respuesta 201

```json
{
  "id": 5,
  "fecha": "2026-05-23T20:48:56Z",
  "estado": "en_progreso"
}
```

## 3. Enviar respuestas

**Endpoint:** `POST /api/Diagnostico/responder`

**Auth:** requiere token.

### Body

```json
{
  "diagnosticoId": 5,
  "respuestas": [
    { "preguntaId": 1, "opcionId": 3 },
    { "preguntaId": 2, "opcionId": 6 }
  ]
}
```

### Respuesta 200

```json
{
  "diagnosticoId": 5,
  "estado": "completado",
  "resultados": [
    {
      "categoria": "Ventas y Marketing",
      "puntajeObtenido": 11,
      "puntajeMaximo": 15,
      "nivel": "avanzado",
      "recomendacion": "Nivel destacado..."
    }
  ]
}
```

## 4. Obtener resultado existente

**Endpoint:** `GET /api/Diagnostico/resultado/{diagnosticoId}`

**Auth:** requiere token.

### Respuesta 200

Misma estructura que `POST /Diagnostico/responder`.

## Siguiente paso

Cuando `estado` sea `completado`, llamar:

```txt
POST /api/Rutas/generar/{diagnosticoId}
```

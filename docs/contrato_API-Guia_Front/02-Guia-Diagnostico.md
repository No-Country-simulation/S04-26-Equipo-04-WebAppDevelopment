# Guía 02: Módulo de Diagnóstico

Este módulo es el corazón del MVP. Permite evaluar las habilidades del profesional.
**Todos estos endpoints requieren estar logueados (Token JWT en el Header).**

## Flujo del Frontend

1. **Pantalla Inicial:** El Front le pregunta al usuario *"¿En qué área desarrolló su carrera?"* (Ventas, Sistemas, etc.). Esto no se envía al backend todavía, es solo visual.
2. **Pedir Preguntas:** El Front llama a `GET /preguntas` y filtra el array gigante usando el área que eligió el usuario + las categorías generales.
3. **Iniciar:** Justo antes de mostrar la primera pregunta, el Front llama a `POST /iniciar` para obtener el ID de la sesión.
4. **Responder:** Cuando el usuario termina el formulario, el Front envía todas las respuestas elegidas a `POST /responder`.

---

## 1. Obtener Catálogo de Preguntas

**Endpoint:** `GET /api/Diagnostico/preguntas`

### Respuesta del servidor (Resumida):
Te devuelve un Array agrupado por "categoría".

```json
[
  {
    "categoria": "Ventas y Marketing",
    "preguntas": [
      {
        "id": 1,
        "texto": "¿Qué experiencia tiene en ventas por internet?",
        "opciones": [
          { "id": 1, "texto": "Nulo", "orden": 1 },
          { "id": 2, "texto": "Básico", "orden": 2 },
          { "id": 3, "texto": "Avanzado", "orden": 3 }
        ]
      }
    ]
  },
  {
    "categoria": "Liderazgo",
    "preguntas": [ ... ]
  }
]
```

### Ejemplo de implementación (React)
```javascript
const loadQuestions = async (areaElegidaPorUsuario) => {
  const { data } = await api.get('/Diagnostico/preguntas');
  
  // Filtrar solo las preguntas del área elegida + las generales
  const categoriasGenerales = ["Liderazgo", "Gestión Estratégica", "Adaptabilidad", "Marca Personal"];
  
  const preguntasFiltradas = data.filter(cat => 
    cat.categoria === areaElegidaPorUsuario || categoriasGenerales.includes(cat.categoria)
  );

  setPreguntasAMostrar(preguntasFiltradas);
};
```

---

## 2. Iniciar Diagnóstico

**Endpoint:** `POST /api/Diagnostico/iniciar`  
*(No requiere body, el ID de usuario se saca del Token).*

### Respuesta del servidor:
```json
{
  "id": 5,
  "fecha": "2026-05-18T20:48:56Z",
  "estado": "en_progreso"
}
```

### Ejemplo (React)
```javascript
const startDiagnostico = async () => {
  const { data } = await api.post('/Diagnostico/iniciar');
  // Guardar el ID de diagnóstico en el estado para usarlo al final
  setDiagnosticoId(data.id); 
};
```

---

## 3. Enviar Respuestas y Obtener Resultado

**Endpoint:** `POST /api/Diagnostico/responder`

### Payload (Body) esperado:
Tenés que enviar el `diagnosticoId` que obtuviste en el paso anterior, y un array con el ID de la pregunta y el ID de la opción que eligió el usuario.

```json
{
  "diagnosticoId": 5,
  "respuestas": [
    { "preguntaId": 1, "opcionId": 3 },
    { "preguntaId": 21, "opcionId": 63 }
  ]
}
```

### Respuesta del servidor (Tu Mapa Profesional):
Te devuelve los porcentajes y niveles calculados para graficar el radar.

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
      "recomendacion": "Nivel destacado. Podés enfocarte en compartir conocimiento..."
    },
    {
      "categoria": "Liderazgo",
      "puntajeObtenido": 5,
      "puntajeMaximo": 5,
      "nivel": "avanzado",
      "recomendacion": "Excelente manejo de equipos..."
    }
  ]
}
```

### Ejemplo (React)
```javascript
const submitRespuestas = async (respuestasUsuario) => {
  const payload = {
    diagnosticoId: diagnosticoId, // El ID del estado
    respuestas: respuestasUsuario // Array formateado
  };

  try {
    const { data } = await api.post('/Diagnostico/responder', payload);
    setResultadoRadar(data.resultados);
    // Redirigir a la pantalla del Radar / Resultados
  } catch (error) {
    console.error('Error al enviar diagnóstico');
  }
};
```

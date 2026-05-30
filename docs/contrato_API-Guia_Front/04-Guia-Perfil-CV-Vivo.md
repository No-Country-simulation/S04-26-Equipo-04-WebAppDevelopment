# Guia 04: Perfil Dinamico y CV Vivo

El perfil profesional se crea automaticamente al registrar un usuario `profesional`. El CV vivo se completa con datos manuales del usuario y skills acreditadas por las rutas de aprendizaje.

## Reglas clave

- `visibleMarketplace` empieza en `false`.
- Al completar toda la ruta de aprendizaje, pasa a `true`.
- Solo perfiles con `visibleMarketplace: true` aparecen en el buscador publico de talentos para empresas.
- Para postularse a vacantes alcanza con tener al menos una skill validada por completar un modulo.
- Las empresas solo pueden ver perfiles visibles, salvo que sea su propio usuario.

## 1. Obtener mi perfil

**Endpoint:** `GET /api/Perfiles/mi-perfil`

**Auth:** requiere token.

### Respuesta 200

```json
{
  "id": 1,
  "usuarioId": 10,
  "nombre": "Juan",
  "apellido": "Perez",
  "email": "juan@test.com",
  "titular": "Analista administrativo senior",
  "biografia": "Profesional con 20 anos de experiencia...",
  "urlLinkedin": "https://linkedin.com/in/juan",
  "visibleMarketplace": false,
  "skills": [
    {
      "id": 30,
      "skillId": 4,
      "skillNombre": "Uso de Inteligencia Artificial (ChatGPT/Prompts)",
      "categoriaNombre": "Sistemas y Tecnologia",
      "origen": "ruta_aprendizaje",
      "nivel": "basico",
      "validada": true
    }
  ],
  "experiencias": [
    {
      "id": 5,
      "empresa": "Acme",
      "cargo": "Coordinador de Operaciones",
      "fechaInicio": "2018-01-01T00:00:00Z",
      "fechaFin": null,
      "descripcion": "Lidere equipos operativos y reportes de gestion."
    }
  ]
}
```

## 2. Actualizar mi perfil

**Endpoint:** `PUT /api/Perfiles/mi-perfil`

**Auth:** requiere token.

### Body

```json
{
  "titular": "Coordinador administrativo senior",
  "biografia": "Profesional +45 con experiencia en operaciones, reportes y liderazgo.",
  "urlLinkedin": "https://linkedin.com/in/juan"
}
```

### Respuesta 200

Devuelve el perfil completo actualizado.

## 3. Agregar experiencia

**Endpoint:** `POST /api/Perfiles/experiencia`

**Auth:** requiere token.

### Body

```json
{
  "empresa": "Acme",
  "cargo": "Coordinador de Operaciones",
  "fechaInicio": "2018-01-01T00:00:00Z",
  "fechaFin": null,
  "descripcion": "Lidere equipos operativos y reportes de gestion."
}
```

### Respuesta 201

```json
{
  "id": 5,
  "empresa": "Acme",
  "cargo": "Coordinador de Operaciones",
  "fechaInicio": "2018-01-01T00:00:00Z",
  "fechaFin": null,
  "descripcion": "Lidere equipos operativos y reportes de gestion."
}
```

## 4. Editar experiencia

**Endpoint:** `PUT /api/Perfiles/experiencia/{id}`

**Auth:** requiere token.

### Body

Misma estructura que agregar experiencia.

### Respuesta 200

Devuelve la experiencia actualizada.

## 5. Eliminar experiencia

**Endpoint:** `DELETE /api/Perfiles/experiencia/{id}`

**Auth:** requiere token.

### Respuesta 204

Sin body.

## 6. Ver perfil publico por ID

**Endpoint:** `GET /api/Perfiles/{id}`

**Auth:** requiere token.

Reglas:

- El propio usuario puede ver su perfil.
- `empresa` puede ver perfiles con `visibleMarketplace: true`.
- `admin` podria ver perfiles, pero el registro publico no crea admins.

### Error cuando una empresa intenta ver perfil no visible

```json
{
  "message": "Este perfil aun no esta disponible en el marketplace de talento."
}
```

## Ejemplo React

```javascript
const getMyProfile = async () => {
  const { data } = await api.get('/Perfiles/mi-perfil');
  return data;
};

const addExperience = async (payload) => {
  const { data } = await api.post('/Perfiles/experiencia', payload);
  return data;
};
```

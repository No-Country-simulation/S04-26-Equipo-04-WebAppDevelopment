-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.__EFMigrationsHistory (
  MigrationId character varying NOT NULL,
  ProductVersion character varying NOT NULL,
  CONSTRAINT __EFMigrationsHistory_pkey PRIMARY KEY (MigrationId)
);
CREATE TABLE public.categorias_skill (
  id_categoria bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nombre character varying NOT NULL,
  descripcion character varying NOT NULL,
  CONSTRAINT categorias_skill_pkey PRIMARY KEY (id_categoria)
);
CREATE TABLE public.diagnosticos (
  id_diagnostico bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  id_usuario bigint NOT NULL,
  fecha timestamp with time zone NOT NULL,
  estado character varying NOT NULL,
  CONSTRAINT diagnosticos_pkey PRIMARY KEY (id_diagnostico),
  CONSTRAINT FK_diagnosticos_usuarios_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario)
);
CREATE TABLE public.opciones_pregunta (
  id_opcion bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  id_pregunta bigint NOT NULL,
  texto character varying NOT NULL,
  puntaje integer NOT NULL,
  orden integer NOT NULL,
  CONSTRAINT opciones_pregunta_pkey PRIMARY KEY (id_opcion),
  CONSTRAINT FK_opciones_pregunta_preguntas_diagnostico_id_pregunta FOREIGN KEY (id_pregunta) REFERENCES public.preguntas_diagnostico(id_pregunta)
);
CREATE TABLE public.preguntas_diagnostico (
  id_pregunta bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  id_categoria bigint NOT NULL,
  texto character varying NOT NULL,
  orden integer NOT NULL,
  activa boolean NOT NULL,
  CONSTRAINT preguntas_diagnostico_pkey PRIMARY KEY (id_pregunta),
  CONSTRAINT FK_preguntas_diagnostico_categorias_skill_id_categoria FOREIGN KEY (id_categoria) REFERENCES public.categorias_skill(id_categoria)
);
CREATE TABLE public.respuestas_diagnostico (
  id_respuesta bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  id_diagnostico bigint NOT NULL,
  id_pregunta bigint NOT NULL,
  id_opcion bigint NOT NULL,
  CONSTRAINT respuestas_diagnostico_pkey PRIMARY KEY (id_respuesta),
  CONSTRAINT FK_respuestas_diagnostico_diagnosticos_id_diagnostico FOREIGN KEY (id_diagnostico) REFERENCES public.diagnosticos(id_diagnostico),
  CONSTRAINT FK_respuestas_diagnostico_opciones_pregunta_id_opcion FOREIGN KEY (id_opcion) REFERENCES public.opciones_pregunta(id_opcion),
  CONSTRAINT FK_respuestas_diagnostico_preguntas_diagnostico_id_pregunta FOREIGN KEY (id_pregunta) REFERENCES public.preguntas_diagnostico(id_pregunta)
);
CREATE TABLE public.resultados_diagnostico (
  id_resultado bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  id_diagnostico bigint NOT NULL,
  id_categoria bigint NOT NULL,
  puntaje_obtenido integer NOT NULL,
  puntaje_maximo integer NOT NULL,
  nivel character varying NOT NULL,
  recomendacion character varying NOT NULL,
  CONSTRAINT resultados_diagnostico_pkey PRIMARY KEY (id_resultado),
  CONSTRAINT FK_resultados_diagnostico_categorias_skill_id_categoria FOREIGN KEY (id_categoria) REFERENCES public.categorias_skill(id_categoria),
  CONSTRAINT FK_resultados_diagnostico_diagnosticos_id_diagnostico FOREIGN KEY (id_diagnostico) REFERENCES public.diagnosticos(id_diagnostico)
);
CREATE TABLE public.skills (
  id_skill bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nombre character varying NOT NULL,
  id_categoria bigint NOT NULL,
  descripcion character varying NOT NULL,
  CONSTRAINT skills_pkey PRIMARY KEY (id_skill),
  CONSTRAINT FK_skills_categorias_skill_id_categoria FOREIGN KEY (id_categoria) REFERENCES public.categorias_skill(id_categoria)
);
CREATE TABLE public.usuarios (
  id_usuario bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nombre text NOT NULL,
  apellido text NOT NULL,
  email text NOT NULL,
  contraseña text NOT NULL,
  tipo_usuario text NOT NULL,
  fecha_registro timestamp with time zone NOT NULL,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario)
);
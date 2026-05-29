"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Avatar } from "@/components/Avatar";
import {
  EmptyState,
  HeaderEmpresa,
  LoadingCards,
} from "@/components/empresa";

import {
  EstadoPostulacion,
  Postulacion,
} from "@/types/postulaciones.types";

import { usePostulacionesStore } from "@/store/postulaciones.store";

export default function EvaluacionesPage() {
  const params = useParams();

  const vacanteId = Number(params.id);

  const {
    postulaciones,
    loading,
    error,
    getPostulaciones,
    updateEstado,
  } = usePostulacionesStore();

  const [selectedEstado, setSelectedEstado] =
    useState<EstadoPostulacion>("en_proceso");

  const [feedback, setFeedback] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (vacanteId) {
      getPostulaciones(vacanteId);
    }
  }, [vacanteId, getPostulaciones]);

  const pendientes = useMemo(
    () =>
      postulaciones.filter(
        (p) =>
          p.estadoSeleccion === "aplicado" ||
          p.estadoSeleccion === "en_proceso"
      ),
    [postulaciones]
  );

  const enviadas = useMemo(
    () =>
      postulaciones.filter(
        (p) =>
          p.estadoSeleccion === "rechazado" ||
          p.estadoSeleccion === "seleccionado"
      ),
    [postulaciones]
  );

  const handleEnviarFeedback = async (
    postulacion: Postulacion
  ) => {
    try {
      setSaving(true);

      if (
        (selectedEstado === "rechazado" ||
          selectedEstado ===
            "seleccionado") &&
        !feedback.trim()
      ) {
        alert(
          "El feedback es obligatorio para este estado."
        );

        return;
      }

      await updateEstado(
        postulacion.id,
        selectedEstado,
        feedback.trim() || null
      );

      setFeedback("");
      setSelectedEstado("en_proceso");
    } catch (error) {
      console.error(error);

      alert(
        "No se pudo actualizar la postulación."
      );
    } finally {
      setSaving(false);
    }
  };

  const getBadgeVariant = (
    estado: EstadoPostulacion
  ) => {
    switch (estado) {
      case "seleccionado":
        return "green";

      case "rechazado":
        return "red";

      case "en_proceso":
        return "amber";

      default:
        return "gray";
    }
  };

  const getEstadoLabel = (
    estado: EstadoPostulacion
  ) => {
    switch (estado) {
      case "seleccionado":
        return "Preseleccionado";

      case "rechazado":
        return "No avanza";

      case "en_proceso":
        return "En evaluación";

      default:
        return "Pendiente";
    }
  };

  return (
    <>
      <HeaderEmpresa
        title="Retroalimentación"
        description="Evaluaciones estructuradas para el talento."
      />

      {loading && <LoadingCards />}

      {!loading && error && (
        <EmptyState
          title="Ocurrió un error"
          description={error}
        />
      )}

      {!loading &&
        !error &&
        postulaciones.length === 0 && (
          <EmptyState
            title="No hay postulaciones"
            description="Todavía no existen candidatos postulados para esta vacante."
          />
        )}

      {/* PENDIENTES */}
      {!loading &&
        pendientes.length > 0 && (
          <section className="space-y-4 mb-10">
            <p className="text-xs tracking-wider text-amber-accent font-medium">
              PENDIENTES
            </p>

            {pendientes.map((postulacion, index) => {
              const initials = `${postulacion.profesionalNombre
                ?.split(" ")[0]
                ?.charAt(0)}${
                postulacion.profesionalNombre
                  ?.split(" ")[1]
                  ?.charAt(0) || ""
              }`.toUpperCase();

              return (
                <div
                  key={postulacion.id}
                  className="bg-white border border-border-light rounded-xl p-6 space-y-6"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar
                        variant={
                          index % 2 === 0
                            ? "amber"
                            : "navy"
                        }
                      >
                        {initials}
                      </Avatar>

                      <div>
                        <h4 className="text-primary-navy">
                          {
                            postulacion.profesionalNombre
                          }
                        </h4>

                        <p className="text-text-secondary-light text-sm">
                          {
                            postulacion.profesionalEmail
                          }
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant={getBadgeVariant(
                        postulacion.estadoSeleccion
                      )}
                    >
                      {getEstadoLabel(
                        postulacion.estadoSeleccion
                      )}
                    </Badge>
                  </div>

                  {/* Estado */}
                  <div className="space-y-2">
                    <p className="text-sm text-primary-navy">
                      Estado del candidato
                    </p>

                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() =>
                          setSelectedEstado(
                            "seleccionado"
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedEstado ===
                          "seleccionado"
                            ? "bg-primary-navy text-white"
                            : "border border-border-light text-text-secondary-light"
                        }`}
                      >
                        Preseleccionado
                      </button>

                      <button
                        onClick={() =>
                          setSelectedEstado(
                            "en_proceso"
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedEstado ===
                          "en_proceso"
                            ? "bg-primary-navy text-white"
                            : "border border-border-light text-text-secondary-light"
                        }`}
                      >
                        En evaluación
                      </button>

                      <button
                        onClick={() =>
                          setSelectedEstado(
                            "rechazado"
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedEstado ===
                          "rechazado"
                            ? "bg-primary-navy text-white"
                            : "border border-border-light text-text-secondary-light"
                        }`}
                      >
                        No avanza
                      </button>
                    </div>
                  </div>

                  {/* Comentario */}
                  <div className="space-y-2">
                    <p className="text-sm text-primary-navy">
                      Comentario para el candidato
                    </p>

                    <textarea
                      value={feedback}
                      onChange={(e) =>
                        setFeedback(
                          e.target.value
                        )
                      }
                      className="w-full p-4 rounded-lg border border-border-light text-sm resize-none outline-none"
                      rows={4}
                      placeholder="Escribe un comentario constructivo que le ayude a mejorar su perfil..."
                    />
                  </div>

                  <p className="text-xs text-text-secondary-light">
                    El candidato recibirá este
                    comentario en su panel de
                    propuestas.
                  </p>

                  {/* Acciones */}
                  <div className="flex gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setFeedback("");
                        setSelectedEstado(
                          "en_proceso"
                        );
                      }}
                    >
                      Cancelar
                    </Button>

                    <Button
                      variant="primary"
                      disabled={saving}
                      onClick={() =>
                        handleEnviarFeedback(
                          postulacion
                        )
                      }
                    >
                      {saving
                        ? "Guardando..."
                        : "Enviar retroalimentación"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </section>
        )}

      {/* ENVIADAS */}
      {!loading &&
        enviadas.length > 0 && (
          <section className="space-y-4 mt-4">
            <p className="text-xs tracking-wider text-[#9E9E9E] font-medium">
              ENVIADAS
            </p>

            {enviadas.map(
              (postulacion, index) => {
                const initials = `${postulacion.profesionalNombre
                  ?.split(" ")[0]
                  ?.charAt(0)}${
                  postulacion.profesionalNombre
                    ?.split(" ")[1]
                    ?.charAt(0) || ""
                }`.toUpperCase();

                return (
                  <div
                    key={postulacion.id}
                    className="bg-white border border-border-light rounded-xl p-6 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <Avatar
                          variant={
                            index % 2 === 0
                              ? "amber"
                              : "navy"
                          }
                        >
                          {initials}
                        </Avatar>

                        <div>
                          <h4 className="text-primary-navy">
                            {
                              postulacion.profesionalNombre
                            }
                          </h4>

                          <p className="text-text-secondary-light text-sm">
                            {
                              postulacion.profesionalEmail
                            }
                          </p>
                        </div>
                      </div>

                      <Badge
                        variant={getBadgeVariant(
                          postulacion.estadoSeleccion
                        )}
                      >
                        {getEstadoLabel(
                          postulacion.estadoSeleccion
                        )}
                      </Badge>
                    </div>

                    <div className="bg-light-bg border border-border-light rounded-lg p-4 text-sm text-text-secondary-light italic">
                      {postulacion.feedbackEmpresa}
                    </div>
                  </div>
                );
              }
            )}
          </section>
        )}
    </>
  );
}
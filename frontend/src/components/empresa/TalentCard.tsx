import { BriefcaseBusiness } from "lucide-react";
import { TalentProfile } from "../../../types";
import { Linkedin } from "@/components/icons/Linkedin";

interface Props {
  talent: TalentProfile;
}

export const TalentCard = ({ talent }: Props) => {
  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        p-5
        shadow-sm
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {talent.nombre} {talent.apellido}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {talent.titular}
          </p>
        </div>

        <a
          href={talent.urlLinkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          <Linkedin size={20} />
        </a>
      </div>

      <p className="text-sm text-gray-600 mt-4 leading-relaxed">
        {talent.biografia}
      </p>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          Skills
        </h4>

        <div className="flex flex-wrap gap-2">
          {talent.skills.map((skill) => (
            <span
              key={skill.id}
              className="
                px-2
                py-1
                bg-gray-100
                rounded-lg
                text-xs
                text-gray-700
              "
            >
              {skill.skillNombre} · {skill.nivel}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Experiencia reciente
        </h4>

        <div className="space-y-3">
          {talent.experiencias.slice(0, 2).map((exp) => (
            <div
              key={exp.id}
              className="flex gap-3 items-start"
            >
              <div className="mt-1">
                <BriefcaseBusiness size={16} />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  {exp.cargo}
                </p>

                <p className="text-xs text-gray-500">
                  {exp.empresa}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
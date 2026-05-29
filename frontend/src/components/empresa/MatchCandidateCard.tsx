
import { MatchCandidate } from "../../../types";
import { Linkedin } from "../icons/Linkedin";

import { MatchBadge } from "./MatchBadge";
import { SkillsList } from "./SkillsList";

interface Props {
  candidate: MatchCandidate;
}

export const MatchCandidateCard = ({ candidate }: Props) => {
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
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {candidate.nombre} {candidate.apellido}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {candidate.titular}
          </p>
        </div>

        <MatchBadge percentage={candidate.porcentajeMatch} />
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Linkedin size={16} className="text-blue-600" />

        <a
          href={candidate.urlLinkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          Ver LinkedIn
        </a>
      </div>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-gray-900">          Skills coincidentes
        </h4>

        <SkillsList
          skills={candidate.skillsCoincidentes}
          variant="success"
        />
      </div>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-gray-900">
          Skills faltantes
        </h4>

        <SkillsList
          skills={candidate.skillsFaltantes}
          variant="danger"
        />
      </div>
    </div>
  );
};
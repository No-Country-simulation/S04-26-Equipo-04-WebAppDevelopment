import { MatchCandidate } from "../../../types";
import { Linkedin } from "@/components/icons/Linkedin";
import { MatchBadge } from "@/components/empresa";
import { SkillsList } from "@/components/empresa";
import { Button } from "../Button";

interface Props {
  candidate: MatchCandidate;
}

export const MatchCandidateCard = ({ candidate }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between gap-4">
        <div>
          <h4 className="text-text-primary-light font-medium text-base test-sm">
            {candidate.nombre} {candidate.apellido}
          </h4>
          <p className="text-text-secondary-light text-sm">{candidate.titular}</p>
        </div>
        <MatchBadge percentage={candidate.porcentajeMatch} />
      </div>
      <div className="flex justify-between items-end">
        <div>
          {candidate.skillsCoincidentes.length > 0 && (
            <div className="mt-5">
              <p className="text-primary-navy text-sm">Skills coincidentes</p>
              <SkillsList skills={candidate.skillsCoincidentes} variant="success" />
            </div>
          )}
          {candidate.skillsFaltantes.length > 0 && (
            <div className="mt-5">
              <p className="text-primary-navy text-sm">Skills faltantes</p>
              <SkillsList skills={candidate.skillsFaltantes} variant="danger" />
            </div>
          )}
        </div>
        <Button variant="ghost" className="">
          <Linkedin size={16} />
          Ver LinkedIn
        </Button>
      </div>
    </div>
  );
};

import type { CvProfileData } from "./types";
import {
  EducationSection,
  ExperienceTimeline,
  ProfileHero,
  ProfileSidebar,
  ProfileWorkspaceSidebar,
  SkillsPanel,
} from "./sections";

type Props = {
  profile: CvProfileData;
};

export default function CVPublicView({ profile }: Props) {
  return (
    <div className="bg-background px-4 pb-12 pt-24 md:px-8 lg:ml-64">
      <ProfileWorkspaceSidebar profile={profile} />
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <ProfileHero profile={profile} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="space-y-6 md:col-span-8">
            <article className="rounded-xl border border-slate-100 bg-white p-8 shadow-[0_4px_20px_rgba(26,43,75,0.08)]">
              <h2 className="mb-4 text-2xl font-semibold text-primary">Resumen Ejecutivo</h2>
              <p className="leading-relaxed text-on-surface-variant">
                {profile.summary.executiveSummary}
              </p>
            </article>
            <ExperienceTimeline profile={profile} />
            <EducationSection profile={profile} />
          </div>

          <div className="md:col-span-4">
            <ProfileSidebar profile={profile} />
          </div>
        </div>

        <SkillsPanel profile={profile} />
      </div>
    </div>
  );
}

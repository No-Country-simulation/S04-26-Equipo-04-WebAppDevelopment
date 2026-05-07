import {
  AudienceSection,
  FinalCtaSection,
  HeroSection,
  JourneySection,
  ProblemSection,
  SolutionsSection,
  StatsSection,
} from "./sections";

export default function LandingMain() {
  return (
    <div>
      <HeroSection />
      <ProblemSection />
      <SolutionsSection />
      <JourneySection />
      <AudienceSection />
      <StatsSection />
      <FinalCtaSection />
    </div>
  );
}

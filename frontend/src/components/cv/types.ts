export type ProfileAvailability = {
  mode: string;
  schedule: string;
};

export type ProfileSummary = {
  fullName: string;
  role: string;
  location: string;
  avatar: string;
  coverGradient: string;
  executiveSummary: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  highlights: string;
  isCurrent?: boolean;
};

export type SkillCategory = "leadership" | "digital";

export type SkillItem = {
  name: string;
  levelLabel: string;
  percentage: number;
  category: SkillCategory;
};

export type BadgeItem = {
  title: string;
  subtitle: string;
};

export type EducationItem = {
  title: string;
  institution: string;
  period: string;
};

export type CvProfileData = {
  slug: string;
  summary: ProfileSummary;
  availability: ProfileAvailability;
  interestSectors: string[];
  marketReadiness: {
    score: number;
    trend: string;
    description: string;
  };
  experience: ExperienceItem[];
  skills: SkillItem[];
  badges: BadgeItem[];
  education: EducationItem[];
};

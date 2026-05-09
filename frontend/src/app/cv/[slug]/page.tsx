import type { Metadata } from "next";
import CVPublicView from "@/components/cv/CVPublicView";
import { getCvProfileBySlug } from "@/components/cv/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getCvProfileBySlug(slug);

  return {
    title: `${profile.summary.fullName} | TalentRenew`,
    description: `Currículum público de ${profile.summary.fullName}: ${profile.summary.role}`,
  };
}

export default async function CVPublicPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = getCvProfileBySlug(slug);

  return <CVPublicView profile={profile} />;
}

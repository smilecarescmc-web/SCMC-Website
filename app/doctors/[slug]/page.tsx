import { notFound } from "next/navigation";
import { getDoctorBySlug, getDoctors } from "@/sanity/lib/fetchers";
import { OfficialDoctorPage } from "@/components/OfficialDoctorPage";
import { getScmcMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const doctors = await getDoctors();
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) return {};

  return getScmcMetadata({
    title: `${doctor.nameEn} | Smile Care Medical Center`,
    description: doctor.noteEn,
  });
}

export default async function DynamicDoctorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) notFound();

  return <OfficialDoctorPage slug={slug} initialDoctor={doctor} />;
}

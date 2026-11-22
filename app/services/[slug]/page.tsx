import { notFound } from "next/navigation";
import { getServiceByKey, getServices } from "@/sanity/lib/fetchers";
import { ServicePage } from "@/components/ServicePage";
import { getScmcMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceByKey(slug);
  if (!service) return {};

  return getScmcMetadata({
    title: `${service.title} | Smile Care Medical Center`,
    description: service.description,
  });
}

export default async function DynamicServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceByKey(slug);
  if (!service) notFound();

  return <ServicePage service={service} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import V21RecoveredPage from "@/components/v21/V21RecoveredPage";
import {
  getV21Page,
  getV21Pages,
  pathToParams,
} from "@/lib/v21-content";

type Props = {
  params: Promise<{ slug: string[] }>;
};

function routePath(slug: string[]) {
  return `/${slug.join("/")}/`;
}

export function generateStaticParams() {
  return getV21Pages()
    .filter((page) => page.path !== "/")
    .map((page) => ({
      slug: pathToParams(page.path),
    }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getV21Page(routePath(slug));

  if (!page) return {};

  return {
    title: page.title,
    description: page.description || undefined,
    alternates: {
      canonical: page.canonical || undefined,
      languages: {
        ...(page.enAlternate ? { en: page.enAlternate } : {}),
        ...(page.arAlternate ? { ar: page.arAlternate } : {}),
      },
    },
  };
}

export default async function V21Route({ params }: Props) {
  const { slug } = await params;
  const page = getV21Page(routePath(slug));

  if (!page) notFound();

  return <V21RecoveredPage page={page} />;
}
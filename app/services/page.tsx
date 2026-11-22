import { getServices } from "@/sanity/lib/fetchers";
import { ServicesClientView } from "@/components/ServicesClientView";

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesClientView services={services} />;
}

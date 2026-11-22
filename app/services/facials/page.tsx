import { ServicePage } from "@/components/ServicePage";
import { getServiceByKey } from "@/sanity/lib/fetchers";

export const revalidate = 60;

export default async function Page() {
  const service = await getServiceByKey("facials");
  return <ServicePage service={service} />;
}

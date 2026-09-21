import { ServicePage } from "@/components/ServicePage";
import { getService } from "@/lib/scmcFullData";
export default function Page() { return <ServicePage service={getService("dermatology")} />; }
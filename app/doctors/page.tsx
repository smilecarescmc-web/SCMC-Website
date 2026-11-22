import { getDoctors } from "@/sanity/lib/fetchers";
import { DoctorsClientView } from "@/components/DoctorsClientView";

export const revalidate = 60;

export default async function DoctorsPage() {
  const doctors = await getDoctors();
  return <DoctorsClientView doctors={doctors} />;
}

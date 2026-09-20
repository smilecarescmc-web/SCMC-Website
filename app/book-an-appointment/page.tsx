import { redirect } from "next/navigation";

export default function BookAppointmentRedirect() {
  redirect("/contact#appointment");
}
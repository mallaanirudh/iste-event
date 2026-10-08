import type { Metadata } from "next";
import RegistrationsView from "./RegistrationsView";

export const metadata: Metadata = { title: "Registrations" };

export default function Page() {
  return <RegistrationsView />;
}

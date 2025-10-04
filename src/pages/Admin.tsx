import { AppShell } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { EmptyState } from "@/components/EmptyState";
import { Settings } from "lucide-react";

export default function Admin() {
  return (
    <AppShell>
      <SectionHeader
        title="Administration"
        description="Configuration et gestion du portail"
      />
      <EmptyState
        icon={Settings}
        title="Module Administration"
        description="Gestion des utilisateurs, rôles, et paramètres système à venir"
      />
    </AppShell>
  );
}

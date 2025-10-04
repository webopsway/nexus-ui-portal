import { AppShell } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { EmptyState } from "@/components/EmptyState";
import { Shield } from "lucide-react";

export default function Security() {
  return (
    <AppShell>
      <SectionHeader
        title="Sécurité"
        description="Gestion des vulnérabilités et conformité"
      />
      <EmptyState
        icon={Shield}
        title="Module Sécurité"
        description="Surveillance des vulnérabilités, gestion des CVE et conformité à venir"
      />
    </AppShell>
  );
}

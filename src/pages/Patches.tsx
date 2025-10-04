import { AppShell } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { EmptyState } from "@/components/EmptyState";
import { PackageCheck } from "lucide-react";

export default function Patches() {
  return (
    <AppShell>
      <SectionHeader
        title="Patchs"
        description="Gestion des mises à jour et correctifs"
      />
      <EmptyState
        icon={PackageCheck}
        title="Module Patchs"
        description="Planification et déploiement automatisé des patchs système à venir"
      />
    </AppShell>
  );
}

import { AppShell } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { DataTable, Column } from "@/components/DataTable";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Application {
  id: string;
  name: string;
  type: string;
  url: string;
  service: string;
  version: string;
  status: string;
}

const applications: Application[] = [];

const columns: Column<Application>[] = [
  { key: "name", label: "Nom", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "url", label: "URL / Endpoint", sortable: true },
  { key: "service", label: "Service", sortable: true },
  { key: "version", label: "Version", sortable: true },
  {
    key: "status",
    label: "Statut",
    render: (app) => (
      <Tag variant={app.status === "Production" ? "success" : "info"}>
        {app.status}
      </Tag>
    ),
  },
];

export default function Applications() {
  return (
    <AppShell>
      <div className="space-y-6">
        <SectionHeader
          title="Applications"
          description="Catalogue des applications déployées"
          actions={
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle application
            </Button>
          }
        />

        <DataTable
          data={applications}
          columns={columns}
          keyExtractor={(app) => app.id}
        />
      </div>
    </AppShell>
  );
}

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

const applications: Application[] = [
  { id: "1", name: "Customer Portal", type: "Web", url: "portal.example.com", service: "Web Application", version: "2.4.1", status: "Production" },
  { id: "2", name: "Admin Dashboard", type: "Web", url: "admin.example.com", service: "Web Application", version: "1.8.3", status: "Production" },
  { id: "3", name: "Mobile API", type: "API", url: "api.example.com", service: "API Gateway", version: "3.2.0", status: "Production" },
  { id: "4", name: "Analytics Service", type: "Service", url: "analytics.internal", service: "Database Services", version: "1.5.2", status: "Staging" },
  { id: "5", name: "Notification Service", type: "Service", url: "notify.internal", service: "Email Service", version: "2.1.0", status: "Production" },
];

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

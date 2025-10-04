import { AppShell } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { DataTable, Column } from "@/components/DataTable";
import { Tag } from "@/components/Tag";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface BackupJob {
  id: string;
  name: string;
  target: string;
  schedule: string;
  retention: string;
  lastRun: string;
  status: string;
}

interface BackupExecution {
  id: string;
  job: string;
  started: string;
  duration: string;
  size: string;
  status: string;
}

const backupJobs: BackupJob[] = [];

const backupExecutions: BackupExecution[] = [];

const jobColumns: Column<BackupJob>[] = [
  { key: "name", label: "Nom", sortable: true },
  { key: "target", label: "Cible", sortable: true },
  { key: "schedule", label: "Planification" },
  { key: "retention", label: "Rétention" },
  { key: "lastRun", label: "Dernière exécution", sortable: true },
  {
    key: "status",
    label: "Statut",
    render: (job) => (
      <Tag variant={job.status === "Succès" ? "success" : "danger"}>
        {job.status}
      </Tag>
    ),
  },
];

const executionColumns: Column<BackupExecution>[] = [
  { key: "job", label: "Job", sortable: true },
  { key: "started", label: "Début", sortable: true },
  { key: "duration", label: "Durée" },
  { key: "size", label: "Taille" },
  {
    key: "status",
    label: "Statut",
    render: (exec) => (
      <Tag variant={exec.status === "Succès" ? "success" : "danger"}>
        {exec.status}
      </Tag>
    ),
  },
];

export default function Backups() {
  return (
    <AppShell>
      <div className="space-y-6">
        <SectionHeader
          title="Backups"
          description="Gestion des sauvegardes et restaurations"
          actions={
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nouveau job
            </Button>
          }
        />

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">Jobs de backup</TabsTrigger>
            <TabsTrigger value="executions">Exécutions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs" className="space-y-4">
            <DataTable
              data={backupJobs}
              columns={jobColumns}
              keyExtractor={(job) => job.id}
            />
          </TabsContent>
          
          <TabsContent value="executions" className="space-y-4">
            <DataTable
              data={backupExecutions}
              columns={executionColumns}
              keyExtractor={(exec) => exec.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { SectionHeader } from "@/components/SectionHeader";
import { DataTable, Column } from "@/components/DataTable";
import { Tag } from "@/components/Tag";
import { Ticket, Shield, HardDrive, PackageCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentTicket {
  id: string;
  type: string;
  status: string;
  priority: string;
  title: string;
  updated: string;
}

interface SecurityAlert {
  id: string;
  severity: string;
  cve: string;
  asset: string;
  description: string;
}

const recentTickets: RecentTicket[] = [];

const securityAlerts: SecurityAlert[] = [];

const ticketColumns: Column<RecentTicket>[] = [
  { key: "id", label: "ID", sortable: true },
  { key: "type", label: "Type", sortable: true },
  {
    key: "status",
    label: "Statut",
    render: (ticket) => (
      <Tag variant={ticket.status === "Résolu" ? "success" : ticket.status === "En cours" ? "info" : "neutral"}>
        {ticket.status}
      </Tag>
    ),
  },
  {
    key: "priority",
    label: "Priorité",
    render: (ticket) => (
      <Tag variant={ticket.priority === "Critique" ? "danger" : ticket.priority === "Haute" ? "warning" : "neutral"}>
        {ticket.priority}
      </Tag>
    ),
  },
  { key: "title", label: "Titre" },
  { key: "updated", label: "Mise à jour" },
];

const alertColumns: Column<SecurityAlert>[] = [
  {
    key: "severity",
    label: "Sévérité",
    render: (alert) => (
      <Tag variant={alert.severity === "Critique" ? "danger" : alert.severity === "Élevée" ? "warning" : "info"}>
        {alert.severity}
      </Tag>
    ),
  },
  { key: "cve", label: "CVE", sortable: true },
  { key: "asset", label: "Asset", sortable: true },
  { key: "description", label: "Description" },
];

export default function Dashboard() {
  return (
    <AppShell>
      <div className="space-y-8">
        <SectionHeader
          title="Dashboard"
          description="Vue d'ensemble de votre infrastructure"
        />

        {/* KPIs */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Tickets ouverts"
            value={0}
            icon={Ticket}
          />
          <StatCard
            title="Assets patchés"
            value="0%"
            icon={PackageCheck}
          />
          <StatCard
            title="Backups OK"
            value="0%"
            icon={HardDrive}
          />
          <StatCard
            title="Vulnérabilités critiques"
            value={0}
            icon={AlertTriangle}
          />
          <StatCard
            title="Services disponibles"
            value="0%"
            icon={CheckCircle2}
          />
          <StatCard
            title="Alertes sécurité"
            value={0}
            icon={Shield}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tickets récents</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={recentTickets}
                columns={ticketColumns}
                keyExtractor={(ticket) => ticket.id}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alertes sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={securityAlerts}
                columns={alertColumns}
                keyExtractor={(alert) => alert.id}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

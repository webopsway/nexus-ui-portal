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

const recentTickets: RecentTicket[] = [
  { id: "TKT-1234", type: "Incident", status: "Ouvert", priority: "Haute", title: "Serveur web inaccessible", updated: "Il y a 5 min" },
  { id: "TKT-1235", type: "Demande", status: "En cours", priority: "Moyenne", title: "Ajout utilisateur AD", updated: "Il y a 15 min" },
  { id: "TKT-1236", type: "Incident", status: "Résolu", priority: "Critique", title: "Base de données corrompue", updated: "Il y a 1h" },
];

const securityAlerts: SecurityAlert[] = [
  { id: "1", severity: "Critique", cve: "CVE-2024-1234", asset: "web-app-01", description: "Vulnérabilité XSS détectée" },
  { id: "2", severity: "Élevée", cve: "CVE-2024-5678", asset: "api-gateway", description: "Injection SQL possible" },
  { id: "3", severity: "Moyenne", cve: "CVE-2024-9101", asset: "mail-server", description: "Dépendance obsolète" },
];

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
            value={24}
            icon={Ticket}
            trend={{ value: 12, isPositive: false }}
          />
          <StatCard
            title="Assets patchés"
            value="87%"
            icon={PackageCheck}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Backups OK"
            value="98.5%"
            icon={HardDrive}
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Vulnérabilités critiques"
            value={7}
            icon={AlertTriangle}
          />
          <StatCard
            title="Services disponibles"
            value="99.9%"
            icon={CheckCircle2}
            trend={{ value: 0.1, isPositive: true }}
          />
          <StatCard
            title="Alertes sécurité"
            value={15}
            icon={Shield}
            trend={{ value: 8, isPositive: false }}
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

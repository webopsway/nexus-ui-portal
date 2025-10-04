import { AppShell } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { DataTable, Column } from "@/components/DataTable";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Ticket {
  id: string;
  type: string;
  status: string;
  priority: string;
  target: string;
  title: string;
  assignee: string;
  updated: string;
}

const tickets: Ticket[] = [];

const columns: Column<Ticket>[] = [
  { key: "id", label: "ID", sortable: true },
  { key: "type", label: "Type", sortable: true },
  {
    key: "status",
    label: "Statut",
    sortable: true,
    render: (ticket) => (
      <Tag variant={
        ticket.status === "Résolu" ? "success" :
        ticket.status === "En cours" ? "info" :
        "neutral"
      }>
        {ticket.status}
      </Tag>
    ),
  },
  {
    key: "priority",
    label: "Priorité",
    sortable: true,
    render: (ticket) => (
      <Tag variant={
        ticket.priority === "Critique" ? "danger" :
        ticket.priority === "Haute" ? "warning" :
        "neutral"
      }>
        {ticket.priority}
      </Tag>
    ),
  },
  { key: "target", label: "Cible", sortable: true },
  { key: "title", label: "Titre" },
  { key: "assignee", label: "Assigné à", sortable: true },
  { key: "updated", label: "Mise à jour", sortable: true },
];

export default function Tickets() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="space-y-6">
        <SectionHeader
          title="Tickets"
          description="Gestion des incidents et demandes"
          actions={
            <>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouveau ticket
              </Button>
            </>
          }
        />

        <DataTable
          data={tickets}
          columns={columns}
          keyExtractor={(ticket) => ticket.id}
          onRowClick={(ticket) => navigate(`/tickets/${ticket.id}`)}
        />
      </div>
    </AppShell>
  );
}

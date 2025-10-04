import { AppShell } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { DataTable, Column } from "@/components/DataTable";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Document {
  id: string;
  title: string;
  category: string;
  author: string;
  updated: string;
  status: string;
}

const documents: Document[] = [];

const columns: Column<Document>[] = [
  {
    key: "title",
    label: "Titre",
    sortable: true,
    render: (doc) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span>{doc.title}</span>
      </div>
    ),
  },
  {
    key: "category",
    label: "Catégorie",
    sortable: true,
    render: (doc) => <Tag variant="info">{doc.category}</Tag>,
  },
  { key: "author", label: "Auteur", sortable: true },
  { key: "updated", label: "Mise à jour", sortable: true },
  {
    key: "status",
    label: "Statut",
    render: (doc) => (
      <Tag
        variant={
          doc.status === "Publié" ? "success" :
          doc.status === "Brouillon" ? "neutral" :
          "warning"
        }
      >
        {doc.status}
      </Tag>
    ),
  },
];

export default function Docs() {
  return (
    <AppShell>
      <div className="space-y-6">
        <SectionHeader
          title="Documentation"
          description="Base de connaissances et procédures"
          actions={
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nouveau document
            </Button>
          }
        />

        <div className="flex gap-4">
          <Input
            placeholder="Rechercher dans la documentation..."
            className="max-w-md"
          />
        </div>

        <DataTable
          data={documents}
          columns={columns}
          keyExtractor={(doc) => doc.id}
        />
      </div>
    </AppShell>
  );
}

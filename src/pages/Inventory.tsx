import { AppShell } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { DataTable, Column } from "@/components/DataTable";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  provider: string;
  type: string;
  region: string;
  status: string;
  tags: string[];
}

const assets: Asset[] = [];

const columns: Column<Asset>[] = [
  { key: "name", label: "Nom", sortable: true },
  { key: "provider", label: "Provider", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "region", label: "Région", sortable: true },
  {
    key: "status",
    label: "Statut",
    render: (asset) => (
      <Tag variant={asset.status === "Running" ? "success" : "neutral"}>
        {asset.status}
      </Tag>
    ),
  },
  {
    key: "tags",
    label: "Tags",
    render: (asset) => (
      <div className="flex gap-1 flex-wrap">
        {asset.tags.map((tag) => (
          <Tag key={tag} variant="info" className="text-xs">
            {tag}
          </Tag>
        ))}
      </div>
    ),
  },
];

export default function Inventory() {
  return (
    <AppShell>
      <div className="space-y-6">
        <SectionHeader
          title="Inventaire"
          description="Vue d'ensemble de vos assets cloud"
          actions={
            <Button className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Lancer inventaire
            </Button>
          }
        />

        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border">
          <Database className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="font-medium">Total des assets</p>
            <p className="text-sm text-muted-foreground">
              {assets.length} ressources découvertes
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Dernière synchronisation</p>
            <p className="font-medium">Jamais</p>
          </div>
        </div>

        <DataTable
          data={assets}
          columns={columns}
          keyExtractor={(asset) => asset.id}
        />
      </div>
    </AppShell>
  );
}

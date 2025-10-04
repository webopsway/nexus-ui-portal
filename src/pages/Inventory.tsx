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

const assets: Asset[] = [
  { id: "1", name: "web-server-01", provider: "AWS", type: "EC2", region: "eu-west-1", status: "Running", tags: ["production", "web"] },
  { id: "2", name: "db-prod-01", provider: "AWS", type: "RDS", region: "eu-west-1", status: "Running", tags: ["production", "database"] },
  { id: "3", name: "app-staging", provider: "Azure", type: "VM", region: "westeurope", status: "Stopped", tags: ["staging", "app"] },
  { id: "4", name: "lb-prod", provider: "AWS", type: "ALB", region: "eu-west-1", status: "Running", tags: ["production", "loadbalancer"] },
  { id: "5", name: "cache-redis", provider: "AWS", type: "ElastiCache", region: "eu-west-1", status: "Running", tags: ["production", "cache"] },
];

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
            <p className="font-medium">Il y a 2 heures</p>
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

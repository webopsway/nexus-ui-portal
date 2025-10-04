import { AppShell } from "@/components/AppShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  sla: string;
  rto: string;
  rpo: string;
  status: string;
  maintenance: string;
}

const services: Service[] = [];

export default function Services() {
  return (
    <AppShell>
      <div className="space-y-6">
        <SectionHeader
          title="Services"
          description="Catalogue des services managés"
          actions={
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nouveau service
            </Button>
          }
        />

        {services.length === 0 ? (
          <div className="py-12">
            <p className="text-center text-muted-foreground">Aucun service disponible</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <Tag variant={service.status === "Opérationnel" ? "success" : "warning"}>
                    {service.status}
                  </Tag>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">SLA</p>
                      <p className="font-semibold">{service.sla}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">RTO</p>
                      <p className="font-semibold">{service.rto}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">RPO</p>
                      <p className="font-semibold">{service.rpo}</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">Fenêtre de maintenance</p>
                    <p className="text-sm font-medium">{service.maintenance}</p>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    Voir détails
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

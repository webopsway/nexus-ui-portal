import { Check, ChevronsUpDown, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useTenant } from "@/contexts/TenantContext";
import { cn } from "@/lib/utils";

const mockOrganizations: { id: string; name: string }[] = [];

const mockTeams: { id: string; name: string }[] = [];

export function TenantSelector() {
  const { organizationId, organizationName, teamId, teamName, setOrganization, setTeam } = useTenant();
  const [openOrg, setOpenOrg] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);

  return (
    <div className="space-y-2 p-4 border-b border-sidebar-border">
      {/* Organization Selector */}
      <Popover open={openOrg} onOpenChange={setOpenOrg}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openOrg}
            className="w-full justify-between h-10 bg-sidebar hover:bg-sidebar-accent"
          >
            <div className="flex items-center gap-2 truncate">
              <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{organizationName || "Organisation..."}</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0 bg-popover">
          <Command>
            <CommandInput placeholder="Rechercher organisation..." />
            <CommandEmpty>Aucune organisation trouvée.</CommandEmpty>
            <CommandGroup>
              {mockOrganizations.map((org) => (
                <CommandItem
                  key={org.id}
                  value={org.name}
                  onSelect={() => {
                    setOrganization(org.id, org.name);
                    setOpenOrg(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      organizationId === org.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {org.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Team Selector */}
      <Popover open={openTeam} onOpenChange={setOpenTeam}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openTeam}
            className="w-full justify-between h-10 bg-sidebar hover:bg-sidebar-accent"
            disabled={!organizationId}
          >
            <div className="flex items-center gap-2 truncate">
              <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{teamName || "Équipe..."}</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0 bg-popover">
          <Command>
            <CommandInput placeholder="Rechercher équipe..." />
            <CommandEmpty>Aucune équipe trouvée.</CommandEmpty>
            <CommandGroup>
              {mockTeams.map((team) => (
                <CommandItem
                  key={team.id}
                  value={team.name}
                  onSelect={() => {
                    setTeam(team.id, team.name);
                    setOpenTeam(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      teamId === team.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {team.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

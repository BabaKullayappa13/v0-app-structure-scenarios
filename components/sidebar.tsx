"use client"

import { cn } from "@/lib/utils"
import type { Scenario } from "@/app/page"
import { 
  LayoutDashboard, 
  Puzzle, 
  Clock, 
  Users, 
  TrendingUp,
  ChevronRight,
  BarChart3
} from "lucide-react"

interface SidebarProps {
  activeScenario: Scenario
  onSelectScenario: (scenario: Scenario) => void
}

const scenarios = [
  {
    id: "overview" as Scenario,
    label: "Scenario Overview",
    icon: LayoutDashboard,
    color: "text-primary"
  },
  {
    id: "integration" as Scenario,
    label: "Integration Friction",
    icon: Puzzle,
    color: "text-scenario-1",
    badge: "S1"
  },
  {
    id: "time" as Scenario,
    label: "Time & Change",
    icon: Clock,
    color: "text-scenario-2",
    badge: "S2"
  },
  {
    id: "behavior" as Scenario,
    label: "User Behavior",
    icon: Users,
    color: "text-scenario-3",
    badge: "S3"
  },
  {
    id: "scale" as Scenario,
    label: "Scale & Growth",
    icon: TrendingUp,
    color: "text-scenario-4",
    badge: "S4"
  },
  {
    id: "dashboard" as Scenario,
    label: "Analytics Dashboard",
    icon: BarChart3,
    color: "text-primary"
  }
]

export function Sidebar({ activeScenario, onSelectScenario }: SidebarProps) {
  return (
    <aside className="w-64 h-[calc(100vh-3.5rem)] bg-sidebar border-r border-sidebar-border fixed left-0 top-14 overflow-y-auto">
      <div className="p-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Scenarios
        </h3>
        <nav className="space-y-1">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                activeScenario === scenario.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <scenario.icon className={cn("w-5 h-5", scenario.color)} />
              <span className="flex-1 text-left">{scenario.label}</span>
              {scenario.badge && (
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded",
                  activeScenario === scenario.id ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-secondary text-secondary-foreground"
                )}>
                  {scenario.badge}
                </span>
              )}
              {activeScenario === scenario.id && (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border mt-4">
        <div className="bg-sidebar-accent rounded-lg p-4">
          <h4 className="text-sm font-medium text-sidebar-foreground mb-2">Assessment Progress</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Overall Completion</span>
              <span className="text-primary font-medium">68%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-[68%] bg-primary rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

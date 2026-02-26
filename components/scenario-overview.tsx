"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Scenario } from "@/app/page"
import { 
  Puzzle, 
  Clock, 
  Users, 
  TrendingUp, 
  ArrowRight,
  AlertTriangle,
  Lightbulb
} from "lucide-react"

interface ScenarioOverviewProps {
  onSelectScenario: (scenario: Scenario) => void
}

const scenarios = [
  {
    id: "integration" as Scenario,
    number: 1,
    title: "Integration Friction Problem",
    description: "New capabilities depend on data access and workflows embedded in legacy systems. Integration efforts are slow, fragile, and highly sensitive to legacy constraints.",
    thinkPrompt: "How should a system identify which legacy dependencies most severely constrain agility and prioritize them without attempting risky, large-scale replacement?",
    icon: Puzzle,
    color: "bg-scenario-1",
    textColor: "text-scenario-1",
    riskLevel: "High",
    impactScore: 85
  },
  {
    id: "time" as Scenario,
    number: 2,
    title: "Time and Change Expectation Issue",
    description: "Business stakeholders expect delivery speed comparable to modern digital platforms. Legacy change cycles remain long, opaque, and difficult to predict.",
    thinkPrompt: "How should a system evaluate and communicate realistic delivery timelines when legacy constraints dominate execution paths?",
    icon: Clock,
    color: "bg-scenario-2",
    textColor: "text-scenario-2",
    riskLevel: "Medium",
    impactScore: 72
  },
  {
    id: "behavior" as Scenario,
    number: 3,
    title: "User Behavior and Edge Cases",
    description: "Teams create external tools, scripts, or shadow systems to bypass slow legacy processes. Over time, fragmentation, inconsistency, and hidden risk accumulate.",
    thinkPrompt: "How should a system detect and respond to repeated bypass behavior without suppressing productivity or increasing operational exposure?",
    icon: Users,
    color: "bg-scenario-3",
    textColor: "text-scenario-3",
    riskLevel: "High",
    impactScore: 78
  },
  {
    id: "scale" as Scenario,
    number: 4,
    title: "Scale and Growth",
    description: "During modernization, legacy and modern systems must coexist for extended periods. Architectural complexity increases before any simplification benefits are realized.",
    thinkPrompt: "How should a system adapt decision-making and governance when hybrid architectures become the operational norm rather than a transitional exception?",
    icon: TrendingUp,
    color: "bg-scenario-4",
    textColor: "text-scenario-4",
    riskLevel: "Medium",
    impactScore: 65
  }
]

export function ScenarioOverview({ onSelectScenario }: ScenarioOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Legacy Modernization Scenarios</h1>
          <p className="text-muted-foreground mt-1">
            Assess and manage challenges across four critical modernization scenarios
          </p>
        </div>
        <Button onClick={() => onSelectScenario("dashboard")}>
          View Analytics
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <Card 
            key={scenario.id} 
            className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={() => onSelectScenario(scenario.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${scenario.color} flex items-center justify-center`}>
                    <scenario.icon className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <Badge variant="outline" className={`${scenario.textColor} border-current mb-1`}>
                      Scenario {scenario.number}
                    </Badge>
                    <CardTitle className="text-lg text-foreground">{scenario.title}</CardTitle>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                {scenario.description}
              </CardDescription>
              
              <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-scenario-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground italic">
                    {scenario.thinkPrompt}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${scenario.riskLevel === "High" ? "text-scenario-1" : "text-scenario-2"}`} />
                  <span className="text-xs text-muted-foreground">
                    Risk: <span className={scenario.riskLevel === "High" ? "text-scenario-1" : "text-scenario-2"}>{scenario.riskLevel}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Impact Score:</span>
                  <span className={`text-sm font-semibold ${scenario.textColor}`}>{scenario.impactScore}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

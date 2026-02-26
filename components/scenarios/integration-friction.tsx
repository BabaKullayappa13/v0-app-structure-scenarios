"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { 
  Puzzle, 
  Plus,
  AlertCircle,
  CheckCircle,
  Circle,
  ArrowUpRight,
  TrendingDown,
  Database,
  Server,
  Link2
} from "lucide-react"

interface Dependency {
  id: string
  name: string
  type: string
  agilityImpact: number
  replacementRisk: number
  priority: "critical" | "high" | "medium" | "low"
  status: "assessed" | "in-progress" | "pending"
}

const initialDependencies: Dependency[] = [
  { id: "1", name: "Customer Data API", type: "Data Access", agilityImpact: 92, replacementRisk: 85, priority: "critical", status: "assessed" },
  { id: "2", name: "Order Processing Workflow", type: "Workflow", agilityImpact: 78, replacementRisk: 72, priority: "high", status: "in-progress" },
  { id: "3", name: "Inventory Sync Service", type: "Integration", agilityImpact: 65, replacementRisk: 45, priority: "medium", status: "assessed" },
  { id: "4", name: "Legacy Auth Module", type: "Security", agilityImpact: 88, replacementRisk: 90, priority: "critical", status: "pending" },
  { id: "5", name: "Reporting Database", type: "Data Access", agilityImpact: 55, replacementRisk: 30, priority: "low", status: "pending" },
]

export function IntegrationFriction() {
  const [dependencies] = useState<Dependency[]>(initialDependencies)
  const [riskThreshold, setRiskThreshold] = useState([70])
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-scenario-1 text-background"
      case "high": return "bg-scenario-2 text-background"
      case "medium": return "bg-scenario-3 text-background"
      default: return "bg-muted text-muted-foreground"
    }
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "assessed": return <CheckCircle className="w-4 h-4 text-scenario-3" />
      case "in-progress": return <Circle className="w-4 h-4 text-scenario-2" />
      default: return <AlertCircle className="w-4 h-4 text-muted-foreground" />
    }
  }

  const criticalCount = dependencies.filter(d => d.priority === "critical").length
  const avgImpact = Math.round(dependencies.reduce((sum, d) => sum + d.agilityImpact, 0) / dependencies.length)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-scenario-1 flex items-center justify-center">
            <Puzzle className="w-6 h-6 text-background" />
          </div>
          <div>
            <Badge variant="outline" className="text-scenario-1 border-scenario-1 mb-1">Scenario 1</Badge>
            <h1 className="text-2xl font-bold text-foreground">Integration Friction Problem</h1>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Dependency
        </Button>
      </div>

      <p className="text-muted-foreground">
        Identify which legacy dependencies most severely constrain agility and prioritize them without attempting risky, large-scale replacement.
      </p>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Dependencies</p>
                <p className="text-2xl font-bold text-foreground mt-1">{dependencies.length}</p>
              </div>
              <Database className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Critical Items</p>
                <p className="text-2xl font-bold text-scenario-1 mt-1">{criticalCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-scenario-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Impact Score</p>
                <p className="text-2xl font-bold text-scenario-2 mt-1">{avgImpact}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-scenario-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Assessed</p>
                <p className="text-2xl font-bold text-scenario-3 mt-1">{dependencies.filter(d => d.status === "assessed").length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-scenario-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Threshold Control */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-foreground">Risk Threshold Configuration</CardTitle>
          <CardDescription>Set the agility impact threshold to filter high-priority dependencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <Slider
                value={riskThreshold}
                onValueChange={setRiskThreshold}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
            <div className="text-2xl font-bold text-primary w-16 text-right">
              {riskThreshold[0]}%
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Dependencies with agility impact above {riskThreshold[0]}% will be flagged as high priority
          </p>
        </CardContent>
      </Card>

      {/* Dependencies List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Legacy Dependencies</CardTitle>
          <CardDescription>Prioritized list of legacy system dependencies affecting agility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dependencies.map((dep) => (
              <div 
                key={dep.id}
                className={`p-4 rounded-lg border transition-colors ${
                  dep.agilityImpact >= riskThreshold[0] 
                    ? "bg-scenario-1/10 border-scenario-1/30" 
                    : "bg-secondary/50 border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(dep.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{dep.name}</h4>
                        <Badge className={getPriorityColor(dep.priority)}>
                          {dep.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{dep.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Agility Impact</p>
                      <p className={`text-lg font-bold ${dep.agilityImpact >= riskThreshold[0] ? "text-scenario-1" : "text-foreground"}`}>
                        {dep.agilityImpact}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Replacement Risk</p>
                      <p className="text-lg font-bold text-scenario-2">{dep.replacementRisk}%</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Link2 className="w-5 h-5 text-primary" />
            Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/50 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2">Incremental Modernization</h4>
              <p className="text-sm text-muted-foreground">
                Focus on wrapping legacy APIs with modern interfaces before attempting full replacement. This reduces risk while improving developer experience.
              </p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2">Dependency Mapping</h4>
              <p className="text-sm text-muted-foreground">
                Create comprehensive dependency maps to identify cascade effects before making changes to critical integrations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

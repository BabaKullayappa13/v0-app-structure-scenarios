"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  Layers,
  GitBranch,
  Server,
  Cloud,
  Database,
  ArrowRight,
  CheckCircle2,
  Circle,
  AlertCircle
} from "lucide-react"

interface SystemComponent {
  id: string
  name: string
  type: "legacy" | "modern" | "hybrid"
  healthScore: number
  dependencies: number
  migrationPhase: "not-started" | "planning" | "in-progress" | "completed"
  complexity: "low" | "medium" | "high"
}

const systemComponents: SystemComponent[] = [
  { id: "1", name: "Customer Database", type: "legacy", healthScore: 65, dependencies: 12, migrationPhase: "planning", complexity: "high" },
  { id: "2", name: "Order Processing", type: "hybrid", healthScore: 78, dependencies: 8, migrationPhase: "in-progress", complexity: "high" },
  { id: "3", name: "Inventory API", type: "modern", healthScore: 92, dependencies: 5, migrationPhase: "completed", complexity: "medium" },
  { id: "4", name: "Payment Gateway", type: "modern", healthScore: 95, dependencies: 3, migrationPhase: "completed", complexity: "low" },
  { id: "5", name: "Reporting Engine", type: "legacy", healthScore: 55, dependencies: 15, migrationPhase: "not-started", complexity: "high" },
  { id: "6", name: "User Authentication", type: "hybrid", healthScore: 82, dependencies: 10, migrationPhase: "in-progress", complexity: "medium" },
  { id: "7", name: "Analytics Platform", type: "modern", healthScore: 88, dependencies: 4, migrationPhase: "completed", complexity: "low" },
  { id: "8", name: "Legacy ERP Core", type: "legacy", healthScore: 45, dependencies: 20, migrationPhase: "planning", complexity: "high" },
]

export function ScaleGrowth() {
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid")

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "legacy": return { icon: Database, color: "text-scenario-1", bg: "bg-scenario-1", label: "Legacy" }
      case "modern": return { icon: Cloud, color: "text-scenario-3", bg: "bg-scenario-3", label: "Modern" }
      case "hybrid": return { icon: GitBranch, color: "text-scenario-2", bg: "bg-scenario-2", label: "Hybrid" }
      default: return { icon: Server, color: "text-muted-foreground", bg: "bg-muted", label: "Unknown" }
    }
  }

  const getPhaseConfig = (phase: string) => {
    switch (phase) {
      case "completed": return { icon: CheckCircle2, color: "text-scenario-3" }
      case "in-progress": return { icon: Circle, color: "text-scenario-2" }
      case "planning": return { icon: Circle, color: "text-primary" }
      default: return { icon: AlertCircle, color: "text-muted-foreground" }
    }
  }

  const legacyCount = systemComponents.filter(c => c.type === "legacy").length
  const modernCount = systemComponents.filter(c => c.type === "modern").length
  const hybridCount = systemComponents.filter(c => c.type === "hybrid").length
  const avgHealth = Math.round(systemComponents.reduce((sum, c) => sum + c.healthScore, 0) / systemComponents.length)
  const completedMigrations = systemComponents.filter(c => c.migrationPhase === "completed").length
  const migrationProgress = Math.round((completedMigrations / systemComponents.length) * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-scenario-4 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-background" />
          </div>
          <div>
            <Badge variant="outline" className="text-scenario-4 border-scenario-4 mb-1">Scenario 4</Badge>
            <h1 className="text-2xl font-bold text-foreground">Scale and Growth</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Layers className="w-4 h-4 mr-2" />
            Grid View
          </Button>
          <Button 
            variant={viewMode === "timeline" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("timeline")}
          >
            <GitBranch className="w-4 h-4 mr-2" />
            Timeline
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground">
        Adapt decision-making and governance when hybrid architectures become the operational norm rather than a transitional exception.
      </p>

      {/* Architecture Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Legacy Systems</p>
                <p className="text-2xl font-bold text-scenario-1 mt-1">{legacyCount}</p>
              </div>
              <Database className="w-8 h-8 text-scenario-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Hybrid Systems</p>
                <p className="text-2xl font-bold text-scenario-2 mt-1">{hybridCount}</p>
              </div>
              <GitBranch className="w-8 h-8 text-scenario-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Modern Systems</p>
                <p className="text-2xl font-bold text-scenario-3 mt-1">{modernCount}</p>
              </div>
              <Cloud className="w-8 h-8 text-scenario-3" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Health</p>
                <p className="text-2xl font-bold text-foreground mt-1">{avgHealth}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Migration</p>
                <p className="text-2xl font-bold text-primary mt-1">{migrationProgress}%</p>
              </div>
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Migration Progress Bar */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-foreground">Overall Migration Progress</CardTitle>
          <CardDescription>Track the transition from legacy to modern architecture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-4 bg-secondary rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-scenario-1" 
                    style={{ width: `${(legacyCount / systemComponents.length) * 100}%` }}
                  />
                  <div 
                    className="h-full bg-scenario-2" 
                    style={{ width: `${(hybridCount / systemComponents.length) * 100}%` }}
                  />
                  <div 
                    className="h-full bg-scenario-3" 
                    style={{ width: `${(modernCount / systemComponents.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-scenario-1" />
                <span className="text-muted-foreground">Legacy ({legacyCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-scenario-2" />
                <span className="text-muted-foreground">Hybrid ({hybridCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-scenario-3" />
                <span className="text-muted-foreground">Modern ({modernCount})</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Components */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">System Components</CardTitle>
          <CardDescription>Inventory of all system components and their modernization status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemComponents.map((component) => {
              const typeConfig = getTypeConfig(component.type)
              const phaseConfig = getPhaseConfig(component.migrationPhase)
              const TypeIcon = typeConfig.icon
              const PhaseIcon = phaseConfig.icon
              
              return (
                <div 
                  key={component.id}
                  className="p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${typeConfig.bg}/20 flex items-center justify-center`}>
                        <TypeIcon className={`w-5 h-5 ${typeConfig.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{component.name}</h4>
                        <Badge className={`${typeConfig.bg} text-background mt-1`}>
                          {typeConfig.label}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <PhaseIcon className={`w-4 h-4 ${phaseConfig.color}`} />
                      <span className="text-xs text-muted-foreground capitalize">
                        {component.migrationPhase.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Health Score</span>
                      <span className={`font-medium ${
                        component.healthScore >= 80 ? "text-scenario-3" :
                        component.healthScore >= 60 ? "text-scenario-2" :
                        "text-scenario-1"
                      }`}>{component.healthScore}%</span>
                    </div>
                    <Progress value={component.healthScore} className="h-1.5" />
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                      <span>{component.dependencies} dependencies</span>
                      <span className="capitalize">{component.complexity} complexity</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Governance Guidelines */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Hybrid Architecture Governance</CardTitle>
          <CardDescription>Decision framework for managing coexisting legacy and modern systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-scenario-1/10 rounded-lg border border-scenario-1/30">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-scenario-1" />
                Legacy First
              </h4>
              <p className="text-sm text-muted-foreground">
                When data consistency and stability are critical. Prefer proven patterns over new approaches.
              </p>
            </div>
            <div className="p-4 bg-scenario-2/10 rounded-lg border border-scenario-2/30">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-scenario-2" />
                Hybrid Strategy
              </h4>
              <p className="text-sm text-muted-foreground">
                For gradual migrations. Use adapters and bridges to connect old and new systems during transition.
              </p>
            </div>
            <div className="p-4 bg-scenario-3/10 rounded-lg border border-scenario-3/30">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Cloud className="w-4 h-4 text-scenario-3" />
                Modern First
              </h4>
              <p className="text-sm text-muted-foreground">
                For new capabilities with minimal legacy dependencies. Move fast with cloud-native approaches.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

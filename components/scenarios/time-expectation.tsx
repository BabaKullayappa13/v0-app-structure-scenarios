"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Clock, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  BarChart3,
  Timer,
  Target
} from "lucide-react"

interface Project {
  id: string
  name: string
  expectedDays: number
  actualDays: number
  legacyOverhead: number
  status: "completed" | "in-progress" | "delayed" | "at-risk"
  legacyDependencies: number
}

const projects: Project[] = [
  { id: "1", name: "Customer Portal Redesign", expectedDays: 45, actualDays: 72, legacyOverhead: 60, status: "delayed", legacyDependencies: 8 },
  { id: "2", name: "Payment Gateway Integration", expectedDays: 30, actualDays: 28, legacyOverhead: 35, status: "completed", legacyDependencies: 3 },
  { id: "3", name: "Inventory Management Module", expectedDays: 60, actualDays: 45, legacyOverhead: 52, status: "in-progress", legacyDependencies: 6 },
  { id: "4", name: "Analytics Dashboard", expectedDays: 25, actualDays: 38, legacyOverhead: 45, status: "at-risk", legacyDependencies: 4 },
  { id: "5", name: "Mobile App Backend", expectedDays: 40, actualDays: 32, legacyOverhead: 28, status: "in-progress", legacyDependencies: 2 },
]

export function TimeExpectation() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"week" | "month" | "quarter">("month")

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed": return { icon: CheckCircle, color: "text-scenario-3", bg: "bg-scenario-3/10" }
      case "in-progress": return { icon: Timer, color: "text-primary", bg: "bg-primary/10" }
      case "delayed": return { icon: XCircle, color: "text-scenario-1", bg: "bg-scenario-1/10" }
      case "at-risk": return { icon: AlertTriangle, color: "text-scenario-2", bg: "bg-scenario-2/10" }
      default: return { icon: Clock, color: "text-muted-foreground", bg: "bg-muted" }
    }
  }

  const avgOverhead = Math.round(projects.reduce((sum, p) => sum + p.legacyOverhead, 0) / projects.length)
  const delayedProjects = projects.filter(p => p.status === "delayed" || p.status === "at-risk").length
  const onTimeRate = Math.round(((projects.length - delayedProjects) / projects.length) * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-scenario-2 flex items-center justify-center">
            <Clock className="w-6 h-6 text-background" />
          </div>
          <div>
            <Badge variant="outline" className="text-scenario-2 border-scenario-2 mb-1">Scenario 2</Badge>
            <h1 className="text-2xl font-bold text-foreground">Time and Change Expectation Issue</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(["week", "month", "quarter"] as const).map((tf) => (
            <Button 
              key={tf}
              variant={selectedTimeframe === tf ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe(tf)}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-muted-foreground">
        Evaluate and communicate realistic delivery timelines when legacy constraints dominate execution paths.
      </p>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Legacy Overhead</p>
                <p className="text-2xl font-bold text-scenario-2 mt-1">{avgOverhead}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-scenario-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">On-Time Delivery</p>
                <p className="text-2xl font-bold text-scenario-3 mt-1">{onTimeRate}%</p>
              </div>
              <Target className="w-8 h-8 text-scenario-3" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">At Risk / Delayed</p>
                <p className="text-2xl font-bold text-scenario-1 mt-1">{delayedProjects}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-scenario-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Projects</p>
                <p className="text-2xl font-bold text-foreground mt-1">{projects.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Calculator */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Legacy Overhead Timeline Calculator
          </CardTitle>
          <CardDescription>Estimate realistic timelines accounting for legacy constraints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Base Estimate (days)</label>
              <div className="text-3xl font-bold text-foreground">30</div>
              <p className="text-xs text-muted-foreground">Modern platform baseline</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Legacy Overhead Factor</label>
              <div className="text-3xl font-bold text-scenario-2">+{avgOverhead}%</div>
              <p className="text-xs text-muted-foreground">Based on historical data</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Realistic Estimate</label>
              <div className="text-3xl font-bold text-primary">{Math.round(30 * (1 + avgOverhead / 100))} days</div>
              <p className="text-xs text-muted-foreground">Recommended timeline</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Tracking */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Project Timeline Tracking</CardTitle>
          <CardDescription>Compare expected vs actual delivery across legacy-dependent projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => {
              const config = getStatusConfig(project.status)
              const StatusIcon = config.icon
              const variance = Math.round(((project.actualDays - project.expectedDays) / project.expectedDays) * 100)
              
              return (
                <div key={project.id} className={`p-4 rounded-lg border border-border ${config.bg}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <StatusIcon className={`w-5 h-5 ${config.color}`} />
                      <div>
                        <h4 className="font-medium text-foreground">{project.name}</h4>
                        <p className="text-xs text-muted-foreground">{project.legacyDependencies} legacy dependencies</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={config.color}>
                      {project.status.replace("-", " ")}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Expected</p>
                      <p className="font-medium text-foreground">{project.expectedDays} days</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Actual</p>
                      <p className="font-medium text-foreground">{project.actualDays} days</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Variance</p>
                      <p className={`font-medium ${variance > 0 ? "text-scenario-1" : "text-scenario-3"}`}>
                        {variance > 0 ? "+" : ""}{variance}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Legacy Overhead</p>
                      <p className="font-medium text-scenario-2">{project.legacyOverhead}%</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <Progress 
                      value={Math.min((project.actualDays / project.expectedDays) * 100, 100)} 
                      className="h-2"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Communication Templates */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Stakeholder Communication Templates</CardTitle>
          <CardDescription>Pre-built templates for communicating realistic timelines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/50 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2">Timeline Adjustment Notice</h4>
              <p className="text-sm text-muted-foreground">
                {`"Based on legacy system analysis, we recommend adding ${avgOverhead}% buffer to the baseline estimate. This accounts for integration testing, data migration constraints, and coordination with existing workflows."`}
              </p>
              <Button variant="outline" size="sm" className="mt-3 bg-transparent">Copy Template</Button>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2">Risk Communication</h4>
              <p className="text-sm text-muted-foreground">
                {`"This project has ${delayedProjects > 0 ? "elevated" : "normal"} timeline risk due to dependencies on ${projects[0].legacyDependencies} legacy systems. We've built in appropriate contingency based on historical performance data."`}
              </p>
              <Button variant="outline" size="sm" className="mt-3 bg-transparent">Copy Template</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

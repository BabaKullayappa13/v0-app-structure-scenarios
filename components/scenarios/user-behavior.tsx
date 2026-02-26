"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Users, 
  FileSpreadsheet,
  Code,
  Terminal,
  AlertOctagon,
  Eye,
  Shield,
  Activity,
  TrendingUp,
  Zap
} from "lucide-react"

interface BypassBehavior {
  id: string
  type: string
  description: string
  frequency: "daily" | "weekly" | "monthly"
  riskLevel: "critical" | "high" | "medium" | "low"
  usersAffected: number
  detectedDate: string
  status: "active" | "monitored" | "resolved"
}

const bypassBehaviors: BypassBehavior[] = [
  { id: "1", type: "External Spreadsheets", description: "Teams using Google Sheets to track orders instead of legacy ERP", frequency: "daily", riskLevel: "high", usersAffected: 45, detectedDate: "2026-01-15", status: "active" },
  { id: "2", type: "Custom Scripts", description: "Python scripts for data extraction bypassing API limits", frequency: "daily", riskLevel: "critical", usersAffected: 12, detectedDate: "2026-01-20", status: "monitored" },
  { id: "3", type: "Shadow Database", description: "Local SQLite copies of production data for reporting", frequency: "weekly", riskLevel: "critical", usersAffected: 8, detectedDate: "2026-01-10", status: "active" },
  { id: "4", type: "Manual Data Entry", description: "Duplicate data entry in modern tools and legacy system", frequency: "daily", riskLevel: "medium", usersAffected: 67, detectedDate: "2026-01-05", status: "monitored" },
  { id: "5", type: "API Workarounds", description: "Direct database queries instead of official API endpoints", frequency: "weekly", riskLevel: "high", usersAffected: 15, detectedDate: "2026-01-22", status: "resolved" },
]

export function UserBehavior() {
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [autoDetection, setAutoDetection] = useState(true)

  const getTypeIcon = (type: string) => {
    if (type.includes("Spreadsheet")) return FileSpreadsheet
    if (type.includes("Script")) return Code
    if (type.includes("Database")) return Terminal
    if (type.includes("Manual")) return Users
    return Zap
  }

  const getRiskConfig = (risk: string) => {
    switch (risk) {
      case "critical": return { color: "text-scenario-1", bg: "bg-scenario-1", border: "border-scenario-1" }
      case "high": return { color: "text-scenario-2", bg: "bg-scenario-2", border: "border-scenario-2" }
      case "medium": return { color: "text-primary", bg: "bg-primary", border: "border-primary" }
      default: return { color: "text-muted-foreground", bg: "bg-muted", border: "border-muted" }
    }
  }

  const criticalBehaviors = bypassBehaviors.filter(b => b.riskLevel === "critical").length
  const totalUsersAffected = bypassBehaviors.reduce((sum, b) => sum + b.usersAffected, 0)
  const activeBehaviors = bypassBehaviors.filter(b => b.status === "active").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-scenario-3 flex items-center justify-center">
            <Users className="w-6 h-6 text-background" />
          </div>
          <div>
            <Badge variant="outline" className="text-scenario-3 border-scenario-3 mb-1">Scenario 3</Badge>
            <h1 className="text-2xl font-bold text-foreground">User Behavior and Edge Cases</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
            <span className="text-sm text-muted-foreground">Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={autoDetection} onCheckedChange={setAutoDetection} />
            <span className="text-sm text-muted-foreground">Auto-detect</span>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground">
        Detect and respond to repeated bypass behavior without suppressing productivity or increasing operational exposure.
      </p>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Detected Bypasses</p>
                <p className="text-2xl font-bold text-foreground mt-1">{bypassBehaviors.length}</p>
              </div>
              <Eye className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Critical Risk</p>
                <p className="text-2xl font-bold text-scenario-1 mt-1">{criticalBehaviors}</p>
              </div>
              <AlertOctagon className="w-8 h-8 text-scenario-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Users Affected</p>
                <p className="text-2xl font-bold text-scenario-2 mt-1">{totalUsersAffected}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-scenario-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Issues</p>
                <p className="text-2xl font-bold text-scenario-3 mt-1">{activeBehaviors}</p>
              </div>
              <Activity className="w-8 h-8 text-scenario-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detection Feed */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Bypass Detection Feed
          </CardTitle>
          <CardDescription>Real-time monitoring of shadow systems and workaround behaviors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bypassBehaviors.map((behavior) => {
              const TypeIcon = getTypeIcon(behavior.type)
              const riskConfig = getRiskConfig(behavior.riskLevel)
              
              return (
                <div 
                  key={behavior.id}
                  className={`p-4 rounded-lg border ${behavior.status === "active" ? riskConfig.border : "border-border"} bg-secondary/30`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg ${riskConfig.bg}/20 flex items-center justify-center`}>
                        <TypeIcon className={`w-5 h-5 ${riskConfig.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground">{behavior.type}</h4>
                          <Badge className={`${riskConfig.bg} text-background`}>
                            {behavior.riskLevel}
                          </Badge>
                          <Badge variant="outline" className={
                            behavior.status === "active" ? "text-scenario-1 border-scenario-1" :
                            behavior.status === "monitored" ? "text-scenario-2 border-scenario-2" :
                            "text-scenario-3 border-scenario-3"
                          }>
                            {behavior.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{behavior.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Frequency: <span className="text-foreground">{behavior.frequency}</span></span>
                          <span>Users: <span className="text-foreground">{behavior.usersAffected}</span></span>
                          <span>Detected: <span className="text-foreground">{behavior.detectedDate}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Investigate</Button>
                      <Button variant="ghost" size="sm">Dismiss</Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Response Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Understand</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Identify why users are bypassing official systems. Often indicates genuine productivity blockers in legacy workflows.
            </p>
            <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">Run User Survey</Button>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Accommodate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Provide sanctioned alternatives that meet user needs while maintaining data integrity and security controls.
            </p>
            <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">Create Workaround</Button>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Modernize</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Prioritize modernization of specific legacy components causing the most bypass behavior.
            </p>
            <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">View Priorities</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

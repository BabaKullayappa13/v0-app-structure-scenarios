"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  Puzzle,
  Clock,
  Users,
  Layers
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from "recharts"

const scenarioScores = [
  { name: "Integration", score: 85, color: "var(--scenario-1)" },
  { name: "Time", score: 72, color: "var(--scenario-2)" },
  { name: "Behavior", score: 78, color: "var(--scenario-3)" },
  { name: "Scale", score: 65, color: "var(--scenario-4)" },
]

const riskTrend = [
  { month: "Aug", integration: 92, time: 78, behavior: 85, scale: 70 },
  { month: "Sep", integration: 90, time: 76, behavior: 82, scale: 68 },
  { month: "Oct", integration: 88, time: 75, behavior: 80, scale: 67 },
  { month: "Nov", integration: 86, time: 73, behavior: 79, scale: 66 },
  { month: "Dec", integration: 85, time: 72, behavior: 78, scale: 65 },
  { month: "Jan", integration: 85, time: 72, behavior: 78, scale: 65 },
]

const systemDistribution = [
  { name: "Legacy", value: 35, color: "var(--scenario-1)" },
  { name: "Hybrid", value: 25, color: "var(--scenario-2)" },
  { name: "Modern", value: 40, color: "var(--scenario-3)" },
]

const weeklyActivity = [
  { day: "Mon", detections: 12, resolutions: 8 },
  { day: "Tue", detections: 8, resolutions: 10 },
  { day: "Wed", detections: 15, resolutions: 12 },
  { day: "Thu", detections: 10, resolutions: 14 },
  { day: "Fri", detections: 6, resolutions: 9 },
  { day: "Sat", detections: 3, resolutions: 5 },
  { day: "Sun", detections: 2, resolutions: 3 },
]

export function Dashboard() {
  const overallRisk = Math.round(scenarioScores.reduce((sum, s) => sum + s.score, 0) / scenarioScores.length)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive view of modernization progress</p>
          </div>
        </div>
        <Badge variant="outline" className="text-primary border-primary">
          Last updated: Just now
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Overall Risk Score</p>
                <p className="text-3xl font-bold text-foreground mt-1">{overallRisk}</p>
                <p className="text-xs text-scenario-3 flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  -3% from last month
                </p>
              </div>
              <Activity className="w-10 h-10 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Critical Issues</p>
                <p className="text-3xl font-bold text-scenario-1 mt-1">7</p>
                <p className="text-xs text-scenario-1 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +2 from last week
                </p>
              </div>
              <AlertTriangle className="w-10 h-10 text-scenario-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Resolved Issues</p>
                <p className="text-3xl font-bold text-scenario-3 mt-1">23</p>
                <p className="text-xs text-scenario-3 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +8 this month
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-scenario-3" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Migration Progress</p>
                <p className="text-3xl font-bold text-primary mt-1">68%</p>
                <p className="text-xs text-primary flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +5% this quarter
                </p>
              </div>
              <Layers className="w-10 h-10 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario Risk Scores */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Scenario Risk Scores</CardTitle>
            <CardDescription>Current risk assessment by scenario</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={scenarioScores} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" domain={[0, 100]} stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" fontSize={12} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)", 
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {scenarioScores.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">System Distribution</CardTitle>
            <CardDescription>Current architecture composition</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={systemDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {systemDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)", 
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                />
                <Legend 
                  formatter={(value) => <span style={{ color: "var(--foreground)" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Trend */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Risk Trend Over Time</CardTitle>
          <CardDescription>6-month risk score progression by scenario</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={riskTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis domain={[50, 100]} stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--card)", 
                  border: "1px solid var(--border)",
                  borderRadius: "8px"
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              <Area type="monotone" dataKey="integration" stackId="1" stroke="var(--scenario-1)" fill="var(--scenario-1)" fillOpacity={0.3} name="Integration" />
              <Area type="monotone" dataKey="time" stackId="2" stroke="var(--scenario-2)" fill="var(--scenario-2)" fillOpacity={0.3} name="Time" />
              <Area type="monotone" dataKey="behavior" stackId="3" stroke="var(--scenario-3)" fill="var(--scenario-3)" fillOpacity={0.3} name="Behavior" />
              <Area type="monotone" dataKey="scale" stackId="4" stroke="var(--scenario-4)" fill="var(--scenario-4)" fillOpacity={0.3} name="Scale" />
              <Legend 
                formatter={(value) => <span style={{ color: "var(--foreground)" }}>{value}</span>}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Weekly Activity</CardTitle>
          <CardDescription>Detections vs resolutions this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--card)", 
                  border: "1px solid var(--border)",
                  borderRadius: "8px"
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              <Line type="monotone" dataKey="detections" stroke="var(--scenario-1)" strokeWidth={2} dot={{ fill: "var(--scenario-1)" }} name="Detections" />
              <Line type="monotone" dataKey="resolutions" stroke="var(--scenario-3)" strokeWidth={2} dot={{ fill: "var(--scenario-3)" }} name="Resolutions" />
              <Legend 
                formatter={(value) => <span style={{ color: "var(--foreground)" }}>{value}</span>}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Scenario Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-scenario-1/10 border-scenario-1/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Puzzle className="w-8 h-8 text-scenario-1" />
              <div>
                <p className="text-sm font-medium text-foreground">Integration Friction</p>
                <p className="text-2xl font-bold text-scenario-1">5 critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-scenario-2/10 border-scenario-2/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-scenario-2" />
              <div>
                <p className="text-sm font-medium text-foreground">Time Expectation</p>
                <p className="text-2xl font-bold text-scenario-2">44% overhead</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-scenario-3/10 border-scenario-3/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-scenario-3" />
              <div>
                <p className="text-sm font-medium text-foreground">User Behavior</p>
                <p className="text-2xl font-bold text-scenario-3">147 users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-scenario-4/10 border-scenario-4/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-scenario-4" />
              <div>
                <p className="text-sm font-medium text-foreground">Scale Growth</p>
                <p className="text-2xl font-bold text-scenario-4">8 systems</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

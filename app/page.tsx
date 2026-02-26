"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ScenarioOverview } from "@/components/scenario-overview"
import { IntegrationFriction } from "@/components/scenarios/integration-friction"
import { TimeExpectation } from "@/components/scenarios/time-expectation"
import { UserBehavior } from "@/components/scenarios/user-behavior"
import { ScaleGrowth } from "@/components/scenarios/scale-growth"
import { Dashboard } from "@/components/dashboard"

export type Scenario = "overview" | "integration" | "time" | "behavior" | "scale" | "dashboard"

export default function Home() {
  const [activeScenario, setActiveScenario] = useState<Scenario>("overview")

  const renderContent = () => {
    switch (activeScenario) {
      case "overview":
        return <ScenarioOverview onSelectScenario={setActiveScenario} />
      case "integration":
        return <IntegrationFriction />
      case "time":
        return <TimeExpectation />
      case "behavior":
        return <UserBehavior />
      case "scale":
        return <ScaleGrowth />
      case "dashboard":
        return <Dashboard />
      default:
        return <ScenarioOverview onSelectScenario={setActiveScenario} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar activeScenario={activeScenario} onSelectScenario={setActiveScenario} />
        <main className="flex-1 p-6 ml-64">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

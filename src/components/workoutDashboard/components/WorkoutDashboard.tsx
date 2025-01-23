import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { Workout } from "./WorkoutTracker"

type CategoryStats = {
  totalDuration: number
  totalSessions: number
  averageDuration: number
}

type DashboardProps = {
  workouts: Workout[]
}

export function WorkoutDashboard({ workouts }: DashboardProps) {
  const categories = ["Cardio", "Strength", "Flexibility", "Balance"]

  const getCategoryStats = (category: string): CategoryStats => {
    const categoryWorkouts = workouts.filter((w) => w.category === category)
    const totalDuration = categoryWorkouts.reduce((sum, w) => sum + (w.details.cardio?.duration || 0), 0)
    return {
      totalDuration,
      totalSessions: categoryWorkouts.length,
      averageDuration: categoryWorkouts.length ? totalDuration / categoryWorkouts.length : 0,
    }
  }

  const getChartData = () => {
    return categories.map((category) => ({
      name: category,
      sessions: workouts.filter((w) => w.category === category).length,
    }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Workout Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={categories[0].toLowerCase()} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category.toLowerCase()}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category} value={category.toLowerCase()}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getCategoryStats(category).totalSessions}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{getCategoryStats(category).totalDuration} min</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {getCategoryStats(category).averageDuration.toFixed(1)} min
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Workout Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getChartData()}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sessions" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}


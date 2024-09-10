import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const data = [
  {
    date: "2023-01-01",
    weight: 185,
    benchPress: 200,
    squat: 250,
    deadlift: 300,
  },
  {
    date: "2023-02-01",
    weight: 183,
    benchPress: 205,
    squat: 260,
    deadlift: 315,
  },
  {
    date: "2023-03-01",
    weight: 181,
    benchPress: 210,
    squat: 270,
    deadlift: 325,
  },
  {
    date: "2023-04-01",
    weight: 180,
    benchPress: 215,
    squat: 280,
    deadlift: 335,
  },
  {
    date: "2023-05-01",
    weight: 178,
    benchPress: 220,
    squat: 290,
    deadlift: 345,
  },
];

export default function ProgressTracker() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Progress Tracker</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Body Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strength Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select defaultValue="benchPress">
                <SelectTrigger>
                  <SelectValue placeholder="Select exercise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="benchPress">Bench Press</SelectItem>
                  <SelectItem value="squat">Squat</SelectItem>
                  <SelectItem value="deadlift">Deadlift</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="benchPress" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-between">
        <Select defaultValue="1m">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
        <Button>Export Data</Button>
      </div>
    </div>
  );
}

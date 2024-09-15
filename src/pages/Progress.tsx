"use client";

import { useState, useMemo } from "react";
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
import { Calendar, TrendingUp, Weight, Ruler } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for charts
const weightData = [
  { date: "2024-01-01", weight: 80 },
  { date: "2024-02-01", weight: 79 },
  { date: "2024-03-01", weight: 78 },
  { date: "2024-04-01", weight: 77 },
  { date: "2024-05-01", weight: 76 },
  { date: "2024-06-01", weight: 75 },
];

const strengthData = [
  { date: "2024-01-01", benchPress: 100, squat: 120, deadlift: 140 },
  { date: "2024-02-01", benchPress: 105, squat: 125, deadlift: 145 },
  { date: "2024-03-01", benchPress: 110, squat: 130, deadlift: 150 },
  { date: "2024-04-01", benchPress: 115, squat: 135, deadlift: 155 },
  { date: "2024-05-01", benchPress: 120, squat: 140, deadlift: 160 },
  { date: "2024-06-01", benchPress: 125, squat: 145, deadlift: 165 },
];

const measurementsData = [
  {
    date: "2024-01-01",
    chest: 100,
    waist: 80,
    hips: 95,
    thighs: 55,
    biceps: 35,
  },
  {
    date: "2024-02-01",
    chest: 101,
    waist: 79,
    hips: 94,
    thighs: 56,
    biceps: 36,
  },
  {
    date: "2024-03-01",
    chest: 102,
    waist: 78,
    hips: 93,
    thighs: 57,
    biceps: 37,
  },
  {
    date: "2024-04-01",
    chest: 103,
    waist: 77,
    hips: 92,
    thighs: 58,
    biceps: 38,
  },
  {
    date: "2024-05-01",
    chest: 104,
    waist: 76,
    hips: 91,
    thighs: 59,
    biceps: 39,
  },
  {
    date: "2024-06-01",
    chest: 105,
    waist: 75,
    hips: 90,
    thighs: 60,
    biceps: 40,
  },
];

export default function Progress() {
  const [dateRange, setDateRange] = useState("6m");
  const [selectedExercise, setSelectedExercise] = useState("benchPress");
  const [selectedMeasurement, setSelectedMeasurement] = useState("chest");

  const filterDataByDateRange = <T extends { date: string }>(
    data: T[],
    range: string
  ) => {
    const now = new Date();
    let startDate;
    switch (range) {
      case "1m":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "3m":
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case "6m":
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "1y":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case "all":
        startDate = new Date(now.setFullYear(now.getFullYear() - 100));
        break;
      default:
        return data;
    }
    return data.filter((item) => new Date(item.date) >= startDate);
  };

  const filteredWeightData = useMemo(
    () => filterDataByDateRange(weightData, dateRange),
    [dateRange]
  );
  const filteredStrengthData = useMemo(
    () => filterDataByDateRange(strengthData, dateRange),
    [dateRange]
  );
  const filteredMeasurementsData = useMemo(
    () => filterDataByDateRange(measurementsData, dateRange),
    [dateRange]
  );

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Progress Tracker</h1>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="weight" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="strength">Strength</TabsTrigger>
          <TabsTrigger value="measurements">Body Measurements</TabsTrigger>
        </TabsList>
        <TabsContent value="weight">
          <Card>
            <CardHeader>
              <CardTitle>Weight Progress</CardTitle>
              <CardDescription>
                Track your weight changes over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredWeightData}>
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
        </TabsContent>
        <TabsContent value="strength">
          <Card>
            <CardHeader>
              <CardTitle>Strength Progress</CardTitle>
              <CardDescription>
                Track your strength gains in key exercises
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4">
                <Select
                  value={selectedExercise}
                  onValueChange={setSelectedExercise}
                >
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
                <LineChart data={filteredStrengthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={selectedExercise}
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="measurements">
          <Card>
            <CardHeader>
              <CardTitle>Body Measurements</CardTitle>
              <CardDescription>
                Track changes in your body measurements
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4">
                <Select
                  value={selectedMeasurement}
                  onValueChange={setSelectedMeasurement}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select measurement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chest">Chest</SelectItem>
                    <SelectItem value="waist">Waist</SelectItem>
                    <SelectItem value="hips">Hips</SelectItem>
                    <SelectItem value="thighs">Thighs</SelectItem>
                    <SelectItem value="biceps">Biceps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredMeasurementsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={selectedMeasurement}
                    stroke="#ffc658"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Workouts
            </CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +10% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Weight Change</CardTitle>
            <Weight className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-5 kg</div>
            <p className="text-xs text-muted-foreground">Since starting</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Strength Increase
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+25%</div>
            <p className="text-xs text-muted-foreground">In main lifts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Body Fat Reduction
            </CardTitle>
            <Ruler className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-3%</div>
            <p className="text-xs text-muted-foreground">Since starting</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

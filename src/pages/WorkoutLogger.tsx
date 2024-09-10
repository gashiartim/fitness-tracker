import { Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

export default function WorkoutLogger() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Log Workout</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current Workout</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="exercise">Exercise</Label>
              <Select>
                <SelectTrigger id="exercise">
                  <SelectValue placeholder="Select exercise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bench-press">Bench Press</SelectItem>
                  <SelectItem value="squat">Squat</SelectItem>
                  <SelectItem value="deadlift">Deadlift</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sets">Sets</Label>
                <Input id="sets" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reps">Reps</Label>
                <Input id="reps" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input id="weight" type="number" placeholder="0" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rpe">RPE (Rate of Perceived Exertion)</Label>
              <Slider
                id="rpe"
                max={10}
                step={1}
                defaultValue={[7]}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes here..."
              />
            </div>

            <div className="flex justify-between">
              <Button type="button">
                <Plus className="w-4 h-4 mr-2" />
                Add Set
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Finish Workout
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workout Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>Bench Press: 3 sets x 8 reps @ 185 lbs</li>
            <li>Squat: 3 sets x 5 reps @ 225 lbs</li>
            <li>Deadlift: 1 set x 5 reps @ 275 lbs</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

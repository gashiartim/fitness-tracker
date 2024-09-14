import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Bell, Lock, Palette, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/hooks/useTheme";
import { UserProfile } from "@/api/types";

const settingsSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  //   email: z.string().email("Invalid email address"),
  //   currentPassword: z.string().optional(),
  //   newPassword: z
  //     .string()
  //     .min(6, "Password must be at least 6 characters")
  //     .optional(),
  //   confirmPassword: z
  //     .string()
  //     .min(6, "Password must be at least 6 characters")
  //     .optional(),

  workoutReminders: z.boolean(),
  goalUpdates: z.boolean(),
  newFeatures: z.boolean(),
  weightUnit: z.enum(["kg", "lbs"]),
  distanceUnit: z.enum(["km", "mi"]),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

interface SettingsFormProps {
  userProfile: UserProfile & {
    email: string;
  };
  onSubmit: (data: SettingsFormData) => void;
}

export default function SettingsForm({
  userProfile,
  onSubmit,
}: SettingsFormProps) {
  const { theme, setTheme } = useTheme();

  console.log(userProfile);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: userProfile?.username || "",
      workoutReminders: userProfile?.workout_reminders || false,
      goalUpdates: userProfile?.goal_updates || false,
      newFeatures: userProfile?.new_features || false,
      weightUnit: userProfile?.weight_unit || "kg",
      distanceUnit: userProfile?.distance_unit || "km",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Account Settings Card */}
      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center dark:text-white">
            <User className="w-4 h-4 mr-2" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input {...field} id="username" placeholder="Username" />
              )}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} id="email" type="email" placeholder="Email" />
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div> */}
        </CardContent>
      </Card>

      {/* Security Card */}
      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="w-4 h-4 mr-2" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="currentPassword"
                  type="password"
                  placeholder="Current Password"
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="newPassword"
                  type="password"
                  placeholder="New Password"
                />
              )}
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm New Password"
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div> */}
        </CardContent>
      </Card>

      {/* Notifications Card */}
      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="workoutReminders">Workout Reminders</Label>
            <Controller
              name="workoutReminders"
              control={control}
              render={({ field }) => (
                <Switch
                  id="workoutReminders"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="goalUpdates">Goal Updates</Label>
            <Controller
              name="goalUpdates"
              control={control}
              render={({ field }) => (
                <Switch
                  id="goalUpdates"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="newFeatures">New Features</Label>
            <Controller
              name="newFeatures"
              control={control}
              render={({ field }) => (
                <Switch
                  id="newFeatures"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance Card */}
      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme" className="dark:text-white">
              Theme
            </Label>
            <Select
              value={theme}
              onValueChange={(value: "light" | "dark") => setTheme(value)}
            >
              <SelectTrigger
                id="theme"
                className="dark:bg-gray-700 dark:text-white"
              >
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700">
                <SelectItem value="light" className="dark:text-white">
                  Light
                </SelectItem>
                <SelectItem value="dark" className="dark:text-white">
                  Dark
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Units & Measurements Card */}
      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="w-4 h-4 mr-2" />
            Units & Measurements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weightUnit">Weight Unit</Label>
            <Controller
              name="weightUnit"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="weightUnit">
                    <SelectValue placeholder="Select weight unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="distanceUnit">Distance Unit</Label>
            <Controller
              name="distanceUnit"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="distanceUnit">
                    <SelectValue placeholder="Select distance unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="km">Kilometers (km)</SelectItem>
                    <SelectItem value="mi">Miles (mi)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Save Settings
      </Button>
    </form>
  );
}

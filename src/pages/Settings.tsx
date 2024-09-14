"use client";

import { Suspense } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/api/mutations";
import { UserProfile } from "@/api/types";
import { useUserProfile } from "@/hooks/useUserProfile";
import LoadingScreen from "@/components/LoadingScreen";
import SettingsForm, { SettingsFormData } from "@/components/SettingsForm";

export default function SettingsPage() {
  const { user } = useAuth();
  const { data: userProfile, isLoading, error } = useUserProfile();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateSettingsMutation = useMutation<void, Error, SettingsFormData>({
    mutationFn: async (data) => {
      if (!user) throw new Error("User not found");

      // Update user profile
      await updateUserProfile(user.id, {
        username: data.username,
        email: data.email,
        workoutReminders: data.workoutReminders,
        goalUpdates: data.goalUpdates,
        newFeatures: data.newFeatures,
        weightUnit: data.weightUnit,
        distanceUnit: data.distanceUnit,
      } as UserProfile);

      // Update password if provided
      if (data.newPassword) {
        const { error } = await supabase.auth.updateUser({
          password: data.newPassword,
        });
        if (error) throw error;
      }

      // Update email if changed
      if (data.email !== user.email) {
        const { error } = await supabase.auth.updateUser({
          email: data.email,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast({
        title: "Settings updated",
        description: "Your settings have been updated successfully.",
      });
    },
    onError: (error: Error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update settings.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SettingsFormData) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    updateSettingsMutation.mutate(data);
  };

  const handleDeleteAccount = async () => {
    // Implement account deletion logic here
    toast({
      title: "Account deletion",
      description: "Account deletion is not implemented yet.",
      variant: "destructive",
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error loading user profile: {error.message}</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold dark:text-white">Settings</h1>

      <Suspense fallback={<LoadingScreen />}>
        {userProfile && (
          <SettingsForm
            userProfile={{ ...userProfile, email: user?.email ?? "" }}
            onSubmit={onSubmit}
          />
        )}
      </Suspense>

      <Separator className="my-8 dark:bg-gray-700" />

      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">
            Danger Zone
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Be careful, these actions are irreversible!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Delete Account</h3>
            <p className="text-sm text-muted-foreground">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            <LogOut className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

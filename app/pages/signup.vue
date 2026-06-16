<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/utils/alert";
import { Building2, ArrowRight, Lock } from "lucide-vue-next";

definePageMeta({
  layout: false,
});

const form = ref({
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
});
const { register } = useAuth();
const isPending = register.isPending;

const updateField = (key, value) => {
  form.value[key] = value;
};

const validate = () => {
  if (!form.value.firstName.trim()) return "First name is required";
  if (form.value.firstName.length > 50)
    return "First name must be less than 50 characters";

  if (!form.value.lastName.trim()) return "Last name is required";
  if (form.value.lastName.length > 50)
    return "Last name must be less than 50 characters";

  if (
    !form.value.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)
  ) {
    return "Invalid email address";
  }
  if (form.value.email.length > 255)
    return "Email must be less than 255 characters";

  if (form.value.password.length < 8)
    return "Password must be at least 8 characters";
  if (form.value.password.length > 72)
    return "Password must be less than 72 characters";

  if (form.value.password !== form.value.confirmPassword) {
    return "Passwords do not match";
  }

  return null;
};

const handleSubmit = async () => {
  const error = validate();
  if (error) {
    toast.error(error);
    return;
  }

  try {
    const payload = {
      first_name: form.value.firstName,
      last_name: form.value.lastName,
      email_address: form.value.email,
      password: form.value.password,
    };

    console.log("[Registration Payload]", JSON.stringify(payload, null, 2));
    await register.mutateAsync(payload);

    toast.success("Account created successfully! Please sign in.");
    navigateTo("/");
  } catch (err) {
    // Show the most specific error message available
    const gqlMsg = err?.graphQLErrors?.[0]?.message;
    toast.error(gqlMsg || err.message || "Failed to create account");
  }
};
</script>

<template>
  <div
    class="h-[100dvh] overflow-y-auto bg-background flex items-center justify-center px-4 py-8"
  >
    <div class="w-full max-w-md">
      <div class="flex flex-col items-center mb-8">
        <div
          class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4"
        >
          <Building2 class="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 class="text-2xl font-bold text-foreground">Create your account</h1>
        <p class="text-sm text-muted-foreground mt-1">
          Get started in just a moment
        </p>
      </div>

      <Card class="shadow-lg border-0 shadow-foreground/5">
        <CardHeader class="pb-4">
          <CardTitle class="text-lg">Sign Up</CardTitle>
          <CardDescription>Tell us a bit about yourself</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-2">
                <Label for="firstName">First name</Label>
                <Input
                  id="firstName"
                  :modelValue="form.firstName"
                  @update:modelValue="(v) => updateField('firstName', v)"
                  placeholder="Jane"
                />
              </div>
              <div class="space-y-2">
                <Label for="lastName">Last name</Label>
                <Input
                  id="lastName"
                  :modelValue="form.lastName"
                  @update:modelValue="(v) => updateField('lastName', v)"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="email">Email address</Label>
              <Input
                id="email"
                type="email"
                :modelValue="form.email"
                @update:modelValue="(v) => updateField('email', v)"
                placeholder="you@example.com"
              />
            </div>

            <div class="space-y-2">
              <Label for="password">Password</Label>
              <div class="relative">
                <Lock
                  class="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                />
                <Input
                  id="password"
                  type="password"
                  :modelValue="form.password"
                  @update:modelValue="(v) => updateField('password', v)"
                  placeholder="••••••••"
                  class="pl-10"
                />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="confirmPassword">Confirm password</Label>
              <div class="relative">
                <Lock
                  class="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                />
                <Input
                  id="confirmPassword"
                  type="password"
                  :modelValue="form.confirmPassword"
                  @update:modelValue="(v) => updateField('confirmPassword', v)"
                  placeholder="••••••••"
                  class="pl-10"
                />
              </div>
            </div>

            <Button type="submit" class="w-full" :disabled="isPending">
              {{ isPending ? "Creating account..." : "Create account" }}
              <ArrowRight v-if="!isPending" class="w-4 h-4 ml-2" />
            </Button>

            <p class="text-center text-sm text-muted-foreground">
              Already have an account?
              <NuxtLink
                to="/"
                class="text-primary font-medium hover:underline ml-1"
              >
                Sign in
              </NuxtLink>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

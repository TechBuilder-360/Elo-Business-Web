<script setup>
import { ref, computed } from "vue";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, UserPlus, Trash2, Lock } from "lucide-vue-next";
import { toast } from "@/utils/alert";

const props = defineProps({
  userRole: {
    type: String,
    default: "owner",
  },
});

const mockTeamMembers = [
  { id: "1", name: "Adebayo Ogunlesi", email: "adebayo@example.com", role: "owner" },
  { id: "2", name: "Fatima Ibrahim", email: "fatima@example.com", role: "admin" },
  { id: "3", name: "Chinedu Okafor", email: "chinedu@example.com", role: "manager" },
  { id: "4", name: "Amina Yusuf", email: "amina@example.com", role: "staff" },
];

const roleBadgeVariant = {
  owner: "default",
  admin: "default",
  manager: "secondary",
  staff: "outline",
};

const members = ref([...mockTeamMembers]);
const inviteEmail = ref("");

const canManageTeam = computed(() => {
  return props.userRole === "owner" || props.userRole === "admin";
});

const handleInvite = () => {
  if (
    !inviteEmail.value.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail.value)
  ) {
    toast.error("Please enter a valid email address");
    return;
  }
  toast.success(`Invitation sent to ${inviteEmail.value}`);
  inviteEmail.value = "";
};

const handleRemove = (id) => {
  members.value = members.value.filter((m) => m.id !== id);
  toast.success("Team member removed");
};

const updateRole = (member, newRole) => {
  members.value = members.value.map((m) =>
    m.id === member.id ? { ...m, role: newRole } : m
  );
  toast.success(`${member.name}'s role updated to ${newRole}`);
};
</script>

<template>
  <div v-if="!canManageTeam" class="flex flex-col items-center justify-center py-16 text-center">
    <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
      <Lock class="w-7 h-7 text-muted-foreground" />
    </div>
    <h3 class="text-lg font-semibold mb-1">Access Restricted</h3>
    <p class="text-sm text-muted-foreground max-w-sm">
      You don't have permission to view team members. Contact your admin for access.
    </p>
  </div>

  <div v-else class="space-y-6">
    <!-- Invite -->
    <Card class="border-0 shadow-md shadow-foreground/5">
      <CardContent class="p-4 flex gap-3">
        <Input
          placeholder="Email address"
          v-model="inviteEmail"
          class="flex-1"
        />
        <Button @click="handleInvite" size="sm">
          <UserPlus class="w-4 h-4 mr-2" />
          Invite
        </Button>
      </CardContent>
    </Card>

    <!-- Members List -->
    <div class="space-y-3">
      <Card
        v-for="member in members"
        :key="member.id"
        class="border-0 shadow-sm shadow-foreground/5"
      >
        <CardContent class="p-4 flex items-center gap-4">
          <Avatar class="h-10 w-10">
            <AvatarFallback class="bg-accent text-accent-foreground text-sm font-medium">
              {{
                member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              }}
            </AvatarFallback>
          </Avatar>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm truncate text-foreground">{{ member.name }}</p>
            <p class="text-xs text-muted-foreground truncate">{{ member.email }}</p>
          </div>
          <Badge
            v-if="member.role === 'owner'"
            :variant="roleBadgeVariant[member.role]"
            class="capitalize gap-1 text-foreground"
          >
            <Shield class="w-3 h-3 text-foreground" />
            {{ member.role }}
          </Badge>
          <div v-else class="flex items-center gap-2">
            <Select
              :modelValue="member.role"
              @update:modelValue="(val) => updateRole(member, val)"
            >
              <SelectTrigger class="w-[120px] h-8 text-xs capitalize">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              class="text-destructive h-8 w-8"
              @click="handleRemove(member.id)"
            >
              <Trash2 class="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

"use client";

import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return <>{user != null && <Dashboard user={user} />}</>;
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  allowedRoles: ("STUDENT" | "INSTRUCTOR")[];
  children: React.ReactNode;
};

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.replace("/unauthorized"); // or redirect to login if not logged in
    }
  }, [user, allowedRoles, router]);

  // Render nothing while checking (optional: add a loading state)
  if (!user || !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}

import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type RoleMetadata = {
  ROLE?: string;
  role?: string;
};

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const user = await currentUser();
  const metadata = (user?.unsafeMetadata ?? {}) as RoleMetadata;
  const role = metadata.role ?? metadata.ROLE;

  if (role !== "STUDENT") {
    if (role === "TEACHER") redirect("/teacher/dashboard");
    redirect("/onboarding");
  }

  return <>{children}</>;
}

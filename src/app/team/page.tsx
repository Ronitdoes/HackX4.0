import React from "react";
import Team from "@/components/Team";
import { getHackXMembers } from "@/lib/db/getHackXMembers";

export const revalidate = 3600;

export default async function TeamPage() {
  const members = await getHackXMembers();
  return <Team initialMembers={members} />;
}


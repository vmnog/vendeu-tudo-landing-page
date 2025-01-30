"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { facebookSignOut } from "@/app/auth/sign-in/actions";
import { fbLogout } from "@/services/facebook-sdk";


export function SignOutButton() {
  return (
    <Button variant="outline" size="icon" onClick={async () => {
      await facebookSignOut()
      await fbLogout()
    }}>
      <LogOut size={20} />
    </Button>
  );
}

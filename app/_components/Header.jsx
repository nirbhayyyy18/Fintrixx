"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-4 px-10 flex justify-between items-center border-b">
      <Link href="/dashboard">
        <span className="text-blue-800 font-bold text-xl">Fintrixx</span>
      </Link>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default Header;

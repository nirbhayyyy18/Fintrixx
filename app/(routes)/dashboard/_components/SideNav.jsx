import React, { useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  CircleDollarSign,
  TrendingUp,
  TrendingDownIcon,
  BarChart2,
  Wallet,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: BarChart2,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Income",
      icon: Wallet,
      path: "/dashboard/income",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex flex-col h-screen p-5 border-r w-64">
      <div className="flex items-center gap-2">
        <span className="text-blue-800 font-bold text-xl">Fintrixx</span>
      </div>
      <div className="flex flex-col gap-8 mt-8">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <div
              className={`flex gap-2 items-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer ${
                path == menu.path ? "bg-blue-50 text-blue-800" : ""
              }`}
            >
              <menu.icon />
              <h2>{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5">
        <UserButton />
      </div>
    </div>
  );
}

export default SideNav;

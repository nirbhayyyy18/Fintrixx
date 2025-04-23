"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import CreateIncome from "./_components/CreateIncome";
import IncomeItem from "./_components/IncomeItem";
import { formatCurrency } from "@/utils/currency";

function Income() {
  const { user } = useUser();
  const [incomeList, setIncomeList] = useState([]);

  useEffect(() => {
    user && getIncomeList();
  }, [user]);

  const getIncomeList = async () => {
    const result = await db
      .select()
      .from(Incomes)
      .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Incomes.id));

    setIncomeList(result);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">My Income</h2>
        <CreateIncome refreshData={() => getIncomeList()} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {incomeList?.length > 0
          ? incomeList.map((income, index) => (
              <IncomeItem
                key={index}
                income={income}
                refreshData={() => getIncomeList()}
              />
            ))
          : [1, 2, 3].map((item, index) => (
              <div
                key={index}
                className="h-[120px] w-full bg-slate-200 rounded-lg animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default Income; 
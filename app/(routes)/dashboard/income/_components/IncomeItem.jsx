import { db } from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/currency";

function IncomeItem({ income, refreshData }) {
  const deleteIncome = async (income) => {
    const result = await db
      .delete(Incomes)
      .where(eq(Incomes.id, income.id))
      .returning();

    if (result) {
      toast("Income Source Deleted!");
      refreshData();
    }
  };

  return (
    <div className="p-5 border rounded-2xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold">{income.name}</h2>
          <h2 className="text-sm text-gray-500">
            {new Date(income.createdAt).toDateString()}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-lg">{formatCurrency(income.amount)}</h2>
          <Trash
            className="text-red-500 cursor-pointer"
            onClick={() => deleteIncome(income)}
          />
        </div>
      </div>
    </div>
  );
}

export default IncomeItem; 
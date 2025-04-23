"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";

function CardInfo({ budgetList, incomeList }) {
  const totalBudget = budgetList?.reduce(
    (acc, budget) => acc + Number(budget.amount),
    0
  );
  const totalSpent = budgetList?.reduce(
    (acc, budget) => acc + Number(budget.totalSpend || 0),
    0
  );
  const totalIncome = incomeList?.reduce(
    (acc, income) => acc + Number(income.totalAmount || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-gray-500">Total Budget</h2>
          <h2 className="text-2xl font-bold">{formatCurrency(totalBudget)}</h2>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-gray-500">Total Spent</h2>
          <h2 className="text-2xl font-bold">{formatCurrency(totalSpent)}</h2>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-gray-500">Total Income</h2>
          <h2 className="text-2xl font-bold">{formatCurrency(totalIncome)}</h2>
        </CardContent>
      </Card>
    </div>
  );
}

export default CardInfo;

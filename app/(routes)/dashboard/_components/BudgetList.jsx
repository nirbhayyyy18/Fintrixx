"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";

export default function BudgetList({ budgetList, refreshData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {budgetList.map((budget) => (
        <Card key={budget.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{budget.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{formatCurrency(budget.amount)}</div>
            <p className="text-xs text-muted-foreground">
              {budget.totalSpent ? `Spent: ₹${formatCurrency(budget.totalSpent)}` : 'No expenses yet'}
            </p>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${Math.min(
                      (budget.totalSpent / budget.amount) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 
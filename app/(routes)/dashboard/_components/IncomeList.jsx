"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";
import { format } from "date-fns";

export default function IncomeList({ incomeList, refreshData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {incomeList.map((income) => (
        <Card key={income.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{income.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{formatCurrency(income.amount)}</div>
            <p className="text-xs text-muted-foreground">
              Added on {format(new Date(income.createdAt), "dd/MM/yyyy")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 
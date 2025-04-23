"use client"
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import CreateExpense from "./_components/CreateExpense";
import ExpenseListTable from "./_components/ExpenseListTable";
import { formatCurrency } from "@/utils/currency";

function ExpensesPage() {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
        icon: Budgets.icon,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">My Expenses</h2>
        <CreateExpense
          budgetList={budgetList}
          refreshData={() => getBudgetList()}
        />
      </div>
      <div className="mt-5">
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetList()}
        />
      </div>
    </div>
  );
}

export default ExpensesPage;
"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function CreateExpense({ budgetList, refreshData }) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [budgetId, setBudgetId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onCreateExpense = async () => {
    if (!name || !amount || !budgetId) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const result = await db.insert(Expenses).values({
        name,
        amount: parseFloat(amount),
        budgetId: parseInt(budgetId),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date().toISOString()
      }).returning();

      if (result) {
        toast.success("Expense added successfully");
        refreshData();
        setName("");
        setAmount("");
        setBudgetId("");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Error adding expense. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>Add Expense</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Select value={budgetId} onValueChange={setBudgetId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Budget" />
            </SelectTrigger>
            <SelectContent>
              {budgetList.map((budget) => (
                <SelectItem key={budget.id} value={budget.id.toString()}>
                  {budget.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Expense Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button onClick={onCreateExpense}>Add Expense</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
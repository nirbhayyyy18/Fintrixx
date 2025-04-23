"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/currency";

function CreateIncome({ refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const onCreateIncome = async () => {
    const result = await db
      .insert(Incomes)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      .returning();

    if (result) {
      refreshData();
      toast("New Income Source Added!");
      setOpen(false);
      setName("");
      setAmount("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-slate-100 p-10 rounded-2xl items-center flex flex-col border-2 border-dashed hover:shadow-md"
        >
          <h2 className="text-3xl">+</h2>
          <h2>Add Income Source</h2>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Income Source</DialogTitle>
          <DialogDescription>
            Add a new source of income to track your earnings
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5">
          <div className="mt-2">
            <h2 className="text-black font-medium my-1">Income Source Name</h2>
            <Input
              placeholder="e.g. Salary, Freelance"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <h2 className="text-black font-medium my-1">Amount</h2>
            <Input
              type="number"
              placeholder="e.g. 50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span className="text-sm text-gray-500">
              Current Amount: {formatCurrency(amount || 0)}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={!(name && amount)}
            onClick={onCreateIncome}
            className="mt-5 w-full rounded-full"
          >
            Add Income Source
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateIncome; 
"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CreateBudget({ refreshData }) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onCreateBudget = async () => {
    if (!name || !amount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const result = await db.insert(Budgets).values({
        name,
        amount: parseFloat(amount),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date().toISOString()
      }).returning();

      if (result) {
        toast.success("Budget created successfully");
        refreshData();
        setName("");
        setAmount("");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Error creating budget. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>Add Budget</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Input
            placeholder="Budget Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button onClick={onCreateBudget}>Create Budget</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
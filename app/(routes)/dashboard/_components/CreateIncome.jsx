"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Income } from "@/utils/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CreateIncome({ refreshData }) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onCreateIncome = async () => {
    if (!name || !amount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const result = await db.insert(Income).values({
        name,
        amount: parseFloat(amount),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date().toISOString()
      }).returning();

      if (result) {
        toast.success("Income added successfully");
        refreshData();
        setName("");
        setAmount("");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Error adding income. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>Add Income</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Income</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Input
            placeholder="Income Source"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button onClick={onCreateIncome}>Add Income</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
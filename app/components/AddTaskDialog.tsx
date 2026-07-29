"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddTaskDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
    <Button className="rounded-xl bg-blue-600 px-6 py-6 text-white hover:bg-blue-700" /> }
    >
      + New Task
</DialogTrigger>

    <DialogContent className="sm:max-w-xl rounded-3xl p-8">
      <p className="text-muted-foreground">
      Create a new task and organize it using the Eisenhower Matrix.
</p>
      
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Add New Task
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">

          <div>
            <Label htmlFor="title">
              Title
            </Label>

            <Input
              id="title"
              placeholder="Database Project"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="description">
              Description
            </Label>

            <Textarea
              id="description"
              placeholder="Finish Prisma integration..."
              className="mt-2"
            />
          </div>

          <div>
            <Label>
              Priority
            </Label>

            <select
              className="
              mt-2
              w-full
              rounded-lg
              border
              border-slate-300
              p-3
              outline-none
              focus:border-blue-500
              "
            >
              <option>🔥 Do Now</option>
              <option>📅 Schedule</option>
              <option>🤝 Delegate</option>
              <option>🗑 Eliminate</option>
            </select>
          </div>

          <div>
            <Label htmlFor="date">
              Due Date
            </Label>

            <Input
              id="date"
              type="date"
              className="mt-2"
            />
          </div>

        <DialogFooter showCloseButton>

         <Button className="bg-blue-600 hover:bg-blue-700">
              Create Task
          </Button>

</DialogFooter>

        </div>

      </DialogContent>
    </Dialog>
  );
}
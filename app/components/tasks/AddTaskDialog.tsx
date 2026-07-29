"use client";

import { useState } from "react";

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddTaskDialog() {
  const [open, setOpen] = useState(false);

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [quadrant, setQuadrant] = useState("SCHEDULE");
const [priority, setPriority] = useState("MEDIUM");
const [deadline, setDeadline] = useState("");


 const createTask = async () => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      quadrant,
      priority,
      deadline,
    }),
  });

  if (!response.ok) {
    alert("Failed to create task.");
    return;
  }

  setOpen(false);

  setTitle("");
  setDescription("");
  setQuadrant("SCHEDULE");
  setPriority("MEDIUM");
  setDeadline("");
};



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="rounded-2xl bg-[#E8D39C] px-6 py-6 font-semibold text-[#3E3125] shadow-sm transition-all duration-200 hover:bg-[#DFC785]">
            New Task
          </Button>
        }
      />

      <DialogContent className="max-w-xl rounded-[32px] border border-[#E8DDC7] bg-[#FAF8F4] p-8 shadow-2xl">

        <DialogHeader>

          <DialogTitle className="text-3xl font-bold text-[#3E3125]">
            Create New Task
          </DialogTitle>

          <DialogDescription className="mt-2 text-base leading-7 text-[#7C6A58]">
            Add a task to your workspace and organise it using the
            Eisenhower Matrix.
          </DialogDescription>

        </DialogHeader>

        <div className="mt-8 space-y-6">

          <div>

            <Label
              htmlFor="title"
              className="mb-2 block font-medium text-[#5B4C3D]"
            >
              Title
            </Label>

           <Input
              id="title"
              placeholder="Database Project"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
               />

          </div>

          <div>

            <Label
              htmlFor="description"
              className="mb-2 block font-medium text-[#5B4C3D]"
            >
              Description
            </Label>

            <Textarea
                id="description"
                placeholder="Finish Prisma integration..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

          </div>

          <div>

            <Label className="mb-2 block font-medium text-[#5B4C3D]">
              Priority
            </Label>

          <select

            value={quadrant}
            onChange={(e) => setQuadrant(e.target.value)}
            className="mt-2 w-full rounded-xl border border-stone-300 bg-white p-3">
            <option value="DO_NOW">Urgent & Important</option>
            <option value="SCHEDULE">Important, Not Urgent</option>
            <option value="DELEGATE">Urgent, Not Important</option>
            <option value="ELIMINATE">Neither Urgent nor Important</option>
          </select>

          </div>

        <div>
          <Label>Priority</Label>

          <select
           value={priority}
           onChange={(e) => setPriority(e.target.value)}
           className="mt-2 w-full rounded-xl border border-stone-300 bg-white p-3"
             >
           <option value="HIGH">High</option>
           <option value="MEDIUM">Medium</option>
           <option value="LOW">Low</option>
         </select>
        </div>

          <div>

            <Label
              htmlFor="date"
              className="mb-2 block font-medium text-[#5B4C3D]"
            >
              Due Date
            </Label>

           <Input
            type="date"
             value={deadline}
             onChange={(e) => setDeadline(e.target.value)}
            />

          </div>
                  </div>

        <DialogFooter className="mt-8 flex gap-3">

          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="
              flex-1
              rounded-xl
              border-[#E8DDC7]
              bg-white
              text-[#5B4C3D]
              transition
              hover:bg-[#F7F2E8]
            "
          >
            Cancel
          </Button>


         <Button
           onClick={createTask}
           className="rounded-xl bg-[#D8B36A] text-white hover:bg-[#C7A25B]"
         >
            Create Task
        </Button>

       </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
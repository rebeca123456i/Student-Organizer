"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

interface EditTaskDialogProps {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  quadrant: "DO_NOW" | "SCHEDULE" | "DELEGATE" | "ELIMINATE";
  deadline?: string;
}


export default function EditTaskDialog({
  id,
  title: initialTitle,
  description: initialDescription,
  priority: initialPriority,
  quadrant: initialQuadrant,
  deadline: initialDeadline = "",
}: EditTaskDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [quadrant, setQuadrant] = useState(initialQuadrant);
  const [priority, setPriority] = useState(initialPriority);
  const [deadline, setDeadline] = useState(initialDeadline);

  async function updateTask() {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
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
      alert("Failed to update task.");
      return;
    }

    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
  <Button className="rounded-lg bg-[#D8B36A] px-3 py-1 text-white hover:bg-[#C7A25B]">
    Edit
  </Button>
</DialogTrigger>

      <DialogContent className="max-w-xl rounded-[32px] border border-[#E8DDC7] bg-[#FAF8F4] p-8 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-[#3E3125]">
            Edit Task
          </DialogTitle>

          <DialogDescription className="mt-2 text-base leading-7 text-[#7C6A58]">
            Update your task information.
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
          <Label className="mb-2 block font-medium text-[#5B4C3D]">
             Task Category
          </Label>

          <select
            value={quadrant}
            onChange={(e) =>
          setQuadrant(
          e.target.value as
           | "DO_NOW"
           | "SCHEDULE"
           | "DELEGATE"
           | "ELIMINATE"
         )
      }
  className="mt-2 w-full rounded-xl border border-stone-300 bg-white p-3"
>
  <option value="DO_NOW">
     Urgent & Important
  </option>

  <option value="SCHEDULE">
    Important, Not Urgent
  </option>

  <option value="DELEGATE">
    Urgent, Not Important
  </option>

  <option value="ELIMINATE">
     Neither Urgent nor Important
  </option>
</select>
          </div>

          <div>
            <Label className="mb-2 block font-medium text-[#5B4C3D]">
              Priority
            </Label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as "HIGH" | "MEDIUM" | "LOW"
                )
              }
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white p-3"
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <div>
            <Label
              htmlFor="deadline"
              className="mb-2 block font-medium text-[#5B4C3D]"
            >
              Due Date
            </Label>

            <Input
              id="deadline"
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
            className="flex-1 rounded-xl border-[#E8DDC7] bg-white text-[#5B4C3D] hover:bg-[#F7F2E8]"
          >
            Cancel
          </Button>

          <Button
            onClick={updateTask}
            className="rounded-xl bg-[#D8B36A] text-white hover:bg-[#C7A25B]"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { useRef, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  EventContentArg,
  EventClickArg,
} from "@fullcalendar/core";

import "./calendar.css";

export default function Calendar({
  events,
}: {
  events: any[];
}) {
  const calendarRef = useRef<FullCalendar>(null);

  const [title, setTitle] = useState("");

  const [selectedTask, setSelectedTask] = useState<any>(null);

  const [open, setOpen] = useState(false);

  function updateTitle() {
    const api = calendarRef.current?.getApi();

    if (!api) return;

    setTitle(api.view.title);
  }

  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <div className="overflow-hidden rounded-lg px-2 py-1 text-xs font-semibold">
        {eventInfo.event.title}
      </div>
    );
  }

  function handleEventClick(info: EventClickArg) {
    setSelectedTask({
      id: info.event.id,

      title: info.event.title.replace(/^.\s/, ""),

      description: info.event.extendedProps.description,

      priority: info.event.extendedProps.priority,

      quadrant: info.event.extendedProps.quadrant,

      status: info.event.extendedProps.status,

      deadline: info.event.startStr,
    });

    setOpen(true);
  }

  return (
    <div className="rounded-[32px] border border-[#E8DDC7] bg-[#FAF8F4] p-8 shadow-xl">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-[#3E3125]">
            Calendar
          </h1>

          <p className="mt-1 text-[#7C6A58]">
            Organise your semester.
          </p>

        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() => {
              calendarRef.current?.getApi().prev();
              updateTitle();
            }}
            className="rounded-xl bg-[#E8D39C] px-4 py-2 font-semibold text-[#3E3125] hover:bg-[#DFC785]"
          >
            ←
          </button>

          <h2 className="min-w-[220px] text-center text-2xl font-bold text-[#3E3125]">
            {title}
          </h2>

          <button
            onClick={() => {
              calendarRef.current?.getApi().next();
              updateTitle();
            }}
            className="rounded-xl bg-[#E8D39C] px-4 py-2 font-semibold text-[#3E3125] hover:bg-[#DFC785]"
          >
            →
          </button>

          <button
            onClick={() => {
              calendarRef.current?.getApi().today();
              updateTitle();
            }}
            className="rounded-xl bg-[#D8B36A] px-5 py-2 font-semibold text-white hover:bg-[#C7A25B]"
          >
            Today
          </button>

        </div>

      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={false}
        height="auto"
        fixedWeekCount={false}
        dayMaxEvents={2}
        showNonCurrentDates={false}
        datesSet={updateTitle}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />

    </div>
  );
}
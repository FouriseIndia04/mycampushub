import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

const STORAGE_KEY = "campus_events_v1";

export function EventProvider({ children }) {
  // 🔹 Load from localStorage on first load
  const [events, setEvents] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 🔹 Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  /* =========================
     ORGANISER
     ========================= */

  const addEvent = (event) => {
    setEvents((prev) => [
      ...prev,
      {
        ...event,
        status: "pending",
        registrations: 0,
      },
    ]);
  };

  /* =========================
     ADMIN
     ========================= */

  const updateEventStatus = (id, status) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status } : e
      )
    );
  };

  // 🔥 DELETE REJECTED EVENT (PERMANENT)
  const deleteEvent = (id) => {
    setEvents((prev) =>
      prev.filter((event) => event.id !== id)
    );
  };
const SEED_EVENTS = [
  {
    id: 1,
    title: "Tech Hackathon 2026",
    category: "Technology",
    date: "2026-03-10",
    venue: "Main Auditorium",
    description: "48-hour coding challenge",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    status: "approved",
    registrations: 120,
  },
];

useEffect(() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    setEvents(SEED_EVENTS);
  }
}, []);

  /* =========================
     STUDENT
     ========================= */

  const registerForEvent = (id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id && e.status === "approved"
          ? { ...e, registrations: e.registrations + 1 }
          : e
      )
    );
  };

  /* =========================
     DERIVED DATA
     ========================= */

  const approvedEvents = events.filter(
    (e) => e.status === "approved"
  );

  const pendingEvents = events.filter(
    (e) => e.status === "pending"
  );

  const rejectedEvents = events.filter(
    (e) => e.status === "rejected"
  );

  return (
    <EventContext.Provider
      value={{
        events,
        approvedEvents,
        pendingEvents,
        rejectedEvents,
        addEvent,
        updateEventStatus,
        deleteEvent,       //✅ EXPOSED
        registerForEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

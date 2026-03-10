import React, { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [approvedEvents, setApprovedEvents] = useState([]);

  return (
    <EventContext.Provider value={{ approvedEvents, setApprovedEvents }}>
      {children}
    </EventContext.Provider>
  );
};

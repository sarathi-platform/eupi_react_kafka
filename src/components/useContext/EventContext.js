import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [details, setDetails] = useState({});

  const handleDetailsChange = (id, name, value) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [id]: {
        ...prevDetails[id],
        [name]: value,
      },
    }));
  };

  return (
    <EventContext.Provider value={{ details, setDetails, handleDetailsChange }}>
      {children}
    </EventContext.Provider>
  );
};

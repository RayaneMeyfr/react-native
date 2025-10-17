import React, { createContext, useState, useContext } from 'react';
import { dataContact } from './data/dataContact';

const ContactContext = createContext();

export const useContacts = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState(dataContact);

  const addContact = (newContact) => {
    setContacts((prev) => {
      const lastId = prev.length > 0 ? prev[prev.length - 1].id : 0;
      const nextId = lastId + 1;
      return [...prev, { id: nextId, ...newContact }];
    });
  };

  const removeContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, removeContact }}>
      {children}
    </ContactContext.Provider>
  );
};

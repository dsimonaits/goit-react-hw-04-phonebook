import { useState, useEffect } from 'react';
import Section from './Section';
import ContactForm from './ContactForm';
import FilterByName from './Filter';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';

const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const localStorageContacts = localStorage.getItem('contacts');
    const contactsParsed = JSON.parse(localStorageContacts);

    if (localStorageContacts) {
      return contactsParsed;
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const id = nanoid();
    const newContact = { ...data, id };

    contacts.find(contact => contact.name === data.name)
      ? alert(`${data.name} is already in contacts`)
      : setContacts([...contacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const filterValue = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContactsByName = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  const contactsByName = filterContactsByName();
  return (
    <>
      <Section title="Phonebook" border="false">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="Contacts" border="true">
        {contacts.length === 0 ? (
          <p>Sorry your contact list is empty. Add someone.</p>
        ) : (
          <FilterByName value={filter} onChange={filterValue} />
        )}

        <ContactList
          contacts={contactsByName}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
};

export default App;

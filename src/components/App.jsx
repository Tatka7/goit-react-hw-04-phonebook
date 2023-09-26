import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';

import Section from './section/Section';
import Form from './phonebook/Form';
import ContactsList from './contacts/ContactsList';
import Filter from './filter/Filter';

Notify.init({
  fontSize: '20px',
  width: '400px',
  position: 'top-center',
  cssAnimationDuration: 500,
  cssAnimationStyle: 'zoom',
});

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log();
    const localContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (checkOriginalNames(contacts, name)) {
      Notify.failure(`${name} is already in contacts list`);
      return;
    }

    const currentSubmit = {
      name,
      number,
      id: nanoid(),
    };

    setContacts(prevState => [...prevState.contacts, currentSubmit]);
  };

  const onFilterChange = evt => {
    const filterValue = evt.currentTarget.value.toLowerCase();
    setFilter(filterValue);
  };

  const checkOriginalNames = (contacts, contact) => {
    return contacts.some(
      ({ name }) => name.toLowerCase() === contact.toLowerCase()
    );
  };

  const deleteContact = contactId => {
    // setContacts(prevState => {
    //   return {
    //     contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    //   };
    // });
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filterContacts = () => {
    // const { contacts, filter } = this.state;
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  const filteredContacts = filterContacts();

  return (
    <div className={css.container}>
      <Section title="Phonebook">
        <Form addContact={addContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length !== 0 && (
          <>
            <Filter changeFilter={onFilterChange} value={filter} />
            <ContactsList
              contacts={filteredContacts}
              deleteContact={deleteContact}
            />
          </>
        )}
      </Section>
    </div>
  );
}

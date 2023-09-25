import { Component } from 'react';
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

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    console.log();
    const localContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const contacts = this.state.contacts;
    // const form = evt.currentTarget;

    if (this.checkOriginalNames(contacts, name)) {
      Notify.failure(`${name} is already in contacts list`);
      return;
    }

    const currentSubmit = {
      name,
      number,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, currentSubmit],
    }));
  };

  onFilterChange = evt => {
    const filterValue = evt.currentTarget.value.toLowerCase();
    this.setState({ filter: filterValue });
  };

  checkOriginalNames = (contacts, contact) => {
    return contacts.some(
      ({ name }) => name.toLowerCase() === contact.toLowerCase()
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.filterContacts();
    return (
      <div className={css.container}>
        <Section title="Phonebook">
          <Form addContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          {contacts.length !== 0 && (
            <>
              <Filter changeFilter={this.onFilterChange} value={filter} />
              <ContactsList
                contacts={filteredContacts}
                deleteContact={this.deleteContact}
              />
            </>
          )}
        </Section>
      </div>
    );
  }
}

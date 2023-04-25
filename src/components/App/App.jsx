import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container, Title, SubTitle } from 'components/App/App.styled';
import { ContactForm, ContactList, React, Filter } from 'components/App/index';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsLS = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsLS);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onAddContact = data => {
    const { name, number } = data;
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      const isContactExist = contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );

      if (isContactExist) {
        alert(`${name} is already in contacts`);
        return;
      }

      setContacts(prevContacts => [newContact, ...prevContacts]);
    }
  };

  const onContactDelete = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={onAddContact} />
      <SubTitle>Contacts</SubTitle>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={contacts}
        getFilteredContacts={getFilteredContacts}
        onContactDelete={onContactDelete}
      />
    </Container>
  );
}

export default App;

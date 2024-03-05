import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { IconContext } from "react-icons";
import { GiRotaryPhone } from "react-icons/gi";

import { ContactForm, Filter, ContactList, Notification } from 'components';

import { Wrapper, TitleWrapper, Title, Subtitle } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState([
      {id: 'id-1', name: 'Rosie Simpson', number: '+38-011-459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '+38-022-443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '+38-033-645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '+38-055-227-91-26'},
    ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem("contacts"));

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts]);
  
  const onAddContact = ({ name, number }) => {     
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      const isContactExist = contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );

      if (isContactExist) {
        alert(`${name} is already in contacts`);
        return;
      }

      setContacts(prevState => [newContact, ...prevState]);
    }
  }

  const onDeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const handleInputChange = e => {
    setFilter(e.currentTarget.value.trim());
  };

  const getFilteredContacts = () => contacts.filter(contact =>contact.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Wrapper>
      <TitleWrapper>
        <IconContext.Provider value={{ size: '40px', color: '#ffffff' }}>
          <GiRotaryPhone />
        </IconContext.Provider>
        <Title>
          Phonebook
        </Title>
      </TitleWrapper>        
      <ContactForm onSubmit={onAddContact} />
      <Subtitle>Contacts</Subtitle>
      <Filter
        value={filter}
        handleInputChange={handleInputChange}
      />
      {contacts.length !== 0
        ? <ContactList
            onDeleteContact={onDeleteContact}
            getFilteredContacts={getFilteredContacts}
          />
        : <Notification message="Your contact list is empty" />
      }        
    </Wrapper> 
  )
}

export default App;
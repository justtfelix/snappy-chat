import { useState, useEffect } from 'react';
import { NoUsers } from '../../assets';
import { isEmptyOrSpaces } from '../../utils';
import { IContactsProps, IUser } from '../../interfaces';
import { Brand, ShowContacts } from '../../layouts';
import {
  ContactsContainer, ContactsBlock, ContactsWrapper, AvatarImg, 
  CurrentUser, Username, NoUsersContent, SearchInput 
} from '../../components';

function Contacts(props: IContactsProps) {
  const { contacts, currentUser, changeChat } = props;
  const [currentUsername, setCurrentUsername] = useState<string | undefined>(undefined);
  const [currentUserImage, setCurrentUserImage] = useState<string | undefined>(undefined);
  const [filteredContacts, setFilteredContacts] = useState<IUser[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    if (currentUser) {
      setCurrentUsername(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  useEffect(() => {
    const re = RegExp(
      `.*${searchInput.toLowerCase().replace(/\s+/g, '').split('').join('.*')}.*`
    );

    const searchResults = contacts.filter((contact) => {
      return contact.username.toLowerCase().match(re);
    });

    setFilteredContacts(searchResults);
  }, [searchInput]);

  return (
    <ContactsContainer>
      <Brand isAuthContent={false} />
      {contacts.length > 0 ? (
        <ContactsBlock>
          <SearchInput 
            type='text'
            placeholder='Search contacts'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            autoComplete='off'
          />
          <ContactsWrapper>
            {isEmptyOrSpaces(searchInput) ? (
              <ShowContacts contacts={contacts} changeChat={changeChat} />
            ) : filteredContacts.length > 0 ? (
              <ShowContacts contacts={filteredContacts} changeChat={changeChat} />
            ) : (
              <div>No contacts found</div>
            )}
          </ContactsWrapper>
        </ContactsBlock>
      ) : (
        <NoUsersContent>
          <div>
            <img src={NoUsers} alt='No users' />
            <h3>No Users Found</h3>
          </div>
        </NoUsersContent>
      )}
      {currentUsername && currentUserImage && (
        <CurrentUser>
          <AvatarImg
            src={`data:image/svg+xml;base64,${currentUserImage}`}
            isChatContent={true}
            alt={`${currentUsername}'s avatar`}
          />
          <Username>{currentUsername}</Username>
        </CurrentUser>
      )}
    </ContactsContainer>
  )
}

export default Contacts;
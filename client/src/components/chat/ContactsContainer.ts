import styled from 'styled-components';

const ContactsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.nightBlue};
  display: grid;
  grid-template-rows: 11% 75% 14%;
  overflow: hidden;
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
`;

export default ContactsContainer;
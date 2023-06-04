import styled, { css } from 'styled-components';
import { AvatarWrapperProps } from '../../interfaces';

const AvatarWrapper = styled.div<AvatarWrapperProps>`
  ${({ isSelectedAvatar, theme }) => css`
    border: 6px solid ${isSelectedAvatar ? theme.colors.hanPurple : 'transparent'};
    transition: ${theme.transition};
  `}
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.hanPurple};
  }
`;

export default AvatarWrapper;
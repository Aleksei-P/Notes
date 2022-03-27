import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkText = styled(Link)`
  background: none;
  color: none !important;
  border: none;
  padding: 0;
  font: inherit;
  text-decoration: none;
  pointer-events: unset;
  cursor: pointer;

  :link,
  :visited {
    color: #0077cc;
}
:hover,
:focus {
    color: #004499;
}
`;

export default LinkText;

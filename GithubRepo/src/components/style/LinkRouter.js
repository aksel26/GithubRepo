import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  :hover {
    color: tomato;
    cursor: pointer;
    text-decoration: none;
    color: brown;
    font-size: 120%;
    transition: 0.2s;
  }
`;

export default StyledLink;

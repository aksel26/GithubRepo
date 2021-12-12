import styled from "styled-components";
import { Link } from "react-router-dom";

const List = styled.li`
  text-decoration: none;
  list-style: none;
  color: #333;

  :hover {
    color: yellow;
    cursor: pointer;
    text-decoration: none;
    font-size: 120%;
    transition: 0.3s;
  }
  padding: 6px 0;
`;

export default List;

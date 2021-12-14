import styled from "styled-components";

const List = styled.li`
  text-decoration: none;
  list-style: none;
  color: #333;
  font-weight: 700px;

  :hover {
    color: brown;
    cursor: pointer;
    text-decoration: none;
    font-size: 110%;
    /* transition: 0.1s; */
  }
  padding: 6px 0;
`;

export default List;

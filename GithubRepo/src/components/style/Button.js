import styled from "styled-components";

const Button = styled.button`
  background: white;
  height: 34px;
  padding: 8px;
  margin: 0 10px;
  outline: none;
  box-shadow: none;
  border: 1px solid #333;
  border-radius: 5px;
  :hover {
    background: black;
    color: white;
    cursor: pointer;
  }
  font-size: 13px;
  font-family: "Do Hyeon", sans-serif;
`;

export default Button;

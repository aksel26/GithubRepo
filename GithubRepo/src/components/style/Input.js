import styled from "styled-components";

const Input = styled.input`
  background: transparent;
  border-radius: 5px;
  border: 2px solid black;
  ::placeholder {
    font-size: 13px;
    color: #333;
  }
  height: 30px;
  margin-right: 20px;
  text-align: center;
`;

export default Input;

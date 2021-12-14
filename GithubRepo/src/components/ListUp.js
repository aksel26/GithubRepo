import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import Button from "./style/Button";
import LinkRouter from "./style/LinkRouter";
function ListUp() {
  const [items, setItems] = useState([]);

  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    setItems(state.data);
  }, [state]);

  const deleteElement = (e) => {
    const id = e.target.id;

    dispatch({ type: "DELETE", payload: id });
  };

  const logOut = () => {
    if (state.isLoggedIn) {
      dispatch({
        type: "LOGOUT",
      });
    }
  };
  const listSelected = () => {
    if (items.length >= 1) {
      return items.map((v, id) => (
        <li style={{ listStyle: "none", padding: "3px 0px" }} key={id}>
          <LinkRouter to={v.name}>{v.name}</LinkRouter>
          <Button name={v.name} id={v.storeId} onClick={deleteElement}>
            삭제
          </Button>
        </li>
      ));
    } else {
      return null;
    }
  };

  return (
    <div>
      <div>
        <Button onClick={logOut}>로그아웃</Button>
        <h1>선택된 저장소</h1>
      </div>
      <div>
        <ul style={{ paddingLeft: "0px" }}>{listSelected()}</ul>
      </div>
    </div>
  );
}

export default ListUp;

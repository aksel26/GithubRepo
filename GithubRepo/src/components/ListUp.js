import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./style/Button";
import { deleteTarget, logout } from "../redux/actions";
import LinkRouter from "./style/LinkRouter";
function ListUp() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.list.data);
  const logInFlag = useSelector((state) => state.login.isLoggedIn);
  console.log("logInFlag: ", logInFlag);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(state);
  }, [state]);

  const deleteElement = (e) => {
    const targetId = e.target.id;

    dispatch(deleteTarget(targetId));
  };

  const logOut = () => {
    if (logInFlag) {
      dispatch(logout());
    }
  };
  const listSelected = () => {
    if (items.length >= 1) {
      return items.map((v, id) => (
        <li style={{ listStyle: "none", padding: "3px 0px" }} key={id}>
          <LinkRouter to={v.name}>{v.name}</LinkRouter>
          <Button name={v.name} id={v.id} onClick={deleteElement}>
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

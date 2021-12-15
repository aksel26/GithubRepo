import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../App";
import Button from "./style/Button";
import { deleteTarget } from "../redux/actions";
import LinkRouter from "./style/LinkRouter";
function ListUp() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.list.data);
  const [items, setItems] = useState([]);

  // const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    setItems(state);
  }, [state]);

  const deleteElement = (e) => {
    const targetId = e.target.id;

    // dispatch({ type: "DELETE", payload: id });
    dispatch(deleteTarget(targetId));
  };

  const logOut = () => {
    // if (state.isLoggedIn) {
    //   dispatch({
    //     type: "LOGOUT",
    //   });
    // }
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

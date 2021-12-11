import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

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
        <ul>
          <li>
            <Link to={v.name}>{v.name}</Link>
            <button
              name={v.name}
              id={v.storeId}
              onClick={deleteElement}
              variant="outlined"
            >
              삭제
            </button>
          </li>
        </ul>
      ));
    } else {
      return null;
    }
  };

  return (
    <div style={{ width: "50%", justifyContent: "center" }}>
      <div>
        <button variant="outlined" onClick={logOut}>
          로그아웃
        </button>
        <h2>선택된 저장소</h2>
      </div>
      <div>{listSelected()}</div>
    </div>
  );
}

export default ListUp;

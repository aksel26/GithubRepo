import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import ListUp from "./ListUp";
import { AuthContext } from "../App";

function TestMain() {
  const [rawData, setRawData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [storage] = useState([]);
  const [selected] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const [userId] = useState(state?.user?.login || "");

  const loadData = async () => {
    setLoading(true);

    await Axios.get(`https://api.github.com/users/${userId}/repos`).then(
      (response) => {
        if (response.status === 200) {
          setRawData(response.data);
          setLoading(false);
        } else {
          alert("불러오기 실패");
        }
      }
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!state.isLoggedIn) {
    return <Navigate to="/gitRepo" />;
  }

  const handleSave = (detail) => {
    dispatch({
      type: "ADD",
      payload: { name: detail.name, storeId: detail.id },
    });
  };

  const handlerSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const initSelected = (e) => {
    e.preventDefault();
    dispatch({ type: "DELETE_ALL" });
  };

  const listUp = (rawData, loading) => {
    if (loading) {
      return <h2>Loading...</h2>;
    }
    return rawData.map((v) => {
      if (v.name.indexOf(inputSearch) !== -1) {
        return (
          <ul>
            <li
              sx={{ m: -2.5 }}
              onClick={() => {
                handleSave(v);
              }}
            >
              {v.name}
            </li>
          </ul>
        );
      } else {
        return null;
      }
    });
  };
  return (
    <div>
      <div style={{ width: "50%" }}>
        <input
          value={inputSearch}
          onChange={handlerSearch}
          placeholder="저장소 이름을 입력하세요"
          variant="outlined"
        />
        <button variant="outlined" onClick={initSelected}>
          다시 담기
        </button>
        {listUp(rawData, loading)}
      </div>

      <ListUp selected={selected} detail={storage} rawData={rawData}></ListUp>
    </div>
  );
}

export default TestMain;

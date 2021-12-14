import React, { useEffect, useState, useContext, useCallback } from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import ListUp from "./ListUp";
import { AuthContext } from "../App";
import Button from "./style/Button";
import Input from "./style/Input";
import Wrapper from "./style/Wrapper";
import Left from "./style/Left";
import Right from "./style/Right";
import Container from "./style/Container";
import List from "./style/List";

function TestMain() {
  const [rawData, setRawData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [storage] = useState([]);
  const [selected] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const [userId] = useState(state?.user?.login || "");

  const loadData = useCallback(async () => {
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
  }, [userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = useCallback(
    (detail) => {
      dispatch({
        type: "ADD",
        payload: { name: detail.name, storeId: detail.id },
      });
    },
    [dispatch]
  );

  const listUp = useCallback(
    (rawData, loading) => {
      if (loading) {
        return <h2>Loading...</h2>;
      }
      return rawData.map((v, index) => {
        if (v.name.indexOf(inputSearch) !== -1) {
          return (
            <List
              onClick={() => {
                handleSave(v);
              }}
              key={index}
            >
              {v.name}
            </List>
          );
        } else {
          return null;
        }
      });
    },
    [handleSave, inputSearch]
  );

  if (!state.isLoggedIn) {
    return <Navigate to="/gitRepo" />;
  }

  const handlerSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const initSelected = (e) => {
    e.preventDefault();
    dispatch({ type: "DELETE_ALL" });
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Input
            value={inputSearch}
            onChange={handlerSearch}
            placeholder="저장소 이름을 입력하세요"
          />

          <Button onClick={initSelected}>다시 담기</Button>
          <h1>Storage List</h1>
          <ul style={{ paddingLeft: "0px" }}>{listUp(rawData, loading)}</ul>
        </Left>
        <Right>
          <ListUp
            selected={selected}
            detail={storage}
            rawData={rawData}
          ></ListUp>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default TestMain;

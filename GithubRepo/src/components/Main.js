import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { add } from "../redux/actions";
import Axios from "axios";
import ListUp from "./ListUp";
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
  const [Loading, setLoading] = useState(false);
  // const { state, dispatch } = useContext(AuthContext);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [userId] = useState(state?.login?.user?.login || "");

  const loadData = useCallback(async () => {
    setLoading(true);
    await Axios.get(`https://api.github.com/users/${userId}/repos`, {
      headers: { Authorization: process.env.PAT },
    }).then((response) => {
      if (response.status === 200) {
        setRawData(response.data);
        setLoading(false);
      } else {
        alert("불러오기 실패");
      }
    });
  }, [setLoading, userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = useCallback(
    (detail) => {
      dispatch(add(detail));
    },
    [dispatch]
  );

  const listUp = (rawData) => {
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
  };
  if (!state.login.isLoggedIn) {
    return <Navigate to="/gitRepo" />;
  }

  const handlerSearch = (e) => {
    e.preventDefault();
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
          <ul style={{ paddingLeft: "0px" }}>{listUp(rawData)}</ul>
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

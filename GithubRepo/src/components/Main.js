import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import ListUp from "./ListUp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CheckIcon from "@mui/icons-material/Check";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../App";

function TestMain() {
  const [rawData, setRawData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [storage] = useState([]);
  const [selected] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AuthContext);

  const loadData = async () => {
    setLoading(true);
    const tt = localStorage.getItem("user").split(",");
    const ttt = tt[0].split(":");
    const id = ttt[1].replace(/[""]/g, "");

    await Axios.get(`https://api.github.com/users/${id}/repos`).then(
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

  // useEffect(() => {
  //   if (storage.length >= 1) {
  //     selectedList(storage.id)
  //   }
  // }, [rawData])

  // useEffect(() => {
  //   if (storage.name !== undefined || storage.id !== undefined)
  //     toLocal(storage.name, storage.id)
  // }, [storage])

  if (!state.isLoggedIn) {
    return <Navigate to="/gitRepo" />;
  }
  // const extractStorage = (id) => {
  //   if (localStorage.getItem(id) !== null) {
  //     return localStorage.getItem(id).replace(/[""]/g, "")
  //   } else {
  //     return null
  //   }
  // }
  const handleSave = (detail) => {
    // console.log('detail: ', detail);
    dispatch({
      type: "ADD",
      payload: { name: detail.name, storeId: detail.id },
    });
  };

  // const toLocal = (item, id) => {
  //   if (localStorage.length <= 3) {
  //     localStorage.setItem(id, item)
  //     selectedList(id)
  //   } else return Swal.fire("최대 4개까지 등록가능합니다")
  // }
  // const selectedList = (id) => {
  //   if (extractStorage(id) !== null) {
  //     return setSelected([extractStorage(id)])
  //   }
  // }

  const handlerSearch = (e) => {
    setInputSearch(e.target.value);
  };

  // 다시담기
  const initSelected = () => {
    // localStorage.clear()
    // setSelected([])
    // setStorage([])

    dispatch({ type: "DELETE_ALL" });
  };

  const logOut = () => {
    if (state.isLoggedIn) {
      dispatch({
        type: "LOGOUT",
      });
    }
  };

  const listUp = (rawData, loading) => {
    if (loading) {
      return <h2>Loading...</h2>;
    }
    return rawData.map((v) => {
      if (v.name.indexOf(inputSearch) !== -1) {
        return (
          <List>
            <ListItem sx={{ m: -2 }}>
              <ListItemIcon>
                <CheckIcon sx={{ width: "100%" }} />
              </ListItemIcon>
              <ListItemButton
                onClick={() => {
                  handleSave(v);
                }}
              >
                <ListItemText
                  sx={{ width: "50%" }}
                  primary={v.name}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        );
      } else {
        return null;
      }
    });
  };
  return (
    <Grid container spacing={2} padding={10}>
      <Grid item xs={6}>
        <TextField
          value={inputSearch}
          onChange={handlerSearch}
          id="outlined-basic"
          label="저장소 이름을 입력하세요"
          variant="outlined"
          sx={{ mb: 4 }}
        />
        <Button
          variant="outlined"
          onClick={initSelected}
          sx={{ ml: 10, height: "56px" }}
        >
          다시 담기
        </Button>
        {listUp(rawData, loading)}
      </Grid>

      <Grid item xs={6}>
        <Button variant="outlined" onClick={logOut}>
          로그아웃
        </Button>
        <h2>선택된 저장소</h2>

        <ListUp selected={selected} detail={storage} rawData={rawData}></ListUp>
      </Grid>
    </Grid>
  );
}

export default TestMain;

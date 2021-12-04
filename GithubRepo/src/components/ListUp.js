import React, { useState, useEffect, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { AuthContext } from "../App";

import { Link } from "react-router-dom";

function ListUp() {
  const [items, setItems] = useState([]);

  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    setItems(state.data);
  }, [state]);
  // useEffect(() => {
  //   if (selectedItem.length < 4) {
  //     setSelectedItem((selectedItem) => [
  //       ...[
  //         {
  //           elements: items[items.length - 1],
  //           id: detailId[detailId.length - 1],
  //         },
  //       ],
  //       ...selectedItem,
  //     ])
  //   }

  //   if (items.length >= 4) {
  //     setItems(selectedItem)
  //   }

  //   if (items.length < 1 || detailId.length < 1) {
  //     setSelectedItem([])
  //   }

  //   return () => {}
  // }, [items])

  // 새로고침 OR 페이지 이동시 localStorage에 저장된 내용 그대로 나타내기
  // useEffect(() => {
  //   if (localStorage.length >= 1) {
  //     let leng = localStorage.length
  //     let arr = []
  //     let idx = 0

  //     while (leng--) {
  //       const key = localStorage.key(idx++)
  //       const value = localStorage.getItem(key)
  //       let obj = { elements: value, id: key }
  //       arr.push(obj)
  //     }

  //     setSelectedItem(arr)
  //   }
  //   return () => {}
  // }, [rawData])

  // 목록을 선택할때마다 ID추가
  // useEffect(() => {
  //   if (detail !== undefined) setDetailId([...detailId, detail])
  //   else setDetailId([])
  // }, [detail])

  // 목록을 선택할때마다 title 추가
  // useEffect(() => {
  //   setItems([...items, selected[0]])

  //   if (selected.length === 0) setItems([])
  // }, [selected])

  const deleteElement = (e) => {
    const id = e.target.id;
    // const valueTarget = localStorage.getItem(id)
    // localStorage.removeItem(id)
    // setSelectedItem(selectedItem.filter((v) => v.elements !== valueTarget))

    dispatch({ type: "DELETE", payload: id });
  };

  const listSelected = () => {
    if (items.length >= 1) {
      return items.map((v, id) => (
        <List>
          <ListItem sx={{ m: -2 }}>
            <ListItemIcon>
              <ControlPointIcon sx={{ width: "100%" }} />
            </ListItemIcon>
            <ListItemButton>
              <ListItemText>
                <Link to={v.name}>{v.name}</Link>
                <Button
                  name={v.name}
                  id={v.storeId}
                  onClick={deleteElement}
                  variant="outlined"
                  sx={{ marginLeft: "10%" }}
                >
                  삭제
                </Button>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      ));
    } else {
      return null;
    }
  };

  return <div>{listSelected()}</div>;
}

export default ListUp;

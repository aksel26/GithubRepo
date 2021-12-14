import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import Axios from "axios";
import ListItemText from "@mui/material/ListItemText";
import PaginationFunc from "./PaginationFunc";
import { useParams } from "react-router-dom";
import List from "./style/List";
import LinkRouter from "./style/LinkRouter";
function Detail() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [DetailsPerPage] = useState(10);

  const [commits, setCommits] = useState([]);

  let { id } = useParams();
  const { state } = useContext(AuthContext);
  const [userId] = useState(state.user.login);

  useEffect(() => {
    getCommits(id, userId);
  }, [id, userId]);

  const getCommits = async (storageName, user) => {
    await Axios.get(
      `https://api.github.com/repos/${user}/${storageName}/commits`
    ).then((response) => {
      if (response.status === 200) {
        setCommits(response.data);
        setLoading(false);
      } else {
        alert("불러오기 실패");
      }
    });
  };
  const indexOfLastDetails = currentPage * DetailsPerPage;
  const indexOfFristDetails = indexOfLastDetails - DetailsPerPage;
  const currentDetail = commits.slice(indexOfFristDetails, indexOfLastDetails);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const listUp = (DetailData, loading) => {
    if (loading) {
      return <h2>Loading...</h2>;
    }
    if (DetailData.length === 0) return "데이터가 없습니다.";
    else {
      return DetailData.map((v) => (
        <List>
          <LinkRouter to={`//github.com/aksel26/${id}/commit/${v.sha}`}>
            {v.commit.message}
          </LinkRouter>
        </List>
      ));
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>
        Storage Name : <span style={{ color: "tomato" }}>{id}</span> Commits{" "}
      </h1>
      <h3>
        {id}에 관한 Commit 갯수 :{" "}
        <span style={{ color: "tomato" }}>{commits.length}</span> 개
      </h3>
      <div>
        <ul>{listUp(currentDetail, loading)}</ul>
      </div>

      <PaginationFunc
        detailsPerPage={DetailsPerPage}
        totalDetails={commits.length}
        paginate={paginate}
      ></PaginationFunc>
    </div>
  );
}

export default Detail;

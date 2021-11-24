import React, { useState, useEffect } from "react"
import Axios from "axios"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import CheckIcon from "@mui/icons-material/Check"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import PaginationFunc from "./PaginationFunc"
import { Link, useParams } from "react-router-dom"
function Detail() {
  const [DetailData, setDetailData] = useState([])

  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const [DetailsPerPage] = useState(10)

  let { id } = useParams()
  console.log("id: ", id)

  const getDetailData = async (id) => {
    setLoading(true)
    await Axios.get(`https://api.github.com/repos/aksel26/${id}/issues`).then(
      (response) => {
        if (response.status === 200) {
          setDetailData(response.data)
          setLoading(false)
        } else {
          alert("불러오기 실패")
        }
      }
    )
  }

  useEffect(() => {
    getDetailData(id)
  }, [id])

  const indexOfLastDetails = currentPage * DetailsPerPage
  const indexOfFristDetails = indexOfLastDetails - DetailsPerPage
  const currentDetail = DetailData.slice(
    indexOfFristDetails,
    indexOfLastDetails
  )

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const listUp = (DetailData, loading) => {
    if (loading) {
      return <h2>Loading...</h2>
    }
    if (DetailData.length === 0) return "데이터가 없습니다."
    else {
      return DetailData.map((v) => (
        <List>
          <ListItem sx={{ m: -2 }}>
            <ListItemIcon>
              <CheckIcon sx={{ width: "100%" }} />
            </ListItemIcon>
            <ListItemButton>
              <Link to={`//github.com/aksel26/${id}/issues/${v.number}`}>
                <ListItemText primary={v.title}></ListItemText>
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      ))
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Storage Name : {id} issues </h1>
      <h3>
        {id}에 관한 이슈 갯수 : {currentDetail.length} 개
      </h3>
      <div>{listUp(currentDetail, loading)}</div>

      <PaginationFunc
        detailsPerPage={DetailsPerPage}
        totalDetails={DetailData.length}
        paginate={paginate}
      ></PaginationFunc>
    </div>
  )
}

export default Detail

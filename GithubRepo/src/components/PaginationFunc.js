import React from "react"
import Pagination from "@mui/material/Pagination"

export const PaginationFunc = ({ detailsPerPage, totalDetails, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalDetails / detailsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <Pagination
        count={pageNumbers.length}
        hideNextButton
        hidePrevButton
        onChange={(e) => paginate(Number(e.target.innerText))}
      ></Pagination>
    </nav>
  )
}

export default PaginationFunc

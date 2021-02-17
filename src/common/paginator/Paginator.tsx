import React from "react";
import classes from "./Paginator.module.css";

type PropsType = {
    totalCount: number
    pageSize: number
    setPage: (page: number) => void
    page: number
}


export const Paginator: React.FC<PropsType> = ({totalCount, pageSize, setPage, page}) => {
    let countPages: number;
    let pages: Array<number> = [];

    if (totalCount) {
        countPages = Math.ceil(totalCount / pageSize);

        for (let i = 1; i <= countPages; i++) {
            pages.push(i);
        }
    }

    const changePage = (page: number) => {
        setPage(page);
    }

    let pagesElement = pages.map((currentPage, index) => {
        return <span key={index}
                     className={`${classes.page} ${currentPage === page ? classes.activePage : ''}`}
                     onClick={() => changePage(currentPage)}>
         {currentPage}
      </span>
    })

    return <div className={classes.pagination}>
        {pagesElement}
    </div>
}
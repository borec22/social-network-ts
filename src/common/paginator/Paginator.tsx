import React, {useState} from "react";
import classes from "./Paginator.module.css";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    setPage: (page: number) => void
    page: number
    portionSize: number
}


export const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, setPage, page, portionSize = 10}) => {
    let countPages: number;
    let pages: Array<number> = [];

    countPages = Math.ceil(totalItemsCount / pageSize);

    for (let i = 1; i <= countPages; i++) {
        pages.push(i);
    }


    let portionsCount = Math.ceil(countPages / portionSize);

    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={classes.pagination}>
            {portionNumber > 1 &&
            <span id='prev'
                  onClick={() => {
                      setPortionNumber(portionNumber - 1)
                  }}
                  className={classes.paginationButton}>
                    prev
            </span>}

            {pages
                .filter(pageNumber => pageNumber >= leftPortionPageNumber && pageNumber <= rightPortionPageNumber)
                .map((pageNumber) =>
                    <span key={pageNumber} onClick={() => {
                        setPage(pageNumber)
                    }}
                          className={`${pageNumber === page ? classes.activePage : ''} ${classes.page}`}>
                     {pageNumber}
                </span>)}

            {portionsCount > portionNumber &&
            <span id='next'
                  onClick={() => {
                      setPortionNumber(portionNumber + 1)
                  }}
                  className={classes.paginationButton}>
                    next
            </span>}
        </div>
    );
}
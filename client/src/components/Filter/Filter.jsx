import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams} from "react-router-dom";
import PostItem from "../PostItem/PostItem";
import ReactPaginate from 'react-paginate';
import "./filter.scss";
import { useTranslation } from "react-i18next";
const Filter = ({ posts }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
 const timestamp = (date) => {
       const Timing = new Date(date)
      return Timing.getTime();
    }
    const [searchParams] = useSearchParams();
    
    const sortTypes = {
        vote: {
            fn: (a, b) => (b.vote.length-1) / Math.pow(((Date.now()-timestamp(b.createdAt))/(1000*3600))+2, 1.8) -( a.vote.length-1) / 
            Math.pow(((Date.now()-timestamp(a.createdAt))/(1000*3600))+2, 1.8),
        },
        view: {
            fn: (a, b) =>  (b.views-1) / Math.pow(((Date.now()-timestamp(b.createdAt))/(1000*3600))+2, 1.8) -( a.views-1) / 
            Math.pow(((Date.now()-timestamp(a.createdAt))/(1000*3600))+2, 1.8)
        },
        comment: {
            fn: (a, b) => b.comment_count - a.comment_count,
        },
        new: {
            fn: (a, b) => timestamp(b.createdAt) - timestamp(a.createdAt) ,
        },
    };
    const [currentSort, setCurrentSort] = useState("view");
    useEffect(() => {
        const sortByQuery = searchParams.get('sort');
  if (sortByQuery) setCurrentSort(sortByQuery)
  if (sortByQuery==="vote")   setFilterActive(1);
  else if (sortByQuery==="new")   setFilterActive(2);
  else setFilterActive(0);
      }, [searchParams]);
      
    const [flilterActive, setFilterActive] = useState(0);
 
    const [page, setPage] = useState(0);
    const [currentButton, setCurrentButton] = useState(1);
    const PER_PAGE = 10;
    const computedActivityStreams = useMemo(() => {
        setPage(Math.ceil(posts.length / PER_PAGE));
        return posts;
    }, [posts]);
    
    const indexOfLastPost = currentButton * PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - PER_PAGE;
    const currentActivityLists = computedActivityStreams.sort(sortTypes[currentSort]?.fn).slice(indexOfFirstPost, indexOfLastPost);
    

    const handleFilterActive = (index) => {
        if (index === 0) {
            setCurrentSort("view");
        }
        if (index === 1) {
            setCurrentSort("vote");
          
        }
        if (index === 2) {
            setCurrentSort("new");
        }
        if (index === 3) {
            setCurrentSort("comment");
        }
        setFilterActive(index);
    };
   
    const fitterList = [
        {
            displayName: "TREND",
            path: `/?sort=view&page=${currentButton}`,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M20 7h-4V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H4c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9c0-1.103-.897-2-2-2zM4 11h4v8H4v-8zm6-1V4h4v15h-4v-9zm10 9h-4V9h4v10z"/></svg>
            ),
        },
        {
            displayName: "TOP",
            path: `/?sort=vote&page=${currentButton}`,
            icon: (
                <svg
                    fill=" #718096"
                    _ngcontent-serverapp-c41=""
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    xmlns="http://www.w3.org/2000/svg"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 40 24"><path d="m10 10.414 4 4 5.707-5.707L22 11V5h-6l2.293 2.293L14 11.586l-4-4-7.707 7.707 1.414 1.414z"/></svg>
                </svg>
            ),
        },
        {
            displayName: t("new"),
            path: `/?sort=new&page=${currentButton}`,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path d="M2 12h2a7.986 7.986 0 0 1 2.337-5.663 7.91 7.91 0 0 1 2.542-1.71 8.12 8.12 0 0 1 6.13-.041A2.488 2.488 0 0 0 17.5 7C18.886 7 20 5.886 20 4.5S18.886 2 17.5 2c-.689 0-1.312.276-1.763.725-2.431-.973-5.223-.958-7.635.059a9.928 9.928 0 0 0-3.18 2.139 9.92 9.92 0 0 0-2.14 3.179A10.005 10.005 0 0 0 2 12zm17.373 3.122c-.401.952-.977 1.808-1.71 2.541s-1.589 1.309-2.542 1.71a8.12 8.12 0 0 1-6.13.041A2.488 2.488 0 0 0 6.5 17C5.114 17 4 18.114 4 19.5S5.114 22 6.5 22c.689 0 1.312-.276 1.763-.725A9.965 9.965 0 0 0 12 22a9.983 9.983 0 0 0 9.217-6.102A9.992 9.992 0 0 0 22 12h-2a7.993 7.993 0 0 1-.627 3.122z"/>
                <path d="M12 7.462c-2.502 0-4.538 2.036-4.538 4.538S9.498 16.538 12 16.538s4.538-2.036 4.538-4.538S14.502 7.462 12 7.462zm0 7.076c-1.399 0-2.538-1.139-2.538-2.538S10.601 9.462 12 9.462s2.538 1.139 2.538 2.538-1.139 2.538-2.538 2.538z"/>
                </svg>
            ),
        },
    ];

    
   const handlePageClick = (e) => {
        const selectedPage = e.selected;
        console.log("page", selectedPage+1)
       setCurrentButton(selectedPage+1);
       navigate({
        search: `?sort=${currentSort}&page=${selectedPage+1}`
       }
      );
           const ft = document.querySelector( '#filter' );
        ft.scrollIntoView() };
        useEffect(() => {
            const pageSS = searchParams.get('page');
       if(pageSS)  setCurrentButton(pageSS)
          }, [searchParams]);
        if (!currentActivityLists.length) return (<div></div>);
    return (
        <section className="filter"  id="filter">
            <div className="filter__wrapper">
                <div className="filter__bar">
                    <h3 className="title">{t("foryou")}</h3>
                    <div className="filter__sort">
                        {fitterList.map((e, i) => (
                            <Link
                                key={i}
                                to={e.path}
                                className={`filter__sort-item ${flilterActive === i ? "active" : ""}`}
                                onClick={() => handleFilterActive(i)}
                            >
                                <i className={`filter__sort-icon ${flilterActive === i ? "active" : ""}`}>{e.icon}</i>
                                <span className={`filter__sort-text ${flilterActive === i ? "active" : ""}`}>
                                    {e.displayName}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="filter__page">
                    <div></div>
                </div>
                <div className="grid">
                    <div className="row">
                        <div className="col l-12">
               
                            <div className="filter__content">
                                <div className="filter__content-details">
                                    <div className="grid">
                                        {Array
                                        
                                        .isArray(currentActivityLists) 
                                        &&
                                            currentActivityLists
                                               
                                                .map((post) => <PostItem post={post} key={post._id} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   </div>
             
        <ReactPaginate
          
                    previousLabel={"<"}
                 
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={page}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    forcePage={currentButton-1}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    renderOnZeroPageCount={null}
                    activeClassName={"active"}/>
                   
  </div>
        </section>
    );
};

export default Filter;

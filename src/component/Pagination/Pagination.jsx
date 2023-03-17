import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {NavLink} from "react-router-dom";

import {setCurrentPage, incrementCurrentPage, decrementCurrentPage, fetchTodos} from "../../store/todoSlice.js";

import classes from './Pagination.module.scss';

const Pagination = () => {
    const dispatch = useDispatch();
    const {currentPage, perPage, filteredTodosQuantity} =  useSelector(state => state.todos);
    const pagesQuantity = Math.ceil(filteredTodosQuantity/perPage);
    const initialArray = Array.from({length: pagesQuantity}, (_, i) => i + 1);
    console.log({pagesQuantity, filteredTodosQuantity, initialArray})

    const [pagesArray, setPagesArray] = useState(initialArray);
    const changePagesArray = currentPage => {
        if (currentPage === 1) {
            const pages = [];
            for (let i = currentPage; i <= currentPage + 2; i++) {
                pages.push(i);
            }
            setPagesArray([...pages])
        }else if (currentPage >= pagesQuantity - 1  && currentPage <= pagesQuantity) {
            const pages = [];
            for (let i = pagesQuantity - 2; i <= pagesQuantity; i++) {
                pages.push(i);
            }
            setPagesArray([...pages])
        }else {
            const pages = [];
            for (let i = currentPage; i <= currentPage+2; i++){
                pages.push(i);
            }
            setPagesArray([...pages])
        }
    };

    const onChangeCurrentPageHandler = (type) => {
        switch (type){
            case 'increment': if(currentPage < pagesQuantity){
                                    dispatch(incrementCurrentPage())
                                    // changePagesArray(currentPage + 1);
                                 return;
            } return ;
            case 'decrement': if(currentPage > 1){
                 dispatch(decrementCurrentPage());
                // changePagesArray(currentPage - 1);
                return
            } return ;
            default: return;
        }
    };

    const pagesRender = (arr) => {
        return arr.map((page, i) => {
            return (
                <NavLink
                    key={i}
                    to={`?page=${page}`}
                    className={currentPage === page && pagesArray.length > 1 ? [classes.page, classes.active_page].join(' ')
                                : pagesArray.length > 1 ? classes.page : classes.invisible}
                    onClick={() => {
                        dispatch(setCurrentPage(page))
                    }}
                        >
                    {page}
                </NavLink>
            )
        })
    };

    return (
        <div className={classes.pages}>
            {/*{currentPage > 1  && <span className={pagesArray.length > 1 ? classes.page : classes.invisible} onClick={() => addPagesHandler('addAtTheBeginning')}>...</span>}*/}
            <NavLink to={currentPage === '1' ? `?page=${currentPage-1}` : `?page=${currentPage}`} className={pagesArray.length > 1 ? classes.page : classes.invisible} onClick={() => onChangeCurrentPageHandler("decrement")}>&laquo;</NavLink>
            {pagesRender(pagesArray)}
            {/*{pages.at(-1) < pagesQuantity && <span className={pages.length > 1 ? classes.page : classes.invisible}>...</span>}*/}
            <NavLink to={currentPage === pagesQuantity ? `?page=${currentPage}` : `?page=${currentPage+1}`} className={pagesArray.length > 1 ? classes.page : classes.invisible} onClick={() => onChangeCurrentPageHandler("increment")}>&raquo;</NavLink>
        </div>
    );
}

export default Pagination;
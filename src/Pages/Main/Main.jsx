import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import ProductList from "../ProductList/ProductList";
import "./Main.scss";
import {filterProducts, productType} from "./ProductsFilterSlice";
import SearchIcon from '@mui/icons-material/Search';
import usePagination from './Pagenation';
import {Pagination} from "@mui/material";
import topLeft from "../../Assets/image1.png";
import topRight from "../../Assets/image2.png";
import botLeft from "../../Assets/image3.png";
import botRight from "../../Assets/image4.png";
import {useTranslation} from "react-i18next";

const Main = () => {
    const [filter, setFilter] = useState("maki");
    const [count, setCount] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(8);

    const dispatch = useDispatch()

    const handleSearchBarChange = (target) => {
        setFilter(target)
    };

    const data = useSelector(((state) => state.filterProducts))

    const {t} = useTranslation();

    const pageCount = Math.ceil(data.data.length / perPage);
    const productData = usePagination(data.data, perPage);

    const handleChange = (e, p) => {
        setPage(p);
        productData.jump(p);
    };

    useEffect(() => {
        const value = {
            type: filter,
            language: data.language
        }
        dispatch(productType(filter));
        dispatch(filterProducts(value));
    }, [filter]);

    useEffect(() => {
        data.data && data.data.forEach((item) => {
            setCount([...count, item])
        })
    }, [data.data]);

    useEffect(() => {
        if (window.matchMedia("(max-width: 1920px)").matches) {
            setPerPage(8)
        }

        if (window.matchMedia("(max-width: 1406px)").matches) {
            setPerPage(6)
        }

        if (window.matchMedia("(max-width: 1000px)").matches) {
            setPerPage(4)
        }

        if (window.matchMedia("(max-width: 600px)").matches) {
            setPerPage(2)
        }

    })


    return (
        <div className="main_block">
            <div className="main_container">
                <div className="main_block_nav">
                    <div className="portfolio__labels">
                        <span
                            onClick={() => handleSearchBarChange("maki")}
                            className={filter === "maki" ? "active_label" : " "}
                        >
                            {t("MAKI")}
                        </span>
                        <span
                            onClick={() => handleSearchBarChange("roll")}
                            className={filter === "roll" ? "active_label" : " "}
                        >
                            {t("ROLL")}
                        </span>
                        <span
                            onClick={() => handleSearchBarChange("sashimi")}
                            className={filter === "sashimi" ? "active_label" : " "}
                        >
                            {t("SASHIMI")}
                        </span>
                        <span
                            onClick={() => handleSearchBarChange("sushi")}
                            className={filter === "sushi" ? "active_label" : " "}
                        >
                            {t("SUSHI")}
                        </span>
                        <span
                            onClick={() => handleSearchBarChange("set")}
                            className={filter === "set" ? "active_label" : " "}
                        >
                            {t("SET")}
                        </span>
                        <span
                            onClick={() => handleSearchBarChange("salad")}
                            className={filter === "salad" ? "active_label" : " "}
                        >
                            {t("SALAD")}
                        </span>
                    </div>
                    <div className="search">
                        <SearchIcon className="search_icon" sx={{color: '#fffdfde6'}}/>
                        <input placeholder={t("search")} onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                </div>
                <div className="product_list">
                    {data.data.length > 0 && productData.currentData()
                        .filter((product) => {
                            if (search == "") {
                                return product
                            } else if (product.name.toLowerCase().includes(search.toLowerCase())) {
                                return product
                            }
                        })
                        .map((product) => {
                            return (
                                <ProductList key={product.id} product={product} data={data}/>
                            )
                        })}

                </div>
                {
                    perPage < data.data.length ?
                        <Pagination
                            count={pageCount}
                            size="large"
                            page={page}
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChange}
                        />
                        : null
                }
            </div>
            <div className="top_left">
                <img src={topLeft} alt='img'/>
            </div>
            <div className="top_right">
                <img src={topRight} alt='img'/>
            </div>
            <div className="bot_left">
                <img src={botLeft} alt='img'/>
            </div>
            <div className="bot_right">
                <img src={botRight} alt='img'/>
            </div>
        </div>
    );
}

export default Main;

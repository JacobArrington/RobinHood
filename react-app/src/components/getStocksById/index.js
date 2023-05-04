import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { fetchStockById } from "../../store/stock";
import './getStocksById.css'

const GetStockById = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const Stock = useSelector((state)=> state.stockReducer)

    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        dispatch(fetchStockById(id)).then(() => setIsLoaded(true));
    }, [dispatch]);

    console.log(Stock)

    return(<>
    {console.log(Stock)}
    </>)
}

export default GetStockById;

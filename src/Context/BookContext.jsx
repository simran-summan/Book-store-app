import React, {createContext , useState} from "react";

export const BookContext = createContext()

const BookContextProvider =({children})=>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const removeBook = (id) => {
        setData(prevData => Array.isArray(prevData) ? prevData.filter(book => book.id !== id) : []);
      };
    return(
        <BookContext.Provider value={{data, setData , loading , setLoading , removeBook}}>
            {children}
        </BookContext.Provider>
    )
}

export default BookContextProvider
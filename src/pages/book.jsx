import { useCallback, useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchDataBooks } from "../services/book.api.service";


const BookPage = () =>{
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);

    
    const loadDataBooks = useCallback(async () => {
        setLoadingTable(true);
        const res = await fetchDataBooks(current, pageSize);
        if(res && res.data){
            setDataBooks(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        setLoadingTable(false);
    }, [current, pageSize]);
    
    useEffect(() => {
        loadDataBooks();
    }, [loadDataBooks]);

    return (
        <>  
            <div style={{padding: '20px'}}>
                <BookTable dataBooks={dataBooks} 
                    current={current} 
                    setCurrent={setCurrent} 
                    pageSize={pageSize} 
                    setPageSize={setPageSize}
                    total={total}
                    loadDataBooks={loadDataBooks}
                    loadingTable={loadingTable}
                ></BookTable>
            </div>
        </>
    )
}

export default BookPage;
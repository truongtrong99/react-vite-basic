import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchDataBooks } from "../services/book.api.service";


const BookPage = () =>{
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadDataBooks();
    }, [current, pageSize]);

    const loadDataBooks = async () => {
        const res = await fetchDataBooks(current, pageSize);
        if(res && res.data){
            setDataBooks(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }
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
                ></BookTable>
            </div>
        </>
    )
}

export default BookPage;
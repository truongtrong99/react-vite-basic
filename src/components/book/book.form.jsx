import { Button } from "antd"


const BookForm = () => {

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
                <h2>Book Table</h2>
                <Button type="primary">
                    CREATE
                </Button>
            </div>
        </>
    )
}

export default BookForm;
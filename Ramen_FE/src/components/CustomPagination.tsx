import {ChangeEvent} from 'react';
import Pagination from "@material-ui/lab/Pagination";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    pages: {
        justifyContent: "center",
        margin: "3rem 0",
        display: "flex",
    },
    pagination: {
        backgroundColor: "transparent",
        "& ul > li > button": {
            backgroundColor: "white"
        }
    }
}))
type Props = {
    pages: number,
    page: number,
    handlePageChange: (_event: ChangeEvent<unknown>, value: number) => void
}

const CustomPagination = (props: Props) => {
    const classes = useStyles();
    const pages = props.pages;
    const page = props.page;
    const handlePageChange = props.handlePageChange;


    return (pages > 1) ? <div className={classes.pages}>
        <Pagination count={pages}
                    className={classes.pagination}
                    page={page}
                    size="medium"
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}/>
    </div> : null

};

export default CustomPagination;

import {makeStyles, Theme} from "@material-ui/core/styles";
import useFetch from "../../customHooks/UseFetch";
import {ChangeEvent, useState} from "react";
import {withRouter} from "react-router-dom";
import ReviewStrip from "./ReviewStrip";
import {IReview} from "../../types/IReview";
import CustomPagination from "../CustomPagination";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
        root: {
            justifyContent: "center",
            margin: "3rem 0",
            display: "flex",
        },
        header: {
            textAlign: "left",
            float: "none",
            color: "#323232",
            margin: 16,
            fontSize: 24,
        },
        searchRoot: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        pagination: {
            backgroundColor: "transparent",
            "& ul > li > button": {
                backgroundColor: "white"
            }
        },
        text: {
            textAlign: "left",
            float: "none",
            color: "#323232",
            margin: 16,
            fontSize: 20,
        },
    })
);

type Stores = {
    current: number;
    pages: number;
    reviews: IReview[]
};
const UserReviewed = () => {
    const classes = useStyles();
    const [page, setPage] = useState<number>(1);
    //const {user} = useUser()!;

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const options = {
        key: "reviewedStore",
        url: process.env.REACT_APP_BE_URL + "/api/v1/user/reviewedStore",
        requestQuery: {
            page: page,
        }
    }
    const {data} = useFetch<Stores>(options);
    return data?.reviews ?
        <Box mb={5}>
            <p className={classes.header}>已評論店家</p>
            {
                data.reviews.length > 0 ? data.reviews.map((review: IReview) => {
                    return <ReviewStrip review={review}/>
                }) : <p className={classes.text}>沒有評論店家</p>
            }
            <CustomPagination pages={data.pages} page={page} handlePageChange={handlePageChange}/>
        </Box> : null

};

export default withRouter(UserReviewed);

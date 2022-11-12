import {IReview} from "../../types/IReview";
import Loading from "../Loading/Loading";
import {ChangeEvent, useState} from "react";
import Review from './Review';
import {useUser} from "../../Context/UserContext";
import useFetch from "../../customHooks/UseFetch";
import {Box, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import UserReview from "./UserReview";
import CustomPagination from "../CustomPagination";

const useStyles = makeStyles(() => ({
    noReview: {
        marginTop: 30
    },
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
    },
    reviews: {},
    reviewBtn: {}
}))

type ReviewsRes = {
    reviews: IReview[],
    current: number,
    pages: number
}

type Props = {
    storeId: string
}

const Reviews = (props: Props) => {
    const classes = useStyles();
    const {user} = useUser()!;
    const [page, setPage] = useState<number>(1);

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const storeId = props.storeId;
    const options = {
        key: "comments",
        url: process.env.REACT_APP_BE_URL + `/api/v1/stores/${storeId}/getReviews`,
        requestQuery: {
            page: page
        }
    }

    const {data, status, error} = useFetch<ReviewsRes>(options);

    if (status === "loading") {
        return <Loading/>;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }
    if (!data?.reviews) return <div>系統無法取得評論，請重新整理</div>

    const reviews = data.reviews.filter(review => review.author._id !== user?._id);

    return (
        <div className={classes.reviews}>
            <UserReview storeId={storeId}/>
            <Divider/>
            <Box>
                {(reviews?.length > 0) ?
                    <div>
                        {reviews.map(review =>
                            <Review review={review} key={review._id} storeId={storeId}/>
                        )}
                        <CustomPagination pages={data.pages} page={page} handlePageChange={handlePageChange}/>
                    </div>
                    :
                    <Typography variant="subtitle1" className={classes.noReview}>
                        沒有其他評論
                    </Typography>
                }
            </Box>
        </div>
    )
};

export default Reviews;

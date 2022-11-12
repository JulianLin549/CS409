import {IComment} from "../../types/IComment";
import Loading from "../Loading/Loading";
import {ChangeEvent, useState} from "react";
import {useUser} from "../../Context/UserContext";
import useFetch from "../../customHooks/UseFetch";
import AddCommentModal from "./AddCommentModal";
import Comment from './Comment'
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";
import CustomPagination from "../CustomPagination";

const useStyles = makeStyles(() => ({
    noComment: {
        marginTop: 30
    },
    commentBtn: {},
    comments: {},
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
    storeId: string
}

type CommentsRes = {
    comments: IComment[],
    current: number,
    pages: number
}

const Comments = (props: Props) => {
        const {user} = useUser()!;
        const classes = useStyles();
        const storeId = props.storeId;

        const [page, setPage] = useState<number>(1);

        const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
            setPage(value);
        };

        const options = {
            key: "comments",
            url: process.env.REACT_APP_BE_URL + `/api/v1/stores/${storeId}/getComments`,
            requestQuery: {
                page: page
            }
        }

        const {data, status, error} = useFetch<CommentsRes>(options);

        if (status === "loading") {
            return <Loading/>;
        }

        if (status === "error") {
            return <div>{error?.message}</div>;
        }

        if (!data?.comments) return <div>系統無法取得留言，請重新整理</div>


        return (
            <div className={classes.comments}>
                {user && <div className={classes.commentBtn}>
                    <AddCommentModal storeId={storeId}/>
                </div>}

                <Box mt={2}>
                    {(data.comments?.length > 0) ?
                        <div>
                            {data.comments.map(comment =>
                                <Comment comment={comment} storeId={storeId}/>
                            )}
                            <CustomPagination pages={data.pages} page={page} handlePageChange={handlePageChange}/>

                        </div>
                        :
                        <Typography variant="subtitle1" className={classes.noComment}>
                            沒有留言
                        </Typography>
                    }
                </Box>
            </div>
        )
    }
;

export default Comments;



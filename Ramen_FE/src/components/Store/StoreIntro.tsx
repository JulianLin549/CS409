import CarouselImage from "../Carousel/Carousel";
import {Box, Divider} from "@material-ui/core";
import {IStore} from "../../types/IStore";
import {makeStyles} from "@material-ui/core/styles";
import createDOMPurify from 'dompurify';

const useStyles = makeStyles(() => ({
    divider: {
        width: "95%",
        margin: "25px auto"
    },
    title: {
        marginTop: 10,
        marginBottom: 10
    }
}))


type Props = {
    store: IStore
}
const StoreIntro = (props: Props) => {
    const classes = useStyles();

    const store = props.store;
    const imageUrls = store.imageSmall;
    const DOMPurify = createDOMPurify()
    return (
        <Box mt={2}>
            <CarouselImage imageUrls={imageUrls}/>
            <Box mt={5} mb={2}>
                <Divider className={classes.divider} orientation="horizontal" variant="fullWidth"/>

                <h3 className={classes.title}>介紹</h3>

                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(store.descriptionHTML)}}/>
                <Divider className={classes.divider} orientation="horizontal" variant="fullWidth"/>
            </Box>

        </Box>
    )
        ;
};

export default StoreIntro;

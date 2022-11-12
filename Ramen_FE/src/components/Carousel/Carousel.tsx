import {Carousel} from "react-bootstrap";
import {makeStyles} from "@material-ui/core/styles";

type Props = {
    imageUrls?: string[]
}


const useStyles = makeStyles(() => ({
    carouselImage:{
        display: "block",
        width: "100%",
        height: 600,
        borderRadius: 10,
    }
}))

const CarouselImage = (props: Props) => {
    const imageUrls = props.imageUrls;
    const classes = useStyles();

    const showImages = (url: string) => {
        return (
            <Carousel.Item>
                <img
                    className={classes.carouselImage}
                    src={url}
                    alt=""
                />
            </Carousel.Item>
        )
    };

    return (
        <Carousel >
            {imageUrls && imageUrls.map(imageUrl => showImages(imageUrl))}
        </Carousel>
    );
};

export default CarouselImage;

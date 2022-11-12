import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {makeStyles,} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {IStore} from "../../types/IStore";

const useStyles = makeStyles(() => ({
        cardRoot: {
            margin: "45px auto 0 auto",
        },
        card: {
            margin: 5,
            maxHeight:450
        },
        moreNtn: {
            marginLeft: 'auto'
        },
    }
));

type Props = {
    store: IStore
}
const StoreModal = (props: Props) => {
    const classes = useStyles();
    const description = props.store.descriptionText;
    const storeImages = props.store.imageSmall;
    const descriptionTrimmer = (description: string) => {
        if (description.length > 100) {
            return description.substring(0,100) + "...";
        }
        return description;
    }

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={storeImages![0]}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6">
                        {props.store.name}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        {descriptionTrimmer(description)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button component={Link} to={'/'} size="medium" color="primary" className={classes.moreNtn} >
                    查看更多
                </Button>
            </CardActions>
        </Card>
    );
};

export default StoreModal;

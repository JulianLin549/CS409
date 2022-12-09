import {Chip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    tag:{
        marginTop:10,
        margin:2,
        backgroundColor:"#ffb400"
    }
}))
const Tags = () => {
    const classes = useStyles();
    const tags = ["Ramen", "Tori Paitan", "Sous vide", "Char siu"];
    return (
        <div>
            {tags.map(tag => <Chip label={tag} className={classes.tag}/>)}
        </div>
    );
};

export default Tags;

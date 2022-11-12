import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {SyntheticEvent} from "react";


const useStyles = makeStyles((theme: Theme) => ({
        storeModal: {
            margin: 16,
            position:"relative",
            zIndex: 500,
            justifyContent:"left"
        },
        modalRoot: {
            padding: '2px 4px',
            display: 'flex',
            width: "25vw",
            maxWidth: 350,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        closeButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);
type Props = {
    setPage?: (number: number) => void,
    setSearchInput: (input: string) => void,
}

const SearchBar = (props: Props) => {
    const classes = useStyles();

    const handleSubmit = (event: SyntheticEvent) => {
        if (props.setPage) props.setPage(1);
        event.preventDefault();
        const target = event.target as typeof event.target & {
            search: { value: string };
        };
        props.setSearchInput(target.search.value);
    };

    return (
        <div className={classes.storeModal}>
            <Paper component="form" className={classes.modalRoot} onSubmit={handleSubmit}>
                <InputBase
                    name="search"
                    className={classes.input}
                    placeholder="搜尋關鍵字"
                    autoComplete='off'
                />
                <Divider className={classes.divider} orientation="vertical"/>
                <IconButton type="submit" className={classes.closeButton} aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </Paper>
        </div>
    );
};

export default SearchBar;

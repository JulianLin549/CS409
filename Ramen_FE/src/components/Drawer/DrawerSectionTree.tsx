import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import {faMapMarkedAlt, faStoreAlt} from "@fortawesome/free-solid-svg-icons";

import Divider from "@material-ui/core/Divider";

import StyledTreeItemHead from "../StyledTree/StyledTreeItemHead";
import StyledTreeItem from "../StyledTree/StyledTreeItem";
import {Box} from "@material-ui/core";

const useStyles = makeStyles(() => ({
        root: {
            // height: 264,
            // flexGrow: 0.8,
            maxWidth: 240,
        },
    }),
);

type Props = {
    toggleDrawerOpen: () => void;
}


export default function CustomTreeView(props: Props) {
    const classes = useStyles();
    const toggleDrawerOpen = props.toggleDrawerOpen;

    return (

        <Box mt={1}>
            <TreeView
                className={classes.root}
                defaultExpanded={['10', '20']}
                defaultCollapseIcon={<ArrowDropDownIcon/>}
                defaultExpandIcon={<ArrowRightIcon/>}
            >
                <Divider/>
                <StyledTreeItem
                    nodeId="1"
                    labelText="Store List"
                    to="/stores"
                    labelIconFA={faStoreAlt}
                    onClick={toggleDrawerOpen}
                />
                <Divider/>

                <StyledTreeItemHead
                    nodeId="10"
                    labelText="Map"
                    labelIconFA={faMapMarkedAlt}
                >
                    <StyledTreeItem
                        nodeId="11"
                        labelText="Map"
                        to="/map"
                        labelIconFA={faMapMarkedAlt}
                        onClick={toggleDrawerOpen}
                    />
                </StyledTreeItemHead>
                <Divider/>


            </TreeView>
        </Box>
    );
}

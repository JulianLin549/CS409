import {useSnackbar, VariantType} from 'notistack';
import {IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
// import Button from "@material-ui/core/Button";

export default function StackedSnackBar() {

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const action = (key: string) => (
        <IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar(key)}>
            <CloseIcon fontSize="small"/>
        </IconButton>
    );

    function showSnackBar(message: string, variant?: VariantType) {
        variant = variant ? variant : 'default';
        enqueueSnackbar(message, {
            variant: variant,
            autoHideDuration: 3000,
            preventDuplicate: true,
            action: action
        });
    }
    return showSnackBar;
}



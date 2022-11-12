import {VariantType, useSnackbar} from 'notistack';
import {IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

type Props = {
    variant?: VariantType,
    message: string,
}
const StackedSnackBar = (props: Props) => {
    const variant = props.variant ? props.variant : 'default';
    const message = props.message;
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const action = (key: string) => (
        <IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar(key)}>
            <CloseIcon fontSize="small"/>
        </IconButton>
    );
    const handleClick = (message: string, variant?: VariantType) => {
        enqueueSnackbar(message, {
            variant: variant,
            autoHideDuration: 3000,
            preventDuplicate: true,
            action: action
        });
    }

    return (
        <Button onClick={() => handleClick(message, variant)}>
            hi
        </Button>
    )
};
export default StackedSnackBar

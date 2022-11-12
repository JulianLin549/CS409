import {ChangeEvent, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useDelete from "../../customHooks/UseDelete";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles(() => ({
    dialog: {
        padding: 10,
        width: "50vw",
        minWidth: 300,
        maxWidth: 600
    },
    content: {
        color: "#585b5d",
        marginBottom: 30
    },
    btn: {
        color: "#585b5d",
        "&:hover": {
            backgroundColor: "#efefef",
        },
    },
    bottom: {
        margin: 10,
    },
    input: {
        marginTop: 20,
    },
    storeNameOuter: {
        margin: '10px 0'
    },
    storeName: {
        borderRadius: 4,
        padding: 10,
        fontSize: "1rem",
        backgroundColor: "#e2dfdf",
    },

}))

type Props = {
    storeId: string,
    storeName: string,
    open: boolean,
    onClose: () => void
}
const DeleteModal = (props: Props) => {
    const classes = useStyles();
    const storeName = props.storeName;
    const history = useHistory();
    const storeId = props.storeId;

    const [isInputMatch, setIsInputMatch] = useState(false);
    const {mutateAsync} = useDelete();
    const showSnackBar = useStackedSnackBar();

    const handleDeleteStore = async () => {
        try {
            const reqProps = {
                url: process.env.REACT_APP_BE_URL + `/api/v1/stores/${storeId}`,
                requestBody: {},
            };
            await mutateAsync(reqProps);
            history.push('/stores')
            showSnackBar(`成功刪除: ${storeName}`, 'success');
        } catch (e) {
            showSnackBar(`刪除: ${storeName} 失敗`, 'error')
        } finally {
            props.onClose();
        }
    }
    const validateName = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        if (input === storeName) {
            setIsInputMatch(true);
        } else {
            setIsInputMatch(false);
        }
    }
    const handleDialogClose = () => {
        setIsInputMatch(false);
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <div className={classes.dialog}>
                <DialogTitle id="form-dialog-title">{`刪除店家: ${storeName}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.content}>
                        {`請問您是否確定要刪除店家？系統將會把店家相關留言以及食記/評論一併刪除。此步驟無法復原！若了解風險請於下方輸入欄輸入完整的店家名稱以刪除：`}
                    </DialogContentText>
                    <DialogContentText className={classes.storeNameOuter}>
                        <span className={classes.storeName}>{storeName}</span>
                    </DialogContentText>
                    <TextField
                        id="storeName"
                        label={`請於此輸入完整店家名稱`}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={validateName}
                        className={classes.input}
                        autoComplete='off'
                        error={!isInputMatch}
                    />
                </DialogContent>
                <DialogActions className={classes.bottom}>
                    <Button variant="outlined" color="secondary" disabled={!isInputMatch} onClick={handleDeleteStore}>
                        我了解風險並刪除店家
                    </Button>
                    <Button variant='text' onClick={props.onClose} className={classes.btn}>
                        取消
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default DeleteModal;


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {makeStyles} from "@material-ui/core/styles";
import {useMemo, useRef, useState} from "react";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";
import usePost from "../../customHooks/usePost";
import resizeFile from "./resizeImage";
import LoadingIcon from "../Loading/LoadingIcon";
import {Box, Dialog, DialogContent, DialogContentText} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    quillEditor: {
        "& > div.ql-container": {
            backgroundColor: "white",
            height: "50vh",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
        },
        "& > div.ql-container > div.ql-editor": {
            fontSize: "1rem",
        },
    }
}))

type Props = {
    storageKey: string,
    defaultContent?: string
}

const QuillEditor = (props: Props) => {
    const classes = useStyles();
    const storageKey = props.storageKey;
    const showSnackBar = useStackedSnackBar();
    const {mutateAsync} = usePost();
    const [isUploading, setIsUpoading] = useState<boolean>(false);
    const defaultContent = props.defaultContent ? props.defaultContent : window.localStorage.getItem(storageKey);
    const quillRef = useRef<any>();

    const uploadImage = async (result: any) => {
        try {
            const formData = new FormData();
            formData.append('upload_image', result);

            const reqProps = {
                url: process.env.REACT_APP_BE_URL + "/api/v1/reviews/image",
                requestBody: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const response = await mutateAsync(reqProps);
            if (response.status === 200) {
                const data = response.data?.data;
                showSnackBar(`上傳照片成功`, 'success');
                return data.imageUrl;
            } else {
                return new Error()
            }

        } catch (error) {
            showSnackBar(`上傳圖片失敗`, 'error');
        }
    }

    const imageHandler = async () => {
        const editor = quillRef.current?.getEditor()
        const range = editor?.getSelection();

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            if (!input?.files?.[0]) {
                return showSnackBar(`不是正確的圖片`, 'error');
            }
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                try {
                    setIsUpoading(true);
                    const image = await resizeFile(file);
                    let imageUrl = await uploadImage(image);
                    // Insert the server saved image
                    editor?.insertEmbed(range.index, 'image', imageUrl, "user");
                    editor?.setSelection(range.index + 1, "API")
                } catch (e) {
                    return showSnackBar(`上傳圖片出現問題`, 'error');
                } finally {
                    setIsUpoading(false)
                }

            } else {
                showSnackBar(`僅能上傳圖片檔案`, 'error');
            }
        };
    }

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{'header': [1, 2, 3, false]}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{list: 'ordered'}, {list: 'bullet'}],
                ['link', 'image'],
                ['clean'],
            ],
            handlers: {
                image: imageHandler
            },
        },
    }), []);

    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];


    const onQuillChange = (content: any) => {
        window.localStorage.setItem(storageKey, content);
    }

    return (
        <Box>
            <Dialog open={isUploading}>
                <DialogContent>
                    <DialogContentText id="uploading">
                        上傳圖片中，請稍等
                        <LoadingIcon/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <ReactQuill
                ref={quillRef}
                theme="snow"
                defaultValue={defaultContent ? defaultContent : ""}
                modules={modules}
                formats={formats}
                onChange={onQuillChange}
                placeholder=""
                className={classes.quillEditor}
            />
        </Box>

    )
};

export default QuillEditor

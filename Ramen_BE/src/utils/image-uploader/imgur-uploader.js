const FormData = require('form-data'),
    fs = require("fs"),
    axios = require("axios"),
    log = require("../../modules/logger");

module.exports = async (imagePath) => {
    try{
        let imageFile = fs.readFileSync(imagePath);
        let formData = new FormData();
        formData.append('image', imageFile);

        let requestOptions = {
            'method': 'post',
            'url': 'https://api.imgur.com/3/image',
            'headers': {
                'Authorization': 'Client-ID ' + process.env.IMGUR_CLIENT_ID,
                "Content-Type": "multipart/form-data"
            },
            data: imageFile
        };

        let imgurResponse = await axios(requestOptions);
        if(imgurResponse.status !== 200) throw new Error("upload imgur fail");

        const imgurURL = imgurResponse.data.data.link
        log.info(imgurURL)
        return imgurURL;
    } catch (err) {
        log.error(err);
    } finally {
        fs.unlinkSync(imagePath);
        log.info("file deleted");
    }
    
}
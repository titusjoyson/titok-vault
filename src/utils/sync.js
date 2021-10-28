import db from "../models/db";

const DB_FILE_NAME = "TitokDb.blob";
const DB_STORAGE_LOCATION = "appDataFolder";

export const checkFileExists = () => {
    return window.gapi.client.drive.files.list(
        {
            q: `name='${DB_FILE_NAME}'`,
            fields: "nextPageToken, files(id, name)",
            spaces: DB_STORAGE_LOCATION,
            pageToken: null,
        },
        function (err, res) {
            if (err) {
                // Handle error
                console.error(JSON.parse(err.body));
                console.log("file not found");
                return false;
            } else {
                res.files.forEach(function (file) {
                    console.log("Found file:", file.name, file.id);
                });
                console.log("file length:", res.files);
                return true;
            }
        }
    );
};

export const crateFile = (blob) => {
    var fileMetadata = {
        name: DB_FILE_NAME,
        parents: [DB_STORAGE_LOCATION],
    };
    var media = {
        mimeType: "text/plain",
        body: blob.stream(),
    };
    window.gapi.client.drive.files.create(
        {
            resource: fileMetadata,
            media: media,
            fields: "id",
        },
        function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
            } else {
                console.log("Folder Id:", file.id);
            }
        }
    );
};

const uploadFile = (blob) => {};

export const syncDb = () => {
    db.exportLocalDB()
        .then((blob) => {})
        .catch((e) => {
            console.error(e);
        });
};

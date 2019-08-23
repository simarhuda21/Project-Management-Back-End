var validator = {
    getprojectValidator: function (req, type) {
        var input = {
            create: {
                title: ["range", req.t("SERIAL_NUMBER_NOT_VALID")],
                manager: ["range", req.t("PROJECTREF_NOT_VALID")],
                team: ["range", req.t("TITLE_NOT_VALID")],
            },
            update: {
                title: ["range", req.t("SERIAL_NUMBER_NOT_VALID")],
                manager: ["range", req.t("PROJECTREF_NOT_VALID")],
                team: ["range", req.t("TITLE_NOT_VALID")],
            }
        };
        return input[type];
    },
}
module.exports = validator;
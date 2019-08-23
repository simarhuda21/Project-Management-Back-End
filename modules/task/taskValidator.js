var validator = {
    getTaskValidator: function (req, type) {
        var input = {
            create: {
                srNo: ["isString", req.t("SERIAL_NUMBER_NOT_VALID"), [5]],
                projectRef: ["isString", req.t("PROJECTREF_NOT_VALID")],
                title: ["isString", req.t("TITLE_NOT_VALID")],
                hours: ["range", req.t("HOURS_NOT_VALID")],
                dueDateTime: ["isDate", req.t("DUE_DATE_NOT_VALID")],
                description: ["isString", req.t("DESCRIPTION_NOT_VALID")],
                startDate: ["isDate", req.t("START_DATE_NOT_VALID")],
                developer: ["isEmail", req.t("DEVELOPER_NOT_VALID")],
                status: ["isString"]
            },
            update: {
                srNo: ["range", req.t("SERIAL_NUMBER_NOT_VALID"), [5]],
                projectRef: ["range", req.t("PROJECTREF_NOT_VALID")],
                title: ["range", req.t("TITLE_NOT_VALID")],
                hours: ["range", req.t("HOURS_NOT_VALID")],
                dueDateTime: ["isDate", req.t("DUE_DATE_NOT_VALID")],
                description: ["range", req.t("DESCRIPTION_NOT_VALID")],
                startDate: ["isDate", req.t("START_DATE_NOT_VALID")],
                developer: ["isEmail", req.t("DEVELOPER_NOT_VALID")],
                status: ["range", req.t("STATUS_NOT_VALID")]
            }
        };
        return input[type];
    },
}
module.exports = validator;
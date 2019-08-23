var validator = {
    getUserValidator: function (req, type) {
        var input = {
            create: {
                firstname: ["range", req.t("FIRSTNAME_NOT_VALID"), [5]],
                lastname: ["range", req.t("LASTNAME_NOT_VALID"), [5]],
                // username: ["range", req.t("USERNAME_NOT_VALID"), [5]],
                email: ["isEmail", req.t("EMAIL_NOT_VALID")],
                role: ["range", req.t("ROLE_NOT_VALID")]
            },
            update: {
                firstname: ["range", req.t("FIRSTNAME_NOT_VALID"), [5]],
                lastname: ["range", req.t("LASTNAME_NOT_VALID"), [5]],
                role: ["range", req.t("ROLE_NOT_VALID")],
                remainder: ["isBoolean", req.t("REMAINDER_NOT_VALID")]
            },
            login: {
                // username: ["notEmpty", req.t("LOGIN_EMPTY")],
                password: ["notEmpty", req.t("LOGIN_EMPTY")],
                installationId: ["notEmpty", req.t("INSTALLATION_ID_EMPTY")],
            },
            forgotPassword: {
                email: ["isEmail", req.t("EMAIL_NOT_VALID")],
            }
        };
        return input[type];
    },
}
module.exports = validator;
let utils = require('../helper/utils.js');

let validator = {};
validator.isValid = (str) => {
    if (typeof str !== 'string' || utils.empty(str)) {
        return false;
    }
    return true;
}
validator.notEmpty = (str) => {
    return !utils.empty(str);
}
validator.isString = (str) => {
    if (validator.isValid(str)) {
        let string = /^[a-zA-Z0-9]+$/
        return string.test(str)
    }
    return false;
}
validator.isInt = (str) => {
    if (validator.isValid(str)) {
        let int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
        return int.test(str);
    }
    return false;
}
validator.isFloat = (str) => {
    if (validator.isValid(str)) {
        let float = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;
        if (str === '.') {
            return false;
        }
        return float.test(str);
    }
    return false;
}

validator.isBoolean = (str) => {
    console.log("value", str, typeof str);
    if (typeof str === "boolean") {
        return str === true ? true : (str === false ? true : false);
    }
    else {
        return false;
    }
}

validator.isEmail = (str) => {
    if (validator.isValid(str)) {
        //let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let email = /\S+@\S+\.\S+/;
        return email.test(str);
    }
    return false;
}

validator.isValidRex = (str) => {
    if (validator.isValid(str)) {
        if (!utils.empty(rex)) {
            return rex.test(str);
        }
        return false;
    } else {
        return false;
    }
}

validator.isValidEnum = (str, enumArray) => {
    if (validator.isValid(str)) {
        if (!utils.empty(enumArray) && enumArray.indexOf(str) !== -1) {
            return true;
        }
        return false;
    }
}

validator.validPassword = (str) => {
    if (validator.isValid(str)) {
        if (str.length >= 0 && str.length <= 20) {
            // var password = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
            // return password.test(str);
            return true;
        }
        return false;
    }
}

validator.validZipcode = (str) => {
    if (validator.isValid(str)) {

        if (str.length >= 5) {
            var zip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
            return zip.test(str);
        }
        return false;
    }
}
validator.isValidEnum = (str) => {
    if (validator.isValid(str)) {
        if (!utils.empty(enumArray) && enumArray.indexOf(str) !== -1) {
            return true;
        }
        return false;
    }
    return false;
}

validator.isExpiredDate = (date) => {
    if (validator.isValid(date)) {
        var selectedDate = new Date(date);
        if (selectedDate != "Invalid Date") {
            var now = new Date();
            if (selectedDate < now) {
                return false;
            } else {
                date = new Date(date).toISOString();
                return date;
            }
        } else {
            return false;
        }
    }
    return false;
}

validator.isValidDob = (date) => {
    if (validator.isValid(date)) {
        try {
            let dob = new Date(date);
            if (dob != "Invalid Date") {
                let currentDate = new Date();
                if (dob < currentDate) {
                    return true;
                }
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

validator.validZipcode = (str) => {
    if (validator.isValid(str)) {
        if (str.length >= 5) {
            var zip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
            return zip.test(str);
        }
    }
}

validator.range = (str, data) => {
    if (validator.isValid(str)) {
        var len = str.length;
        if (_.isArray(data)) {
            var start = data[0];
            var end = data[1];
            if (!utils.empty(end)) {
                return (len >= start && len < end);
            } else {
                return (len >= start);
            }
        }
    }
    return false;
}

validator.isDefined = (variable) => {
    return utils.isDefined(variable);
}

validator.isJson = (obj) => {
    let str = typeof obj !== "string"
        ? JSON.stringify(obj)
        : obj;
    try {
        str = JSON.parse(str);
    } catch (e) {
        return false;
    }
    if (str === '1' || obj === '0' || Number(str)) {
        return false;
    }
    else if (typeof str === 'boolean') {
        return false;
    }
    return true;
}

validator.isValidJsonArray = (arr) => {
    let jsonArray;
    try {
        console.log(JSON.parse(arr));
        jsonArray = JSON.parse(arr);

        for (let i = 0; i < jsonArray.length; i++) {
            let result = validator.isJson(jsonArray[i]);
            if (!result) {
                return false;
            }
            else if (i === jsonArray.length - 1) {
                return true;
            }
        }
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

validator.isconfirmPasswordMatched = (newPassword,confirmPassword) => {
    console.log("validation for:",newPassword,confirmPassword)
    return newPassword === confirmPassword;
}

let validate = (input, props, type) => {
    let error = "";
    for (var k in props) {
        if (props.hasOwnProperty(k)) {
            let inputName = k;
            let validationData = props[k];
            if (!utils.empty(validationData)) {
                let validationFunction = validationData[0] || notEmpty;
                let errorMessage = validationData[1] || "Please enter input.";
                let options = validationData[2];
                if (!validator[validationFunction](input[inputName], options)) {
                    error = errorMessage;
                    break;
                }
            }
        }
    }
    return error;
}

module.exports = {
    validate: validate,
};
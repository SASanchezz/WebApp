function ValidateEmail(mail) {
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
}

function ValidateUserName(name) {
    return /^[0-9a-zA-Z_.-]+$/.test(name);
}

function ValidatePassword(password) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(password)
}

module.exports = {ValidateEmail, ValidatePassword, ValidateUserName}
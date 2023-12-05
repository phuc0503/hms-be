const { createNewUser, handleUserLogin, handleUserLogout } = require('../services/userService');

const viewSignUpPage = (req, res) => {
    return res.render('signUp.ejs');
}

const createUser = async (req, res) => {
    const user = await createNewUser(req.body);
    return res.status(200).json({
        result: user
    });
}

const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing email or password!"
        })
    }

    const user = await handleUserLogin(email, password);

    return res.status(200).json({
        result: user
    })
}

const handleLogout = async (req, res) => {
    const user = await handleUserLogout();

    return res.status(200).json({
        result: user
    })
}

module.exports = {
    viewSignUpPage,
    createUser,
    handleLogin,
    handleLogout
}
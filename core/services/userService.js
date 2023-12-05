const supabase = require('../config/supabaseClient');

const createNewUser = async (user) => {
    if (await checkEmail(user.email)) {
        return {
            errCode: 1,
            errMessage: 'Email already exist!'
        }
    }
    const { data, error } = await supabase.auth.signUp(
        {
            email: user.email,
            password: user.password,
            options: {
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                }
            }
        }
    )
    return {
        Message: 'Sign up successfully!'
    }
}

const handleUserLogin = async (email, password) => {
    if (! await checkEmail(email)) {
        return {
            errCode: 1,
            errMessage: 'Email not exist!'
        }
    } else {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            return {
                errCode: 1,
                errMessage: 'Incorrect password!'
            }
        } else {
            return {
                Message: 'Login successfully!'
            }
        }
    }

}

const checkEmail = async (email) => {
    let { data, error } = await supabase
        .rpc('email_exists', {
            email_address: email
        })
    if (error) {
        return error;
    } else {
        return data;
    }
}

const handleUserLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        return error;
    } else {
        return {
            Message: 'Logout successfully!'
        }
    }
}

module.exports = {
    createNewUser,
    handleUserLogin,
    handleUserLogout
}
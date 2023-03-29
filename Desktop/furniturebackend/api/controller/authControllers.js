const User = require('../model/user');
require("dotenv").config();
const jwt = require('jsonwebtoken');


// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email:'', password:''};

//incorrect email
if(err.message == 'incorrect email') {
    errors.email = 'that email is not registered';
}
//incorrect password
if(err.message == 'incorrect password') {
    errors.password = 'that password is incorrect';
}

    // duplicate error code
    if(err.code==11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if(err.message.includes('Please enter valid email')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}



const maxAge = 3 * 24 * 60 * 60;
const createToken = (data) => {
    return jwt.sign({data},process.env.JWT_SECRET, {expiresIn: maxAge});
}




const signup_post = async (req,res) => {
    let data = {};
    try {
        const user = await User.create(req.body);

        const token = createToken(user._id);
        // after creating a new user
        // create a jwt and send it in a cookie
        data = {user: user, jwt: token};
        console.log("trying to signup",data);
        
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
       
        
        res.status(201).json({user: user, status: 'user created successfully.'});
        //
    } catch (error) {
        let errors = handleErrors(error);
        if(error.message === 'Expected "payload" to be a plain object.') {
            errors = data;
           
            res.status(201).json(data);
            return;
        }
            res.status(500).json(errors);
        
        
    }
}

const login_post = async(req, res) => {
    const {email,password} = req.body;
    
    try {
        const user = await User.login(email, password);
        // after creating a new user
        // create a jwt and send it in a cookie
        const token = createToken({id: user._id, roles: user.roles});
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user, status: 'user logged in'});
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
}


module.exports = {
    signup_post,
    login_post
}
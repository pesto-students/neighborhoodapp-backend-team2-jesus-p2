import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'first_name', 'last_name', 'address', 'pincode', 'city', 'state', 'email']
        })
        res.json(users)
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res) => {
    const { email, password, confirmPassword } = req.body;
    if(password != confirmPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            email: email,
            password: hashPassword
        })
        res.json({msg: "Successfully Registered"});
    } catch(error) {
        console.log(error);
    }

}

export const Login = async(req, res) => {
    try{
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Invalid Password"});
        const userId = user[0].id;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1500s'});
        const refreshToken = jwt.sign({userId, email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1500s'});
        await Users.update({refresh_token: refreshToken},{
            where: {
                id: userId
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, 
            maxAge: 24*60*60*1000
        });
        res.json({accessToken: accessToken, refreshToken: refreshToken});
    } catch(error) {
        res.status(404).json({msg: "Email not found"});
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    })
    if(!user[0]) return res.sendStatus(204);
    const userId=user[0].id;
    await Users.update({refreshToken: null},{
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}
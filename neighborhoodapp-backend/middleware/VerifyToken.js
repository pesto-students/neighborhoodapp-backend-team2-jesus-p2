import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const verifyToken = (req, res, next) => {
    console.log("VerigyToke", req.headers)
    const authHeader = req.headers['authorization'];
    console.log("AuthHeader", authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token", token)
    if(token == null) return res.sendStatus(403);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        const user = await User.findOne({ where: { email: req.email } })
        req.currentUser = user;
        next();
    })
}
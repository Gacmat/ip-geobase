import User from '../models/user';
import jwt from 'jsonwebtoken';


export default {
    async login (req, res, next){
        // generate token
        const expiresIn = 12000;
        const token = jwt.sign({id: req.user._id}, process.env.JWT_SECRET, {expiresIn: expiresIn});

        // return token
        return res.status(200).send({userName: req.body.email, token: token, expiresIn: expiresIn});
    },

    async register(req, res, next){
        const {first_name, last_name, email, password} = req.body;
        User.find({email: email}, async (err, docs) =>{
            if(!docs.length){
                const user = new User({first_name, last_name, email});
                await User.register(user, password);
                res.send('User created successfully. Now you can log in.')
            }else{
                res.status(409).send("User already exists!");
            }
        });
    }
}
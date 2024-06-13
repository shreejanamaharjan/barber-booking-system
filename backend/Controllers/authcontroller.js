
import User from '../models/UserSchema.js';
import Barber from '../models/BarberSchema.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
const generateToken = user=> {
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY )
}
export const register = async(req, res) =>{
    const {name, email, password, role, gender} = req.body;
    try{
        let user;

        // hash password
        const salt =  await bcrypt.genSalt(10)
        const hashPassword  = await bcrypt.hash(password, salt)

        if (email){
            user = await User.findOne({email})
        } 
        
        // check if user exist
        if(user){
            return res.status(302).json({message: 'user already exist'});
        }
        
        if (!user) {
            // user creation
            user = new User({
                name,
                email,
                password: hashPassword,
                role ,
                gender
                 
            });
            console.log(user)
        }


        await user.save()
        res.status(201).json({message:'user successfully created'})

    }catch(error){
        res.status(500).json({message:'internal server error, try again'});
        console.log(error)
    }
};

export const login = async(req, res)=>{
    const {email, password} = req.body;
    try {
                let user;
                if(email){
                    user = await User.findOne({email});
                }
                // check if user exist
                if(!email){
                     return res.status(404).json({message:"user doesn't exist"});
                }

                // check if the password matches
                const isPasswordMatch = bcrypt.compare(password, user.password)
                if(!isPasswordMatch){
                    return res.status(404).json({message:"invalid password"})
                }
    } catch (error) {
        
    }
};




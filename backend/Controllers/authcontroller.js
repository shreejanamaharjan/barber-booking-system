
import User from '../models/UserSchema.js';
import Barber from '../models/BarberSchema.js';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto'


dotenv.config();
const generateToken = user => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY)
}

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'bridgette.herman96@ethereal.email',
        pass: 'v57jHjkXdpyCq95Vp9'
    }
});
async function sendVerificationEmail(email, verificationToken) {
    const verificationLink = `http://localhost:5173/verifyEmail?code=${verificationToken}`;
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Please verify your email",
            html: `<p>Hello,</p><p>Please click <a href="${verificationLink}">here</a> to verify your email.</p>`
        });
        console.log(verificationToken)
        console.log("Verification email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send verification email");
    }
}
function isNameValid(name) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
}

function isEmailValid(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
}

function isPasswordValid(password) {
    // Check if password length is at least 8 characters
    if (password.length < 8) {
        return false;
    }

    // Check if password contains at least one uppercase letter
    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(password)) {
        return false;
    }

    // Check if password contains at least one lowercase letter
    const lowercaseRegex = /[a-z]/;
    if (!lowercaseRegex.test(password)) {
        return false;
    }

    // Check if password contains at least one symbol
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!symbolRegex.test(password)) {
        return false;
    }

    // Check if password contains at least one number
    const numberRegex = /\d/;
    if (!numberRegex.test(password)) {
        return false;
    }

    return true;
}
export const register = async (req, res) => {
    const { name, email, password, role, gender } = req.body;
    try {
        let user;

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        if (email) {
            user = await User.findOne({ email });
        }

        // check if user exist
        if (user) {
            return res.status(302).json({ message: 'user already exist' });
        }

        if (!isNameValid(name)) {
            return res.status(400).json({
                success: false,
                message: "Invalid name format",
            });
        }

        // Check if the email is valid
        if (!isEmailValid(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        // Check if the password meets the required criteria
        if (!isPasswordValid(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least 8 characters, including uppercase and lowercase letters, symbols, and numbers.",
            });
        }

        const verificationCode = crypto.randomBytes(32).toString('hex');

        if (!user) {
            // user creation
            user = new User({
                name,
                email,
                password: hashPassword,
                role,
                gender,
                emailVerificationCode: verificationCode

            });
            console.log(user)
        }


        await user.save()


        await sendVerificationEmail(user.email, verificationCode);
        res.status(201).json({ message: 'user successfully created. Verification email has been sent' })

    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
        console.log(error)
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Required field missing"
            })
        }
        let user = await User.findOne({ email });

        // check if user exist
        if (!user) {
            return res.status(400).json({ message: "user doesn't exist" });
        }
        if (!user.isVerified) {
            return res.status(401).json({ message: "Email is not verified. Please verify your email to login." });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        // Generate and return a JWT token if login is successful
        const token = generateToken(user);


        console.log(user)
        res.status(200).json({ success: true, message: "Login successful", token, data: user });
    } catch (error) {
        console.error(error); // Log any errors
        res.status(500).json({ message: "Failed to login" });
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ success: false, message: "Verification token is missing" });
    }
    try {
        const user = await User.findOne({ emailVerificationCode: code });

        if (user) {
            user.isVerified = true;
            user.emailVerificationCode = null; // Remove the verification code after verification
            await user.save();

            res.status(200).json({ success: true, message: "Email verified successfully", data: user });

        } else {
            return res.status(400).json({ success: false, message: "Invalid verification code" });
        }


    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).json({ success: false, message: "Failed to verify email" });
    }
};








import userModel from '../models/user.model.js';
// import config from '../config/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { match } from 'assert';
import cookieParser from 'cookie-parser';

export function registerViewController(req, res) {
    res.render('register');
    // res.send("hello register user")
}


export async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Check for duplicate email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "Email already exists." });
    }

    const user = await userModel.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10)
    });

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    },
        'Adarsh_jwt_secret_key_portfolio',
        { expiresIn: '1h' });

    res.cookie('jwt', token);

    res.send(user);

    console.log("user>>>>>>", user);
}

export function loginViewController(req, res) {
    res.render("login");
}

export async function loginUserController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    },
        'Adarsh_jwt_secret_key_portfolio',
        { expiresIn: '1h' });

    res.cookie('jwt', token);

    res.send(user);
}
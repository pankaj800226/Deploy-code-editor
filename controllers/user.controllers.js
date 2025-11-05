import { User } from '../model/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.send({ code: 401, message: "User allready exist" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        await newUser.save()
        return res.send({ code: 200, message: "register sucessfull" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" })

    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.send({ code: 404, message: "User Not Found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.send({ code: 405, message: "Password invilid" })

        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '21d'
        })

        res.send({
            userId: user._id,
            username: user.username,
            email: user.email,
            token,
            code: 200,
            message: "Login sucessfull"
        })

    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: "Server Error" })

    }
}

export const profile = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select('-password')

        if (!user) {
            return res.send({ code: 404, message: "User Not Found" })
        }

        res.json(user)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" })

    }
}

export const editProfile = async (req, res) => {
    try {
        const userId = req.userId

        const { username, email } = req.body

        const updateData = { username, email }


        const updateUser = await User.findByIdAndUpdate(userId, updateData)
        res.status(201).json(updateUser)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })

    }
}
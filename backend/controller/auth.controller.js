import validator from "validator"
import bcrypt from "bcryptjs"
import User from "../model/user.model.js";
import { gentoken } from "../config/token.js";
import { json } from "express";




export const registration = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exists"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Email is incorrect"})
        }
        if(password.length < 8){
            return res.status(400).json({message:"Enter strong password"})
        }
        let hashPassword = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password:hashPassword})
        let token = await gentoken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(user)
    } catch (error) {
        console.log("registration error")
        return res.status(500).json({message:`registration error ${error}`})
    }
}


export const login = async (req,res) => {
    try {
        let {email,password} = req.body
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).json({message:"Incorrect password"})
        }
        let token = await gentoken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json(user)
    } catch (error) {
        console.log("login error")
        return res.status(500).json({message:`Login error : ${error}`})
    }
    
}

export const logout = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Logout Successful"})
    } catch (error) {
        console.log("logout error")
        return res.status(500).json({message:`login error : ${error}`})
    }
}
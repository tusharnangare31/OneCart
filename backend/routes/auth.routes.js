import express from "express"
import { login, logout, registration } from "../controller/auth.controller.js"

const authRoutes = express.Router()

authRoutes.post("/registration",registration)
authRoutes.post("/login",login)
authRoutes.get("/logout",logout)

export default authRoutes
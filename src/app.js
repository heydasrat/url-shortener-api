import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// Configurations

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true, limit: "1mb" }))
app.use(cookieParser())


// Route imports
import urlRouter from './Routes/url.router.js'

// Route Declaration
app.use("/api/v1/url",urlRouter)

export default app
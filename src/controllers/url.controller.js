import asyncHandler from '../Utils/asyncHandler.js'
import ApiError from '../Utils/ApiError.js'
import ApiResponse from '../Utils/ApiResponse.js'
import crypto from 'crypto'
import URL from '../Models/url.model.js'

const createShortUrl = asyncHandler(async (req, res) => {
    const { url } = req.body

    if (!url) {
        throw new ApiError(400, "URL is required")
    }

    if (typeof url !== "string") {
        throw new ApiError(400, "URL must be a string")
    }

    if (url.trim() === "") {
        throw new ApiError(400, "URL cannot be empty")
    }

    let parsedUrl

    try {
        parsedUrl = new URL(url)
    } catch {
        throw new ApiError(400, "Invalid URL")
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new ApiError(400, "Only HTTP and HTTPS URLs are allowed")
    }

    const shortURLCode = crypto.randomBytes(4).toString("base64url")

    const urlDoc = await URL.create({
        url,
        shortCode: shortURLCode
    })

    return res.status(201).json(
        new ApiResponse(201, urlDoc, "Short URL Created Successfully!")
    )
})

const retrieveOriginalUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params

    if (!shortCode || shortCode.trim() === "") {
        throw new ApiError(400, "Invalid url")
    }

    const url = await URL.findOneAndUpdate(
        { shortCode },
        {
            $inc: {
                accessCount: 1
            }
        },
        {
            new: true
        }
    )

    if (!url) {
        throw new ApiError(404, "URL not found")
    }

    return res.status(200).json(
        new ApiResponse(200, url, "Url Retrieved Successfully")
    )
})

const updateShortUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params
    const { url } = req.body

    if (!shortCode || shortCode.trim() === "") {
        throw new ApiError(400, "Invalid url")
    }

    if (!url) {
        throw new ApiError(400, "URL is required")
    }

    if (typeof url !== "string") {
        throw new ApiError(400, "URL must be a string")
    }

    if (url.trim() === "") {
        throw new ApiError(400, "URL cannot be empty")
    }

    let parsedUrl

    try {
        parsedUrl = new URL(url)
    } catch {
        throw new ApiError(400, "Invalid URL")
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new ApiError(400, "Only HTTP and HTTPS URLs are allowed")
    }

    const urlDoc = await URL.findOneAndUpdate(
        { shortCode },
        {
            $set: {
                url
            }
        },
        {
            new: true
        }
    )

    if (!urlDoc) {
        throw new ApiError(404, "URL not found")
    }

    return res.status(200).json(
        new ApiResponse(200, urlDoc, "URL updated successfully")
    )
})

const deleteShortUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params

    const urlDoc = await URL.findOneAndDelete({ shortCode })

    if (!urlDoc) {
        throw new ApiError(404, "URL not found!")
    }

    return res.status(204).send()
})

const getUrlStats = asyncHandler(async (req, res) => {
    const { shortCode } = req.params

    if (!shortCode || shortCode.trim() === "") {
        throw new ApiError(400, "Invalid url")
    }

    const urlDoc = await URL.findOne({ shortCode })

    if (!urlDoc) {
        throw new ApiError(404, "URL not found!")
    }

    return res.status(200).json(
        new ApiResponse(200, urlDoc, "Stats retrieved successfully")
    )
})

export {
    createShortUrl,
    retrieveOriginalUrl,
    updateShortUrl,
    deleteShortUrl,
    getUrlStats
}
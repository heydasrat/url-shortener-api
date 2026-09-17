import { Router } from "express";
import { createShortUrl, retrieveOriginalUrl, updateShortUrl,deleteShortUrl,getUrlStats } from "../controllers/url.controller.js";

const router = Router()

router.route("/create-short-url").post(createShortUrl)
router.route("/retrieve-short-url/:shortCode").get(retrieveOriginalUrl)
router.route("/update-url/:shortCode").patch(updateShortUrl)
router.route("/delete-url/:shortCode").delete(deleteShortUrl)
router.route("/get-url-stats/:shortCode").get(getUrlStats)

export default router
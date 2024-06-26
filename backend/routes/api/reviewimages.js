const express = require("express");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User, sequelize, ReviewImage, Booking } = require("../../db/models");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
	const userId = req.user.id;
	const imageId = req.params.imageId;

	const currImg = await ReviewImage.findByPk(imageId, {
		include: {
			model: Review,
		},
	});

	if (!currImg) {
		res.status(404).json({
			message: "Review Image couldn't be found",
		});
		return;
	}

	if (currImg.Review.userId !== userId) {
		res.status(403).json({
			message: "Forbidden",
		});
		return;
	}

	await currImg.destroy();

	res.json({
		message: "Successfully deleted",
	});
});

module.exports = router;

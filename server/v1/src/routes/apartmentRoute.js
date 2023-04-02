const express = require("express");
const router = express.Router();
const apartmentController = require("../controllers/apartmentController");
const validate = require("../middlewares/validate");
const schema = require("../schemas/apartmentSchema");
const { AUTHORIZATION, MANAGERAUTHORIZATION } = require("../middlewares/access");

router.post("/", MANAGERAUTHORIZATION, validate(schema.newApartment), apartmentController.newApartment);
router.get("/", AUTHORIZATION, apartmentController.getApartment);
router.get("/lastTransactions", AUTHORIZATION, apartmentController.lastTransactions);
router.put("/", MANAGERAUTHORIZATION, validate(schema.updateApartment), apartmentController.updateApartment);

module.exports = router;

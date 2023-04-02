const express = require("express");
const router = express.Router();
const residentController = require("../controllers/residentController");
const validate = require("../middlewares/validate");
const schema = require("../schemas/residentSchema");
const { AUTHORIZATION, MANAGERAUTHORIZATION } = require("../middlewares/access");

router.post("/", MANAGERAUTHORIZATION, validate(schema.newResident), residentController.newResident);
router.get("/listResidents", AUTHORIZATION, residentController.listResidents);
router.delete("/:residentId", MANAGERAUTHORIZATION, residentController.deleteResident);

module.exports = router;

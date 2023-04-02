const express = require("express");
const router = express.Router();
const { AUTHORIZATION, MANAGERAUTHORIZATION } = require("../middlewares/access");
const validate = require("../middlewares/validate");
const debtController = require("../controllers/debtController");
const schemas = require("../schemas/debtSchema");

router.get("/listDebts", AUTHORIZATION, debtController.listDebts);
router.post("/newDebt", MANAGERAUTHORIZATION, validate(schemas.newDebt), debtController.newDebt);
router.delete("/deleteDebt/:id", MANAGERAUTHORIZATION, debtController.deleteDebt);

module.exports = router;

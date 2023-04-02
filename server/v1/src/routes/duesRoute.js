const express = require("express");
const router = express.Router();
const duesController = require("../controllers/duesController");
const { AUTHORIZATION, MANAGERAUTHORIZATION } = require("../middlewares/access");

// router.get("/addDuesToAllResidents", duesController.addDuesToAllResidents);
router.get("/listDues", AUTHORIZATION, duesController.listDues);
router.get("/paidDues", AUTHORIZATION, duesController.paidDues);
router.get("/unPaidDues", AUTHORIZATION, duesController.unPaidDues);

router.post("/payDues/:id", MANAGERAUTHORIZATION, duesController.payDues);

module.exports = router;

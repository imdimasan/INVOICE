const { Router } = require("express");
const Client = require("../models/Client");
const router = Router();
const auth = require("../middleware/auth.middleware");
const { ObjectId } = require("mongodb");

router.post("/save", auth, async (req, res) => {
  try {
    const {
      organization,
      unp,
      legaladdress,
      bankaccount,
      bankname,
      bic,
      noticeact,
      noticeinvoice,
      contractdate,
      contractname,
      owner,
    } = req.body;

    const client = new Client({
      organization,
      unp,
      legaladdress,
      bankaccount,
      bankname,
      bic,
      noticeact,
      noticeinvoice,
      contractdate,
      contractname,
      owner: req.user.userId,
    });
    await client.save();
    res.status(201).json({ client });
  } catch (e) {
    res.status(500).json({ message: "Nothing work :(" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const clients = await Client.find({ owner: req.user.userId });
    res.json(clients);
  } catch (e) {
    res.status(500).json({ message: "Nothing work :(" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.json(client);
  } catch (e) {
    res.status(500).json({ message: "Nothing work :(" });
  }
});
router.delete("/remove/:id", auth, async (req, res) => {
  try {
    const client = await Client.deleteOne({ _id: ObjectId(req.params.id) });
    res.json(client);
  } catch (e) {
    res.status(500).json({ message: "Nothing work :(" });
  }
});

module.exports = router;

const { Router } = require("express");
const Client = require("../models/Client");
const router = Router();
const auth = require("../middleware/auth.middleware");

router.post("/save", auth, async (req, res) => {
  console.log("REQUEST", req.body);

  try {
    const {
      organization,
      unp,
      bank,
      bic,
      notice,
      contractdate,
      contractname,
      owner,
    } = req.body;

    const client = new Client({
      organization,
      unp,
      bank,
      bic,
      notice,
      contractdate,
      contractname,
      owner: req.user.userId,
    });
    await client.save();
    res.status(201).json({ client });

    await client.save();
    res.status(201).json({ client });
  } catch (e) {
    res.status(500).json({ message: "Nothing work :(" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.Id });
    res.json(links);
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

module.exports = router;
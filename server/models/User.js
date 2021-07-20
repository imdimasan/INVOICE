const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: { type: String, required: true },
  unp: { type: String, required: true, uniquie: true },
  bank: { type: String, required: true },
  bic: { type: String },
  links: [
    {
      type: Types.ObjectId,
      ref: "Link",
    },
  ],
  client: [
    {
      type: Types.ObjectId,
      ref: "Client",
    },
  ],
});

module.exports = model("User", schema);

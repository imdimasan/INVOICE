const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organization: { type: String },
  unp: { type: String, uniquie: true },
  legaladdress: { type: String },
  bankaccount: { type: String },
  bankname: { type: String },
  bic: { type: String },
  pro: { type: Boolean },
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

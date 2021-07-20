const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  organization: { type: String, required: true },
  unp: { type: String, required: true, uniquie: true },
  bank: { type: String, required: true },
  bic: { type: String },
  notice: { type: String },
  contractdate: { type: Date, default: Date.now },
  contractname: { type: String },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Client", schema);

const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  organization: { type: String, required: true },
  unp: { type: String, required: true, uniquie: true },
  legaladdress: { type: String },
  bankaccount: { type: String },
  bankname: { type: String },
  bic: { type: String },
  noticeact: { type: String },
  noticeinvoice: { type: String },
  contractdate: { type: Date, default: Date.now },
  contractname: { type: String },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Client", schema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const homeworkSchema = new Schema({
  homeworkproject: {
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  homeworkuser: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  homeworkproject: {
    type: String,
  },
  homeworkname: {
    type: String,
  },
  homeworkdescriptionn: {
    type: String,
  },
  homeworkstatus: {
    type: Boolean,
  },
  homeworkdate: {
    type: Date,
  },
});

module.exports = mongoose.model("homework", homeworkSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const homeworkSchema = new Schema({
    homeworkproject: {
        type: String
    },
    homeworkuser: {
        type: String
    },
    homeworkname: {
        type: String
    },
    homeworkdescriptionn: {
        type: String
    },
    homeworkstatus: {
        type: Boolean
    },
    homeworkdate: {
        type: Date
    }
});

module.exports = mongoose.model("homework", homeworkSchema);
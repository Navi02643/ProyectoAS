const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
    projectname: {
        type: String
    },
    projectdescription: {
        type: String
    },
    projectstatus:{
        type: Boolean
    }
});

module.exports = mongoose.model("project", projectSchema);
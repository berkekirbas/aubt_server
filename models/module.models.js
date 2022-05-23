const mongoose = require("mongoose");
const { v4 } = require("uuid");

const ModuleModel = new mongoose.Schema({
  _id: {
    type: String,
    default: () => {
      return v4();
    },
  },

  module_type: {
    type: String,
    required: true,
  },

  module_short_description: {
    type: String,
    required: true,
  },
  module_name: {
    type: String,
    required: true,
  },

  module_content_first_section: {
    type: String,
    required: true,
  },
  module_content_progress_section: {
    type: String,
    required: true,
  },

  module_content_result_section: {
    type: String,
    required: true,
  },

  module_image_url: {
    type: String,
    required: true,
  },
  module_created_by: {
    type: String,
    required: true,
  },
});

const Module = mongoose.model("Module", ModuleModel);

module.exports = Module;

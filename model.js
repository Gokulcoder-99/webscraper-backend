const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    Image : {
        type: String,
        required: [true, "image is missing"],
      },
    Name: {
      type: String,
      required: [true, "name is missing"],
    },
    Rating: {
      type: String,
      required: [true, "rating is missing"],
    },
    Price: {
      type: String,
      required: [true, "Price is missing"],
    },
    Link: {
        type: String,
        required: [true, "Url"],
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("productvalue", productSchema);

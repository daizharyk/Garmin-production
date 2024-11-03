const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  description: { type: String },
  isDeleted: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  color: { type: String },
  category: { type: String },
  product_title: { type: String },
  image: { type: String },
  imageUrl: { type: String },
  text: { type: String },
  status: { type: String },
  folder_name: { type: String },
  carousel_images: [{ type: String }],
  banner_text: {
    title: { type: String },
    text: { type: String },
    banner_images: {
      main_banner: { type: String },
      alt: { type: String },
      adaptive_banner: { type: String },
    },
  },
  video_section: {
    thumbnail: { type: String },
    video_url: { type: String },
  },
  additional_images: {
    main_image: { type: String },
    adaptive_image: { type: String },
  },
  watch_features: [{
    image: { type: String },
    title: { type: String },
    description: { type: String },
  }],
}, {
  timestamps: true,
});



module.exports = mongoose.model("Item", itemSchema);

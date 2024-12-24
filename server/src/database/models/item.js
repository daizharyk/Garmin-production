const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    color: { type: String },
    category: { type: String },
    product_title: { type: String },
    image: { type: String },

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
    watch_features: [
      {
        image: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],
    features: {
      touchscreen: { type: Boolean, default: false },
      new_forerunners: { type: Boolean, default: false },
      entry_level_running: { type: Boolean, default: false },
      advanced_running: { type: Boolean, default: false },
      elite_running: { type: Boolean, default: false },
      touchscreen_and_buttons: { type: Boolean, default: false },
      color_screen: { type: Boolean, default: false },
      solar_charging: { type: Boolean, default: false },
      flashlight: { type: Boolean, default: false },
      buttons: { type: Boolean, default: false },
      amoled_display: { type: Boolean, default: false },
      heart_rate_monitors: { type: Boolean, default: false },
    },
    delete_urls: {
      mainImageDeleteUrl: { type: String },
      mainBannerDeleteUrl: { type: String },
      adaptiveBannerDeleteUrl: { type: String },
      videoThumbDeleteUrl: { type: String },
      mainAdditionImgDeleteUrl: { type: String },
      adaptiveAddDeleteUrl: { type: String },
      carouselDeleteUrls: { type: [String] },
      watchFeatureDeleteUrls: { type: [String] },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);

import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    VideoFile: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
      trim: true,
      // index: true,
    },
    Description: {
      type: String,
      required: true,
      trim: true,
    },
    Thumbnail: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    Views: {
      type: Number,
      default: 0,
    },
    Likes: {
      type: Number,
      default: 0,
    },
    Dislikes: {
      type: Number,
      default: 0,
    },
    IsPublic: {
      type: Boolean,
      default: true,
    },
    Owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(mongooseAggregatePaginate);

const Video = mongoose.model("Video", videoSchema);
export default Video;

import mongoose, { isValidObjectId } from "mongoose";
import Video from "../models/video.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.body;

    const pipeline = [];

    // Match videos by owner if userId is provided
    if (userId) {
        if (!isValidObjectId(userId)) {
            throw new ApiError(400, "Invalid userId");
        }
        pipeline.push({ $match: { Owner: new mongoose.Types.ObjectId(userId) } });
    }

    // Match videos by query
    if (query) {
        pipeline.push({
            $match: {
                $or: [
                    { Title: { $regex: query, $options: "i" } },
                    { Description: { $regex: query, $options: "i" } },
                ],
            },
        });
    }

    // Sort videos
    if (sortBy && sortType) {
        const sortTypeValue = sortType === "desc" ? -1 : 1;
        pipeline.push({ $sort: { [sortBy]: sortTypeValue } });
    }

    // Add pagination
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
    };

    const videos = await Video.aggregatePaginate(Video.aggregate(pipeline), options);

    return res
        .status(200)
        .json(new ApiResponse(200, videos, "Videos retrieved successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { Title, Description } = req.body;

    if ([Title, Description].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoFileLocalPath) {
        throw new ApiError(400, "Video file is required");
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required");
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!videoFile) {
        throw new ApiError(500, "Error uploading video file");
    }

    if (!thumbnail) {
        throw new ApiError(500, "Error uploading thumbnail");
    }

    const video = await Video.create({
        Title,
        Description,
        VideoFile: videoFile.url,
        Thumbnail: thumbnail.url,
        duration: videoFile.duration,
        Owner: req.user._id,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, video, "Video published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video retrieved successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { Title, Description } = req.body;
    const thumbnailLocalPath = req.file?.path;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.Owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this video");
    }

    const updatedFields = {};

    if (Title) {
        updatedFields.Title = Title;
    }

    if (Description) {
        updatedFields.Description = Description;
    }

    if (thumbnailLocalPath) {
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

        if (!thumbnail) {
            throw new ApiError(500, "Error uploading thumbnail");
        }

        updatedFields.Thumbnail = thumbnail.url;
    }

    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { $set: updatedFields },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.Owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this video");
    }

    await Video.findByIdAndDelete(videoId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.Owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to toggle the publish status of this video");
    }

    video.IsPublic = !video.IsPublic;
    await video.save();

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Publish status toggled successfully"));
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
};

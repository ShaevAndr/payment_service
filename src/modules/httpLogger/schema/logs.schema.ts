import * as mongoose from 'mongoose';

export const LogsSchema = new mongoose.Schema({
    description: String,
    method: String,
    url: String,
    requestBody: mongoose.Schema.Types.Mixed,
    responseStatus: Number,
    responseBody: mongoose.Schema.Types.Mixed,
    duration: Number,
});
import * as mongoose from 'mongoose';

export const FriendshipSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: String,
    requested_date: Date,
    accepted_date: Date,
    declined_date: Date,
});

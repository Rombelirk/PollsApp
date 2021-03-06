import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    login: String,
    password: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    pollHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }],
    currentPoll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
});

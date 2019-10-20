import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    login: String,
    password: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

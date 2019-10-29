import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    title: String,
    assignees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    create_date: Date,
    deadline: Date,
    description: String,
    imageURL: String,
});

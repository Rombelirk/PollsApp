import * as mongoose from 'mongoose';

export const PollSchema = new mongoose.Schema({
    title: String,
    options: [{
        _id: mongoose.Schema.Types.ObjectId,
        option: mongoose.Schema.Types.String,

    }],
    votes:
        [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            optionId: mongoose.Schema.Types.ObjectId,

        }]
    ,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    create_date: Date,

});

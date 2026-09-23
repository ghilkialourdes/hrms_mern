import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        fromDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        toDate: {
            type: Date,
        },
        duration: {
            type: Number,
            min: 0,
            default: 0,
        },
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
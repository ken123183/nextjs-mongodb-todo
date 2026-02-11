
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITodo extends Document {
    content: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema: Schema = new Schema(
    {
        content: {
            type: String,
            required: [true, 'Please provide content for this todo.'],
            maxlength: [60, 'Content cannot be more than 60 characters'],
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent overwriting model when hot-reloading
const Todo: Model<ITodo> = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;

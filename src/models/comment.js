import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;

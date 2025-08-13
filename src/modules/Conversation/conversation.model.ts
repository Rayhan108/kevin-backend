import mongoose, { Schema } from 'mongoose';

const UnreadCountSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",  // Refers to the 'user' collection
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }  // Disable the _id field for subdocuments
);

const ConversationSchema = new Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    latestMessage: {
      content: {
        type: String,
        default: "",
      },
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
    unreadCounts: [UnreadCountSchema],
    allowedRoles: {
      type: [String],
      enum: ['user', 'contractor', 'vipMember', 'vipContractor'],
      required: true,
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt
  }
);

const Conversation = mongoose.model("conversation", ConversationSchema);
export default Conversation;

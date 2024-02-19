import { default as mongoose, Schema } from 'mongoose'

/*
    Session model consists of -
    session_id - UUID (also a content of the cookie itself)
    user - one-to-one ref to User
    created_at - Date.now, set to expire after 7 days
*/

const SessionSchema = new Schema({
  session_id: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    expire: 604800, // 7 days
    default: Date.now
  },
})

export default mongoose.models.Session || mongoose.model("Session", SessionSchema)
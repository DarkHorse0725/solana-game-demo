import { default as mongoose, Schema } from 'mongoose'

/*
  Nonce schema -
  We generate a nonce for every wallet which is valid for 5 minutes.
  If the user doesn't authorize within 5 minutes or if the user authorizes
  One time within 5 minutes,
  This nonce gets removed from the database
  Why bother? It's against stolen signatures
 */

const NonceSchema = new Schema({
  wallet: {
    required: true,
    type: String
  },
  createdAt: {
    type: Date,
    expire: 300,
    default: Date.now
  },
  nonce: {
    type: String,
    required: true
  }
})

export default mongoose.models.Nonce || mongoose.model("Nonce", NonceSchema)
import mongoose, { Schema } from 'mongoose'

const sessionSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String
  },
  keywords: {
    type: String
  },
  description: {
    type: String
  },
  conference: {
    type: String
  },
  type: {
    type: String
  },
  day: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

sessionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      title: this.title,
      keywords: this.keywords,
      description: this.description,
      conference: this.conference,
      type: this.type,
      day: this.day,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Session', sessionSchema)

export const schema = model.schema
export default model

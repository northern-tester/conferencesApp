import mongoose, { Schema } from 'mongoose'

const conferenceSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  date: {
    type: String
  },
  country: {
    type: String
  },
  length: {
    type: String
  },
  tutorials: {
    type: String
  },
  workshops: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

conferenceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      name: this.name,
      date: this.date,
      country: this.country,
      length: this.length,
      tutorials: this.tutorials,
      workshops: this.workshops,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Conference', conferenceSchema)

export const schema = model.schema
export default model

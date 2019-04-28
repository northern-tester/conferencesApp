import mongoose, { Schema } from 'mongoose'

const speakerSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  nationality: {
    type: String
  },
  country: {
    type: String
  },
  speciality: {
    type: String
  },
  biography: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

speakerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      name: this.name,
      nationality: this.nationality,
      country: this.country,
      speciality: this.speciality,
      biography: this.biography,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Speaker', speakerSchema)

export const schema = model.schema
export default model

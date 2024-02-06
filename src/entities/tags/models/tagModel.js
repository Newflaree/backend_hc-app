// Mongoose
import { Schema, model, models } from 'mongoose';


const tagSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
}, {
  timestamps: true
});

const tag = models.tag || model( 'tag', tagSchema );


export default tag;

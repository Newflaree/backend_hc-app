import { Schema, model } from 'mongoose';


const UserSchema = new Schema({
  name: {
    type: String,
    required: [ true, 'Name is required' ],
  },
  email: {
    type: String,
    required: [ true, 'Email is required' ],
    unique: true
  },
  password: {
    type: String,
    required: [ true, 'Password is required' ]
  },
  img: {
    type: String
  },
  location: {
    latitude: {
      type: Number,
      default: 0
    },
    longitude: {
      type: Number,
      default: 0
    }
  },
  tags: [{
    type: String
  }],
  role: {
    type: String,
    enum: [
      'USER_ROLE',
      'NARRATOR_ROLE',
      'ADMIN_ROLE'
    ],
    default: 'USER_ROLE'
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  isGoogle: {
    type: Boolean,
    default: false,
  },
  isFacebook: {
    type: Boolean,
    default: false
  },
  isApple: {
    type: Boolean,
    default: false
  },
  applicationStatus: {
    type: String,
    enum: [
      'WITHOUT_STATUS',
      'PENDING_STATUS',
      'ACTIVE_STATUS',
      'REJECTED_STATUS'
    ],
    default: 'WITHOUT_STATUS'
  }
});

UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
}

export default model( 'User', UserSchema );

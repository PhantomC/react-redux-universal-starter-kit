import moongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: 'string',
    unique: true,
    lowercase: true
  },
  password: String
});

const ModelClass = mongoose.model('user', userSchema);

export default ModelClass;
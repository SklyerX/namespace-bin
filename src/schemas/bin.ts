import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  Title: String,
  Description: String,
  Date: Date,
  DeleteAfterView: Boolean,
  UrlCode: String,
  Content: String,
});

const name = 'bin';

export default mongoose.models[name] || mongoose.model(name, schema);

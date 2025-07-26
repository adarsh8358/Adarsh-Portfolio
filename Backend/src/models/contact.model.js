import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Contact', contactSchema);
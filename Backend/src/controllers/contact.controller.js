import Contact from '../models/contact.model.js';

export async function createContact(req, res) {
  try {
    const { name, number, email, message } = req.body;
    if (!name || !number || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const contact = new Contact({ name, number, email, message });
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
}
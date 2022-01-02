const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../model/Contact');
const auth = require('../middleware/auth');

//route GET api/contacts
//desc  fetch the contact
//access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//route  api/contacts
//@access Private
//@desc   Add the contact
router.post(
  '/',
  auth,
  body('name', 'name is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Sever Error');
    }
  }
);

//route PUT api/contacts
//access Private
//desc  Update the contact
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //Build contact object
  const contactField = {};
  if (name) contactField.name = name;
  if (email) contactField.email = email;
  if (phone) contactField.phone = phone;
  if (type) contactField.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact Not Found' });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactField },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//route DELETE api/contacts
//desc Delete the contact
//access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact Not found' });
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorization' });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'contact Remove' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;

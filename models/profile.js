const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true
    },

    ownerName: {
        type: String,
        required: true
    },
    gst: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
  
    idType: {
        type: String,
        enum: ['aadhar', 'pan', 'passport'],
        required: true
    },
     user: { type: mongoose.Schema.Types.ObjectId,
         ref: 'User' ,
         required: true
        }, // Made optional

},
    { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
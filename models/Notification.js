const res = require('express/lib/response');
const { default: mongoose } = require('mongoose');
const { model, Schema } = require('mongoose')

const Notification = new Schema({
    notificationDate: {
        type: Date,
        required: true,
        index: true // add an index on this field
    },
    notificationType: {
        type:String,
        required:true,
        index: true // add an index on this field
    },
    notificationAboutUser: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // add an index on this field
    },
});

module.exports = model('Notification', Notification);
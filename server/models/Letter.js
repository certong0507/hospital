const mongoose = require('mongoose');

let LetterSchema = new mongoose.Schema(
   {
      patient: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
      },
      hospital: String,
      date_from: {
         type: Date,
         required: true
      },
      date_to: {
         type: Date,
         required: true
      },
      isApproved: Boolean,
      remarks: String
   },
   { timestamps: { createdAt: 'created_at' } }
)

LetterSchema.methods.addPatient = function(patient_id) {
   this.patient = patient_id;
   return this.save();
}

module.exports = mongoose.model('Letter', LetterSchema);
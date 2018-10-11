const Letter = require('../models/Letter');

module.exports = {
   addLoG: (req, res, next) => {
      let { hospital, date_from, date_to, isApproved, remarks } = req.body;

      Letter({ hospital, date_from, date_to, isApproved, remarks })
         .save((err, letterOfGuarantees) => {
            if (err)
               res.send(err)
            else if (!letterOfGuarantees)
               res.send(400)
            else {
               return letterOfGuarantees.addPatient(req.body.patient_id)
                  .then((_letterOfGuarantees) => {
                     return res.send(_letterOfGuarantees)
                  })
            }
            next();
         })
   },

   getAllLoG: (req, res, next) => {
      Letter.find()
         .populate('patient')
         .exec((err, list) => {
            if (err)
               res.send(err)
            else if (!list)
               res.send(404)
            else
               res.send(list)
            next()
         })
   },

   getAllLoGByPatient: (req, res, next) => {
      Letter.find({ patient: req.params.patient_id })
         .populate('patient')
         .exec((err, list) => {
            if (err)
               res.send(err)
            else if (!list)
               res.send(404)
            else
               res.send(list)
            next()
         })
   },

   updateLoG: (req, res, next) => {
      Letter.findOneAndUpdate({ _id: req.params.id },
         { isApproved: req.body.isApproved, remarks: req.body.remarks },
         { new: true })
         .then((letter) => {
            res.send(letter);
         });
   }
}
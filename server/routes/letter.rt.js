const letterCtrl = require('../controllers/letter.ctrl');

module.exports = (router) => {

   // Create letter of guarantees. (for Patient)
   // Params: Letter of guarantees object.
   router
      .route('/letter')
      .post(letterCtrl.addLoG);

   // Get all letter of guarantees. (for Admin) 
   router
      .route('/letters')
      .get(letterCtrl.getAllLoG);

   // Get all letter of guarantees by patient id. (for Patient)
   // Params: Patient id
   router
      .route('/letters/:patient_id')
      .get(letterCtrl.getAllLoGByPatient);

   // Approve/Reject letter of guarantees. (for Admin)
   // Params: Letter of guarantees id.
   router
      .route('/letter/update/:id')
      .put(letterCtrl.updateLoG);
}
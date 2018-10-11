## __Prerequisite__
1. NodeJs - Make sure that you have Node v8 or above installed.
2. MongoDB - Make sure that you have MongoBD setup in your local.
3. Create a database in mongoDB. Database Name: __hospital__
4. Go to file __./hospital/database/dummy.txt__, copy and paste the insert Users script into mongoDB and run.

## __Installation__
1. Clone this repo using https://github.com/certong0507/hospital.git
2. Move to the appropriate directory: cd hospital.
3. Run ```npm install``` in order to install dependencies.
4. Once finished installing all the required dependencies, run ```npm start```
5. Open new terminal or new console and run ```node ./server/app.js``` to start the server. __(Make sure you are in the correct folder path where you save the project)__
6. Open your browser and go to http://localhost:3000/

## __Demo Login Accounts__
1. Admin - __Username__: david, __Password__: 123
2. Patient - __Username__: tan, __Password__: 123
3. Patient - __Username__: loh, __Password__: 123

__Admin__ role: 
- Dashboard page that show all the patient application list.
- Approve or Reject patient application.

__Patient__ role:
- Create application.
- Dashbosrd page that show own application only.
- Able to view more for each application.

##__Screenshot__
__Login Page__
- <img src="https://github.com/certong0507/hospital/blob/master/doc/login.png" width="500">

__Admin Dashboard__
- <img src="https://github.com/certong0507/hospital/blob/master/doc/admin_dashboard.png" width="600">

__Admin Approval Action Popup__
- <img src="https://github.com/certong0507/hospital/blob/master/doc/admin_approval.png" width="600">

__Admin Rejection Action Popup
<img src="https://github.com/certong0507/hospital/blob/master/doc/admin_rejection.png" width="600">

__Patient Dashboard__
<img src="https://github.com/certong0507/hospital/blob/master/doc/patient_dashboard.png" width="600">

__Patient Apply Letter of Guarantee Popup__
<img src="https://github.com/certong0507/hospital/blob/master/doc/patient_apply_LoG.png" width="600">

__Patietn Dashboard View More Popup__
<img src="https://github.com/certong0507/hospital/blob/master/doc/patient_view_more.png" width="600">

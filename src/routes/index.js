
const loginController= require('../app/controllers/LoginController')
const employeeController= require('../app/controllers/EmployeeController')
const scheduleController= require('../app/controllers/ScheduleController')
const pharmacyController= require('../app/controllers/PharmacyController')


function route(app)
{
       
            app.get('/get-available-time-by-id',employeeController.getAvailableTime);
            app.get('/get-doctor-supporter',employeeController.getDS);
            app.get('/get-doctor',employeeController.getDoctorInfo)
            app.get('/get-all-doctor',employeeController.getAllDoctorInfo)
            app.get('/get-pending-users',scheduleController.getAllPending)
            app.get('/get-approve-users',scheduleController.getAllApprove)
            app.get('/get-cancel-users',scheduleController.getAllCancel)
            app.get('/get-approve-appointment',scheduleController.getApproveAppointment)
            app.get('/get-all-pharmacy',pharmacyController.allPharmacy)
            app.get('/get-all-medicine-pharmacy',pharmacyController.pharmacyMedicine)
            app.get('/verify-email/:token',scheduleController.verifyEmail)
            app.get('/search-suitable-doctor',employeeController.getSuitableDoctor)
            app.get('/search',pharmacyController.search)
            app.get('/search-advanced',pharmacyController.searchAdvanced)
            app.post('/order',pharmacyController.order)
            app.post('/approve-users',scheduleController.approveUser)
            app.post('/cancel-users',scheduleController.cancelUser)
            app.post('/login',loginController.checkAndSendToken)
            app.post('/add-available-time',employeeController.addAvailableTime)
            app.post('/book-appointment',scheduleController.schedule)
            app.post('/signup',loginController.signup)
            app.post('/verify-email',scheduleController.verifyEmail)
            app.get('/verify-email-test/:token',scheduleController.verifyEmail)


}

module.exports = route
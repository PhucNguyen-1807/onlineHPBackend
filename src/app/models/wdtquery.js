const QUERY={
    "SELECT_LOGIN_CHECK_USER":'SELECT EXISTS(SELECT * FROM users WHERE email= ? AND password=? ) AS Existing',
    "SELECT_LOGIN_CHECK_EMPLOYEE":'SELECT EXISTS(SELECT * FROM employee WHERE email= ? AND password=? ) AS Existing',
    "INSERT_SIGNUP_USER":"INSERT INTO `users`(`email`,`password`) VALUES(?,?)",
    "SELECT_LOGIN_ROLEID":'SELECT roleId FROM employee WHERE email= ? AND password=? ',
    "SELECT_LOGIN_USERID":'SELECT id FROM users WHERE email= ? AND password=? ',
    "SELECT_DS":'SELECT id,name,roleId,phone FROM employee WHERE roleId=2 or roleId=3',
    "SELECT_DOCTOR":'SELECT id,name,email,address,phone,specialist,gender,roleId,description,avatar FROM employee WHERE id=?',
    "SELECT_ALL_DOCTOR":'SELECT id,name,email,address,phone,specialist,gender,roleId,avatar FROM employee WHERE roleId = 2',
    "SELECT_AVAILABLE_TIME_BY_DOCTOR":'SELECT * FROM availableTime WHERE employeeID = ? and isFull=0',
    "INSERT_AVAILABLE_TIME" : "INSERT INTO availableTime VALUES (?,?,?,?,0)",
    "INSERT_APPOINTMENT":"INSERT INTO appointment(employeeID,userID,start,end,date,type,link) VALUES (?,?,?,?,?,?,?)",
    "SELECT_APPOINTMENT_ID_LATEST" : "SELECT MAX(id) AS id FROM appointment WHERE id IN (SELECT id FROM appointment WHERE employeeID=? AND userID=?)",
    "UPDATE_AVAILABLE_TIME_FULL": "UPDATE availableTime set isFull=1 where employeeID=? and start=? and date=?",
    "SELECT_EMAIL_USERS":"SELECT email FROM users WHERE id=?",
    "SELECT_EMPLOYEE_NAME":"SELECT name FROM employee WHERE id=?",
    "SELECT_EMPLOYEE_ADDRESS":"SELECT address FROM employee WHERE id=?",
    "SELECT_PENDING_APPOINTMENT":"SELECT userID,updateAt,id AS appointmentID FROM appointment WHERE status='pending'",
    "UPDATE_APPROVE_APPOINTMENT":"UPDATE appointment SET status = 'approve' WHERE id=?",
    "SELECT_APPROVE_APPOINTMENT":"SELECT userID,start,end,date,type,link FROM appointment WHERE employeeID=? AND status='approve' ",
    "UPDATE_CANCEL_APPOINTMENT":"UPDATE appointment SET status = 'cancel' WHERE id=?",
    "UPDATE_APPOINTMENT_STATUS_PENDING":"UPDATE appointment SET status='pending' where id=?",
    "UPDATE_APPOINTMENT_UPDATEAT":"UPDATE appointment SET updateAt=? WHERE id=?",
    "SELECT_INFO_USERS":"SELECT id,name,email,phone FROM users WHERE id IN ?",
    "SELECT_INFO_USERS_IN_APPOINTMENT":"SELECT name,phone FROM users WHERE id =?",
    "SELECT_INFO_PHARMACY":"SELECT * FROM pharmacy ",
    "SELECT_SPECIFIC_PHARMACY":"SELECT * FROM medicine WHERE pharmacyName=? ",
    "SELECT_SEARCH":"SELECT medicineName,number,price,description,image FROM medicine WHERE pharmacyName=? AND medicineName LIKE CONCAT('%', ?, '%')",
    "SELECT_NUMBER_MEDICINE" : "SELECT number WHERE pharmacyName=? AND medicineName=?",
    "UPDATE_NUMBER_MEDICINE" : "UPDATE medicine SET number=number - ? WHERE pharmacyName=? AND medicineName=?"


}   

module.exports=QUERY
require('dotenv').config()
const nodemailer=require('nodemailer')

let sendEmail=async(data)=>{
            let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.MAIL_USERNAME, // generated ethereal user
              pass: process.env.MAIL_PASSWORD, // generated ethereal password
            },
          });
          if(data.type==='online')
          {
          // send mail with defined transport object
              let info = await transporter.sendMail({
                from: '"OnlineHP" <OnlineHP@gmail.com>', // sender address
                to: data.mail, // list of receivers
                subject: "Thông tin đặt lịch khám bệnh tại OnlineHP", // Subject line
                html: `<h3>Cảm ơn quý khách đã đặt lịch khám bệnh tại OnlineHP</h3>
                <h4>Thông tin đặt lịch khám bệnh:</h4>
                <div>Tên bác sĩ: ${data.name} </div>
                <div>Thời gian: ${data.start} - ${data.end}</div>
                <div>Ngày khám bệnh: ${data.date}</div>
                <div>Trạng thái: <b>Thành công</b></div>
                <h4>Thank you very much !</h4>
                <p>Nếu các thông tin trên là chính xác, vui lòng nhấn vào đường Link bên dưới để xác nhận và hoàn thành thủ tục khám bệnh</p>
                <a href=http://localhost:3000/verify-email-test/${data.token}>Click Here </a>
                <p>Hãy truy cập đường Link bên dưới theo lịch khám bệnh để tham gia tư vấn trực tuyến với bác sĩ </p>
                <a href=${data.link}>Tư vấn trực tuyến</a>
                `
              });
           }
          //  <a href=https://main--delightful-tiramisu-590812.netlify.app/verify-email/${data.token}>Click Here </a>
           else{
            let info = await transporter.sendMail({
              from: '"OnlineHP" <OnlineHP@gmail.com>', // sender address
              to: data.mail, // list of receivers
              subject: "Thông tin đặt lịch khám bệnh tại OnlineHP", // Subject line
              html: `<h3>Cảm ơn quý khách đã đặt lịch khám bệnh tại OnlineHP</h3>
              <h4>Thông tin đặt lịch khám bệnh:</h4>
              <div>Tên bác sĩ: ${data.name} </div>
              <div>Thời gian: ${data.start} - ${data.end}</div>
              <div>Ngày khám bệnh: ${data.date}</div>
              <div>Địa chỉ khám bệnh: ${data.address}</div>
              <div>Trạng thái: <b>Thành công</b></div>
              <h4>Thank you very much !</h4>
              <p>Nếu các thông tin trên là chính xác, vui lòng nhấn vào đường Link bên dưới để xác nhận và hoàn thành thủ tục khám bệnh</p>
              <a href=https://main--delightful-tiramisu-590812.netlify.app/verify-email/${data.token}>Click Here </a>
              `
            });
           }
 
}
module.exports = sendEmail
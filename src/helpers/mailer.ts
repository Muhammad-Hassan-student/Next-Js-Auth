import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import User from '@/model/user.model';


export const sendMail = async ({email, emailType, userId}:any) => {
    try {

          //user id is convert into token
          const hashedToken = await bcryptjs.hash(userId.toString(),10);

          if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
              {$set:{
              verifyToken: hashedToken,
              verifyTokenExpiry: Date.now() + 3600000

            }})
          }else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{$set:{
              forgotPasswordToken: hashedToken,
              forgotPasswordTokenExpiry: Date.now() + 3600000

            }})
          }

       // Looking to send emails in production? Check out our Email API/SMTP product!
            const transporter = nodemailer.createTransport({
              host: "sandbox.smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "c910c1e95e9967",
                pass: "a75062b5b04c6c"
              }
            });
          const mailIptions = {
            from: 'akramhassan4445@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            text: "Hello world text body?", // plain text body
            html: `<p>Click here <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</a>
            or copy and paster the link below in your browser.
            <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}
            </p>`, // html body
          }

          const mailResponse = await transporter.sendMail(mailIptions);
          return mailResponse;
    } catch (error:any) {
        throw new Error(error.message);
    }
}
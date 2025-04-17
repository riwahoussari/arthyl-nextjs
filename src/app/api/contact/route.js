import nodemailer from "nodemailer";

const SENDING_EMAIL = "info@arthyl.com";
const SENDING_EMAIL_PASS = "IamArthyl_2004";
const RECEIVING_EMAIL = "info@arthyl.com";
const SENDING_EMAIL_HOST= "smtp.hostinger.com"
const SENDING_EMAIL_PORT = 465

// export async function POST(req) {
//   try {
//     const { fullName, phoneNumber, message } = await req.json();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: SENDING_EMAIL,
//         pass: SENDING_EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       // from: EMAIL,
//       from: SENDING_EMAIL,
//       to: RECEIVING_EMAIL,
//       subject: "New Contact Form Submission From Website",
//       text: `Full Name: ${fullName}\nPhone: ${phoneNumber}\nMessage: ${message}`,
//     });

//     return Response.json(
//       { message: "Email sent successfully!" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log(error)
//     return Response.json(
//       { message: "Failed to send email", error },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req) {
  try {
    const { fullName, phoneNumber, message } = await req.json();

    if (!fullName || !phoneNumber || !message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: SENDING_EMAIL_HOST,
      port: SENDING_EMAIL_PORT,
      secure: true,
      auth: {
        user: SENDING_EMAIL,
        pass: SENDING_EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: "Arthyl",
      to: RECEIVING_EMAIL,
      subject: `New Contact Form Submission from ${fullName}`,
      text: message,
      html: `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Email send error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}

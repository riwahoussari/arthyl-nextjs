import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { fullName, phoneNumber, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDING_EMAIL,
        pass: process.env.SENDING_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      // from: process.env.EMAIL,
      from: process.env.SENDING_EMAIL,
      to: process.env.RECEIVING_EMAIL,
      subject: "New Contact Form Submission From Website",
      text: `Full Name: ${fullName}\nPhone: ${phoneNumber}\nMessage: ${message}`,
    });

    return Response.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}

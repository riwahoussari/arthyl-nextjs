import nodemailer from "nodemailer";

const SENDING_EMAIL = "info@arthyl.com";
const SENDING_EMAIL_PASS = "$SmM~wazPZ9";
const SENDING_EMAIL_HOST= "smtp.hostinger.com"
const SENDING_EMAIL_PORT = 465


export async function POST(req) {
  try {
    const { fullName, email, artworkName } = await req.json();

    if (!fullName || !email || !artworkName) {
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
      to: email,
      subject: `Inquiry About ${artworkName}`,
      text: artworkName,
      html: `
        <p>Hello ${fullName},</p>
        <p>Thank you for your interest in my artwork.</p>
        <p>I will be reaching out to you as soon as possible.</p>
        <p>- Arthyl</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Email send error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}

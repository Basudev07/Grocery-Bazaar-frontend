import nodemailer from 'nodemailer';

export async function POST(request) {
  const data = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use your SMTP service
    auth: {
      user: 'avirajchettri@gmail.com',
      pass: 'obpe ochv khwh bxkc', // not your actual Gmail password!
    },
  });

  const mailOptions = {
    from: data.email,
    to: 'parinachauhan447@gmail.com', // replace with your address
    subject: data.subject || 'New Contact Message',
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Message: ${data.message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

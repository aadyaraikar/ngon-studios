import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { firstName, lastName, email, message } = await request.json();

    if (!firstName || !email || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'NGON Studios <onboarding@resend.dev>',
      to: ['aadyaraikar04@gmail.com'],
      subject: `New Contact Form Submission from ${firstName} ${lastName}`.trim(),
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New Website Contact Message
          </h2>
          <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #333; margin: 10px 0;">
            ${message.replace(/\n/g, '<br/>')}
          </blockquote>
        </div>
      `,
    });

    if (data.error) {
      return Response.json({ error: data.error.message }, { status: 400 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Resend API Error:', error);
    return Response.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

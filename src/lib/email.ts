import nodemailer from 'nodemailer';

interface EmailData {
  from: string;
  name: string;
  message: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Create transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail({ from, name, message }: EmailData) {
  const safeName = escapeHtml(name);
  const safeFrom = escapeHtml(from);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
    replyTo: from,
    subject: `Portfolio Contact from ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #f9fafb;
              padding: 20px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 15px;
            }
            .label {
              font-weight: bold;
              color: #6366f1;
            }
            .message-box {
              background: white;
              padding: 15px;
              border-radius: 4px;
              border-left: 4px solid #8b5cf6;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">From:</span> ${safeName}
              </div>
              <div class="field">
                <span class="label">Email:</span> ${safeFrom}
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-box">
                  ${safeMessage}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Contact Form Submission

From: ${name}
Email: ${from}

Message:
${message}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

// Optional: Verify transporter connection on server start
export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log('Email service is ready');
    return true;
  } catch (error) {
    console.error('Email service connection failed:', error);
    return false;
  }
}

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const isConfigured = process.env.SMTP_USER &&
        process.env.SMTP_USER !== 'your_mailtrap_user' &&
        process.env.SMTP_PASS;

    if (!isConfigured) {
        console.warn('⚠️  SMTP not configured — email skipped.');
        return;
    }

    // Railway & most cloud hosts block port 465 (SSL).
    // Always use port 587 with STARTTLS for maximum compatibility.
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: 587,
        secure: false,          // STARTTLS — NOT SSL
        requireTLS: true,       // Force upgrade to TLS
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false  // Needed on some cloud hosts
        }
    });

    const message = {
        from: `"${process.env.SMTP_FROM_NAME || 'Sarinni'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
        to: options.email,
        replyTo: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
        subject: options.subject,
        html: options.html
    };

    const info = await transporter.sendMail(message);
    console.log(`📧 Email sent → ${options.email} (msgId: ${info.messageId})`);
};

module.exports = sendEmail;

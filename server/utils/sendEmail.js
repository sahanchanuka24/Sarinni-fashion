const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    let transporter;

    // Check if real credentials are provided
    const isConfigured = process.env.SMTP_USER && process.env.SMTP_USER !== 'your_mailtrap_user';

    if (isConfigured) {
        const isSecure = process.env.SMTP_PORT == 465;
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: isSecure, 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    } else {
        // AUTO-FALLBACK: Create a test account on the fly
        console.log('ℹ️ No valid SMTP credentials found. Creating a temporary test account...');
        let testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        console.log('✨ Temporary credentials created:', testAccount.user);
    }

    const message = {
        from: `${process.env.SMTP_FROM_NAME || 'Sarinni'} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        replyTo: process.env.SMTP_FROM_EMAIL, // Important for deliverability
        subject: options.subject,
        html: options.html
    };

    try {
        const info = await transporter.sendMail(message);
        console.log(`✅ Email sent successfully to: ${options.email}`);
        
        // If it was a test account, show the URL to view the email
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
            console.log('🔗 View Test Email at:', previewUrl);
        }
    } catch (error) {
        console.error('❌ Nodemailer Error:', error.message);
        throw error;
    }
};

module.exports = sendEmail;



const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function setupEthereal() {
    console.log('Generating test email credentials...');
    
    // Create a testing account from ethereal.email
    let testAccount = await nodemailer.createTestAccount();

    console.log('Credentials generated!');
    console.log('User:', testAccount.user);
    console.log('Pass:', testAccount.pass);

    const envPath = path.join(__dirname, '.env');
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Update the .env file
    envContent = envContent.replace(/SMTP_HOST=.*/, `SMTP_HOST=smtp.ethereal.email`);
    envContent = envContent.replace(/SMTP_PORT=.*/, `SMTP_PORT=587`);
    envContent = envContent.replace(/SMTP_USER=.*/, `SMTP_USER=${testAccount.user}`);
    envContent = envContent.replace(/SMTP_PASS=.*/, `SMTP_PASS=${testAccount.pass}`);

    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ Your .env file has been updated with working test credentials!');
    console.log('You can view any sent emails at: https://ethereal.email/messages');
}

setupEthereal().catch(console.error);

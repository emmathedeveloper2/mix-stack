
type VerificationTemplateOptions = {
    appName: string,
    code: string
}

export const verificationEmailTemplate = ({ appName , code } : VerificationTemplateOptions) => {

    return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td style="padding: 20px 0;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; background-color: #000000; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600;">${appName} Email Verification</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">Thank you for signing up. Please use the verification code below to complete your registration:</p>
              
              <!-- Verification Code Box -->
              <div style="background-color: #f7f7f7; border: 1px solid #eeeeee; border-radius: 6px; padding: 20px; margin: 30px 0; text-align: center;">
                <p style="margin: 0 0 10px; font-size: 14px; color: #666666;">Your verification code is:</p>
                <p style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 5px; color: #000000; font-family: monospace;">
                  <!-- Replace with dynamic code -->
                  ${code}
                </p>
              </div>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.</p>
              
              <p style="margin: 30px 0 0; font-size: 16px; line-height: 1.5;">Thank you,<br>The ${appName} Team</p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f7f7f7; text-align: center; color: #666666; font-size: 14px; border-top: 1px solid #eeeeee;">
              <p style="margin: 0;">© 2025 ${appName}. All rights reserved.</p>
              <p style="margin: 10px 0 0;">This is an automated message, please do not reply.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `
}
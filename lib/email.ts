import { Resend } from 'resend';

interface InviteClickNotification {
  key: string;
  timestamp: string;
  userAgent: string | null;
  ip: string | null;
  referer: string | null;
}

export async function sendInviteClickNotification(data: InviteClickNotification): Promise<void> {
  try {
    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!notificationEmail || !resendApiKey) {
      console.log('Email notifications not configured, skipping');
      return;
    }

    const resend = new Resend(resendApiKey);

    const { data: emailData, error } = await resend.emails.send({
      from: 'Wisdomous Invites <invites@notifications.wisdomous.dev>',
      to: [notificationEmail],
      subject: `Invite Link Clicked: ${data.key}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Invite Link Click Notification</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Click Details:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Invite Key:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-family: monospace;">${data.key}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Timestamp:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${new Date(data.timestamp).toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>IP Address:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${data.ip || 'Unknown'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Referrer:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${data.referer || 'Direct'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>User Agent:</strong></td>
                <td style="padding: 8px 0; word-break: break-word;">${data.userAgent || 'Unknown'}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            This notification was sent because an invite link was clicked. 
            The user has been redirected to: <a href="${process.env.REDIRECT_URL}">${process.env.REDIRECT_URL}</a>
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="color: #999; font-size: 12px;">
            To view tracking statistics, visit: 
            <a href="https://wisdomous-invite-redirect.vercel.app/api/tracking">Tracking Dashboard</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send email notification:', error);
    } else {
      console.log('Email notification sent successfully:', emailData);
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}
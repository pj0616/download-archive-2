---
seo:
  title: SMTP Errors and Troubleshooting
  description: SMTP Response codes and troubleshooting tips
  keywords: SMTP, send email, integrate, building, filters, scheduling, substitution, suppression groups, unique arguments, recipients
title: SMTP Errors and Troubleshooting
group: smtp
weight: 0
layout: page
navigation:
  show: true
---

## Response codes

Each SMTP call you make returns a response. `200` responses are usually success responses, and `400` responses are usually deferrals. SendGrid continues to retry resending `400` messages for up to 72 hours. `500` responses are hard failures that are not retried by our servers. This table has possible response codes with example errors and a general explanation of that sort of response.

<table class="table">
  <colgroup>
  <col class="table-col-100">
  <col>
  <col>
  </colgroup>
  <tr>
    <th>Error</th>
    <th>Message</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td>250</td>
    <td>`Queued mail for delivery`</td>
    <td>Your mail has been successfully queued! This response indicates that the recipient server has accepted the message.</td>
  </tr>
    <tr>
    <td>403</td>
    <td>`You are not authorized to send from that email address`</td>
    <td>This means the "from" address does not match a verified Sender Identity. Mail cannot be sent until this error is resolved. To learn how to resolve this error, see our [Sender Identity requirements]({{root_url}}for-developers/sending-email/sender-identity/).</td>
  </tr>
  <tr>
    <td>421</td>
    <td>`Message from (X.X.X.X) temporarily deferred`</td>
    <td>Messages are temporarily deferred because of recipient server policy - often it's because of too many messages or connections in too short of a timeframe. We continue to retry deferred messages for up to 72 hours. Consider temporarily sending less messages to a domain that is returning this code because this could further delay your messages currently being tried.</td>
  </tr>
  <tr>
    <td>450</td>
    <td>`too frequent connects from 198.37.147.135, please try again later.`</td>
    <td>The message failed because the recipient's mailbox was unavailable, perhaps because it was locked or was not routable at the time. We continue to retry messages for up to 72 hours. Consider temporarily sending less messages to a domain that is returning this code because this could further delay your messages currently being tried.</td>
  </tr>
  <tr>
    <td>451</td>
    <td>`Temporary local problem - please try later`</td>
    <td>The message simply failed, usually due to a far-end server error. We continue to retry messages for up to 72 hours.</td>
  </tr>
  <tr>
    <td>451</td>
    <td>`Authentication failed: Maximum credits exceeded`</td>
    <td>There is a credit limit of emails per day enforced in error. <a href="https://support.sendgrid.com/hc/en-us">Contact support</a> to remove that limit.</td>
  </tr>
  <tr>
    <td>452</td>
    <td>`Too many recipients received this hour (throttled)`</td>
    <td>The message has been deferred due to insufficient system storage. We continue to retry messages for up to 72 hours.</td>
  </tr>
  <tr>
    <td>550</td>
    <td>`Requested action not taken: mailbox unavailable`</td>
    <td>The user???s mailbox was unavailable. Usually because it could not be found, or because of incoming policy reasons. Remove these address from your list - it is likely a fake, or it was mistyped.</td>
  </tr>
  <tr>
    <td>551</td>
    <td>`User does not exist.`</td>
    <td>The intended mailbox does not exist on this recipient server. Remove these addresses from your list.</td>
  </tr>
  <tr>
    <td>552</td>
    <td>`This message is larger than the current system limit or the recipient???s mailbox is full. Create a shorter message body or remove attachments and try sending it again.`</td>
    <td>The recipients mailbox has exceeded its storage limits. We don't resend messages with this error code because this is usually a sign this is an abandoned email.</td>
  </tr>
  <tr>
    <td>553</td>
    <td>`Invalid/inactive user.`</td>
    <td>The message was refused because the mailbox name is either malformed or does not exist. Remove these addresses from your list.</td>
  </tr>
  <tr>
    <td>554</td>
    <td>`ERROR: Mail refused`</td>
    <td>This is a default response that can be caused by a lot of issues. There is often a human readable portion of this error that gives more detailed information, but if not, remove these addresses from your list.</td>
  </tr>
  <tr>
    <td>Other</td>
    <td>`Delayed Bounce - Unable to Parse Server Reason`</td>
    <td>This is what SendGrid displays when the reciepients server returns a blank reason code.</td>
  </tr>
</table>

## Turning off click tracking

To turn off click tracking, add this to your X-SMTPAPI header:

```json
{
  "filters": {
    "clicktrack": {
      "settings": {
        "enable": 0
      }
    }
  }
}
```

## Invalid SMTP API header

When you try to send an invalid X-SMTPAPI header, you will get an email with details about the invalidations. You may also see errors on your Email Activity page or in your Event Webhook data. If this happens, the email should give you the information you need to begin troubleshooting. We also recommend uploading your JSON into a JSON validator, because this is often an invalid JSON issue.

## Certificate verification failed for smtp.sendgrid.net

`"certificate verification failed for [smtp.sendgrid.net](http://smtp.sendgrid.net/)[198.37.144.225]:587: untrusted issuer /C=US/O=The Go Daddy Group, Inc./OU=Go Daddy Class 2 Certification Authority"`

If you receive this error, the connection is still encrypted; it's just that your server doesn't have the necessary CA (certificate authority) certificates to confirm that our certificate is valid.

_To update your certificates:_

1. Download the GoDaddy CA bundle from [https://certs.godaddy.com/anonymous/repository.pki](https://certs.godaddy.com/anonymous/repository.pki) (grab the one called `"gd_bundle-g2-g1.crt"`).
1. Save that on your server.
1. Tell Postfix where to find it by adding or editing the following line in `/etc/postfix/` [main.cf](http://main.cf/): `"smtp_tls_CAfile = /etc/postfix/ssl/gd_bundle-g2-g1.crt"`
1. Restart Postfix to make the change take effect.

If the mail server communicates with more than just us, add this certificate to your existing CA bundle (frequently called `ca-bundle.crt`).

## 550 Unauthenticated Senders Not Allowed

If you???re getting an ???Unauthenticated Senders Not Allowed??? error, the problem usually lies in authenticating with our SMTP server. This error gets triggered when there was an attempt to hand over an email message through smtp.sendgrid.net before authenticating the connection with your SendGrid username and API key.

To fix this issue, you???ll want to make sure that you???ve configured your setup to connect to `smtp.sendgrid.net` using authentication, and that the credentials you???re using are your SendGrid username and a properly configured API key as the password. For more on API keys, see [API Keys]({{root_url}}/ui/account-and-settings/api-keys/).

If you???re using cPanel/Exim, you???ll want to make sure it???s configured to authenticate every time it connects to `smtp.sendgrid.net`.

## Additional Resources

- [SMTP Service Crash Course](https://sendgrid.com/blog/smtp-service-crash-course/)
- [Getting Started with the SMTP API]({{root_url}}/for-developers/sending-email/getting-started-smtp/)
- [Integrating with SMTP]({{root_url}}/for-developers/sending-email/integrating-with-the-smtp-api/)
- [Building an SMTP Email]({{root_url}}/for-developers/sending-email/building-an-x-smtpapi-header/)

---
seo:
  title: Getting started with the Event Webhook
  description: Use RequestBin to get started or to troubleshoot your Event Webhook.
  keywords: webhook, RequestBin, troubleshoot, event webhook
title: Getting started with the Event Webhook
group: getting-started
weight: 100
layout: page
navigation:
  show: true
---

SendGrid's Event Webhook will notify a URL of your choice via HTTP POST with information about events that occur as SendGrid processes your email. You can use this data to remove unsubscribes, react to spam reports, [determine unengaged recipients](https://sendgrid.com/blog/infer-engagement-with-the-event-api/), identify bounced email addresses, or create advanced analytics of your email program. With Unique Arguments and Category parameters, you can insert dynamic data that will help build a clear image of your email program.

<call-out type="warning">

Categories and Unique Arguments will be stored as a “Not PII” field and may be used for counting or other operations as SendGrid runs its systems. These fields generally cannot be redacted or removed. You should take care not to place PII in this field. SendGrid does not treat this data as PII, and its value may be visible to SendGrid employees, stored long-term, and may continue to be stored after you’ve left SendGrid’s platform.

</call-out>

You should set up the Event Webhook if you want to keep track of more event data that we store for you. Due to the sheer volume of email we send, we can only store so much information. Your [Email Activity Feed]({{root_url}}/ui/analytics-and-reporting/email-activity-feed/) can hold up to 30 days worth of events. After that time passes, the email event data is gone.

## Getting started

_To get started with the Event Webhook:_

1. Go to the [Webhook tester](https://webhook.site/).
1. Copy the unique URL.
1. In a new window, open [Settings > Mail Settings](https://app.sendgrid.com/settings/mail_settings) in the [SendGrid UI](https://app.sendgrid.com).
1. Turn on **Event Webhook**.
1. In the **HTTP POST URL field**, paste the unique URL that you copied in step 2.
1. Select the Event notifications you would like to test.
1. Click the checkmark in the top corner to save these updates into your settings.
1. Click **Test Your Integration**.
   <br> This returns an HTTP POST containing a JSON array of your selected events in one request after a very short delay. Our servers send these POSTs to the URL you defined in the Event Notification app options.
1. Go back to the [Webhook tester](https://webhook.site/) and reload the page.
   <br> This loads the JSON array of your selected events that you set in the last step.

<call-out type="warning">

The Webhook tester site has a public URL. This is usually safe for testing purposes, just make sure that you remove the `webhook.site` URL from your Event Notifications settings after you are done testing.

</call-out>

<call-out>

You can also update your Event Webhook mail settings using the [PATCH /user/webhooks/event/settings](https://sendgrid.api-docs.io/v3.0/webhooks/update-event-notification-settings) API method, and you can test the webhook integration using the [POST /user/webhooks/event/test](https://sendgrid.api-docs.io/v3.0/webhooks/test-event-notification-settings) API method.

</call-out>

<call-out>

If you want to test your webhook locally, deploy a local version of [Webhook tester](https://github.com/fredsted/webhook.site). Other browser options are [Beeceptor](https://beeceptor.com), or [ngrok](https://ngrok.com/).

</call-out>

### Retry logic

If your web server does not return a 2xx response type, we will retry a POST request until we receive a 2xx response or the maximum time has expired. All events are retried at increasing intervals for up to 24 hours after the event occurs. Please note that this time limit is a rolling 24 hours, which means new failing events will receive their own 24-hour retry period.

## Next steps

Now that you understand what Event data looks like and the basics of the webhook, it's time to evaluate your own needs for the types of events you want to store, what kind of data storage that requires, and then switch your integration from the RequestBin test to a more permanent integration.

### Data Storage

Events post every 30 seconds or when the batch size reaches 768 kilobytes - whichever occurs first. This is per server, so if you send a high volume of emails, the webhook URL may receive tens or even hundreds of posts per second. Because of this, storage should be a significant consideration of the type of integration you set up.

Storage integrations are infinitely flexible, but here are some popular options:

- Locally on your servers.
- SendGrid's [open source Event Kit](https://github.com/sendgrid/eventkit-rails) stores the data on a Heroku instance.
- SendGrid's partner Keen provides a platform to analyze, visualize, and store SendGrid Event data. For more information about getting started with Keen, see [Email Event Data with Keen]({{root_url}}/ui/analytics-and-reporting/tracking-data-with-keen-io/).
- You could also use [Snowplow](https://github.com/snowplow/snowplow/wiki/SendGrid-webhook-setup), a web open source platform that supports SendGrid and stores the data on Amazon Redshift.
- Several open source web libraries support SendGrid's Event Webhook. For a full list of these libraries, see the [Webhook libraries section]({{root_url}}/for-developers/sending-email/libraries/) of our API Libraries list.

<call-out type="warning">

If your email traffic generates a lot of events, the incoming data can quickly overload a web server if not configured correctly. You can load test your endpoints with loader.io for free.

</call-out>

### Integrating

Once you choose a storage option, follow steps 3 through 8 in [Getting started](#getting-started]) to update your [Settings > Mail Settings](https://app.sendgrid.com/settings/mail_settings) in the [SendGrid UI](https://app.sendgrid.com). Update the **HTTP POST URL field** to your URL, and make sure you've selected the events that you want to receive.

The Event Webhook does not follow redirects.

If you want to receive encrypted posts, your callback URL needs to support TLS 1.2.

## Additional Resources

- [Event Webhook reference]({{root_url}}/for-developers/tracking-events/event/)
- [Troubleshooting the Event Webhook]({{root_url}}/for-developers/tracking-events/troubleshooting/)
- [An Event Webhook case study](https://sendgrid.com/blog/leveraging-sendgrids-event-api/)
- [Webhook web libraries]({{root_url}}/for-developers/sending-email/libraries/)
- [Email Event Data with Keen]({{root_url}}/ui/analytics-and-reporting/tracking-data-with-keen-io/)
- [Analyze, Visualize, and Store SendGrid Event Data with Keen]({{root_url}}/for-developers/tracking-events/analytics-with-keen-io/)

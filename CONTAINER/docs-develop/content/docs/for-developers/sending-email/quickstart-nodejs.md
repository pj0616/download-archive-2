---
layout: page
weight: 0
title: Email API Quickstart for Node.js
group: api-v3
navigation:
  show: true
seo:
  title: Email API Quickstart for Node.js
  description: Sending your first email using the SendGrid REST API and Node.js.
  keywords: Getting Started, API, v3, REST, SendGrid REST API, Node.js, JavaScript
---

In this quickstart, you'll learn how to send your first email using the [Twilio SendGrid Mail Send API](https://sendgrid.api-docs.io/v3.0/mail-send/v3-mail-send) and [Node.js](https://nodejs.org/).

## Prerequisites

Be sure to perform the following prerequisites to complete this tutorial. You can skip ahead if you've already completed these tasks.

1. Sign up for a SendGrid account.
2. Enable Two-factor authentication.
3. Create and store a SendGrid API Key with **Mail Send** > **Full Access** permissions.
4. Complete Domain Authentication.
5. Install Node.js.

<a href="#starting-the-project" class="btn btn-primary">Skip the prerequisites</a>

### Sign up for a SendGrid account

When you sign up for a free [SendGrid account](https://signup.sendgrid.com/), you'll be able to send 100 emails per day forever. For more account options, see our [pricing page](https://sendgrid.com/pricing/).

### Enable Two-factor authentication

Twilio SendGrid requires customers to enable Two-factor authentication (2FA). You can enable 2FA with SMS or by using the [Authy](https://authy.com/) app. See the [2FA section of our authentication documentation]({{root_url}}/for-developers/sending-email/authentication/#two-factor-authentication) for instructions.

### Create and store a SendGrid API key

Unlike a username and password — credentials that allow access to your full account — an API key is authorized to perform a limited scope of actions. If your API key is compromised, you can also cycle it (delete and create another) without changing your other account credentials.

Visit our [API Key documentation]({{root_url}}/ui/account-and-settings/api-keys/) for instructions on creating an API key and [storing an API key in an environment variable]({{root_url}}/ui/account-and-settings/api-keys/#storing-an-api-key-in-an-environment-variable). To complete this tutorial, you can create a Restricted Access API key with **Mail Send** > **Full Access** permissions only, which will allow you to send email and schedule emails to be sent later. You can edit the permissions assigned to an API key later to work with additional services.

Once your API key is assigned to an environment variable — this quickstart uses `SENDGRID_API_KEY` — you can proceed to the next step.

```shell
export SENDGRID_API_KEY=<Your API Key>
```

### Verify your Sender Identity

To ensure our customers maintain the best possible sender reputations and to uphold legitimate sending behavior, we require customers to verify their [Sender Identities]({{root_url}}/for-developers/sending-email/sender-identity/) by completing [Domain Authentication]({{root_url}}/ui/account-and-settings/how-to-set-up-domain-authentication/). A Sender Identity represents your 'From' email address—the address your recipients see as the sender of your emails.

<call-out>

To get started quickly, you may be able to skip Domain Authentication and begin by completing [Single Sender Verification]({{root_url}}/ui/sending-email/sender-verification). Single Sender Verification is recommended for testing only. Some email providers have [DMARC]({{root_url}}/glossary/dmarc) policies that restrict email from being delivered using their domains. For the best experience, please complete Domain Authentication. Domain Authentication is also required to upgrade from a free account. To better understand why Domain Authentication is necessary, see our ["Spoofing"]({{root_url}}/glossary/spoofing/) and ["Everything about DMARC"]({{root_url}}/ui/sending-email/dmarc/) articles.

</call-out>

### Node.js

Before installing Node.js, you can see if you already have a version on your machine.

<call-out>

The Twilio SendGrid Node.js helper library supports the current LTS version of Node.js and versions 6, 7, 8, and 10.

</call-out>

#### Node.js version check

Check your Node.js version by opening your terminal (also known as a command line or console) and typing the following command:

```shell
node --version
```

If you have Node.js installed, the terminal should print something like the following output:

```shell
v12.16.1
```

Though the SendGrid helper library supports Node.js back to version 6, we recommend using the latest version. Node.js version 12.16.1 was used to build this quickstart.

#### Install Node.js

If you do not already have a version of Node.js installed, visit the [Node.js website](https://nodejs.org/en/) for instructions on downloading and installing a version appropriate for your operating system. The npm package manager also has a helpful [installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Starting the project

Using a [Twilio SendGrid helper library](https://github.com/sendgrid/sendgrid-nodejs) is the fastest way to deliver your first email.

Start by creating a project folder for this app. You can name the project anything you like. We use `sgQuickstart` in the following examples.

```shell
mkdir sgQuickstart
```

Next, navigate into the sgQuickstart directory where you will complete the rest of the tutorial.

```shell
cd sgQuickstart
```

### Initialize your project

The [npm](https://www.npmjs.com/) package manager was included when you installed Node.js. You can use npm to install the Twilio SendGrid helper library as a project dependency. If you want to verify that npm is installed, you can type the following into the terminal.

```shell
npm --version
```

The terminal should print something like the following output.

```shell
6.13.4
```

<call-out>

You can install the helper library using [yarn](https://yarnpkg.com/) if you prefer.

</call-out>

Before installing the package, you should first initialize your project with the following command.

```shell
npm init
```

This command will print a chain of questions that help you create a `package.json` file. The `package.json` file stores a list of project dependencies. You can hit **Enter** or **Return** to skip any of the questions and use the default values.

Once you complete the initialization process, your package.json will contain a `“main”` property. This property stores the application entry point, which is `"index.js"`. The application entry point is the _main_ file Node.js will look for when running your application code. This will be important later. You can use any file name you want, but we’ll use the default `"index.js"` in this quickstart.

### Install the helper library

To install the Twilio SendGrid helper library, type the following command into the terminal.

```shell
npm install --save @sendgrid/mail
```

The terminal should print something like.

```shell
$npm install --save @sendgrid/mail
+ @sendgrid/mail@7.2.1
added 15 packages from 19 contributors and audited 15 packages in 1.625s
found 0 vulnerabilities
```

<call-out>

If you see errors printed above the message, they are likely related to missing information in your package.json file. You can ignore these errors for this quickstart.

</call-out>

## How to send an API email

You're now ready to write some code. First, create a file in your project directory. Again, you can use `index.js` because that's the name of the `"main"` entry point file in the `package.json` file.

### Complete code block

The following Node.js block contains all the code needed to successfully deliver a message with the SendGrid Mail Send API. You can copy this code, modify the `to` and `from` fields, and run the code if you like. We'll break down each piece of this code in the following sections.

```javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })
```

### Build your API call

Your API call must have the following components:

- A host (the host for Web API v3 requests is always `https://api.sendgrid.com/v3/`)
- An API key passed in an Authorization Header
- A request (when submitting data to a resource via `POST` or `PUT`, you must submit your request body in JSON format)

In your `index.js` file, require the Node.js helper library. The library will handle setting the Host, `https://api.sendgrid.com/v3/`, for you.

```javascript
const sgMail = require('@sendgrid/mail')
```

Next, use the API key you set up earlier. Remember, the API key is stored in an environment variable, so you can use the `process.env()` method to access and assign it using the helper library's `setApiKey()` method. The helper library will pass your key to the API in an Authorization header using Bearer token authentication.

```javascript
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
```

Now you're ready to set up your `"to"`, `"from"`, `"subject"`, and message body `"text"`. These values are passed to the API in a ["personalizations"](https://sendgrid.com/docs/for-developers/sending-email/personalizations/) object when using the v3 Mail Send API. The helper library allows you to store all this data in a single flat JavaScript object. Assign the object to a variable named `msg`.

Change the `“to”` value to a valid email address you can access. This is where your message will be delivered. Change the `“from”` value to the address you verified during the Sender Identity set up.

The `"subject"` can be any text. The email body can be either plain text or HTML. The helper library allows you to specify the type of email body by using either the `"text"` or `"html"` properties.

```javascript
const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
```

To send the message, pass the `msg` object as an argument to the helper library's `send()` method. You can also add `then()` and `catch()` methods to log the response status code and headers or catch and log any errors.

```javascript
sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })
```

The code block is now complete. To send the message, you can run the `index.js` file with Node.js.

```shell
node index.js
```

If you receive a [`202` status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202) printed to the console, your message was sent successfully. Check the inbox of the `“to”` address, and you should see your demo message.

If you don’t see the email, you may need to check your spam folder.

### Troubleshooting

If you receive an error message, you can reference our [response message documentation](https://sendgrid.api-docs.io/v3.0/how-to-use-the-sendgrid-v3-api/api-responses#status-codes) for clues about what may have gone wrong.

#### API Response messages

All responses are returned in JSON format. We specify this by sending the Content-Type header. The Web API v3 provides a selection of [response codes](https://sendgrid.api-docs.io/v3.0/how-to-use-the-sendgrid-v3-api/api-responses#status-codes), [content-type headers](https://sendgrid.api-docs.io/v3.0/how-to-use-the-sendgrid-v3-api/api-responses#content-type-header), and [pagination](https://sendgrid.api-docs.io/v3.0/how-to-use-the-sendgrid-v3-api/api-responses#pagination) options to help you interpret the responses to your API requests.

<call-out>

Get additional onboarding support. Save time, increase the quality of your sending, and feel confident you are set up for long-term success with [SendGrid Onboarding Services](https://sendgrid.com/marketing/onboarding-services-request/?utm_source=docs).

</call-out>

## Next Steps

This is just the beginning of what you can do with our APIs. To learn more, check the resources below.

- [API Reference]({{root_url}}/api-reference/)
- [Sending Email with Dynamic Transactional Templates]({{root_url}}/ui/sending-email/how-to-send-an-email-with-dynamic-transactional-templates/)
- [Getting Started with the Event Webhook]({{root_url}}/for-developers/tracking-events/getting-started-event-webhook/)
- [The Email Activity Feed]({{root_url}}/ui/analytics-and-reporting/email-activity-feed/)
- [Sender Authentication]({{root_url}}/ui/account-and-settings/how-to-set-up-domain-authentication/)
- [Twilio SendGrid helper library for Node.js](https://github.com/sendgrid/sendgrid-nodejs)

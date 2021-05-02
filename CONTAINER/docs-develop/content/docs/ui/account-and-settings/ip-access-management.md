---
seo:
  title: IP Access Management
  description: Control which IPs have access to your SendGrid account.
  keywords: mail settings, access management, IP allow listing, security
title: IP Access Management
weight: 0
group: ip-management
layout: page
navigation:
  show: true
---

<iframe src="https://player.vimeo.com/video/298041979" width="700" height="400" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## What is IP access management?

[IP Access Management](https://app.sendgrid.com/settings/access) is a security feature that allows you to control who can access your SendGrid account based on their [IP address]({{root_url}}/glossary/ip-address/). After you allow an IP address, you can only access the SendGrid UI, API, and SMTP relay if you are connecting from an allowed IP address. Any access attempts from other IPs will be blocked. This is a powerful security tool that you can use to help prevent malicious activity on your account.

<call-out>

There is no limit on how many IP addresses you can allow.

</call-out>

<call-out type="warning">

It is possible to remove your own IP address from your list of allowed addresses, thus blocking your own access to your account. While we are able to restore your access, we do require thorough proof of your identify and ownership of your account. We take the security of your account very seriously, and wish to prevent any "bad actors" from maliciously gaining access to your account.

Your current IP is clearly displayed to help prevent you from accidentally removing it from the allowed addresses.

</call-out>

<call-out type="warning">

If you do not access SendGrid via a static IP address (for example, via VPN or from a business internet service), setting up IP Access Management may result in being locked out of your SendGrid account. If you do discover that you have locked yourself out of your account, please contact [SendGrid Support](https://support.sendgrid.com/hc/en-us/requests/new#ipam-lockout).

</call-out>

## Allowing an IP Address

There are several different ways to allow an IP address. If you navigate to the IP Access Management page under Settings, you will see a list of any currently allowed IP addresses and a list of IPs that recently attempted to access your account.

![]({{root_url}}/images/ip_access_management.png)

### Recent Access Attempts

Under Recent Access Attempts, you will see a list of recent IPs that attempted to connect to your account, regardless of whether or not they are allowed addresses. You will also see some additional information about those IPs, such as the date of the first and most recent access attempt, the physical location of the IP, and the method by which they attempted to access your account.

You can allow one of these IPs by clicking the gear icon in the row of the IP you would like to allow, then clicking “Add To Whitelist”.

![]({{root_url}}/images/add_ip_from_recent_access_attempts.png)

### Adding IP Addresses Manually

To manually allow one or more IP addresses, click the Add IP Addresses button.

![]({{root_url}}/images/add_ip_address_button.png)

You will see a dialogue box presenting you with a blank form in which you may enter a single IP address or multiple IP addresses separated by a space, comma, or on separate lines.

![]({{root_url}}/images/ip_access_management_add_ip.png)

It is possible for advanced users to use CIDR notation to allow a range of IP addresses. To do so, simply enter your routing prefix followed by a `/` and then the number of bits in your routing mask. For example: `192.168.100.14/24`.

<call-out type="warning">

Explaining CIDR notation is beyond the scope of this article, and we only recommend that advanced users use this notation when allowing IPs. If you are unfamiliar with CIDR notation, we recommend that you enter each IP individually when allowing a range of IPs.

</call-out>

To enter a range of IP addresses using a “wildcard”, simply add an asterisk to the end of the IP. For example, `25.203.44.*` would include all IPs that begin with `25.203.44`.

After entering the IP addresses you would like to allow, click Save.

<call-out>

If you remove every IP address from your list of allowed addresses, you will again be able to log in to your account from any IP address.

</call-out>

For additional information about using IP Access Management through our API, see our [API Reference](https://sendgrid.api-docs.io/v3.0/ip-access-management).

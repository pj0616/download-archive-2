---
layout: page
weight: 70
title: Create and Manage Contacts
group: managing-contacts
navigation:
  show: true
seo:
  title: Create and Manage Contacts
  keywords:
  override: true
  description:
---

<call-out>

The content on this page describes the experience in the latest version of Marketing Campaigns. If you’re using the legacy version of Marketing Campaigns, your experience may be different. To explore Marketing Campaigns plans and upgrade, click [here](https://sendgrid.com/pricing).

</call-out>

<iframe src="https://player.vimeo.com/video/381663627" width="640" height="480" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

## Add Contacts

You can add contacts to Marketing Campaigns by uploading a CSV, manually via the UI, using a Signup Form, or by integrating with the Contacts API.

<call-out>
  
Note that automations will only trigger to contacts who are added to an entry criteria list *after* the automation is set live. Contacts who you add to a list before the automation is set live will not receive any emails in the series.

</call-out>

### Upload a CSV

A common way to add contacts is to upload a CSV and map your data to custom fields.

<call-out>

You can upload a CSV containing up to 1M contacts or 5GB of data, whichever is less.

</call-out>

1. Use [this CSV template]({{root_url}}/assets/example.csv) to make sure your CSV is formatted correctly.
1. Click **Add Contacts** and then select **Upload CSV**.
1. Choose whether to add your contacts to All Contacts, to an existing list, or to a new list you create.
1. Upload your file by dragging it into or clicking the CSV upload area and selecting a file from your computer.
1. Click **Next: Review CSV Upload**.
1. On this page, all fields are listed and you can see which fields don't have a corresponding reserved or system field.
1. For each unmapped field, select a custom field from the drop-down or to create a new custom field, click **Create New Custom Field**.
1. When you're done mapping the fields, click **Next: Add Contacts**.

Once the CSV has processed, you will receive a [notification]({{root_url}}/ui/account-and-settings/notifications/) email.

### Add Manually

You can add your contacts manually including alternate email addresses, addresses and names from the Contacts page.

1. Navigate to **Marketing** and then click **Contacts**.
1. Select **Add Contacts** and then click on **Manual Add** in the drop down menu.
1. Choose whether to add your contacts to All Contacts, to an existing list, or to a new list you create.
1. Add your contact's email, and then any other information you may have.
1. When you're done, click **Add Contacts**.

### Create a signup form

Use Signup Forms to capture new contacts and add them directly to Marketing Campaigns. You can choose to add them to All Contacts, or to a specific list. You can create up to 15 Signup Forms.

<call-out>

If the list you add them to is acting as the entry criteria for a live automation, the new contact will automatically receive any emails you’ve created as part of that automation.

</call-out>

You can invite contacts to sign up to hear from you by sharing your signup form either by sending them a link hosted by Twilio SendGrid or by embedding it directly into your website.

_To create a new signup form:_

1. Navigate to Marketing and select **Signup Forms**.
1. Click **Create a Signup Form**.
1. On the Settings tab, add a Form Name and then select either All contacts or a specific list new contacts will be added to.
1. Next, add a confirmation message. This field contains the text that contacts will see once they’ve submitted the form.
1. Navigate to the Build tab and add a header to the form.
1. Add the intro copy to explain what the contact is signing up to receive.
1. Select the checkboxes to add the reserved and custom fields you want on the form. When contacts sign up, this data will be added to their contact profile.

<call-out>

If a contact (defined by a unique email address) already exists in your contact database, any new or updated data will be reflected on that existing contact.

</call-out>

### Manage signup forms

Using the action menu on the Signup Forms page you can edit, duplicate, or delete existing signup forms.

![]({{root_url}}/img/action-menu-signup-form.png 'Action menu for signup forms')

<call-out>

Because of the iframe technology used to create the signup form, the form dynamically updates on the page or pages where you have the form embedded anytime you edit a form and click **Save & Apply**.

</call-out>

### Share Code to make your form accessible

To make your form accessible to new contacts, you can either send them a link hosted by Twilio SendGrid or you can embed code on your website that displays your form as an iframe.

_To share the code for your signup form:_

1. Navigate to the signup form you want to share or embed.
1. Click the action menu and select **Share Code**.
1. On the _Integrate Form_ modal, copy either the Landing Page or Direct Embed link.

   - The Landing Page link can be pasted anywhere, including in an email or on a social media site.
   - The Direct Embed code can be pasted to the HTML of your website wherever you’d like the form to display.

You can also find the options to share the signup form in the form editor by clicking **Share Code** in the top-right corner of the editor.

## Manage Contacts

Managing contacts is an integral part of your Marketing Campaigns lifecycle. You can create lists for contacts, as well as view and edit each individual contact within your contact database.

### Viewing a contact

To view a specific contact profile, find the contact in one of your lists by searching your contact database. Then, click the contact’s email address. You will then be able to view the email, engagement data, profile information, custom fields, and list associations for this contact.

<call-out>

Searches are case agnostic but must be done using a whole email address that includes an "@" and any top-level domain like ".com" or ".io".

</call-out>

To view any custom fields you have assigned to this contact, or to view any lists that you have added this contact to, you may flip through the tabs beneath the Contact Details. You may either view all custom fields at once, or you can filter them by the following types: “Text”, “Date”, and “Number”.

### Editing a contact

When you are viewing a contact, click any of the Edit buttons in the Contact Fields tab to edit the contact's information within that section. This includes the Twilio SendGrid provided reserved fields, except email, any custom fields you’ve added for this contact, and any lists the contact is associated with.

_To edit the associated lists for your contact:_

1. Select the **Associated Lists** tab.
2. Enter or select the list you would like to use.
3. Click **Add**.

### Managing your list

Sending to a well-managed address list can drastically improve your delivery. We have put together some simple steps and guidelines that will improve any senders list.

- [Suppressions](#identifying-suppressions)
- [Delete unusable contacts](#delete-unusable-contacts)
- [Delete a specific contact](#delete-a-specific-contact)
- [Delete all contacts](#delete-all-contacts)

### Identifying Suppressions

In your Twilio SendGrid Account are different [Suppressions]({{root_url}}/ui/sending-email/index-suppressions/) lists.

**Global Unsubscribes** - Addresses on this list are opted out of all mail.

**Bounces** - Addresses that have failed to deliver to the recipient's inbox. Once an address has been added to this list, we do not attempt to deliver further messages to it. We will instead Drop them to protect your external reputation.

**Spam Reports** - Addresses that have marked your mail as spam.

**Blocks** - Addresses that have blocked your mail temporarily, usually due to factors like a denied IP address. You can attempt to resend to these addresses.

**Invalid** - Addresses on this list are malformed and do not have a valid email address structure. (Ex. info.sendgrid.com, info@sendgridcom, info @ sendgrid.com)

Emails sent to addresses listed in the Bounce, invalid, Spam, and Unsubscribe list are automatically dropped by Twilio SendGrid. Feel free to remove these addresses from your lists to save money and time.

### Delete unusable contacts

It is common to have contacts that result in a group unsubscribe, block, bounce, invalid email address, or spam report. Attempting to send email to these contacts can negatively impact your reputation since these contacts do not want to (and will not) receive your marketing emails.

_To remove all of your unusable Marketing Campaigns contacts:_

1. When viewing your dashboard, navigate to the left-hand menu and click **Suppressions**.
1. Open a specific group, such as Bounces or Spam Reports, click the action menu in the upper right corner, then select **Download as CSV**.
1. Repeat step 2 for each of the groups that you want to remove (unsubscribes, spam reports, etc.) and merge each of those lists into a single CSV file.
1. Return to your dashboard, navigate to the left-hand menu and select **Marketing**, then **Contacts**.
1. In the upper right corner click **Add Contacts** and select **Upload CSV**.
1. Select **Create New List** and name it something obvious, like "Remove Invalid Emails."
1. Once uploaded, click the action menu to the right of that new list and select **Delete**.
1. Check the box indicating to delete "all contacts associated with this list."

### Delete a specific contact

<call-out type="warning">

There are two methods to delete contacts; one in which only a specific list or segment will be deleted and the contacts will _remain_ in All Contacts, and the second in which you can delete a list or segment and ALL associated contacts.

</call-out>

<call-out type="warning">

When you delete a contact, all stats related to that contact will also be removed.

</call-out>

_To remove a list or segment, but keep the contacts in All Contacts:_

1. Navigate to your list or segment.
2. Click the checkbox to the left of your list or segment.
3. Click # selected dropdown and delete.

_To remove a list or segment, and ALL associated contacts:_

1. Navigate to your list or segment.
2. Hover over the Action menu to the right of the list or segment.
3. Click on the trash icon.
4. Check the box "Delete all contacts associated with this list from my account."
5. Select delete.

_To remove one or more contacts from a list:_

1. Navigate to the [All Contacts list](https://sendgrid.com/marketing_campaigns/ui/all_contacts).
1. Search for the contact you want to delete.
1. Click **delete** to remove the contact permanently.

<call-out type="warning">

Use this to permanently delete your recipients from all of your contact lists and all segments if required by applicable law.

</call-out>

### Delete all contacts

_To delete all of your contacts at once:_

1.  Navigate to your Contacts page and hover over the Action Menu next to All Contacts.
1.  Click the trash can icon.
1.  Select the checkbox to confirm that you want to delete all contacts and then click **Delete**.

### Edit or Remove Contacts from a list

To manage your contact lists more efficiently, you can edit and remove contact lists from the Contacts page.

_To edit a contact:_

1. Navigate to the Contacts page and search for the contact you want to edit.
1. Click the contact you wish to edit. This takes you to the contact details page.
1. To edit any of the profile fields, click on the _Edit_ icon to the right of the field.
1. Once you have finished making all of your changes, click **Save**.

_To delete a contact from your account:_

1. Navigate to the Contacts page and search for the contact you want to edit.
1. To delete a contact from the contact list, you can click the delete icon in the action menu. To delete a contact from the contact details page, click the delete icon at the top-right of the page.
1. If you are deleting the contact from a specific list, and not All Contacts, click **Remove Contact**. If you are deleting the contact from the account, select **Permanently delete this contact from my account**.

_To remove a contact from a list:_

1. Navigate to the Contacts page and search for the contact you want to edit.
1. Click the email of the contact to view contact details.
1. Click the Associated Lists tab from the contact details page.
1. Find the list you want to remove the contact from and click the delete icon.
1. When you see "Are you sure you want to remove this contact?" click **Remove Contact**.

<call-out>

Contacts that are deleted from your SendGrid account are removed compliantly, according to GDPR. [Click here](https://sendgrid.com/resource/general-data-protection-regulation-2/) for more information on GDPR.

</call-out>

## Export contacts

To view the contents of a contact list, you can export the list to a CSV and download it to your computer.

_To export contacts:_

1. Navigate to the Contacts page within the Automation Beta experience.
1. Locate the contact list you want to export and click the action menu.
1. Select **Export**. The Export page appears with a list of all current and previous exports.
1. From here you can find the exported contact list and select the action menu.
1. Select the **Download CSV** icon next to the list to download the contact list to your computer.

<call-out type="warning">

Exported CSV files are only available for download for 72 hours after the export is initialized.

</call-out>

## Contact Management APIs

You can integrate with the Contact Management APIs to create and update lists, add contacts, manage reserved field data, export contact lists, and pull data about your contacts and lists. Learn more through the documentation for the [Marketing Campaigns Contact APIs](https://sendgrid.api-docs.io/v3.0/contacts/).

## Additional Resources

- [Custom Fields]({{root_url}}/ui/sending-email/editor/)
- [Formatting a CSV]({{root_url}}/ui/managing-contacts/formatting-a-csv/)

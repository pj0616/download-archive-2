const MessageStore = require("./message_store.js"); 

const Compose = { 
  render: function() { 
    let div = document.createElement("div"); 
    div.className = "new-message"
    div.innerHTML = this.renderForm();

    div.addEventListener("change", function(e) { 
      const targetEle = e.target; 
      const targetName = targetEle.name; 
      const targetVal = targetEle.value; 

      MessageStore.updateDraftField(targetName, targetVal);
    })

    div.addEventListener("submit", function(e) { 
      e.preventDefault();
      MessageStore.sendDraft(); 
      window.location.hash = "inbox";
    })

    return div;
  }, 

  renderForm: function() { 
    const currentMessage = MessageStore.getMessageDraft(); 
    const messageHeader ='<p class="new-message-header">New Messaage</p>'
    const form = 
    `<form class='compose-form'>
      <input placeholder="Recipient" name="to" type="text" value=${currentMessage.to}>
      <input placeholder="Subject" name="subject" type="text" value=${currentMessage.subject}>
      <textarea name="body" rows="20">${currentMessage.body}</textarea>
      <button type="submit" class="btn btn-primary submit-message">Send</button>
    </form>`
    
    return messageHeader + form;
  }
}

module.exports = Compose;
import consumer from "./consumer"

document.addEventListener("turbolinks:load", function() {
  const chat_element = document.getElementById('chat-id');
  const current_user_id = document.getElementById('current-user').getAttribute('data-user-id');
  const current_user_email = document.getElementById('current-user').getAttribute('data-user-email');
  if (chat_element != null){
    const chat_id = chat_element.getAttribute('data-chat-id');
    const message_form_textarea_element = document.getElementById('message-form-textarea');

    let chat_cabel = consumer.subscriptions.create({ channel: "ChatChannel", chat_id: chat_id}, {
      connected() {
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        if(data.typing == true && (data.typing_user_id != current_user_id) ){
          let typingIndicatorContainer = document.getElementById('typing-indicator');
          typingIndicatorContainer.innerHTML = data.typing_user_email +" typing";
        } else if(data.typing == false && (data.typing_user_id != current_user_id)){
          let typingIndicatorContainer = document.getElementById('typing-indicator');
          typingIndicatorContainer.innerHTML = "";
        } else if(data.if_message){
          let html;
          if (current_user_id === data.message_user_id) {
            html = data.mine
          } else {
            html = data.theirs
          }

          let messageContainer = document.getElementById('messages');
          messageContainer.innerHTML = messageContainer.innerHTML + html;
          message_form_textarea_element.value = "";
        }
      },

      typing(typing, user_id, user_email) {
        this.perform('typing', { typing: typing, user_id: user_id, user_email: user_email })
      }
    });

    message_form_textarea_element.addEventListener('focus', () => {
      chat_cabel.typing(true, current_user_id, current_user_email)
    });

    message_form_textarea_element.addEventListener('blur', () => {
      chat_cabel.typing(false, current_user_id, current_user_email)
    });
  }
})

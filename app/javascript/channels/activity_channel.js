import consumer from "./consumer"

consumer.subscriptions.create("ActivityChannel", {
  connected() {
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const dot_element = document.getElementById(`user-${data['user_id']}-dot`);
    if(dot_element && data['online']){
      dot_element.classList.add('active');
    } else if (dot_element && !data['online']){
      dot_element.classList.remove('active');
    }
  }
});

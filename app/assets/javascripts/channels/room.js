App.room = App.cable.subscriptions.create("RoomChannel", {
  connected: function() {
    //フロントエンドがバックエンドを監視できているか
    console.log('connected')
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(message) {
    //alert(message)
    const messages = document.getElementById('messages')
    messages.innerHTML += message
    // Called when there's incoming data on the websocket for this channel
  },

  speak: function(content) {
    //this.perform('speak');を実行することでフロントエンドが
    //バックエンドのroom_channelのメソッドを実行できる
    return this.perform('speak',{message: content});
    //return this.perform('speak', {message: 'aaaaa'});
    //App.room.speak()をchromeのコンソールで実行
  }
});

document.addEventListener('DOMContentLoaded', function(){
  const input = document.getElementById('chat-input')
  const button = document.getElementById('button')
  button.addEventListener('click', function(){
    const content = input.value
   App.room.speak(content)
   input.value =''
  })
})

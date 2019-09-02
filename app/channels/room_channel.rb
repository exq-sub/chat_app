class RoomChannel < ApplicationCable::Channel
  def subscribed
    #バックサイドがフロントエンドを監視できている状態
    #接続された時に使うコマンド
     stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    
    #データを個々の皆んな,他のフロントエンドに配信する
    message = Message.create!(content: data['message'])
    template = ApplicationController.renderer.render(partial: 'messages/message', locals: {message: message})
    ActionCable.server.broadcast 'room_channel', template
    #'room_channel'はroom.jsのフロントエンドの　指定している
    #App.room = App.cable.subscriptions.create("RoomChannel"を指定している
    
  end
end

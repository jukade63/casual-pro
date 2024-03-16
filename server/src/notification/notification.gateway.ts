import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Notification } from './entities/notification.entity';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway {

  @WebSocketServer()
  server: Server

  sendNotification(notification: Notification) {
    this.server.emit('notification', notification)
  }
}

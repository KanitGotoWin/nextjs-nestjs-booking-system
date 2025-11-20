import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    transports: ['websocket'],
  },
})
export class BookingsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('Client connected');
  }

  handleDisconnect() {
    console.log('Client disconnected');
  }

  reRenderBookings() {
    this.server.emit('reRenderBookings');
  }

  //Notify full seat after last one created
  notifyFull() {
    this.server.emit('bookingFull');
  }

  //Notify available seat after cancel
  notifyAvailable() {
    this.server.emit('bookingAvailable');
  }
}

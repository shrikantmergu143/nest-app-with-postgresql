import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8000, {
  cors: {
    origin: '*',
  },
})
export class CallGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private emailToSocketIdMap = new Map<string, string>();
  private socketIdToEmailMap = new Map<string, string>();

  server: Server;

  afterInit(server: Server) {
    this.server = server;
    console.log('Socket Server Initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Socket Connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const email = this.socketIdToEmailMap.get(client.id);
    if (email) {
      this.emailToSocketIdMap.delete(email);
      this.socketIdToEmailMap.delete(client.id);
    }
    console.log(`Socket Disconnected: ${client.id}`);
  }

  @SubscribeMessage('room:join')
  handleJoinRoom(
    @MessageBody() data: { email: string; room: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { email, room } = data;

    console.log(`User Joined Room:`, data);

    this.emailToSocketIdMap.set(email, socket.id);
    this.socketIdToEmailMap.set(socket.id, email);

    socket.join(room);

    // Notify existing user inside room
    socket.to(room).emit('user:joined', { email, id: socket.id });

    // Confirm join back to the user
    socket.emit('room:join', data);
  }

  @SubscribeMessage('user:call')
  handleCall(
    @MessageBody() data: { to: string; offer: any; room: string },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(`Call request sent from ${socket.id} ➡️ ${data.to}`);
    this.server.to(data.to).emit('incoming:call', {
      from: socket.id,
      offer: data.offer,
    });
  }

  @SubscribeMessage('call:accepted')
  handleCallAccepted(
    @MessageBody() data: { to: string; ans: any; room: string },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(`Call accepted by ${socket.id}`);
    this.server.to(data.to).emit('call:accepted', {
      from: socket.id,
      ans: data.ans,
    });
  }

  @SubscribeMessage('call:declined')
  handleCallDeclined(
    @MessageBody() data: { to: string },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(`Call declined by ${socket.id}`);
    this.server.to(data.to).emit('call:declined');
  }

  @SubscribeMessage('peer:nego:needed')
  handleNegotiationNeeded(
    @MessageBody() data: { to: string; offer: any },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(`Negotiation needed by ${socket.id}`);
    this.server.to(data.to).emit('peer:nego:needed', {
      from: socket.id,
      offer: data.offer,
    });
  }

  @SubscribeMessage('peer:nego:done')
  handleNegotiationFinal(
    @MessageBody() data: { to: string; ans: any },
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(`Negotiation final from ${socket.id}`);
    this.server.to(data.to).emit('peer:nego:final', {
      from: socket.id,
      ans: data.ans,
    });
  }
}

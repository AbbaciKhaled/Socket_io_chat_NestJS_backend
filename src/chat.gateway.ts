import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway(4001) //4001 => sockets io port //80, {namespace: 'chat'}
export class ChatGetway implements OnGatewayConnection {
    @WebSocketServer()
    server;

    handleConnection(client) {
        console.log('Successfully connected to a client !');
        client.emit('connection', 'Successfully connected to a server !');
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
        this.server.emit('message', message)
    }

    @SubscribeMessage('message2')
    handleMessage2(@MessageBody() message2: string): void {
        this.server.emit('message2', message2)
    }
}
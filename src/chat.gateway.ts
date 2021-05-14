import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(4001, { namespace: 'chat' }) //4001 => sockets io port
export class ChatGetway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private logger: Logger = new Logger('Gateway logger');

    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        this.logger.log('Socket IO Init ...');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client ${client.id} connected !`);
        //this.server.emit('connection', 'Successfully connected to a server !');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client ${client.id} disconnected !`);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void { //replace void per WsResponse<string> 
        const data = JSON.parse(JSON.stringify(new Object(message)));
        this.server.emit(`message_client_${data.receiver_id}`, message)
        this.server.emit(`message_client_${data.sender_id}`, message)
        //return { event: 'message', data: message } //if the message is sended only for the client
    }
}
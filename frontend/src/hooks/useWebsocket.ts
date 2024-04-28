// websocketService.ts
import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

export interface WebSocketMessage {
    type: string;
    data: any;
}

export interface WebSocketService {
    connect(url: string): void;
    send(message: WebSocketMessage): void;
    close(): void;
    onMessage(callback: (message: WebSocketMessage) => void): void;
}

export function useWebSocket(): WebSocketService {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket]);

    const connect = (url: string) => {
        const newSocket = io(url, {
            transports: ['websocket'],
            upgrade: false
        });

        newSocket.on("connect", () => {
            console.log("Connected to Socket.IO server!");
        });

        newSocket.on("disconnect", () => {
            console.log("Disconnected from Socket.IO server");
            setSocket(null);
        });

        setSocket(newSocket);
    };

    const send = (message: WebSocketMessage) => {
        if (socket) {
            socket.emit(message.type, message.data);
        }
    };

    const close = () => {
        if (socket) {
            socket.close();
            setSocket(null);
        }
    };

    const onMessage = (callback: (message: WebSocketMessage) => void) => {
        if (socket) {
            socket.on("message", (data: any) => {
                const message: WebSocketMessage = { type: "message", data };
                callback(message);
            });
        }
    };

    return { connect, send, close, onMessage };
}

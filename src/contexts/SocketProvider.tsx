import React, { createContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ConTextProp {
    socket: Socket
}
const SocketContext = createContext({} as ConTextProp)

const SocketProvider = ({ children }: { children: JSX.Element }) => {
    const socket = useRef(io('http://localhost:1005/'))
    useEffect(() => {
        return () => {
            socket.current.disconnect()
        }
    }, [])
    return (
        <SocketContext.Provider value={{ socket: socket.current }}>
            {children}
        </SocketContext.Provider>
    );
};
export { SocketContext }
export default SocketProvider;
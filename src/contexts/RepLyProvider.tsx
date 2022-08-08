import React, { createContext, useState } from 'react';
interface IContexReply {
    isReply: boolean;
    setIsReply: Function;
    conten: string;
    setConten: Function;
}
interface ConTextProp {
    contextReply: IContexReply
}
const ReplyContext = createContext({} as ConTextProp)

const ReplyProvider = ({ children }: { children: JSX.Element }) => {
    const [isReply, setIsReply] = useState<boolean>(false)
    const [conten, setConten] = useState<string>("")
    const contextReply = {
        conten,
        setConten,
        isReply,
        setIsReply
    }
    return (
        <ReplyContext.Provider value={{ contextReply }}>
            {children}
        </ReplyContext.Provider>
    );
};
export { ReplyContext }
export default ReplyProvider;
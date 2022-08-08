/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useState } from 'react';
interface ConTextProp {
    isOverlay: boolean; setIsOverlay: Function
}
const OverLayContext = createContext({} as ConTextProp)

const OverlayProvider = ({ children }: { children: JSX.Element }) => {
    const [isOverlay, setIsOverlay] = useState<boolean>(false)
    return (
        <OverLayContext.Provider value={{ isOverlay, setIsOverlay }}>
            {children}
        </OverLayContext.Provider>
    );
};
export { OverLayContext }
export default OverlayProvider;
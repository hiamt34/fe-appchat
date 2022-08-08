import React, { useEffect } from "react";

const useScript = (url: string, onload: any) => {
    //@ts-ignore
  useEffect(() => {
    let script = document.createElement("script");
    script.src = url;
    script.onload = onload;
    document.head.append(script);
    return () => document.head.removeChild(script);
  }, [url, onload]);
};

export {useScript};

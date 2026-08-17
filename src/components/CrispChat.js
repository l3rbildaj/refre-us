"use client";

import Script from "next/script";

export default function CrispChat() {
    return (
        <Script
            id="crisp-chat"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    window.$crisp=[];
                    window.CRISP_WEBSITE_ID="57714aae-ea7c-45a7-a636-0af9a43a8300";
                    (function(){
                        d=document;
                        s=d.createElement("script");
                        s.src="https://client.crisp.chat/l.js";
                        s.async=1;
                        d.getElementsByTagName("head")[0].appendChild(s);
                    })();
                `,
            }}
        />
    );
}

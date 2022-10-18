import { WPElement } from "@wordpress/element";
import { addQueryArgs } from "@wordpress/url";

type Window = {
    chatrix_block_config: BlockConfig,
} & typeof window;

// Config coming from PHP.
type BlockConfig = {
    iframeUrl: string,
}

export default function IFrame({ attributes }): WPElement {
    const win: Window = window as Window;
    const config: BlockConfig = win.chatrix_block_config;

    const url = makeIframeUrl({
        url: config.iframeUrl,
        defaultHomeserver: attributes.defaultHomeserver
    });

    return (
        <iframe className="wp-block-automattic-chatrix-iframe"
                title={attributes.title}
                src={url}
        ></iframe>
    );
}

function makeIframeUrl({ url, defaultHomeserver }): string {
    const queryArgs = new URLSearchParams(window.location.search);
    const iframeQueryArgs: { [key: string]: any } = {
        defaultHomeserver: defaultHomeserver,
    };

    if (queryArgs.has("loginToken")) {
        iframeQueryArgs.loginToken = queryArgs.get("loginToken");
    }

    return addQueryArgs(url, iframeQueryArgs);
}

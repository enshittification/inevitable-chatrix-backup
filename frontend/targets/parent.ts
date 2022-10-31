type IframeParams = {
    defaultHomeserver: string
    roomId: string,
}

export function loadIframe(containerId: string, hostRoot: string, params: IframeParams) {
    const container = document.querySelector(`#${containerId}`);
    if (!container) {
        throw new Error(`Container for iframe was not found: ${containerId}`);
    }

    const iframeUrl = makeIframeUrl(hostRoot, params);
    const iframe = document.createElement("iframe");
    iframe.src = iframeUrl;
    iframe.className = "automattic-chatrix-iframe";

    container.className = "automattic-chatrix-container";
    container.appendChild(iframe);
}

export function makeIframeUrl(rootUrl: string, params: IframeParams): string {
    const url = new URL("index.html?", rootUrl);
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has("loginToken")) {
        // @ts-ignore
        params.loginToken = queryParams.get("loginToken");
    }

    for (let key in params) {
        if (!!params[key]) {
            url.searchParams.append(key, params[key]);
        }
    }

    return url.toString();
}

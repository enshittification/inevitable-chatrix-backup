// This code is not used in the production build.
// It's only used in local development environments.

import { IConfig } from "../config";

export function parent(scriptId: string) {
    const env = import.meta.env;
    const loginToken = new URLSearchParams(window.location.search).get("loginToken");

    let config: IConfig = {
        homeserver: env.VITE_HOMESERVER,
    };

    const scriptElement = document.querySelector(`#${scriptId}`);
    if (!scriptElement) {
        throw new Error(`Script with id #${scriptId} not found.`)
    }

    const parentHostRoot = (scriptElement as HTMLScriptElement).src;
    const hostRoot = new URL(parentHostRoot).origin;
    loadIframe(hostRoot, scriptId, config, loginToken);
}

function loadIframe(hostRoot: string, scriptId: string, config: IConfig, loginToken: string | null) {
    let url = "app.html?";

    let property: keyof IConfig;
    for (property in config) {
        let value: string = config[property] ?? "";
        if (value) {
            url += `${property}=${encodeURIComponent(value)}&`;
        }
    }

    if (loginToken) {
        url += `loginToken=${encodeURIComponent(loginToken)}`;
    }

    const iframe = document.createElement("iframe");
    iframe.src = new URL(url, hostRoot).href;
    iframe.className = `${scriptId}-iframe`;

    const parent = document.createElement("div");
    parent.id = `${scriptId}-parent`;
    parent.appendChild(iframe)

    document.body.appendChild(parent);
}

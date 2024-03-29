export interface IConfig {
    /**
     * Unique identifier for this instance of the client.
     * When multiple clients are embedded on the same page, this is used to distinguish them.
     */
    instanceId: string;

    /**
     * The default homeserver used by Hydrogen; autofilled in the login UI.
     * eg: https://matrix.org
     */
    defaultHomeserver: string;

    /**
     * Paths to theme-manifests
     * eg: ["assets/theme-element.json", "assets/theme-awesome.json"]
     */
    themeManifests: string[];

    /**
     * This configures the default theme(s) used by Hydrogen.
     * These themes appear as "Default" option in the theme chooser UI and are also
     * used as a fallback when other themes fail to load.
     * Whether the dark or light variant is used depends on the system preference.
     */
    defaultTheme: {
        // id of light theme
        light: string;
        // id of dark theme
        dark: string;
    };

    /**
     * When a roomId is set, client will be in single-room mode.
     * In this mode, the client opens directly in that room, with the user not having access to the screen that shows the list of rooms.
     * The room must be public, so that the user can join without requiring an invitation.
     * The roomId must be the room's actual id, it must not be an alias.
     * Example: !abc123:example.com
     */
    roomId?: string;

    /**
     * Set to false to disable service worker.
     * Note that the service worker is required to make Hydrogen work correctly across multiple browser tabs.
     * You should not disable the service worker in environments where multiple browser tabs are a possibility.
     *
     * Defaults to true.
     */
    enableServiceWorker?: boolean
}

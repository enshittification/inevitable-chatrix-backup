import { prefix } from "../../parent/util";

export type ClickHandler = () => void;

export class StartButton {
    private readonly button: HTMLButtonElement;

    constructor(clickHandler: ClickHandler) {
        this.button = document.createElement("button");
        this.button.className = prefix("start-button");
        this.button.onclick = clickHandler;
        this.button.appendChild(this.createNotificationBadge());
    }

    public mount(containerId: string): void {
        const container = document.querySelector(`#${containerId}`);
        if (!container) {
            throw new Error(`Container was not found: ${containerId}`);
        }

        const buttonContainer = document.createElement("div");
        buttonContainer.className = prefix("start-button-container");
        buttonContainer.appendChild(this.button);

        container.className = prefix("container");
        container.appendChild(buttonContainer);
    }

    private createNotificationBadge() {
        const notificationBadge = document.createElement("span");
        notificationBadge.className = `${prefix("notification-badge")} hidden`;
        return notificationBadge;
    }
}

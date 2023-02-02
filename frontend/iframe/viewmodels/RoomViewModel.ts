import { SegmentType } from "hydrogen-web/src/domain/navigation";
import { Segment } from "hydrogen-web/src/domain/navigation/Navigation";
import { RoomViewModel as BaseRoomViewModel } from "hydrogen-web/src/domain/session/room/RoomViewModel";
import { URLRouter } from "../platform/URLRouter";

export class RoomViewModel extends BaseRoomViewModel {
    constructor(options) {
        super(options);
    }

    async load() {
        super.load();
    }

    get urlRouter(): URLRouter {
        return super.urlRouter;
    }

    get closeUrl() {
        if (this.singleRoomMode) {
            const path = this.navigation.path.with(new Segment<SegmentType>("session"));

            return this.urlRouter.urlForPath(path);
        }

        return super.closeUrl;
    }

    get singleRoomMode(): boolean {
        return !!super.platform.config.roomId;
    }

    get navigation() {
        return super.navigation;
    }

    i18n(parts: TemplateStringsArray, ...expr: any[]): string {
        return super.i18n(parts, expr);
    }

    openDetailsPanel() {
        super.openDetailsPanel();
    }

    get canLeave() {
        return super.canLeave;
    }

    get canForget() {
        return super.canForget;
    }

    forgetRoom() {
        super.forgetRoom();
    }

    get canRejoin() {
        return super.canRejoin;
    }

    rejoinRoom() {
        super.rejoinRoom();
    }
}
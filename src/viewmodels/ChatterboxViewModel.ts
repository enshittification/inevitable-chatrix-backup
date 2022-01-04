import { RoomViewModel, ViewModel, TimelineViewModel, ComposerViewModel} from "hydrogen-view-sdk";

export class ChatterboxViewModel extends ViewModel {
    private readonly _session: any;
    private _timelineViewModel?: TimelineViewModel;
    private _messageComposerViewModel?: ComposerViewModel;

    constructor(options) {
        super(options);
        this._session = options.session; 
    }

    async loadRoom() {
        const roomId = this._options.config["auto_join_room"];
        const room = this._session.rooms.get(roomId) ?? await this._joinRoom(roomId);
        const roomVm = new RoomViewModel({
            room,
            ownUserId: this._session.userId,
            platform: this.platform,
            urlCreator: this.urlCreator,
            navigation: this.navigation,
        });
        await roomVm.load();
        this._timelineViewModel = roomVm.timelineViewModel;
        this._messageComposerViewModel = new ComposerViewModel(roomVm);
    }

    private async _joinRoom(roomId: string): Promise<any> {
        await this._session.joinRoom(roomId);
        // even though we've joined the room, we need to wait till the next sync to get the room
        await this._waitForRoomFromSync(roomId);
        return this._session.rooms.get(roomId);

    }

    private _waitForRoomFromSync(roomId: string): Promise<void> {
        let resolve: () => void;
        const promise: Promise<void> = new Promise(r => { resolve = r; })
        const subscription = {
            onAdd: (_: string, value: {id: string}) => {
                if (value.id === roomId) {
                    this._session.rooms.unsubscribe(subscription);
                    resolve();
                }
            },
        };
        this._session.rooms.subscribe(subscription);
        return promise;
    }

    get timelineViewModel() {
        return this._timelineViewModel;
    }

    get messageComposerViewModel() {
        return this._messageComposerViewModel;
    }
}
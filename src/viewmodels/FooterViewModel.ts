/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { ViewModel } from "hydrogen-view-sdk";
import { IChatrixConfig } from "../types/IChatrixConfig";

export class FooterViewModel extends ViewModel {
    private _config: IChatrixConfig;

    constructor(options) {
        super(options);
        this._config = options.config;
    }

    get chatterboxLink(): string {
        return this._config.footer?.chatterbox_link ?? null;
    }

    get matrixLink(): string {
        return this._config.footer?.matrix_link ?? null;
    }
}

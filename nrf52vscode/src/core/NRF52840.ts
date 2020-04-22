import {NRF52} from "./NRF52";

export class NRF52840 extends NRF52 {
    protected getDefines(): Array<string> {
        /*
        Adds defines specific for NRF52840 microcontrollers.
         */
        const extra_defines = [
            'BOARD_PCA10056',
            'NRF52840_XXAA',
        ];
        return super.getDefines().concat(extra_defines);
    }
}
import {NRF} from "./NRF";

export abstract class NRF52 extends NRF {
    protected getDefines(): Array<string> {
        /*
        Adds defines specific for NRF52 microcontrollers.
         */
        const extra_defines = [
            "NRF52",
        ];
        return super.getDefines().concat(extra_defines);
    }
}
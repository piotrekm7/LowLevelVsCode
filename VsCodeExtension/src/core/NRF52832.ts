import {NRF52} from "./NRF52";

export class NRF52832 extends NRF52 {
    protected getDefines(): Array<string> {
        /*
        Adds defines specific for NRF52832 microcontrollers.
         */
        const extra_defines = [
            'BOARD_PCA10040',
        ];
        return super.getDefines().concat(extra_defines);
    }

    protected getDeviceSignature(): string {
        /*
        Returns device signature which informs external software about target device.
         */
        return "NRF52832_XXAA";
    }

    // TODO Add some docs
    // TODO consider moving common to c and asm flags to another
    // function to avoid duplication
    protected getCFlags(): string {
        const flags = [
            '-DBOARD_PCA10040',
            '-DNRF52832_XXAA',
            '-DNRF_SD_BLE_API_VERSION=6',
            '-DS132'
        ];
        return super.getCFlags() + flags.join(' ');
    }

    protected getAsmFlags(): string {
        const flags = [
            '-DBOARD_PCA10040',
            '-DNRF52832_XXAA',
            '-DNRF_SD_BLE_API_VERSION=6',
            '-DS132'
        ];
        return super.getAsmFlags() + flags.join(' ');
    }
}
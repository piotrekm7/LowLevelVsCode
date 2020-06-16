import {NRF52} from "./NRF52";

export class NRF52840 extends NRF52 {
    protected getDefines(): Array<string> {
        /*
        Adds defines specific for NRF52840 microcontrollers.
         */
        const extra_defines = [
            'BOARD_PCA10056',
        ];
        return super.getDefines().concat(extra_defines);
    }
    
    protected addSettings(): void {
        super.addSettings();
        this.settings.set('ProjectType', 'NRF52840');
    }

    protected getDeviceSignature(): string {
        /*
        Returns device signature which informs external software about target device.
         */
        return "NRF52840_XXAA";
    }

    // TODO Add some docs
    // TODO consider moving common to c and asm flags to another
    // function to avoid duplication
    protected getCFlags(): string {
        const flags = [
            '-DBOARD_PCA10056',
            '-DNRF52840_XXAA',
            '-DNRF_SD_BLE_API_VERSION=5',
            '-DS140'
        ];
        return super.getCFlags() + ' ' + flags.join(' ');
    }

    protected getAsmFlags(): string {
        const flags = [
            '-DBOARD_PCA10056',
            '-DNRF52840_XXAA',
            '-DNRF_SD_BLE_API_VERSION=5',
            '-DS140'
        ];
        return super.getAsmFlags() + ' ' + flags.join(' ');
    }
}
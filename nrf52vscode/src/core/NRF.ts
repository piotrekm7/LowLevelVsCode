import {Embedded} from "./Embedded";
import * as path from "path";

export abstract class NRF extends Embedded {
    protected addSettings(): void {
        /*
        Adds common settings for all NRF devices.
         */
        super.addSettings();
        this.settings.set('GNU_GCC', '');
        this.settings.set('nRF_SDK', '');
    }

    protected getCompilerPath(): string {
        /*
        Returns compiler path to NRF devices.
         */
        return path.join(this.settings.get('GNU_GCC')!, 'bin/arm-none-eabi-gcc');
    }

    protected getIncludePath(): string {
        /*
        Returns include Path for NRF devices.
         */
        return `
            "\${workspaceFolder}/**",
            "${path.join(this.settings.get('GNU_GCC')!, 'arm-none-eabi/include')}",
            "${path.join(this.settings.get('nRF_SDK')!, 'modules/**')}",
            "${path.join(this.settings.get('nRF_SDK')!, 'components/**')}"
            `;
    }

    protected getDefines(): string {
        /*
        Transforms defines list to appropriate format
         */
        return '"' + this.getDefinesList().join('","') + '"';
    }

    protected getDefinesList(): Array<string> {
        /*
        List of C defines to be set up for all NRF devices.
         */
        return [
            "CONFIG_GPIO_AS_PINRESET",
            "INITIALIZE_USER_SECTIONS",
            "FLOAT_ABI_HARD",
            "NRF_SD_BLE_API_VERSION=6",
            "S140",
            "SOFTDEVICE_PRESENT",
            "SWI_DISABLE0",
            "_DEBUG",
            "UNICODE",
            "_UNICODE"
        ];
    }
}
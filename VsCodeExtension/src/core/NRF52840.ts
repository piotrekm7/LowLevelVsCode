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

    protected getDeviceSignature(): string {
        /*
        Returns device signature which informs external software about target device.
         */
        return "NRF52840_XXAA";
    }

    // TODO Add some docs
    // TODO Move some flags to higher level class
    // TODO extract common flags to another function
    protected getCFlags(): string {
        const flags = [
            '-DBOARD_PCA10056',
            '-DCONFIG_GPIO_AS_PINRESET',
            '-DFLOAT_ABI_HARD',
            '-DNRF52840_XXAA',
            '-DNRF_SD_BLE_API_VERSION=5',
            '-DS140',
            '-DSOFTDEVICE_PRESENT',
            '-DSWI_DISABLE0',
            '-mcpu=cortex-m4',
            '-mthumb -mabi=aapcs',
            '-mfloat-abi=hard -mfpu=fpv4-sp-d16',
            '-ffunction-sections -fdata-sections -fno-strict-aliasing',
            '-fno-builtin -fshort-enums',
            '-D__HEAP_SIZE=8192',
            '-D__STACK_SIZE=8192'
        ];
        return super.getCFlags() + flags.join(' ');
    }

    protected getAsmFlags(): string {
        const flags = [
            '-mcpu=cortex-m4',
            '-mthumb -mabi=aapcs',
            '-mfloat-abi=hard -mfpu=fpv4-sp-d16',
            '-DBOARD_PCA10056',
            '-DCONFIG_GPIO_AS_PINRESET',
            '-DFLOAT_ABI_HARD',
            '-DNRF52840_XXAA',
            '-DNRF_SD_BLE_API_VERSION=5',
            '-DS140',
            '-DSOFTDEVICE_PRESENT',
            '-DSWI_DISABLE0',
            '-D__HEAP_SIZE=8192',
            '-D__STACK_SIZE=8192'
        ];
        return super.getAsmFlags() + flags.join(' ');
    }

    protected getLdFlags(): string {
        const flags = [
            '-mthumb -mabi=aapcs -L $(SDK_ROOT)\\modules\\nrfx\\mdk -T $(LINKER_SCRIPT)',
            '-mcpu=cortex-m4',
            '-mfloat-abi=hard -mfpu=fpv4-sp-d16',
            '-Wl,--no-gc-sections',
            '-Wl,--verbose',
            '--specs nosys.specs',
            '--specs nano.specs',
        ];
        return flags.join(' ');
    }
}
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

    protected getIncludePath(): Array<string> {
        /*
        Returns include Path for NRF devices.
         */
        return [
            '${workspaceFolder}/**',
            path.join(this.settings.get('GNU_GCC')!, 'arm-none-eabi/include'),
            path.join(this.settings.get('nRF_SDK')!, 'modules/**'),
            path.join(this.settings.get('nRF_SDK')!, 'components/**')
        ];
    }

    protected getDefines(): Array<string> {
        /*
        List of C defines to be set up for all NRF devices.
         */
        return [
            'CONFIG_GPIO_AS_PINRESET',
            'INITIALIZE_USER_SECTIONS',
            'FLOAT_ABI_HARD',
            'NRF_SD_BLE_API_VERSION=6',
            'S140',
            'SOFTDEVICE_PRESENT',
            'SWI_DISABLE0',
            '_DEBUG',
            'UNICODE',
            '_UNICODE',
            this.getDeviceSignature()
        ];
    }

    protected getVsCodeTaskList(): Array<any> {
        /*
        Returns list of tasks specific for NRF devices.
         */
        const extra_tasks = [
            {
                label: "flash",
                type: "shell",
                command: "make flash",
                options: {
                    cwd: "${workspaceFolder}"
                },
                group: "build",
                problemMatcher: []
            },
            {
                label: "flash_softdevice",
                type: "shell",
                command: "make flash_softdevice",
                options: {
                    cwd: "${workspaceFolder}"
                },
                problemMatcher: []
            },
            {
                label: "sdk_config",
                type: "shell",
                command: "make sdk_config",
                options: {
                    // TODO this path is wrong for sure
                    cwd: "${workspaceFolder}/pca10056/s140/armgcc"
                },
                problemMatcher: []
            },
            {
                label: "erase",
                type: "shell",
                command: "make erase",
                options: {
                    // TODO this path is wrong for sure
                    cwd: "${workspaceFolder}/pca10056/s140/armgcc"
                },
                problemMatcher: []
            }
        ];

        return super.getVsCodeTaskList().concat(extra_tasks);
    }

    protected getDebuggerConfiguration(): any {
        /*
        Returns cortex-debug configuration used for debugging NRF devices via J-Link.
         */
        return {
            type: "cortex-debug",
            request: "launch",
            name: "Debug J-Link",
            cwd: "${workspaceRoot}",
            // TODO check this path
            executable: "${workspaceRoot}/_build/nrf52840_xxaa.out",
            // TODO should be configurable
            serverpath: "C:/Program Files (x86)/SEGGER/JLink/JLinkGDBServerCL.exe",
            servertype: "jlink",
            device: this.getDeviceSignature(),
            interface: "swd",
            serialNumber: "",
            runToMain: true,
            armToolchainPath: this.settings.get('GNU_GCC'),
            preLaunchTask: "build",
            // TODO should depend on specific device
            svdFile: "${workspaceRoot}/nrf52840.svd"
        };
    }

    protected abstract getDeviceSignature(): string;
}
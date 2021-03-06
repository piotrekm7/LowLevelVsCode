import {Embedded} from "./Embedded";
import * as path from "path";
import {DependencyAnalyzer} from "./DependencyAnalyzer";

export abstract class NRF extends Embedded {
    private dependencyAnalyzer: DependencyAnalyzer | undefined; //= new DependencyAnalyzer(this.projectLocation, [this.settings.get('nRF_SDK')!]);

    protected addSettings(): void {
        /*
            Adds common settings for all NRF devices.
             */
        super.addSettings();
        this.settings.set(
            "GNU_GCC",
            ""
        );
        this.settings.set(
            "nRF_SDK",
            ""
        );
        this.settings.set(
            "JLinkGDBServer",
            ""
        );
    }

    protected getCompilerPath(): string {
        /*
            Returns compiler path to NRF devices.
             */
        return path.join(this.settings.get("GNU_GCC")!, "bin/arm-none-eabi-gcc");
    }

    protected getIncludePath(): Array<string> {
        /*
            Returns include Path for NRF devices.
             */
        return [
            "${workspaceFolder}/**",
            path.join(this.settings.get("GNU_GCC")!, "arm-none-eabi/include"),
            path.join(this.settings.get("nRF_SDK")!, "modules/**"),
            path.join(this.settings.get("nRF_SDK")!, "components/**"),
        ];
    }

    // TODO Some of these are device specific, should be moved to subclasses
    protected getDefines(): Array<string> {
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
            "_UNICODE",
            this.getDeviceSignature(),
        ];
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
            serverpath: this.settings.get("JLinkGDBServer"),
            servertype: "jlink",
            device: this.getDeviceSignature(),
            interface: "swd",
            serialNumber: "",
            runToMain: true,
            armToolchainPath: this.settings.get("GNU_GCC") + "/bin",
            preLaunchTask: "build",
            // TODO should depend on specific device
            svdFile: "${workspaceRoot}/nrf52840.svd",
        };
    }

    protected abstract getDeviceSignature(): string;

    protected getBuildTarget(): string {
        /*
            Returns build target for compiler.
             */
        return this.getDeviceSignature();
    }

    protected getIncludeFolders(): string {
        /*
            Runs DependencyAnalyzer for generating list of include folders.
            Transform list of folders to appropriately formatted string.
             */
        if (this.dependencyAnalyzer === undefined) {
            this.createDependencyAnalyzer();
        }
        this.dependencyAnalyzer?.performScanning();
        return this.dependencyAnalyzer!.getListOfIncludeFolders().join(" \\\n");
    }

    protected getSourceFiles(): string {
        /*
            Runs DependencyAnalyzer for generating list of source files.
            Transform list of source files to appropriately formatted string.
             */
        if (this.dependencyAnalyzer === undefined) {
            this.createDependencyAnalyzer();
        }
        this.dependencyAnalyzer?.performScanning();
        return this.dependencyAnalyzer!.getListOfSourceDependencies().join(" \\\n");
    }

    private createDependencyAnalyzer(): void {
        this.dependencyAnalyzer = new DependencyAnalyzer(this.projectLocation, [this.settings.get('nRF_SDK')!]);
    }

    //TODO Consider allowing user to edit list of lib files
    protected getLibFiles(): string {
        /*
            Returns list of additional libraries required by project.
             */
        return "";
    }
}

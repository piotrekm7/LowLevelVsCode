import {ProgrammingSystem} from "./ProgrammingSystem";
import * as fs from "fs-extra";
import * as path from "path";

export abstract class CProgramming extends ProgrammingSystem {
    /*
    Base class for C programming projects.
     */
    public newProjectTask(location: string): boolean {
        /*z
        Creates new project at the specified location.
         */
        if (super.newProjectTask(location)) {
            const vscode_path = path.join(location, '.vscode');
            return this.createJsonFiles(vscode_path);
        }
        return false;
    }

    protected createJsonFiles(location: string): boolean {
        /*
        Creates json files with configuration for VS Code.
         */
        try {
            fs.writeJSONSync(path.join(location, 'c_cpp_properties.json'), this.getCCppConfiguration(), this.jsonOptions);
            fs.writeJSONSync(path.join(location, 'tasks.json'), this.getVsCodeTasks(), this.jsonOptions);
            fs.writeJSONSync(path.join(location, 'launch.json'), this.getLaunchConfiguration(), this.jsonOptions);
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    }

    public generateMakefile(location: string): boolean {
        try {
            fs.writeFileSync(path.join(location, 'Makefile'), this.getMakefile());
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    }

    private getCCppConfiguration(): any {
        /*
        Returns C and Cpp configuration, which is used by C/C Visual Studio Code for intellisense etc.
         */
        return {
            configurations: [
                {
                    name: this.getSettings().get('ProjectName'),
                    includePath: this.getIncludePath(),
                    defines: this.getDefines(),
                    macFrameworkPath: [
                        "/System/Library/Frameworks",
                        "/Library/Frameworks"
                    ],
                    compilerPath: this.getCompilerPath(),
                    cStandard: "c11",
                    cppStandard: "c17",
                    intelliSenseMode: "clang-x64"
                }
            ],
            version: 4
        };
    }

    private getVsCodeTasks(): any {
        /*
        Returns Vs Code task configuration for specific platform.
         */
        return {
            version: "2.0.0",
            tasks: this.getVsCodeTaskList()
        };
    }

    protected getVsCodeTaskList(): Array<any> {
        /*
        Returns list of VS Code tasks.
         */
        return [
            {
                label: "build",
                type: "shell",
                command: "make",
                options: {
                    cwd: "${workspaceFolder}"
                },
                presentation: {
                    echo: true,
                    focus: true,
                    panel: "new",
                    reveal: "always"
                },
                problemMatcher: [],
                group: {
                    kind: "build",
                    isDefault: true
                }
            },
            {
                label: "clean",
                type: "shell",
                command: "make clean",
                options: {
                    cwd: "${workspaceFolder}"
                },
                problemMatcher: []
            }
        ];
    }

    private getLaunchConfiguration(): any {
        /*
        Returns launch configuration for visual studio code.
         */
        return {
            version: "0.2.0",
            configurations: [this.getDebuggerConfiguration()]
        };
    }

    protected abstract getDebuggerConfiguration(): any;

    protected abstract getIncludePath(): Array<string>;

    protected abstract getCompilerPath(): string;

    protected abstract getDefines(): Array<string>;

    private getMakefile(): string {
        /*
        Returns makefile generated dynamically for project
         */
        // TODO remove hardcoded properties
        // TODO actually generate it dynamically
        return `
            PROJECT_NAME     := ${this.settings.get('ProjectName')}
            TARGETS          := ${this.getBuildTarget()}
            OUTPUT_DIRECTORY := _build
            
            $(OUTPUT_DIRECTORY)/nrf52840_xxaa.out: \\
                LINKER_SCRIPT  := ble_app_template_gcc_nrf52.ld
            
            # Source files common to all targets
            SRC_FILES += \\
            ${this.getSourceFiles()}
            
            # Include folders common to all targets
            INC_FOLDERS += \\
            ${this.getIncludeFolders()}
            
            # Libraries common to all targets
            LIB_FILES += \\
            ${this.getLibFiles()}
            
            # Optimization flags
            OPT = ${this.getOptimizationFlags()}
            
            # C flags common to all targets
            CFLAGS += $(OPT)
            CFLAGS += ${this.getCFlags()}
            
            # C++ flags common to all targets
            CXXFLAGS += $(OPT)
            
            # Assembler flags common to all targets
            ASMFLAGS += ${this.getAsmFlags()}
            
            # Linker flags
            LDFLAGS += $(OPT)
            LDFLAGS += ${this.getLdFlags()}
            
            # Add standard libraries at the very end of the linker input, after all objects
            # that may need symbols provided by these libraries.
            LIB_FILES += -lc -lnosys -lm
            
            # Default target - first one defined
            default: ${this.getBuildTarget()}
            
            TEMPLATE_PATH := $(SDK_ROOT)/components/toolchain/gcc
            
            include $(TEMPLATE_PATH)/Makefile.common
            
            $(foreach target, $(TARGETS), $(call define_target, $(target)))
        `;
    }

    protected abstract getBuildTarget(): string;

    protected abstract getSourceFiles(): string;

    protected abstract getIncludeFolders(): string;

    protected abstract getLibFiles(): string;

    protected getCFlags(): string {
        return '-Wall -Werror';
    }

    private getOptimizationFlags(): string {
        return '-g3';
    }

    protected getAsmFlags(): string {
        return '-g3';
    }

    protected abstract getLdFlags(): string;
}
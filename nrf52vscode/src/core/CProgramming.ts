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

    protected abstract getIncludePath(): Array<string>;

    protected abstract getCompilerPath(): string;

    protected abstract getDefines(): Array<string>;
}
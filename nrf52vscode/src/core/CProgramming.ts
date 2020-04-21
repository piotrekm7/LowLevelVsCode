import {ProgrammingSystem} from "./ProgrammingSystem";
import * as fs from "fs-extra";
import * as path from "path";

export abstract class CProgramming extends ProgrammingSystem {
    /*
    Base class for C programming projects.
     */
    public newProjectTask(location: string): boolean {
        /*
        Creates new project at the specified location.
         */
        try {
            fs.ensureDirSync(path.join(location, src));
            fs.ensureDirSync(path.join(location,.vscode)
        )
            ;
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    }

    private getCCppConfiguration(): string {
        /*
        Returns C and Cpp configuration, which is used by C/C Visual Studio Code for intellisense etc.
         */
        return `{ 
                "configurations": [ 
                    { 
                        "name": "${this.getSettings().get('ProjectName')}", 
                        "includePath": [ 
                            ${this.getIncludePath()} 
                        ], 
                        "defines": [ 
                            ${this.getDefines()}
                        ], 
                        "macFrameworkPath": [ 
                            "/System/Library/Frameworks", 
                            "/Library/Frameworks" 
                        ], 
                        "compilerPath": "${this.getCompilerPath()}", 
                        "cStandard": "c11", 
                        "cppStandard": "c17", 
                        "intelliSenseMode": "clang-x64" 
                    } 
                ], 
                "version": 4 
            }`;
    }

    protected abstract getIncludePath(): string;

    protected abstract getCompilerPath(): string;

    protected abstract getDefines(): string;
}
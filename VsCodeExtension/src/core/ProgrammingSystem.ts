import * as fs from 'fs-extra';
import * as path from "path";

export abstract class ProgrammingSystem {
    /*
    Basic class, which all device specific classes derives. It implements common methods to all of them.
     */

    public constructor() {
        this.addSettings();
    }

    protected addSettings(): void {
        /*
        Adds settings required by ProgrammingSystem.
        Function is used only at initialization.
         */
        this.settings.set('ProjectName', 'newProject');
    }

    public getSettings(): Map<string, string> {
        /*
        Returns copy of system settings.
         */
        return new Map(this.settings);
    }

    public updateSettings(newSettings: Map<string, string>): void {
        /*
        Updates system settings.
         */
        this.settings = new Map([...this.settings, ...newSettings]);
    }

    protected settings = new Map<string, string>();

    public newProjectTask(location: string): boolean {
        /*
        Creates new project at the specified location.
         */
        try {
            fs.ensureDirSync(path.join(location, 'src'));
            fs.ensureDirSync(path.join(location, '.vscode'));
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    }

    /*
    Formatting options for json files
     */
    protected jsonOptions = {
        spaces: 4
    };

    public abstract generateMakefile(location: string): boolean;
}
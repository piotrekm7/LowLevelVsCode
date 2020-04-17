import * as fs from 'fs-extra';
import * as path from "path";

export abstract class ProgrammingSystem {
    /*
    Basic class, which all device specific classes derives. It implements common methods to all of them.
     */

    public constructor() {
        this.addSettings();
        //this.addTasks();
    }

    private addSettings(): void {
        /*
        Adds settings required by ProgrammingSystem.
        Function is used only at initialization.
         */
        this.settings.set('ProjectName', 'newProject');
    }

    public getSettings(): Map<string, string | number> {
        /*
        Returns copy of system settings.
         */
        return new Map(this.settings);
    }

    public updateSettings(newSettings: Map<string, string | number>): void {
        /*
        Updates system settings.
         */
        this.settings = new Map([...this.settings, ...newSettings]);
    }

    protected settings = new Map<string, string | number>();

    public newProjectTask(location: string): boolean {
        /*
        Creates new project at the specified location.
         */
        try {
            fs.ensureDirSync(path.join(location, 'dupa'));
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    }


}
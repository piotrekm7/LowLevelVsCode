import {getSystem, Systems} from "./SystemFactory";
import * as vscode from "vscode";

export class System {
    /*
      System class is used by vs code extension. It creates appropriate ProgrammingSystem instance and calls its methods.
       */
    private static system: any;
    private static location: string = "";

    public static newProject(projectType: Systems): void {
        /*
            Creates new project.
            Asks user about project type.
            Enables user choosing folder for new project.
        */
        vscode.window
            .showOpenDialog({
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
            })
            .then((folders) => {
                if (folders && folders[0]) {
                    vscode.commands.executeCommand("vscode.openFolder", folders[0]);
                    System.system = getSystem(projectType);
                    System.location = folders[0].fsPath;
                    if (System.system.newProjectTask(System.location)) {
                        console.log("New project created!");
                        return;
                    }
                }
            });
        console.log("A problem occurred when creating new project!");
        System.system = undefined;
    }

    static generateMakefile(): void {
        // TODO should be project type specific
        if (System.system) {
            if (System.system.generateMakefile(System.location)) {
                console.log("Makefile successfully generated!");
            } else {
                console.log("Problem occurred when generating Makefile!");
            }
        }
        return System.systemDoesNotExistBehaviour();
    }

    public static getProjectSettings(): Map<string, string> | void {
        /*
            Returns system settings.
             */
        if (System.system) {
            return System.system.getSettings();
        }
        System.systemDoesNotExistBehaviour();
    }

    public static updateProjectSettings(newSettings: Map<string, string>): void {
        /*
            Updates system settings.
             */
        if (System.system) {
            return System.system.setSettings(newSettings);
        }
        System.systemDoesNotExistBehaviour();
    }

    private static systemDoesNotExistBehaviour(): void {
        /*
            The method is invoked when class method which depends on ProgrammingSystem instance is invoked
            and the ProgrammingSystem object wasn't created properly or at all.
             */
        const message =
            "This method can only be used after successful programming system creation!";
        console.log(message);
        throw new Error(message);
    }
}

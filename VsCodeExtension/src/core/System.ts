import {getSystem, Systems} from "./SystemFactory";
import * as vscode from "vscode";

export class System {
    /*
    System class is used by vs code extension. It creates appropriate ProgrammingSystem instance and calls its methods.
     */
    private static system: any;
    private static location: string = "";

    // TODO default value is temporary, should be deleted in future
    static newProject(projectType: Systems = Systems.NRF52840): void {
        /*
        Creates new project.
        Enables user choosing folder for new project.
        Should ask user about project type. (Not implemented)
         */
        vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false
        }).then(folders => {
            if (folders && folders[0]) {
                vscode.commands.executeCommand("vscode.openFolder", folders[0]);
                System.system = getSystem(projectType);
                System.location = folders[0].fsPath;
                if (System.system.newProjectTask(System.location)) {
                    console.log('New project created!');
                }
            }
        });
        console.log('A problem occurred when creating new project!');
    }

    static generateMakefile(): void {
        if (System.system.generateMakefile(System.location)) {
            console.log('Makefile successfully generated!');
        } else {
            console.log('Problem occurred when generating Makefile!');
        }
    }
}
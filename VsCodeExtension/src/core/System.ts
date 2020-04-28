import {getSystem, Systems} from "./SystemFactory";
import * as vscode from "vscode";

export class System {
    /*
    System class is used by vs code extension. It creates appropriate ProgrammingSystem instance and calls its methods.
     */

    static newProject(): void {
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
                // TODO should ask user about project type, it's problematic though, so I hardcoded 52840 for now
                const system = getSystem(Systems.NRF52840);
                if(system.newProjectTask(folders[0].fsPath)){
                    console.log('New project created!');
                }
            }
        })
        console.log('A problem occured when creating new project!');
    }
}
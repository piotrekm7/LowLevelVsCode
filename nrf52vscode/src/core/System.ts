import {getSystem, Systems} from "./SystemFactory";
import * as vscode from "vscode";

export class System {
    /*
    System class is used by vs code extension. It creates appropriate ProgrammingSystem instance and calls its methods.
     */
    static openDialogForFolder(): Promise<vscode.Uri> {
        /*
        Gui function which enables user choosing folder for new or existing project.
         */
        const options: vscode.OpenDialogOptions = {
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false
        };
        const result: vscode.Uri[] | undefined = vscode.window.showOpenDialog(Object.assign(options));
        if (result && result.length) {
            return Promise.resolve(result[0]);
        } else {
            return Promise.reject();
        }
    }

    static newProject(): boolean {
        /*
        Creates new project.
        Should ask user about project type. (Not implemented)
         */
        const result: vscode.Uri = System.openDialogForFolder();
        if (result && result.fsPath) {
            vscode.commands.executeCommand('vscode.openFolder', result);
            // TODO should ask user about project type, it's problematic though, so I hardcoded 52840 for now
            const system = getSystem(Systems.NRF52840);
            return system.newProjectTask(result.fsPath);
        }
        return false;
    }
}
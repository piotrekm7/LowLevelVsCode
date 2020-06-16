import {getSystem, Systems} from "./SystemFactory";
import * as vscode from "vscode";
import {Uri} from "vscode";
import * as fs from 'fs-extra';
import * as path from "path";

export class System {
    /*
      System class is used by vs code extension. It creates appropriate ProgrammingSystem instance and calls its methods.
       */
    private static system: any;
    private static location: string = "";

    public static newProject(projectType: Systems): void {
        /*
            Creates new project.
            Enables user choosing folder for new project.
        */
        System.openDialogForFolderSelection()
            .then((folders) => {
                if (folders && folders[0]) {
                    System.createNewProject(projectType, folders[0]);
                }
            });
    }

    public static openProject(): void {
        /*
            Opens existing project.
            User chooses folder when existing project is located.
        */
        System.openDialogForFolderSelection()
            .then((folders) => {
                if (folders && folders[0]) {
                    System.openExistingProject(folders[0]);
                }
            });
    }

    private static parseSettings(data: string): Map<string, string> {
        /*
        Parses project settings from json to Map<string, string>.
         */
        const jsonSettings = JSON.parse(data);
        return new Map(jsonSettings);
    };

    private static openExistingProject(folderPath: Uri): void {
        /*
        Opens project located in specified folder.
         */
        fs.readFile(path.join(folderPath.fsPath, '.vscode', 'lowlevelvscode.json'), 'utf-8', (err, data) => {
            if (err) {
                vscode.window.showWarningMessage('there is no .vscode/lowlevelvscode.json file');
            } else {
                const settings = System.parseSettings(data);
                const projectType = Systems[settings.get('ProjectType') as keyof typeof Systems];
                vscode.commands.executeCommand("vscode.openFolder", folderPath);
                System.system = getSystem(projectType);
                System.location = folderPath.fsPath;
                //TODO shouldn't modify it directly
                System.system.projectLocation = System.location;
                System.updateProjectSettings(settings);
            }
        });
    }

    private static openDialogForFolderSelection(): Thenable<Uri[] | undefined> {
        /*
        Shows dialog for selecting folder, used in creating and opening folder.
         */
        return vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
        });
    }

    private static createNewProject(projectType: Systems, folderPath: Uri): void {
        /*
        Creates new project of specified type at specified location
         */
        vscode.commands.executeCommand("vscode.openFolder", folderPath);
        System.system = getSystem(projectType);
        System.location = folderPath.fsPath;
        if (System.system.newProjectTask(System.location)) {
            console.log("New project created!");
        } else {
            console.log("A problem occurred when creating new project!");
            System.system = undefined;
        }
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
            return System.system.updateSettings(newSettings);
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

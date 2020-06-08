import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import {System} from "../core/System";
import {Systems} from "../core/SystemFactory";

export default OpenProject;

function processSettings(data: string) {
    const jsonSettings = JSON.parse(data);
    const mapSettings: Map<string, string> = new Map(jsonSettings);
    const projectType = mapSettings.get('ProjectType') as unknown as Systems;
    console.log(projectType, jsonSettings);
    // System.newProject(projectType);
    // System.updateProjectSettings(savedSettings);
};

function OpenProject(): void{
    const options: vscode.OpenDialogOptions = {
        canSelectMany: false,
        openLabel: 'Open',
        canSelectFolders: true,
        canSelectFiles: false,
    };

    vscode.window.showOpenDialog(options).then(fileUri => {
        if (fileUri && fileUri[0]) {
            const folderPath = fileUri[0].fsPath;
            fs.readFile(path.join(folderPath, '.vscode', 'lowlevelvscode.json'), 'utf-8', (err, data) => {
                if (err) {
                    vscode.window.showWarningMessage('there is no .vscode/lowlevelvscode.json file');
                    return;
                }
                processSettings(data);
            });
        }
    });
}
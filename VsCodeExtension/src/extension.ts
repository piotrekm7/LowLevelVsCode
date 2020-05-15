import * as vscode from "vscode";
import {System} from "./core/System";
import * as Webviews from "./frontend/Webviews";

export function activate(context: vscode.ExtensionContext) {
    let projectSettings = vscode.commands.registerCommand(
        "LowLevelVsCode.projectSettings",
        Webviews.projectSettings(context)
    );
    let newProject = vscode.commands.registerCommand(
        "LowLevelVsCode.NewProject",
        Webviews.newProject(context)
    );
    let generateMakefile = vscode.commands.registerCommand(
        "LowLevelVsCode.generateMakefile",
        System.generateMakefile
    );
    context.subscriptions.push(newProject, generateMakefile, projectSettings);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

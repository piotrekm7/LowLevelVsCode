import * as vscode from 'vscode';
import {System} from "./core/System";

export function activate(context: vscode.ExtensionContext) {
    let newProject = vscode.commands.registerCommand('LowLevelVsCode.NewProject', System.newProject);
    context.subscriptions.push(newProject);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

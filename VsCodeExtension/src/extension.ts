import * as vscode from 'vscode';
import {System} from "./core/System";
import * as Webviews from "./frontend/Webviews";

export function activate(context: vscode.ExtensionContext) {
	// newProject zwraca funkcje. Generuje ja aby przekazac context
    let newProject = vscode.commands.registerCommand('LowLevelVsCode.NewProject', Webviews.newProject(context));
    let generateMakefile = vscode.commands.registerCommand('LowLevelVsCode.generateMakefile', System.generateMakefile);
    context.subscriptions.push(newProject, generateMakefile);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

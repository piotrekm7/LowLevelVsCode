import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import {System} from '../core/System'

import {Systems} from '../core/SystemFactory';

export function newProject(context: vscode.ExtensionContext) {
	return () => {
		const panel = vscode.window.createWebviewPanel(
			'newProject',
			'New Project',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true
			}
		);

		const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'frontend', 'main.js'))
		const scriptPath = panel.webview.asWebviewUri(onDiskPath);

		fs.readFile(path.join(context.extensionPath,'src', 'frontend', 'index.html'),(err,data) => {
			if(err) {
				console.error(err)
			}
        	panel.webview.html = String(data).replace(/MAIN_JS/, scriptPath.toString());
		});

		const systemNames: string[] = [];

		for (let item in Systems) {
			if (isNaN(Number(item))) {
				systemNames.push(item);
			}
		}
		
		panel.webview.onDidReceiveMessage(
			message => {
				switch(message.type) {
					case 'ready':
						panel.webview.postMessage(systemNames);
						break;
					case 'submit':
						// tutaj jest string z nazwą typu
						vscode.window.showErrorMessage(message.value);
						// System.newProject();
						break;
				}
			},
			undefined,
			context.subscriptions
		);
	}
}
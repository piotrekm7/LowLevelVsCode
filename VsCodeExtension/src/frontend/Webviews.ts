import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import {System} from '../core/System'

import {Systems} from '../core/SystemFactory';

/** 
 * Opening webview with select for new project
 * @param  context  
 * @return callback with vscode context in scope 
 */
export function newProject(context: vscode.ExtensionContext): () => void {
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

		function getPathTo(filename: string): string {
			const fileUri = vscode.Uri.file(path.join(context.extensionPath, 'src', 'frontend', filename))
			const filePath = panel.webview.asWebviewUri(fileUri).toString();
			return filePath;
		}


		fs.readFile(path.join(context.extensionPath,'src', 'frontend', 'index.html'),(err,data) => {
			if(err) {
				console.error(err)
				return;
			}
			const htmlString = String(data)
				.replace(/\{\{main\.js\}\}/, getPathTo('main.js'))
				.replace(/\{\{style\.css\}\}/, getPathTo('style.css'));
        	panel.webview.html = htmlString;
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
						// string in value contains name of system
						// converted to Systems for typechecking
						System.newProject(message.value as Systems);
						break;
				}
			},
			undefined,
			context.subscriptions
		);
	}
}
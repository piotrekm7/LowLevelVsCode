import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import {System} from "../core/System";
import {Systems} from "../core/SystemFactory";

/**
 * Generating vscode Webview.
 * need index.html, main.js and style.css in folder named as viewType
 * @param  viewType Identifies the type of the webview panel
 * @param  title visible in editor
 * @param  context
 * @return callback with vscode context in scope
 */
function generateWebviewPanel(
    viewType: string,
    title: string,
    context: vscode.ExtensionContext
): vscode.WebviewPanel {
    function getPathTo(filename: string): string {
        const fileUri = vscode.Uri.file(
            path.join(context.extensionPath, "src", "frontend", viewType, filename)
        );
        const filePath = panel.webview.asWebviewUri(fileUri).toString();
        return filePath;
    }

    const panel = vscode.window.createWebviewPanel(
        viewType,
        title,
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            retainContextWhenHidden: true,
        }
    );

    fs.readFile(
        path.join(context.extensionPath, "src", "frontend", viewType, "index.html"),
        (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const htmlString = String(data)
                .replace(/\{\{main\.js\}\}/, getPathTo("main.js"))
                .replace(/\{\{style\.css\}\}/, getPathTo("style.css"));
            panel.webview.html = htmlString;
        }
    );

    return panel;
}

/**
 * Opening webview with select for new project
 * @param  context
 * @return callback with vscode context in scope
 */
export function newProject(context: vscode.ExtensionContext): () => void {
    return () => {
        const panel = generateWebviewPanel("newProject", "New Project", context);
        const systemNames: string[] = [];

        for (let item in Systems) {
            if (isNaN(Number(item))) {
                systemNames.push(item);
            }
        }

        panel.webview.onDidReceiveMessage(
            (message) => {
                switch (message.type) {
                    case "loaded":
                        panel.webview.postMessage(systemNames);
                        break;
                    case "submit":
                        // string in value contains name of system
                        // converted to Systems
                        System.newProject(Systems[message.value as keyof typeof Systems]);
                        panel.dispose();
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    };
}

/**
 * Opening webview with settings
 * @param  context
 * @return callback with vscode context in scope
 */
export function projectSettings(context: vscode.ExtensionContext): () => void {
    return () => {
        let settings: void | Map<string, string>;
        try {
            settings = System.getProjectSettings();
        } catch(err) {
            vscode.window.showWarningMessage('You have to create or open project first.');
            return;
        }

        const panel = generateWebviewPanel(
            "projectSettings",
            "Project Settings",
            context
        );

        panel.webview.onDidReceiveMessage(
            (message) => {
                switch (message.type) {
                    case "loaded":
                        panel.webview.postMessage(settings);
                        break;
                    case "submit":
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    };
}

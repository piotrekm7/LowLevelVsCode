import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import {System} from "../core/System";
import {Systems} from "../core/SystemFactory";
import { stringify } from "querystring";

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
                    case "save":
                        // string in value contains name of system
                        // converted to Systems
                        System.newProject(Systems[message.value as keyof typeof Systems]);
                        panel.dispose();
                        break;

                    case "cancel":
                        panel.dispose();
                        break;

                    default:
                        console.log("unrecognized message");
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
        
        let settings: any | Map<string, string>;

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

        // settings = new Map([["ProjectName","newProject"],["GNU_GCC","C:/Program Files (x86)/GNU Tools ARM Embedded/7 2018-q2-update/"],["nRF_SDK","C:\\Users\\piotr\\Desktop\\ABB\\nrf52incode\\nRF5_SDK_15.3.0_59ac345\\nRF5_SDK_15.3.0_59ac345"],["JLinkGDBServer","C:/Program Files (x86)/SEGGER/JLink/JLinkGDBServerCL.exe"]]);
        const entries = [...settings.entries()];

        panel.webview.onDidReceiveMessage(
            (message) => {
                switch (message.type) {
                    case "loaded":
                        panel.webview.postMessage(entries);
                        break;

                    case "save":
                        console.log("nosz kurwa");
                        
                        const savedSettings: Map<string, string> = new Map(message.value);
                        try {
                            System.updateProjectSettings(savedSettings);
                        } catch (err) {
                            console.log('saving settings error: ', err);
                        }

                        console.log('przyjete dane od projectSettings', [...savedSettings.entries()]);
                        // panel.dispose();
                        break;

                    case "cancel":
                        panel.dispose();
                        break;

                    default:
                        console.log("unrecognized message");
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    };
}

// [["ProjectName","newProject"],["GNU_GCC","C:/Program Files (x86)/GNU Tools ARM Embedded/7 2018-q2-update/"],["nRF_SDK","C:\\Users\\piotr\\Desktop\\ABB\\nrf52incode\\nRF5_SDK_15.3.0_59ac345\\nRF5_SDK_15.3.0_59ac345"],["JLinkGDBServer","C:/Program Files (x86)/SEGGER/JLink/JLinkGDBServerCL.exe"]]

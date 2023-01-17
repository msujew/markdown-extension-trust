// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "markdown-trust" is now active!');

    vscode.languages.registerHoverProvider('*', {
        provideHover() {
            const md = new vscode.MarkdownString(`[trusted command](command:markdown-trust.trusted) and [untrusted command](command:markdown-trust.untrusted)`);
            md.isTrusted = {
                enabledCommands: ['markdown-trust.trusted']
            };
            return {
                contents: [md]
            };
        },
    });

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	vscode.commands.registerCommand('markdown-trust.trusted', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Trusted command!');
    });
    
    vscode.commands.registerCommand('markdown-trust.untrusted', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Untrusted command!');
    });
    
    vscode.commands.registerCommand('markdown-trust.webview', () => {
        // Create and show panel
        const panel = vscode.window.createWebviewPanel(
            'webviewTrust',
            'Webview Trust',
            vscode.ViewColumn.One,
            {
                enableCommandUris: ['markdown-trust.trusted']
            }
        );
  
        // And set its HTML content
        panel.webview.html = `<a href="command:markdown-trust.trusted">trusted command</a> and <a href="command:markdown-trust.untrusted">untrusted command</a>`;
    });
}

// this method is called when your extension is deactivated
export function deactivate() {}

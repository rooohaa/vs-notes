import * as vscode from 'vscode';
import { HelloWorldPanel } from './HelloWorldPanel';
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'vs-notes-sidebar',
      sidebarProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vs-notes.helloWorld', () => {
      vscode.window.showInformationMessage('Hello World from VS-Notes!');
      HelloWorldPanel.createOrShow(context.extensionUri);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vs-notes.refresh', () => {
      HelloWorldPanel.kill();
      HelloWorldPanel.createOrShow(context.extensionUri);

      // Open devtools command
      // setTimeout(() => {
      //   vscode.commands.executeCommand(
      //     'workbench.action.webview.openDeveloperTools'
      //   );
      // }, 500);
    })
  );
}

export function deactivate() {}

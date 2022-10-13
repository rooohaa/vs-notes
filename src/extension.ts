import * as vscode from 'vscode';
import { authenticate } from './authenticate';
import { SidebarProvider } from './SidebarProvider';
import { TokenManager } from './TokenManager';

export function activate(context: vscode.ExtensionContext) {
  TokenManager.globalState = context.globalState;
  const sidebarProvider = new SidebarProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'vs-notes-sidebar',
      sidebarProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vs-notes.authenticate', () => {
      try {
        authenticate();
      } catch (err) {
        console.log(err);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vs-notes.welcome', () => {
      vscode.window.showInformationMessage(
        `Token is: ${TokenManager.getToken()}`
      );
    })
  );
}

export function deactivate() {}

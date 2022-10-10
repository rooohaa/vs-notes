import * as vscode from 'vscode';
import { HelloWorldPanel } from './HelloWorldPanel';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('vs-notes.helloWorld', () => {
      vscode.window.showInformationMessage('Hello World from VS-Notes!');
      HelloWorldPanel.createOrShow(context.extensionUri);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vs-notes.askQuestion', async () => {
      const answer = await vscode.window.showInformationMessage(
        'How was your day?',
        'Good',
        'Bad'
      );
      console.log('Answer is: ', answer);
      if (answer === 'Good') {
        vscode.window.showInformationMessage('Nice :)');
      } else {
        vscode.window.showInformationMessage('Thats sad :(');
      }
    })
  );
}

export function deactivate() {}

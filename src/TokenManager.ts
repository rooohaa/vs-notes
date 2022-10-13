import * as vscode from 'vscode';

const KEY = 'vsnotestoken';

export class TokenManager {
  static globalState: vscode.Memento;

  static setToken(token: string) {
    return this.globalState.update(KEY, token);
  }

  static getToken(): string {
    return this.globalState.get(KEY, '');
  }
}

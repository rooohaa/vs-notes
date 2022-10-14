/// <reference types="svelte" />

import * as _vscode from 'vscode';

interface IState {
  formIsActive: boolean;
}

declare global {
  const tsvscode: {
    postMessage: ({ type: string, value: any }) => void;
    getState: () => IState;
    setState: (state: IState) => void;
  };
  const apiBaseUrl: string;
}

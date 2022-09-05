import {
  commands,
  ConfigurationChangeEvent,
  ExtensionContext,
  window,
  workspace,
} from 'vscode';

import generateSnippets from './helpers/generateSnippets';
import snippetSearch from './helpers/snippetSearch';
import generatedSnippets from './snippets/generated.json';

const showRestartMessage = async ({
  affectsConfiguration,
}: ConfigurationChangeEvent) => {
  if (affectsConfiguration('reactSnippets')) {
    await generateSnippets();
    setTimeout(() => {
      window
        .showWarningMessage(
          'React Snippets: Please restart VS Code to apply snippet formatting changes',
          'Restart VS Code',
          'Ignore',
        )
        .then((action?: string) => {
          if (action === 'Restart VS Code') {
            commands.executeCommand('workbench.action.reloadWindow');
          }
        });
    }, 1000);
  }
};

export async function activate(context: ExtensionContext) {
  // 工作空间配置更改监听
  workspace.onDidChangeConfiguration(showRestartMessage);

  if (JSON.stringify(generatedSnippets).length < 10) {
    await generateSnippets();
  }
  // 注册查询命令
  const snippetSearchCommand = commands.registerCommand(
    'reactSnippets.search',
    snippetSearch,
  );
  // 开启订阅，监听命令变化
  context.subscriptions.push(snippetSearchCommand);
}

export function deactivate() {}

import { readFileSync } from 'fs';
import { SnippetString, window } from 'vscode';

import { parseSnippet } from './formatters';
import { Snippet } from './generateSnippets';

const snippetSearch = async () => {
  const { showQuickPick, activeTextEditor } = window;
  // 读取所有代码片段
  const snippets = readFileSync(
    __dirname + '/../snippets/generated.json',
    'utf8',
  );
  // 转化成数组
  const snippetsArray = Object.entries(JSON.parse(snippets)) as [
    string,
    Snippet,
  ][];
  // 代码片段数据转化成固定格式
  const items = snippetsArray.map(
    ([shortDescription, { body, description, prefix: label }]) => ({
      body,
      description: description || shortDescription,
      label,
    }),
  );
  // vscode提供筛选能力
  // @link https://code.visualstudio.com/api/references/vscode-api#QuickPick%3CT%3E
  const rawSnippet = await showQuickPick(items, {
    matchOnDescription: true,
    matchOnDetail: true,
    placeHolder: 'Search snippet by prefix or description',
  });
  // 选中后，将选中的代码片段取body
  const body = rawSnippet ? parseSnippet(rawSnippet.body) : '';

  if (activeTextEditor) {
    // 插入到光标所在位置
    // @link https://code.visualstudio.com/Search?q=SnippetString
    // @link https://code.visualstudio.com/updates/v1_9?source=techstories.org#_editor-api-to-insert-a-snippet
    // 看这个 @link https://code.visualstudio.com/api/references/vscode-api#SnippetString
    activeTextEditor.insertSnippet(new SnippetString(body));
  }
};

export default snippetSearch;

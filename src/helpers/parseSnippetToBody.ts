import extensionConfig from './extensionConfig';
import { formatSnippet } from './formatters';
import { Snippet } from './generateSnippets';
import replaceOrRemoveReactImport from './replaceOrRemoveReactImport';
// 将代码片段放到body中
const parseSnippetToBody = (snippet: Snippet) => {
  // 配置信息，是否在顶部引入react
  // @link https://github.com/841660202/vscode-react-javascript-snippets/blob/master/README.md#:~:text=project%20prettier%20config-,importReactOnTop,-If%20disabled%2C%20snippets
  const { importReactOnTop } = extensionConfig();
  const body =
    typeof snippet.body === 'string' ? snippet.body : snippet.body.join('\n');

  const snippetBody = importReactOnTop
    ? body
    : replaceOrRemoveReactImport({
        prefix: snippet.prefix,
        body: snippet.body,
      });

  const formattedSnippet = formatSnippet(snippetBody).split('\n');

  return formattedSnippet;
};

export default parseSnippetToBody;

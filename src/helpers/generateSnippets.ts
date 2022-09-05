import { writeFile } from 'fs';
// 代码片段资源
import componentsSnippets, {
  ComponentsSnippet,
} from '../sourceSnippets/components';
import consoleSnippets, { ConsoleSnippet } from '../sourceSnippets/console';
import hooksSnippets, { HooksSnippet } from '../sourceSnippets/hooks';
import importsSnippets, { ImportsSnippet } from '../sourceSnippets/imports';
import othersSnippets, { OthersSnippet } from '../sourceSnippets/others';
import propTypesSnippets, {
  PropTypesSnippet,
} from '../sourceSnippets/propTypes';
import reactNativeSnippets, {
  ReactNativeSnippet,
} from '../sourceSnippets/reactNative';
import reduxSnippets, { ReduxSnippet } from '../sourceSnippets/redux';
import testsSnippets, { TestsSnippet } from '../sourceSnippets/tests';
import typescriptSnippets, {
  TypescriptSnippet,
} from '../sourceSnippets/typescript';



// 工作空间配置
import extensionConfig from './extensionConfig';
// 代码片段解析到body
import parseSnippetToBody from './parseSnippetToBody';
// 替换代码片段中的Placeholders 键(代码层面的变量)转化成值(vscode可识别的语法)
// @link https://code.visualstudio.com/docs/editor/userdefinedsnippets#_placeholders
import { replaceSnippetPlaceholders } from './snippetPlaceholders';
// 代码片段key
export type SnippetKeys =
  | OthersSnippet['key']
  | HooksSnippet['key']
  | ImportsSnippet['key']
  | ReactNativeSnippet['key']
  | TypescriptSnippet['key']
  | ReduxSnippet['key']
  | ComponentsSnippet['key']
  | ConsoleSnippet['key']
  | PropTypesSnippet['key']
  | TestsSnippet['key'];
// 代码片段
export type Snippet =
  | OthersSnippet
  | HooksSnippet
  | ImportsSnippet
  | ReactNativeSnippet
  | TypescriptSnippet
  | ReduxSnippet
  | ComponentsSnippet
  | ConsoleSnippet
  | PropTypesSnippet
  | TestsSnippet;

//代码片段对象<SnippetKey, Snippet>
export type Snippets = {
  [key in SnippetKeys]: Snippet;
};

const getSnippets = () => {
  // 配置信息
  const { typescript, languageScopes/**语言环境 */ } = extensionConfig();

  const snippets = [
    ...(typescript ? typescriptSnippets : []),
    ...componentsSnippets,
    ...consoleSnippets,
    ...hooksSnippets,
    ...importsSnippets,
    ...propTypesSnippets,
    ...reactNativeSnippets,
    ...reduxSnippets,
    ...testsSnippets,
    ...othersSnippets,
  ].reduce((acc, snippet) => {
    acc[snippet.key] = Object.assign(snippet, {
      body: parseSnippetToBody(snippet),
      scope: languageScopes,
    });
    return acc;
  }, {} as Snippets);
  // 转换成vscode识别的语法
  return replaceSnippetPlaceholders(JSON.stringify(snippets, null, 2)/**JSON.stringify进行格式化 */);
};

const generateSnippets = () =>
  new Promise((resolve) => {
    // 代码片段json数据格式
    const jsonSnippets = getSnippets();
    writeFile(
      __dirname + '/../snippets/generated.json', // 输出路径
      jsonSnippets, // 数据源
      (error) => {
        if (error) {
          console.error(error);
        }
        return resolve(true);
      },
    );
  });

export default generateSnippets;

import prettier from 'prettier';

import extensionConfig from './extensionConfig';
import getPrettierConfig from './getPrettierConfig';
import {
  replaceSnippetPlaceholders,
  revertSnippetPlaceholders,
} from './snippetPlaceholders';
// 从配置工作空间中拿到配置信息对代码片段进行格式化
export const formatSnippet = (snippetString: string/**传入的代码片段信息 */) => {
  return extensionConfig().prettierEnabled
    ? prettier.format(snippetString, getPrettierConfig())
    : snippetString;
};
// 介些代码片段
export const parseSnippet = (body: string | string[]) => {
  // 数组转化成字符串，以\n进行换行
  const snippetBody = typeof body === 'string' ? body : body.join('\n');

  return replaceSnippetPlaceholders(
    formatSnippet(revertSnippetPlaceholders(snippetBody)),
  );
};

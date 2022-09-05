import { Mappings, Placeholders } from '../types';

import extensionConfig from './extensionConfig';
// Mappings 键转化成值
export const replaceSnippetPlaceholders = (snippetString: string) => {
  const { typescriptPropsStatePrefix } = extensionConfig();
  // propsPlaceholder 使用type字段？
  const propsPlaceholder =
    typescriptPropsStatePrefix === 'type'
      ? Mappings.TypeProps // type Props = {}
      : Mappings.InterfaceProps; // interface Props {}
  // statePlaceholder 使用type字段？
  const statePlaceholder =
    typescriptPropsStatePrefix === 'type'
      ? Mappings.TypeState // type State = {}
      : Mappings.InterfaceState; // interface State {}

  return String(snippetString)
    .replace(new RegExp(Placeholders.FileName, 'g'), '${1:${TM_FILENAME_BASE}}') // 替换成vscode宏
    .replace(new RegExp(Placeholders.FirstTab, 'g'), '${1:first}')
    .replace(new RegExp(Placeholders.SecondTab, 'g'), '${2:second}')
    .replace(new RegExp(Placeholders.ThirdTab, 'g'), '${3:third}')
    .replace(
      new RegExp(Placeholders.Capitalize, 'g'),
      '${1/(.*)/${1:/capitalize}/}',
    )
    .replace(new RegExp(Placeholders.TypeProps, 'g'), propsPlaceholder)
    .replace(new RegExp(Placeholders.TypeState, 'g'), statePlaceholder);
};
// Mappings 值转化成键
export const revertSnippetPlaceholders = (snippetString: string) => {
  return String(snippetString)
    .replace(
      new RegExp(/\${1:\${TM_FILENAME_BASE}}/, 'g'), // Mappings(src/types.ts) 的值，替换成key
      Placeholders.FileName,
    )
    .replace(new RegExp(/\${1:first}/, 'g'), Placeholders.FirstTab)
    .replace(new RegExp(/\${2:second}/, 'g'), Placeholders.SecondTab)
    .replace(new RegExp(/\${3:third}/, 'g'), Placeholders.ThirdTab)
    .replace(
      new RegExp(/\${1\/(.*)\/${1:\/capitalize}\/}/, 'g'),
      Placeholders.Capitalize,
    );
};
export default revertSnippetPlaceholders;

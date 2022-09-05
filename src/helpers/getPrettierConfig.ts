import prettier, { Options } from 'prettier';

import extensionConfig from './extensionConfig';

let prettierConfig: prettier.Options | null;
prettier
  .resolveConfig('', { editorconfig: true })
  .then((config) => (prettierConfig = config));


// 获取prettier的配置信息
const getPrettierConfig = (): Options => {
  // 从vscode工作空间拿到配置信息
  const { prettierEnabled } = extensionConfig();

  return {
    parser: 'typescript', // ts语言的方式进行解析
    ...(prettierEnabled && prettierConfig),
  };
};

export default getPrettierConfig;

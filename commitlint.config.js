module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // 标识必须输入
      'always',
      [
        'feat', // 新特性
        'fix', // 修改问题，修复bug
        'docs', // 文档修改
        'style', // 代码格式修改，注意不是css修改，不影响代码运行的变动
        'refactor', // 代码重构
        'test', // 测试用例修改
        'chore' // 其它修改，比如构建流程、或者增加依赖库、工具等
      ]
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never']
  }
}

import Mock from 'mockjs'

export function template(tpl) {
  return Mock.mock({
    code: '0',
    message: 'success',
    data: tpl
  })
}

export const Random = Mock.Random

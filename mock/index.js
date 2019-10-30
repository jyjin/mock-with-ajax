/**
 * 暴露mock接口假数据
 */
import { default as _getModule } from './getModule'
import { default as user } from './user'
import { default as todo } from './todo'
// 加入你的mock数据... import { default as XXX } from './XXX'

let _mock = {
  '/im-manage/${token}/user/${orgId}/query': user,
  '/im-manage/${token}/todo/${orgId}/query': todo
  // 暴露接口供外部调用...  '/your/path/${param1}/to/${param2}/outside': XXX
}

export default _mock;

// 为了少传一个参数，直接把getModule在这里放出去了，可能不好
export function getModule(url) {
  return _getModule.call(this, url, _mock)
}



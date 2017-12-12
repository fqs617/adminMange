import {post} from 'http'
export default class TopicService {
  /**
   *
   * 获取专题商品配置列表
   * @param {object} params 查询参数
   * @returns
   * @memberof TopicService
   */
  getTopicList(params = {}) {
    return post('api/special/topic/list', params)
  }
  /**
   *
   * 删除专题信息
   * @param {int} params.topicId 查询参数id
   * @returns
   * @memberof TopicService
   */
  delTopic(params = {}) {
    return post('api/special/topic/delete', params)
  }
  /**
   *
   * 编辑推荐商品信息
   * @param {int} params 查询参数
   * @param {int} params.configId 推荐配置id
   * @returns
   * @memberof TopicService
   */
  editTopicList(params = {}) {
    return post('api/special/topic/confirm/save', params)
  }
  /**
   *
   * 查看商品配置
   * @param {int} params 查询参数
   * @param {int} params.topicId 推荐配置id
   * @returns
   * @memberof TopicService
   */
  lookTopicList(params = {}) {
    return post('api/special/topic/sku/list', params)
  }
  /**
   *
   * 保存专题商品配置
   * @param {int} params 查询参数
   * @param {int} params.topicId 推荐配置id
   * @returns
   * @memberof TopicService
   */
  save(params = {}) {
    return post('api/special/topic/confirm/save', params)
  }

  /**
   *
   * 获取单个专题信息
   * @param {any} topicId 专题id
   * @returns
   * @memberof TopicService
   */
  getByTopicId(topicId) {
    return post('api/special/topic/info', {topicId: topicId})
  }
}

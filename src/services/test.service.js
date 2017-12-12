import {get, post, upload} from 'http'
import menu from '@/data/menu.json'
export default class TestService {
  getHome() {
    return get('test/list', {store_id: 63001, p9: 'wap', page: 1})
  }

  post() {
    return post('test/add', {menu: menu})
  }

  upload(parmas = {}) {
    return upload('test/upload', parmas)
  }

  upload1(parmas = {}) {
    return upload('test/upload', parmas)
  }

  getCity(params = {}) {
    return get('api/util/get/all/regionList', params)
  }

  vaild(params = {}) {
    return post('test/vaild', params)
  }
}

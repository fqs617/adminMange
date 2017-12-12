import path from 'path'
import Utils from '../build/utils'
const mockDir = path.resolve(__dirname, './services/')
const mockFile = Utils.getFilePath(mockDir, 'js')
export default function (app) {
  Object.keys(mockFile).forEach(file => {
    let mock = require(path.resolve(mockDir, file))
    app.use(mock.api, mock.router)
  })
}

import adaptiveBox from './adaptiveBox'
import headerHandle from './headerHandle'

export default {
  install(Vue) {
    let componentsList = [adaptiveBox, headerHandle]
    componentsList.forEach(item => {
      Vue.component(item.name, item)
    })
  }
}

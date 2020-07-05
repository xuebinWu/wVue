function initProxy(vm, $data) {
  Object.keys($data).forEach(key =>{
    proxy(vm, '$data', key)
  })
}
function proxy(target, prop, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    get() {
      return target[prop][key]
    },
    set(newVal) {
      target[prop][key] = newVal
    }
  })
}
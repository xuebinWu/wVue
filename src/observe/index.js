class Observe {
  constructor(value) {
    this.walk(value)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        this.walk(obj[key])
      }
      this.defineReactive(obj, key, obj[key])
    })
  }

  defineReactive(obj, key, value) {
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      set(newVal) {
        if (newVal === value) {
          return
        }
        console.log(`set ${key}, ${newVal}`)
        value = newVal
        dep.notify()
      },
      get() {
        if (Dep.target) {
          dep.addDepend(Dep.target)
        }
        return value
      }
    })

  }
}
function parsePath(obj, path) {
  let segments = path.split('.')
  segments.forEach(key => {
    if (!obj) return
    obj = obj[key]
  })
  return obj
}
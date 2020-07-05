class VNode {
  constructor(tag, data, value, type) {
    this.tag = tag && tag.toLowerCase()
    this.data = data
    this.value = value
    this.type = type
    this.childNodes = []
  }

  appendChild(node) {
    this.childNodes.push(node)
  }
}
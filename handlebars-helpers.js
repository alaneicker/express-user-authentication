module.exports = {
  ifeq(a, b, options) {
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  block(name) {
    const blocks  = this._blocks,
        content = blocks && blocks[name];

    return content ? content.join("\n") : null;
  },
  contentFor(name, options) {
    const blocks = this._blocks || (this._blocks = {}),
        block  = blocks[name] || (blocks[name] = []);

    block.push(options.fn(this));
  }
}
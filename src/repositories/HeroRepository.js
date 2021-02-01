const fs = require('fs');

class HeroRepository {
  constructor({ file }) {
    this.file = file;
  }

  async _currentFileContent() {
    const content = await fs.promises.readFile(this.file);

    return JSON.parse(content || []);
  }

  async find(itemId) {
    const all = await this._currentFileContent();

    if(!itemId) return all;

    return all.find(({ id }) => itemId === id);
  }

  async create(data) {
    const currentFile = await this._currentFileContent();

    currentFile.push(data);

    await fs.promises.writeFile(this.file, JSON.stringify(currentFile, null, '\t'))

    return data.id;
  }
}

module.exports = HeroRepository;
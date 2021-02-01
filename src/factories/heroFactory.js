const { join } = require('path');

const HeroRepository = require('../repositories/HeroRepository');
const HeroService = require('../services/HeroService');

const file = join(__dirname, '..', '..', 'database', 'data.json');

const createInstance = () => {
  const heroRepository = new HeroRepository({ file })

  const heroService = new HeroService({ heroRepository });

  return heroService;
}

module.exports = { createInstance };
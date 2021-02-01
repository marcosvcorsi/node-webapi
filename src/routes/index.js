
const HeroFactory = require('../factories/heroFactory');
const Hero = require('../entities/Hero');

const DEFAULT_HEADER = { 'Content-Type': 'application/json' };

const heroService = HeroFactory.createInstance();

const handleError = response => {
  return error => {
    console.error('Deu ruim!!', error);

    response.writeHead(500, DEFAULT_HEADER);
    response.write(JSON.stringify({ error: 'Internal Server Error!!'}));

    return response.end();
  }
}

const routes = {
  '/heroes:get': async (request, response) => {
    const { id } = request.queryString;

    const heroes = await heroService.find(id);

    response.write(JSON.stringify({ results: heroes }))

    return response.end();
  },
  '/heroes:post': async (request, response) => {
    for await (const data of request) {
      try {
        const item = JSON.parse(data);

        const hero = new Hero(item);
  
        const { valid, errors } = hero.isValid();
  
        if(!valid) {
          response.writeHead(400, DEFAULT_HEADER);
          response.write(JSON.stringify({ errors: errors.join(', ')}));
  
          return response.end();
        }
  
        const id = await heroService.create(hero);
  
        response.writeHead(201, DEFAULT_HEADER);
        response.write(JSON.stringify({ success: 'User Created with success!', id }))
        
        return response.end();
      } catch(error) {
        return handleError(response)(error);
      }
    }
  },
  default: (request, response) => {
    response.write('Hello');

    response.end();
  }
}

module.exports = { routes, DEFAULT_HEADER, handleError };
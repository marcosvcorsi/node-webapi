const http = require('http');

const { routes, handleError, DEFAULT_HEADER } = require('./routes');

const PORT = process.env.PORT || 3000;

const handler = (request, response) => {
  const { url, method } = request;

  const [, route, id] = url.split('/');

  request.queryString = { id: isNaN(id) ? id : Number(id) }

  const key = `/${route}:${method.toLowerCase()}`;

  response.writeHead(200, DEFAULT_HEADER);

  const chosen = routes[key] || routes.default;

  return chosen(request, response).catch(handleError(response));
}

http.createServer(handler).listen(PORT, () => console.log(`Server is running on port ${PORT}`))
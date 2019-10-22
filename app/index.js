const elasticSearch = require('./elasticsearch/connection');

(async () => {
  await elasticSearch.connect();
})();

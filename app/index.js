const elasticSearch = require('./elasticsearch/connection');
const elasticsearchUtil = require('./lib/elasticsearch-util');

(async () => {
  await elasticSearch.connect();
  await elasticsearchUtil.createIndex();
  await elasticsearchUtil.createTypes(['calls', 'contacts']);
})();

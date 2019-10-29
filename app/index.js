const elasticSearch = require('./elasticsearch/connection');
const elasticsearchUtil = require('./lib/elasticsearch-util');

(async () => {
  await elasticSearch.connect();
  await elasticsearchUtil.createIndexes();
  await elasticsearchUtil.createMappingsToIndex();
  //await elasticsearchUtil.insertDoc();
  await elasticsearchUtil.bulkInsert();
  //await elasticsearchUtil.searchDoc();
})();

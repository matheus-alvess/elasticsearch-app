const elasticSearch = require('./elasticsearch/connection');
const elasticsearchUtil = require('./lib/elasticsearch-util');

(async () => {
  await elasticSearch.connect();
  await elasticsearchUtil.initProperties();
  //await elasticsearchUtil.bulkInsert();
  await elasticsearchUtil.searchDoc();
  //await elasticsearchUtil.testFunnel();
})();

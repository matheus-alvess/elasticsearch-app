const elasticsearch = require('elasticsearch');

const Elasticsearch = {
  client: null,
  async connect() {
    try {
      await new Promise(async (resolve, reject) => {
        this.client = new elasticsearch.Client({
          host: `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`
        });
        if (await this.client.ping({ requestTimeout: 1000 }) === true) {
          console.log(`ELASTIC_SEARCH CONECTED ON: ${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`);
          resolve(this.client);
        } else {
          reject(`ELASTICSEARCH ERROR ON CONNECTED: ${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Elasticsearch;

const elasticsearch = require('elasticsearch');

const Elasticsearch = {
  connection: null,
  connect: async () => {
    try {
      await new Promise(async (resolve, reject) => {
        this.connection = new elasticsearch.Client({
          host: `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`
        });

        if (await this.connection.ping({ requestTimeout: 1000 }) === true) {
          console.log(`ELASTIC_SEARCH CONECTED ON: ${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`);
          resolve(this.connection);
        }
        reject(false);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Elasticsearch;

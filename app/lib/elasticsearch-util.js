const elasticsearch = require('../elasticsearch/connection');
const Mappings = require('../elasticsearch/mappings');

const ElasticSearchUtil = {
    async createIndex() {
        try {
            if (!await this.indexExists(process.env.ELASTIC_INDEX_NAME)) {
                let { index } = await elasticsearch.client.indices.create({
                    index: process.env.ELASTIC_INDEX_NAME
                });
                console.log(`index created: ${index}`);
            }
        } catch (e) {
            console.log(e);
        }
    },
    indexExists(indexName) {
        return elasticsearch.client.indices.exists({
            index: indexName
        });
    },
    async createMappingsToIndex() {
        for (let mappingType in Mappings) {
            try {
                let resp = await elasticsearch.client.indices.putMapping({
                    index: process.env.ELASTIC_INDEX_NAME,
                    type: mappingType,
                    body: Mappings[mappingType]
                });
                console.log(resp)
            } catch (e) {
                console.log(e);
            }
        }
    },
    async insertDoc() {
        try {
            let response = await elasticsearch.client.index({
                index: process.env.ELASTIC_INDEX_NAME,
                type: 'calls',
                body: {
                    id: '123',
                    mailingId: '0000',
                    createAt: new Date(),
                    campaignId: 12345,
                    clientId: 1,
                    objectTest: {
                        aaa: 123,
                        bbb: 1234,
                        cccc: 12345
                    }
                }
            });
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    },
    async searchDoc() {
        try {
            let query = {
                query: {
                    match: {
                        campaignId: 12345
                    }
                }
            };

            let docs = await elasticsearch.client.search({
                index: process.env.ELASTIC_INDEX_NAME,
                type: 'calls',
                body: query
            });

            for (let doc of docs.hits.hits) {
                console.log(doc._source);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = ElasticSearchUtil;

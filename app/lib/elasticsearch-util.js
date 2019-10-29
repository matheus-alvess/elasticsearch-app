const elasticsearch = require('../elasticsearch/connection');
const Mappings = require('../elasticsearch/mappings');
const Indexes = require('../elasticsearch/indexes');

const ElasticSearchUtil = {
    async createIndexes() {
        for (let indexName of Indexes) {
            try {
                if (!await this.indexExists(indexName)) {
                    let { index } = await elasticsearch.client.indices.create({
                        index: indexName
                    });
                    console.log(`index created: ${index}`);
                }
            } catch (e) {
                console.log(e);
            }
        }
    },
    indexExists(indexName) {
        return elasticsearch.client.indices.exists({
            index: indexName
        });
    },
    async createMappingsToIndex() {
        for (let indexName of Indexes) {
            try {
                await elasticsearch.client.indices.putMapping({
                    index: indexName,
                    type: indexName,
                    body: Mappings[indexName]
                });
            } catch (e) {
                console.log(e);
            }
        }
    },
    async insertDoc() {
        try {
            let response = await elasticsearch.client.index({
                index: 'calls',
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
            console.log();
        } catch (e) {
            console.log(e);
        }
    },
    async bulkInsert() {
        try {
            let action = { index: { _index: 'calls', _type: 'calls' } };
            let body = [];
            let items = [
                {
                    id: 1,
                    mailingId:24,
                    createAt: new Date(),
                    campaignId:24,
                },
                {
                    id: 2,
                    mailingId:25,
                    createAt: new Date(),
                    campaignId:25
                }
            ];

            for (let item of items) {
                body.push(action,item)
            }

            await elasticsearch.client.bulk({ 
                body 
            });
        } catch (e) {
            console.log(e);
        }
    },
    async searchDoc() {
        try {
            let query = {
                query: {
                    match: {
                        mailingId: 24
                    }
                }
            };

            let docs = await elasticsearch.client.search({
                index: 'calls',
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

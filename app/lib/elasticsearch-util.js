const elasticsearch = require('../elasticsearch/connection');

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

    typeExists(type) {
        return elasticsearch.client.indices.existsType({
            index: process.env.ELASTIC_INDEX_NAME,
            type: type
        });
    },

    async createTypes(types) {
        for (let type of types) {
            try {
                if (!await this.typeExists(type)) {
                    let response = await elasticsearch.client.index({
                        index: process.env.ELASTIC_INDEX_NAME,
                        type: type,
                        body: {
                            aaa:123,
                            bbb:1234
                        }
                    });
                    console.log(response);
                }

            } catch (e) {
                console.log(e);
            }    
        }
    }
}

module.exports = ElasticSearchUtil;

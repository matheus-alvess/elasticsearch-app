const elasticsearch = require('../elasticsearch/connection');
const Mappings = require('../elasticsearch/mappings');
const Indexes = require('../elasticsearch/indexes');

const ElasticSearchUtil = {
    funnel: {
        "type" : "full_personalcob_varejo",
        "slug" : "full_personalcob_varejo",
        "layers" : [
            {
                "name" : "Atendimento",
                "widgets" : {
                    "type" : "landlineVsMobile",
                    "graph" : "pie",
                    "captions" : [
                        "Fixo",
                        "Movel"
                    ],
                    "captionEvents" : [ ]
                },
                "eventSets" : [
                    {
                        "events" : [
                            {
                                "state" : "initial_state",
                                "action" : "enter"
                            }
                        ]
                    }
                ]
            },
            {
                "name" : "Localizacão",
                "widgets" : {
                    "type" : "eventCounters",
                    "graph" : "column",
                    "countAllCaptions" : true,
                    "captions" : [
                        "CPC",
                        "NCPC",
                        "CONHECE",
                        "NAO CONHECE"
                    ],
                    "captionEvents" : [
                        {
                            "eventSets" : [
                                {
                                    "events" : [
                                        {
                                            "state" : "identify_by_name",
                                            "action" : "intent",
                                            "params" : {
                                                "value" : "CPC"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "events" : [
                                        {
                                            "state" : "invalid_name",
                                            "action" : "intent",
                                            "params" : {
                                                "value" : "CPC"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "eventSets" : [
                                {
                                    "events" : [
                                        {
                                            "state" : "identify_by_name",
                                            "action" : "intent",
                                            "params" : {
                                                "value" : "NCPC"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "events" : [
                                        {
                                            "state" : "invalid_name",
                                            "action" : "intent",
                                            "params" : {
                                                "value" : "NCPC"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "eventSets" : [
                                {
                                    "events" : [
                                        {
                                            "state" : "knows",
                                            "action" : "intent",
                                            "params" : {
                                                "value" : "KNOWS"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "eventSets" : [
                                {
                                    "events" : [
                                        {
                                            "state" : "knows",
                                            "action" : "intent",
                                            "params" : {
                                                "value" : "DONT_KNOW"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                "eventSets" : [
                    {
                        "events" : [
                            {
                                "state" : "identify_by_name",
                                "action" : "intent",
                                "params" : {
                                    "value" : "CPC"
                                }
                            }
                        ]
                    },
                    {
                        "events" : [
                            {
                                "state" : "invalid_name",
                                "action" : "intent",
                                "params" : {
                                    "value" : "CPC"
                                }
                            }
                        ]
                    },
                    {
                        "events" : [
                            {
                                "state" : "identify_by_name",
                                "action" : "intent",
                                "params" : {
                                    "value" : "NCPC"
                                }
                            }
                        ]
                    },
                    {
                        "events" : [
                            {
                                "state" : "invalid_name",
                                "action" : "intent",
                                "params" : {
                                    "value" : "NCPC"
                                }
                            }
                        ]
                    },
                    {
                        "events" : [
                            {
                                "state" : "knows",
                                "action" : "intent",
                                "params" : {
                                    "value" : "KNOWS"
                                }
                            }
                        ]
                    },
                    {
                        "events" : [
                            {
                                "state" : "identify_by_name",
                                "action" : "intent",
                                "params" : {
                                    "value" : "KNOWS"
                                }
                            }
                        ]
                    },
                    {
                        "events" : [
                            {
                                "state" : "knows",
                                "action" : "intent",
                                "params" : {
                                    "value" : "DONT_KNOW"
                                }
                            }
                        ]
                    },
                    {
                        "events" : [
                            {
                                "state" : "identify_by_name",
                                "action" : "intent",
                                "params" : {
                                    "value" : "DIDNTUNDERSTAND"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "name" : "Transferência",
                "widgets" : {
                    "type" : "transfer",
                    "graph" : "scatter"
                },
                "eventSets" : [
                    {
                        "events" : [
                            {
                                "state" : "transfer_call",
                                "action" : "transfer"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    async initProperties() {
        await this.createIndexes();
        await this.createMappingsToIndex();
    },

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
            let action = { index: { _index: 'contacts', _type: 'contacts' } };
            let body = [];
            let items = [
                {
                    id: 3,
                    mailingId:24,
                    createAt: new Date(),
                    campaignId:24,
                    api: true,
                    asteriskOutCdr: {
                        status: 'Teste1'
                    },
                    uraEvents: [
                        {
                            "state" : "initial_state",
                            "action" : "enter"
                        },
                        {
                            "context" : "knows",
                            "action" : "intent"
                        }
                    ]
                },
                {
                    id: 4,
                    mailingId:25,
                    createAt: new Date(),
                    campaignId:25,
                    api: false,
                    asteriskOutCdr: {
                        status: 'Teste2'
                    },
                    uraEvents: [
                        {
                            "action" : "enter",
                            "context" : "knows",
                            "intent" : "knows"
                        }
                    ]
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
                "query": {
                  "bool": {
                    "filter": {
                        "term": {
                            "mailingId": 24
                        }
                    },
                    "nested": {
                        "path": "uraEvents",
                        "query": {
                          "bool": {
                            "must": [
                              { "match": { "uraEvents.state": "initial_state" }},
                              { "match": { "uraEvents.action":  "enter" }} 
                            ]
                          }
                        }
                    }
                  }
                }
            };
            
            let docs = await elasticsearch.client.search({
                index: 'contacts',
                type: 'contacts',
                body: query
            });

            for (let doc of docs.hits.hits) {
                console.log(doc._source);
            }
        } catch (e) {
            console.log(e);
        }
    },

    async testFunnel() {
        try {
            let layerCounter = {
                funnel: {
                    totals: 0,
                    layers: []
                }
            };

            for (let layer of this.funnel.layers) {
                console.log(layer);
            }

        } catch (e) {
            console.log(e);
        }
    },

    async processLayer(layer) {
        let query = {
            "query": {
                "nested": {
                "path": "uraEvents",
                "query": {
                    "bool": {
                    "must": [
                        { "match": { "uraEvents.state": "initial_state" }},
                        { "match": { "uraEvents.action":  "enter" }} 
                    ]
                    }
                }
                }
            }
            }
        let docs = await elasticsearch.client.search({
            index: 'contacts',
            type: 'contacts',
            body: query
        });

        for (let doc of docs.hits.hits) {
            console.log(doc._source);
        }
    }
}

module.exports = ElasticSearchUtil;

const Mappings = {
  calls: {
    properties: {
      id: {
        type: 'text'
      },
      mailingId: {
        type: 'long'
      },
      createdAt: {
        type: 'date'
      },
      campaignId: {
        type: 'long'
      },
      api: {
        type: 'boolean'
      },
      asteriskOutCdr: {
        type: 'object'
      },
      uraEvents: {
        type: 'nested'
      }
    }
  },
  contacts: {
    properties: {
      id: {
        type: 'text'
      },
      mailingId: {
        type: 'long'
      },
      createdAt: {
        type: 'date'
      },
      campaignId: {
        type: 'long'
      },
      api: {
        type: 'boolean'
      },
      asteriskOutCdr: {
        type: 'object'
      },
      uraEvents: {
        type: 'nested'
      }
    }
  }
};

module.exports = Mappings;

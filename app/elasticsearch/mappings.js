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
      body: {
        type: 'text'
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
      body: {
        type: 'text'
      }
    }
  }
};

module.exports = Mappings;

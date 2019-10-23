const Mappings = {
  calls: {
    properties: {
      id: {
        type: 'text'
      },
      mailingId: {
        type: 'double'
      },
      createdAt: {
        type: 'date'
      },
      campaignId: {
        type: 'double'
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
        type: 'double'
      },
      createdAt: {
        type: 'date'
      },
      campaignId: {
        type: 'double'
      },
      body: {
        type: 'text'
      }
    }
  }
};

module.exports = Mappings;

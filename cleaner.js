const axios = require('axios');


const clean = async (client) => {
    try {
        client.channels.fetch(1382140739001127002n)
          .then(channel => {
            channel.messages.fetch({ limit: 100 })
              .then(messages => {
                messages = messages.filter(m => !m.pinned);
                channel.bulkDelete(messages)
              })
          })
    } catch (error) {
        console.log("Bot : "+error);
    }
};
module.exports = clean;
const axios = require('axios');


const clean = async (client) => {
    try {
        client.channels.fetch(1324814179101704373n)
          .then(channel => {
            channel.messages.fetch({ limit: 10000 })
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
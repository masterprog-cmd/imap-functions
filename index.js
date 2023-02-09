// Description: This file contains the functions that will be used to connect to the IMAP server and retrieve the messages.

// Import the ImapFlow library
const { ImapFlow } = require("imapflow")

// Create a new client
function newClient(newClient) {
  const client = new ImapFlow(newClient)
  return client
}

async function connect(client) {
  await client.connect()
}

//Obtain last message
async function getLastMessage(client) {
  const message = await client.fetchOne(client.mailbox.exists, {
    source: true,
  })
  return message
}

//Obtain messages
async function getMessages(client) {
  const messages = []
  for await (let message of client) {
    messages.push({
      uid: message.uid,
      subject: message.envelope.subject,
    })
  }
  return messages
}

async function closeConnection(client) {
  return client.logout()
}

module.exports = {
  newClient,
  connect,
  getLastMessage,
  getMessages,
  closeConnection,
}

class Message {
    constructor(senderID, receiverID, time, content) {
        this.senderID = senderID
        this.receiverID = receiverID
        this.time = time
        this.content = content
    }
}

class Conversation {
    constructor(person1id, person2id) {
        this.people = [person1id, person2id]
        this.messages = [] // FULL OF MESSAGE OBJECTS
    }
}

const msg = {
    "people": ["2c88d5d9-4490-4569-9eae-1ccf04519c71", "6fa08d50-7cb9-4c2c-bda8-60ee92a34b1c"],
    "messages": [
        {
            "senderID": "2c88d5d9-4490-4569-9eae-1ccf04519c71",
            "receiverID": "6fa08d50-7cb9-4c2c-bda8-60ee92a34b1c",
            "time": 1645542400914,
            "content": "selam knk"
        }
    ]
}

module.exports = { Message, Conversation }
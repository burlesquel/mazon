class Message {
    constructor(senderID, senderName, receiverID, receiverName, time, content, product = null, avatar) {
        this.sender = { id: senderID, name: senderName, avatar: avatar }
        this.receiver = { id: receiverID, name: receiverName, avatar: avatar }
        this.time = time
        this.content = content
        this.between = [senderID, receiverID]
        this.product = product
        this.avatar = avatar
    }
}

class Conversation {
    constructor(starterID, starterName, receiverID, receiverName, starterAvatar, receiverAvatar) {
        this.people = {
            starter: { id: starterID, name: starterName, starterAvatar: starterAvatar },
            receiver: { id: receiverID, name: receiverName, receiverAvatar: receiverAvatar }
        }
        this.id = String(String(starterID) + String(receiverID))
        this.between = [starterID, receiverID]
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
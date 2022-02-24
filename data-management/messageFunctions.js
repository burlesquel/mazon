class Message {
    constructor(senderID, senderName, receiverID, receiverName, time, content) {
        this.sender = { id: senderID, name: senderName }
        this.receiver = { id: receiverID, name: receiverName }
        this.time = time
        this.content = content
        this.between = [senderID, receiverID]
        this.me = function (id) {
            if (this.sender.id === id) {
                return this.sender
            }
            else {
                return this.receiver
            }
        }
        this.oppositeSide = function (id) {
            if (this.sender.id === id) {
                return this.receiver
            }
            else {
                return this.sender
            }
        }
    }
}

class Conversation {
    constructor(starterID, starterName, receiverID, receiverName) {
        this.people = {
            starter: { id: starterID, name: starterName, avatar: "https://i.ibb.co/zGz78ff/1595800322946-Avatar-Meme.png" },
            receiver: { id: receiverID, name: receiverName, avatar: "https://i.ibb.co/zGz78ff/1595800322946-Avatar-Meme.png" }
        }
        this.id = String(String(starterID) + String(receiverID))
        this.between = [starterID, receiverID]
        this.messages = [] // FULL OF MESSAGE OBJECTS
        this.me = function (id) {
            if (this.people.starter.id === id) {
                return this.people.starter
            }
            else {
                return this.people.receiver
            }
        }
        this.oppositeSide = function (id) {
            if (this.people.starter.id === id) {
                return this.people.receiver
            }
            else {
                return this.people.starter
            }
        }
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
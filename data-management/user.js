class User{
    constructor(id, email, name, role, confirmation_done_at){
        this.id = id
        this.email = email
        this.name = name
        this.role = role
        this.confirmation_done_at = confirmation_done_at
        this.stores = []

    }
}

module.exports = {
    User
} 
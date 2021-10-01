export class User {
    constructor(
        id,
        phone,
        email,
        userName,
        firstName,
        lastName
    ) {
        this.id = id;
        this.name = firstName + ' ' + lastName;
        this.phone = phone;
        this.email = email;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export default User;
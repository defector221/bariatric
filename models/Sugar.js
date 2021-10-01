export class Sugar {
    static getKey(date) {
        return `sugar-${date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()}`;
    }
    constructor(
        id,
        date,
        sugar
    ){
        this.id = id;
        this.date = new Date(date);
        this.sugar = sugar;
    }
}

export default Sugar;
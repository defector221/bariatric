export const TIME_OF_DAY = {
    MORNING: 'Morning',
    AFTER_NOON: 'Afternoon',
    NIGHT: 'Night',
}

export const BEFORE_OR_AFTER_FOOD = {
    BEFORE_FOOD: 'Before food',
    AFTER_FOOD: 'After food'
}
export class Medication {
    constructor(
        id,
        name,
        timeOfDay,
        quantity,
        time,
        beforeOrAfterFood,
        duration, // in days
        taken // boolean
    ){
        this.id = id;
        this.name = name;
        this.timeOfDay = timeOfDay;
        this.quantity = quantity;
        this.time = time;
        this.beforeOrAfterFood = beforeOrAfterFood;
        this.duration = duration;
        this.taken = taken;
    }
}

export default Medication;
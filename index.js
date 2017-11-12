/* participantObject EXAMPLE */
/* Example: { firstName: 'Sergey', lastName: 'Zotenko', seniorityLevel: 'intermediate' } */
// const participantObject = {
//     firstName: string,
//     lastName: string,
//     seniorityLevel: string
// }

/* pricingObject EXAMPLE */
/* Example: { 'junior': 10 } */
// const pricingObject = {
//     roleName: number
// }
const ProjectModule = (function() {
    let instance;

    function createInstance() {
        return {
            participants: [],
            pricing: {},
            isBusy: false,

            /* implement initialization of the object */
            /* participants - predefined array of participants */
            /* pricing - predefined object (keyvalue collection) of pricing */
            init(participants, pricing) {
                this.isBusy = true;
                if (!participants || !pricing) return;
                this.participants = Array.isArray(participants) ? participants : [];
                this.pricing = typeof pricing === 'object' ? pricing : {};
                this.isBusy = false;
            },

            /* pass found participant into callback, stops on first match */
            /* functor - function that will be executed for elements of participants array */
            /* callbackFunction - function that will be executed with found participant as argument or with null if not */
            /* callbackFunction (participant) => {} */
            findParticipant(functor, callbackFunction) {
                if (this.isBusy) return false;
                this.isBusy = true;
                setTimeout(() => {
                    let found = this.participants.find(functor);
                    if (!found) found = null;
                    this.isBusy = false;
                    callbackFunction(found);
                });
            },

            /* pass array of found participants into callback */
            /* functor - function that will be executed for elements of participants array */
            /* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
            /* callbackFunction (participantsArray) => {} */
            findParticipants(functor, callbackFunction) {
                if (this.isBusy) return false;
                this.isBusy = true;
                setTimeout(() => {
                    const found = this.participants.filter(functor);
                    this.isBusy = false;
                    callbackFunction(found);
                });

            },

            /* push new participant into this.participants array */
            /* callbackFunction - function that will be executed when job will be done */
            /* (err) => {} */
            addParticipant(participantObject, callbackFunction) {
                if (this.isBusy) return false;
                this.isBusy = true;
                setTimeout(() => {
                    if (participantObject.hasOwnProperty('seniorityLevel')) {
                        this.participants.push(participantObject);
                        this.isBusy = false;
                        callbackFunction();
                    } else {
                        this.isBusy = false;
                        callbackFunction(new Error());
                    }
                })

            },

            /* push new participant into this.participants array */
            /* callback should receive removed participant */
            /* callbackFunction - function that will be executed with object of removed participant or null if participant wasn't found when job will be done */
            removeParticipant(participantObject, callbackFunction) {
                if (this.isBusy) return false;
                this.isBusy = true;
                setTimeout(() => {
                    const found = this.participants.findIndex(obj => {
                        if (JSON.stringify(obj) === JSON.stringify(participantObject)) return true;
                        return false;
                    });
                    if (found === -1) {
                        this.isBusy = false;
                        callbackFunction(null);
                    } else {
                        const obj = this.participants.splice(found, 1);
                        this.isBusy = false;
                        callbackFunction(obj[0]);
                    }
                });
            },

            /* Extends this.pricing with new field or change existing */
            /* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */
            setPricing(participantPriceObject, callbackFunction) {
                if (this.isBusy) return false;
                this.isBusy = true;
                setTimeout(() => {
                    Object.assign(this.pricing, participantPriceObject);
                    this.isBusy = false;
                    callbackFunction();
                })

            },

            /* calculates salary of all participants in the given period */
            /* periodInDays, has type number, one day is equal 8 working hours */
            calculateSalary(periodInDays) {
                let summ = 0;
                const hours = periodInDays * 8;
                for (let i = 0; i < this.participants.length; i++) {
                    let arr = this.participants;
                    if (!this.pricing[arr[i].seniorityLevel]) {
                        throw new Error();
                    }
                    summ += this.pricing[arr[i].seniorityLevel] * hours;
                }
                return summ;
            }

        }
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
module.exports = {
    firstName: 'Maksim',
    lastName: 'Shevjakov',
    task: ProjectModule
}
export class Errors {
    /**
     * Create a new Errors instance.
     */
    constructor() {
        this.errors = {}
    }

    /**
     * Record a new error message.
     *
     * @param {string} message
     */
    recordMessage(message) {
        this.errors.message = message
    }

    /**
     * Check if an error message has been recorded.
     */
    hasMessage() {
        return (
            // eslint-disable-next-line no-prototype-builtins
            this.errors.hasOwnProperty('message') &&
            this.errors.message !== null &&
            this.errors.message !== undefined
        )
    }

    /**
     * Retrieve the recorded error message.
     */
    getMessage() {
        return this.errors.message
    }

    /**
     * Clear the recorded error message.
     */
    clear() {
        delete this.errors.message
    }
}

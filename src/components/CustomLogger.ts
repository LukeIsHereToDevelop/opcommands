interface Options {
    prefix: String
}

export default class CustomLogger {
    options: Options | undefined;

    /**
     * Initializes the Custom Logger.
     * @param {Object} options
     * @constructor
     */
    constructor(options: Options) {
        if (!options) throw new Error("Options is a required parameter.");
    }
}
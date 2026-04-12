declare namespace chrome {
    ////////////////////
    // SystemLog
    ////////////////////
    /**
     * Use the `chrome.systemLog` API to record Chrome system logs from extensions.
     *
     * Permissions: "systemLog"
     *
     * Note: Only available to policy installed extensions.
     * @platform ChromeOS only
     * @since Chrome 125
     */
    namespace systemLog {
        interface MessageOptions {
            message: string;
        }

        /**
         * Adds a new log record.
         * Can return its result via Promise in Manifest V3 or later.
         */
        function add(options: MessageOptions): Promise<void>;
        function add(options: MessageOptions, callback: () => void): void;
    }
}

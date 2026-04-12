declare namespace chrome {
    ////////////////////
    // Power
    ////////////////////
    /**
     * Use the `chrome.power` API to override the system's power management features.
     *
     * Permissions: "power"
     */
    namespace power {
        enum Level {
            /** Prevents the display from being turned off or dimmed, or the system from sleeping in response to user inactivity */
            DISPLAY = "display",
            /** Prevents the system from sleeping in response to user inactivity. */
            SYSTEM = "system",
        }

        /** Requests that power management be temporarily disabled. `level` describes the degree to which power management should be disabled. If a request previously made by the same app is still active, it will be replaced by the new request. */
        function requestKeepAwake(level: `${Level}`): void;

        /** Releases a request previously made via requestKeepAwake(). */
        function releaseKeepAwake(): void;

        /**
         * Reports a user activity in order to awake the screen from a dimmed or turned off state or from a screensaver. Exits the screensaver if it is currently active.
         * Can return its result via Promise in Manifest V3 or later.
         * @platform ChromeOS only
         * @since Chrome 113
         */
        function reportActivity(): Promise<void>;
        function reportActivity(callback: () => void): void;
    }
}

declare namespace chrome {
    ////////////////////
    // Idle
    ////////////////////
    /**
     * Use the `chrome.idle` API to detect when the machine's idle state changes.
     *
     * Permissions: "idle"
     */
    namespace idle {
        /** @since Chrome 44 */
        enum IdleState {
            ACTIVE = "active",
            IDLE = "idle",
            LOCKED = "locked",
        }

        /**
         * Returns "locked" if the system is locked, "idle" if the user has not generated any input for a specified number of seconds, or "active" otherwise.
         * @param detectionIntervalInSeconds The system is considered idle if detectionIntervalInSeconds seconds have elapsed since the last user input detected.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         */
        function queryState(detectionIntervalInSeconds: number): Promise<`${IdleState}`>;
        function queryState(
            detectionIntervalInSeconds: number,
            callback: (newState: `${IdleState}`) => void,
        ): void;

        /**
         * Sets the interval, in seconds, used to determine when the system is in an idle state for onStateChanged events. The default interval is 60 seconds.
         * @param intervalInSeconds Threshold, in seconds, used to determine when the system is in an idle state.
         */
        function setDetectionInterval(intervalInSeconds: number): void;

        /**
         * Gets the time, in seconds, it takes until the screen is locked automatically while idle. Returns a zero duration if the screen is never locked automatically.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         * @since Chrome 73
         * @platform ChromeOS only
         */
        function getAutoLockDelay(): Promise<number>;
        function getAutoLockDelay(callback: (delay: number) => void): void;

        /** Fired when the system changes to an active, idle or locked state. The event fires with "locked" if the screen is locked or the screensaver activates, "idle" if the system is unlocked and the user has not generated any input for a specified number of seconds, and "active" when the user generates input on an idle system. */
        const onStateChanged: events.Event<(newState: `${IdleState}`) => void>;
    }
}

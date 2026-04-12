declare namespace chrome {
    ////////////////////
    // Alarms
    ////////////////////
    /**
     * Use the `chrome.alarms` API to schedule code to run periodically or at a specified time in the future.
     *
     * Permissions: "alarms"
     */
    namespace alarms {
        interface AlarmCreateInfo {
            /** Length of time in minutes after which the {@link onAlarm} event should fire.  */
            delayInMinutes?: number | undefined;
            /** If set, the onAlarm event should fire every `periodInMinutes` minutes after the initial event specified by `when` or `delayInMinutes`. If not set, the alarm will only fire once. */
            periodInMinutes?: number | undefined;
            /** Time at which the alarm should fire, in milliseconds past the epoch (e.g. `Date.now() + n`). */
            when?: number | undefined;
        }

        interface Alarm {
            /** If not null, the alarm is a repeating alarm and will fire again in `periodInMinutes` minutes. */
            periodInMinutes?: number;
            /** Time at which this alarm was scheduled to fire, in milliseconds past the epoch (e.g. `Date.now() + n`). For performance reasons, the alarm may have been delayed an arbitrary amount beyond this. */
            scheduledTime: number;
            /** Name of this alarm. */
            name: string;
        }

        /**
         * Creates an alarm. Near the time(s) specified by `alarmInfo`, the {@link onAlarm} event is fired. If there is another alarm with the same name (or no name if none is specified), it will be cancelled and replaced by this alarm.
         *
         * In order to reduce the load on the user's machine, Chrome limits alarms to at most once every 30 seconds but may delay them an arbitrary amount more. That is, setting `delayInMinutes` or `periodInMinutes` to less than `0.5` will not be honored and will cause a warning. `when` can be set to less than 30 seconds after "now" without warning but won't actually cause the alarm to fire for at least 30 seconds.
         *
         * To help you debug your app or extension, when you've loaded it unpacked, there's no limit to how often the alarm can fire.
         * @param name Optional name to identify this alarm. Defaults to the empty string.
         * @param alarmInfo Describes when the alarm should fire. The initial time must be specified by either `when` or `delayInMinutes` (but not both). If `periodInMinutes` is set, the alarm will repeat every `periodInMinutes` minutes after the initial event. If neither `when` or `delayInMinutes` is set for a repeating alarm, `periodInMinutes` is used as the default for `delayInMinutes`.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function create(alarmInfo: AlarmCreateInfo): Promise<void>;
        function create(name: string | undefined, alarmInfo: AlarmCreateInfo): Promise<void>;
        function create(alarmInfo: AlarmCreateInfo, callback: () => void): void;
        function create(name: string | undefined, alarmInfo: AlarmCreateInfo, callback: () => void): void;

        /**
         * Gets an array of all the alarms.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 91.
         */
        function getAll(): Promise<Alarm[]>;
        function getAll(callback: (alarms: Alarm[]) => void): void;

        /**
         * Clears all alarms.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 91.
         */
        function clearAll(): Promise<boolean>;
        function clearAll(callback: (wasCleared: boolean) => void): void;

        /**
         * Clears the alarm with the given name.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 91.
         */
        function clear(name?: string): Promise<boolean>;
        function clear(callback: (wasCleared: boolean) => void): void;
        function clear(name: string | undefined, callback: (wasCleared: boolean) => void): void;

        /**
         * Retrieves details about the specified alarm.
         * @param name The name of the alarm to get. Defaults to the empty string.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 91.
         */
        function get(name?: string): Promise<Alarm | undefined>;
        function get(callback: (alarm?: Alarm) => void): void;
        function get(name: string | undefined, callback: (alarm?: Alarm) => void): void;

        /** Fired when an alarm has elapsed. Useful for event pages. */
        const onAlarm: events.Event<(alarm: Alarm) => void>;
    }
}

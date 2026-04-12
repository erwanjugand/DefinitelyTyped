declare namespace chrome {
    ////////////////////
    // Sessions
    ////////////////////
    /**
     * Use the `chrome.sessions` API to query and restore tabs and windows from a browsing session.
     *
     * Permissions: "sessions"
     */
    namespace sessions {
        interface Filter {
            /** The maximum number of entries to be fetched in the requested list. Omit this parameter to fetch the maximum number of entries ({@link sessions.MAX_SESSION_RESULTS}). */
            maxResults?: number | undefined;
        }

        interface Session {
            /** The time when the window or tab was closed or modified, represented in seconds since the epoch. */
            lastModified: number;
            /** The {@link tabs.Tab}, if this entry describes a tab. Either this or {@link sessions.Session.window} will be set. */
            tab?: tabs.Tab | undefined;
            /** The {@link windows.Window}, if this entry describes a window. Either this or {@link sessions.Session.tab} will be set. */
            window?: windows.Window | undefined;
        }

        interface Device {
            /** The name of the foreign device. */
            deviceName: string;
            /** A list of open window sessions for the foreign device, sorted from most recently to least recently modified session. */
            sessions: Session[];
        }

        /** The maximum number of {@link sessions.Session} that will be included in a requested list. */
        const MAX_SESSION_RESULTS: 25;

        /**
         * Gets the list of recently closed tabs and/or windows.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getRecentlyClosed(filter?: Filter): Promise<Session[]>;
        function getRecentlyClosed(callback: (sessions: Session[]) => void): void;
        function getRecentlyClosed(filter: Filter | undefined, callback: (sessions: Session[]) => void): void;

        /**
         * Retrieves all devices with synced sessions.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getDevices(filter?: Filter): Promise<Device[]>;
        function getDevices(callback: (devices: Device[]) => void): void;
        function getDevices(filter: Filter | undefined, callback: (devices: Device[]) => void): void;

        /**
         * Reopens a {@link windows.Window} or {@link tabs.Tab}, with an optional callback to run when the entry has been restored.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @param sessionId The {@link windows.Window.sessionId}, or {@link tabs.Tab.sessionId} to restore. If this parameter is not specified, the most recently closed session is restored.
         */
        function restore(sessionId?: string): Promise<Session>;
        function restore(callback: (restoredSession: Session) => void): void;
        function restore(sessionId: string | undefined, callback: (restoredSession: Session) => void): void;

        /** Fired when recently closed tabs and/or windows are changed. This event does not monitor synced sessions changes. */
        const onChanged: events.Event<() => void>;
    }
}

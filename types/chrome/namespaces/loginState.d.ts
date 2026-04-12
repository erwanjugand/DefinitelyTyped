declare namespace chrome {
    ////////////////////
    // LoginState
    ////////////////////
    /**
     * Use the `chrome.loginState` API to read and monitor the login state.
     *
     * Permissions: "loginState"
     * @platform ChromeOS only
     * @since Chrome 78
     */
    namespace loginState {
        enum ProfileType {
            /** Specifies that the extension is in the signin profile. */
            SIGNIN_PROFILE = "SIGNIN_PROFILE",
            /** Specifies that the extension is in the user profile. */
            USER_PROFILE = "USER_PROFILE",
            /** Specifies that the extension is in the lock screen profile. */
            LOCK_PROFILE = "LOCK_PROFILE",
        }

        enum SessionState {
            /** Specifies that the session state is unknown. */
            UNKNOWN = "UNKNOWN",
            /** Specifies that the user is in the out-of-box-experience screen. */
            IN_OOBE_SCREEN = "IN_OOBE_SCREEN",
            /** Specifies that the user is in the login screen. */
            IN_LOGIN_SCREEN = "IN_LOGIN_SCREEN",
            /** Specifies that the user is in the session. */
            IN_SESSION = "IN_SESSION",
            /** Specifies that the user is in the lock screen. */
            IN_LOCK_SCREEN = "IN_LOCK_SCREEN",
            /** Specifies that the device is in RMA mode, finalizing repairs. */
            IN_RMA_SCREEN = "IN_RMA_SCREEN",
        }

        /**
         * Gets the type of the profile the extension is in.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getProfileType(): Promise<`${ProfileType}`>;
        function getProfileType(callback: (result: `${ProfileType}`) => void): void;

        /**
         * Gets the current session state.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getSessionState(): Promise<`${SessionState}`>;
        function getSessionState(callback: (sessionState: `${SessionState}`) => void): void;

        /** Dispatched when the session state changes. `sessionState` is the new session state.*/
        const onSessionStateChanged: events.Event<(sessionState: `${SessionState}`) => void>;
    }
}

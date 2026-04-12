declare namespace chrome {
    ////////////////////
    // Enterprise Login
    ////////////////////
    /**
     * Use the `chrome.enterprise.login` API to exit Managed Guest sessions. Note: This API is only available to extensions installed by enterprise policy in ChromeOS Managed Guest sessions.
     *
     * Permissions: "enterprise.login"
     *
     * Note: Only available to policy installed extensions.
     * @platform ChromeOS only
     * @since Chrome 139
     */
    namespace enterprise.login {
        /** Exits the current managed guest session. */
        function exitCurrentManagedGuestSession(): Promise<void>;
        function exitCurrentManagedGuestSession(callback: () => void): void;
    }
}

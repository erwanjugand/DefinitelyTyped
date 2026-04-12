declare namespace chrome {
    ////////////////////
    // Accessibility Features
    ////////////////////
    /**
     * Use the `chrome.accessibilityFeatures` API to manage Chrome's accessibility features. This API relies on the ChromeSetting prototype of the type API for getting and setting individual accessibility features. In order to get feature states the extension must request `accessibilityFeatures.read` permission. For modifying feature state, the extension needs `accessibilityFeatures.modify` permission. Note that `accessibilityFeatures.modify` does not imply `accessibilityFeatures.read` permission.
     *
     * Permissions: "accessibilityFeatures.read", "accessibilityFeatures.modify"
     */
    namespace accessibilityFeatures {
        /** `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission. */
        const animationPolicy: chrome.types.ChromeSetting<"allowed" | "once" | "none">;

        /**
         * Auto mouse click after mouse stops moving. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        const autoclick: chrome.types.ChromeSetting<boolean>;

        /**
         * Caret highlighting. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 51
         */
        const caretHighlight: chrome.types.ChromeSetting<boolean>;

        /**
         * Cursor color. The value indicates whether the feature is enabled or not, doesn't indicate the color of it.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 85
         */
        const cursorColor: chrome.types.ChromeSetting<boolean>;

        /**
         * Cursor highlighting. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 51
         */
        const cursorHighlight: chrome.types.ChromeSetting<boolean>;

        /**
         * Dictation. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 90
         */
        const dictation: chrome.types.ChromeSetting<boolean>;

        /**
         * Docked magnifier. The value indicates whether docked magnifier feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 87
         */
        const dockedMagnifier: chrome.types.ChromeSetting<boolean>;

        /**
         * Focus highlighting. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 51
         */
        const focusHighlight: chrome.types.ChromeSetting<boolean>;

        /**
         * High contrast rendering mode. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        const highContrast: chrome.types.ChromeSetting<boolean>;

        /**
         * Enlarged cursor. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        const largeCursor: chrome.types.ChromeSetting<boolean>;

        /**
         * Full screen magnification. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        const screenMagnifier: chrome.types.ChromeSetting<boolean>;

        /**
         * Select-to-speak. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 51
         */
        const selectToSpeak: chrome.types.ChromeSetting<boolean>;

        /**
         * Spoken feedback (text-to-speech). The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        const spokenFeedback: chrome.types.ChromeSetting<boolean>;

        /**
         * Sticky modifier keys (like shift or alt). The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        const stickyKeys: chrome.types.ChromeSetting<boolean>;

        /**
         * Switch Access. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 51
         */
        const switchAccess: chrome.types.ChromeSetting<boolean>;

        /**
         * Virtual on-screen keyboard. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        const virtualKeyboard: chrome.types.ChromeSetting<boolean>;
    }
}

declare namespace chrome {
    ////////////////////
    // Types
    ////////////////////
    /**
     * The `chrome.types` API contains type declarations for Chrome.
     */
    namespace types {
        /**
         * The scope of the ChromeSetting. One of
         * * `regular`: setting for the regular profile (which is inherited by the incognito profile if not overridden elsewhere),
         * * `regular_only`: setting for the regular profile only (not inherited by the incognito profile),
         * * `incognito_persistent`: setting for the incognito profile that survives browser restarts (overrides regular preferences)
         * * `incognito_session_only`: setting for the incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular and incognito_persistent preferences).
         * @since Chrome 44
         */
        type ChromeSettingScope = "regular" | "regular_only" | "incognito_persistent" | "incognito_session_only";

        /**
         * One of
         * * `not_controllable`: cannot be controlled by any extension
         * * `controlled_by_other_extensions`: controlled by extensions with higher precedence
         * * `controllable_by_this_extension`: can be controlled by this extension
         * * `controlled_by_this_extension`: controlled by this extension
         * @since Chrome 44
         */
        type LevelOfControl =
            | "not_controllable"
            | "controlled_by_other_extensions"
            | "controllable_by_this_extension"
            | "controlled_by_this_extension";

        /** Which setting to change. */
        interface ChromeSettingSetDetails<T> {
            /**
             * The value of the setting.
             * Note that every setting has a specific value type, which is described together with the setting. An extension should not set a value of a different type.
             */
            value: T;
            /** Where to set the setting (default: regular). */
            scope?: ChromeSettingScope | undefined;
        }

        /** Which setting to consider. */
        interface ChromeSettingGetDetails {
            /** Whether to return the value that applies to the incognito session (default false). */
            incognito?: boolean | undefined;
        }

        /** Details of the currently effective value. */
        interface ChromeSettingGetResult<T> {
            /** The level of control of the setting. */
            levelOfControl: LevelOfControl;
            /** The value of the setting. */
            value: T;
            /**
             * Whether the effective value is specific to the incognito session.
             * This property will only be present if the `incognito` property in the `details` parameter of `get()` was true.
             */
            incognitoSpecific?: boolean;
        }

        /** Which setting to clear. */
        interface ChromeSettingClearDetails {
            /** Where to clear the setting (default: regular). */
            scope?: ChromeSettingScope | undefined;
        }

        /** Details of the currently effective value. */
        interface ChromeSettingOnChangeDetails<T> {
            /** Whether the value that has changed is specific to the incognito session. This property will only be present if the user has enabled the extension in incognito mode. */
            incognitoSpecific?: boolean;
            /** The value of the setting after the change. */
            value: T;
            /** The level of control of the setting. */
            levelOfControl: LevelOfControl;
        }

        /**
         * An interface that allows access to a Chrome browser setting.
         * See {@link chrome.accessibilityFeatures} for an example.
         */
        interface ChromeSetting<T> {
            /**
             * Sets the value of a setting.
             *
             * Can return its result via Promise in Manifest V3 or later since Chrome 96.
             */
            set(details: ChromeSettingSetDetails<T>): Promise<void>;
            set(details: ChromeSettingSetDetails<T>, callback: () => void): void;

            /**
             * Gets the value of a setting.
             *
             * Can return its result via Promise in Manifest V3 or later since Chrome 96.
             */
            get(details: ChromeSettingGetDetails): Promise<ChromeSettingGetResult<T>>;
            get(details: ChromeSettingGetDetails, callback: (details: ChromeSettingGetResult<T>) => void): void;

            /**
             * Clears the setting, restoring any default value.
             *
             * Can return its result via Promise in Manifest V3 or later since Chrome 96.
             */
            clear(details: ChromeSettingClearDetails): Promise<void>;
            clear(details: ChromeSettingClearDetails, callback: () => void): void;

            /** Fired after the setting changes. */
            onChange: events.Event<(details: ChromeSettingOnChangeDetails<T>) => void>;
        }
    }
}

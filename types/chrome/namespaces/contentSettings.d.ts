declare namespace chrome {
    ////////////////////
    // Content Settings
    ////////////////////
    /**
     * Use the `chrome.contentSettings` API to change settings that control whether websites can use features such as cookies, JavaScript, and plugins. More generally speaking, content settings allow you to customize Chrome's behavior on a per-site basis instead of globally.
     *
     * Permissions: "contentSettings"
     */
    namespace contentSettings {
        /** @since Chrome 113 */
        enum AutoVerifyContentSetting {
            ALLOW = "allow",
            BLOCK = "block",
        }

        /** @since Chrome 46 */
        enum CameraContentSetting {
            ALLOW = "allow",
            BLOCK = "block",
            ASK = "ask",
        }

        /** @since Chrome 121 */
        enum ClipboardContentSetting {
            ALLOW = "allow",
            BLOCK = "block",
            ASK = "ask",
        }

        interface ContentSettingClearParams {
            /** Where to clear the setting (default: regular). */
            scope?: `${Scope}`;
        }

        interface ContentSettingGetParams {
            /** Whether to check the content settings for an incognito session. (default false) */
            incognito?: boolean;
            /** The primary URL for which the content setting should be retrieved. Note that the meaning of a primary URL depends on the content type. */
            primaryUrl: string;
            /** The secondary URL for which the content setting should be retrieved. Defaults to the primary URL. Note that the meaning of a secondary URL depends on the content type, and not all content types use secondary URLs. */
            secondaryUrl?: string;
            /** A more specific identifier of the type of content for which the settings should be retrieved. */
            resourceIdentifier?: ResourceIdentifier;
        }

        interface ContentSettingGetResult<T> {
            /** The content setting. See the description of the individual ContentSetting objects for the possible values. */
            setting: T;
        }

        interface ContentSettingSetParams<T> {
            /** The pattern for the primary URL. For details on the format of a pattern, see Content Setting Patterns. */
            primaryPattern: string;
            /** The resource identifier for the content type. */
            resourceIdentifier?: ResourceIdentifier;
            /** Where to set the setting (default: regular). */
            scope?: `${Scope}`;
            /** The pattern for the secondary URL. Defaults to matching all URLs. For details on the format of a pattern, see Content Setting Patterns.*/
            secondaryPattern?: string;
            /** The setting applied by this rule. See the description of the individual ContentSetting objects for the possible values. */
            setting: T;
        }

        interface ContentSetting<T extends string> {
            /**
             * Clear all content setting rules set by this extension.
             *
             * Can return its result via Promise since Chrome 96.
             */
            clear(details: ContentSettingClearParams): Promise<void>;
            clear(details: ContentSettingClearParams, callback: () => void): void;

            /**
             * Gets the current content setting for a given pair of URLs.
             *
             * Can return its result via Promise since Chrome 96.
             */
            get(details: ContentSettingGetParams): Promise<ContentSettingGetResult<T>>;
            get(details: ContentSettingGetParams, callback: (details: ContentSettingGetResult<T>) => void): void;

            /** Can return its result via Promise since Chrome 96. */
            getResourceIdentifiers(): Promise<ResourceIdentifier[] | undefined>;
            getResourceIdentifiers(callback: (resourceIdentifiers?: ResourceIdentifier[]) => void): void;

            /**
             * Applies a new content setting rule.
             *
             * Can return its result via Promise since Chrome 96.
             */
            set(details: ContentSettingSetParams<T>): Promise<void>;
            set(details: ContentSettingSetParams<T>, callback: () => void): void;
        }

        /** @since Chrome 44 */
        enum CookiesContentSetting {
            ALLOW = "allow",
            BLOCK = "block",
            SESSION_ONLY = "session_only",
        }

        /** @since Chrome 44 */
        enum FullscreenContentSetting {
            ALLOW = "allow",
        }

        /** @since Chrome 44 */
        enum ImagesContentSetting {
            ALLOW = "allow",
            BLOCK = "block",
        }

        /** @since Chrome 44 */
        enum JavascriptContentSetting {
            ALLOW = "allow",
            BLOCK = "block",
        }

        /** @since Chrome 44 */
        enum LocationContentSetting {
            ALLOW = "allow",
            BLOCK = "block",
            ASK = "ask",
        }

        /** @since Chrome 46 */
        enum MicrophoneContentSetting {
            ALLOW = "allow",
            BLOCK = "block",
            ASK = "ask",
        }

        /** @since Chrome 44 */
        enum MouselockContentSetting {
            ALLOW = "allow",
        }

        /** @since Chrome 44 */
        enum MultipleAutomaticDownloadsContentSetting {
            ALLOW = "allow",
            BLOCK = "block",
            ASK = "ask",
        }

        /** @since Chrome 44 */
        enum NotificationsContentSetting {
            ALLOW = "allow",
            BLOCK = "block",
            ASK = "ask",
        }

        /** @since Chrome 44 */
        enum PluginsContentSetting {
            BLOCK = "block",
        }

        /** @since Chrome 44 */
        enum PopupsContentSetting {
            ALLOW = "allow",
            BLOCK = "block",
        }

        /** @since Chrome 44 */
        enum PpapiBrokerContentSetting {
            BLOCK = "block",
        }

        /** The only content type using resource identifiers is contentSettings.plugins. For more information, see Resource Identifiers. */
        interface ResourceIdentifier {
            /** A human readable description of the resource.  */
            description?: string;
            /** The resource identifier for the given content type. */
            id: string;
        }

        /**
         * The scope of the ContentSetting. One of
         *
         * `regular`: setting for regular profile (which is inherited by the incognito profile if not overridden elsewhere),
         *
         * `incognito_session_only`: setting for incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular settings).
         * @since Chrome 44
         */
        enum Scope {
            REGULAR = "regular",
            INCOGNITO_SESSION_ONLY = "incognito_session_only",
        }

        /** @since Chrome 141 */
        enum SoundContentSetting {
            ALLOW = "allow",
            BLOCK = "block",
        }

        /**
         * Whether to allow sites to download multiple files automatically. One of
         *
         * `allow`: Allow sites to download multiple files automatically,
         *
         * `block`: Don't allow sites to download multiple files automatically,
         *
         * `ask`: Ask when a site wants to download files automatically after the first file.
         *
         * Default is `ask`.
         *
         * The primary URL is the URL of the top-level frame. The secondary URL is not used.
         */
        const automaticDownloads: ContentSetting<`${MultipleAutomaticDownloadsContentSetting}`>;

        /**
         * Whether to allow sites to use the Private State Tokens API. One of
         *
         * `allow`: Allow sites to use the Private State Tokens API,
         *
         * `block`: Block sites from using the Private State Tokens API.
         *
         * Default is `allow`.
         *
         * When calling `set()`, the primary URL pattern must be `<all_urls>`. The secondary URL is not used.
         * @since Chrome 113
         */
        const autoVerify: ContentSetting<`${AutoVerifyContentSetting}`>;

        /**
         * Whether to allow sites to access the camera. One of
         *
         * `allow`: Allow sites to access the camera,
         *
         * `block`: Don't allow sites to access the camera,
         *
         * `ask`: Ask when a site wants to access the camera.
         *
         * Default is `ask`.
         *
         * The primary URL is the URL of the document which requested camera access. The secondary URL is not used. NOTE: The 'allow' setting is not valid if both patterns are '<all\_urls>'.
         * @since Chrome 46
         */
        const camera: ContentSetting<`${CameraContentSetting}`>;

        /**
         * Whether to allow sites to access the clipboard via advanced capabilities of the Async Clipboard API. "Advanced" capabilities include anything besides writing built-in formats after a user gesture, i.e. the ability to read, the ability to write custom formats, and the ability to write without a user gesture. One of
         *
         * `allow`: Allow sites to use advanced clipboard capabilities,
         *
         * `block`: Don't allow sites to use advanced clipboard capabilties,
         *
         * `ask`: Ask when a site wants to use advanced clipboard capabilities.
         *
         * Default is `ask`.
         *
         * The primary URL is the URL of the document which requested clipboard access. The secondary URL is not used.
         * @since Chrome 121
         */
        const clipboard: ContentSetting<`${ClipboardContentSetting}`>;

        /**
         * Whether to allow cookies and other local data to be set by websites. One of
         *
         * `allow`: Accept cookies,
         *
         * `block`: Block cookies,
         *
         * `session_only`: Accept cookies only for the current session.
         *
         * Default is `allow`.
         *
         * The primary URL is the URL representing the cookie origin. The secondary URL is the URL of the top-level frame.
         */
        const cookies: ContentSetting<`${CookiesContentSetting}`>;

        /** @deprecated No longer has any effect. Fullscreen permission is now automatically granted for all sites. Value is always `allow`. */
        const fullscreen: ContentSetting<`${FullscreenContentSetting}`>;

        /**
         * Whether to show images. One of
         *
         * `allow`: Show images,
         *
         * `block`: Don't show images.
         *
         * Default is `allow`.
         *
         * The primary URL is the URL of the top-level frame. The secondary URL is the URL of the image.
         */
        const images: ContentSetting<`${ImagesContentSetting}`>;

        /**
         * Whether to run JavaScript. One of
         *
         * `allow`: Run JavaScript,
         *
         * `block`: Don't run JavaScript.
         *
         * Default is `allow`.
         *
         * The primary URL is the URL of the top-level frame. The secondary URL is not used.
         */
        const javascript: ContentSetting<`${JavascriptContentSetting}`>;

        /**
         * Whether to allow Geolocation. One of
         *
         * `allow`: Allow sites to track your physical location,
         *
         * `block`: Don't allow sites to track your physical location,
         *
         * `ask`: Ask before allowing sites to track your physical location.
         *
         * Default is `ask`.
         *
         * The primary URL is the URL of the document which requested location data. The secondary URL is the URL of the top-level frame (which may or may not differ from the requesting URL).
         */
        const location: ContentSetting<`${LocationContentSetting}`>;

        /**
         * Whether to allow sites to access the microphone. One of
         *
         * `allow`: Allow sites to access the microphone,
         *
         * `block`: Don't allow sites to access the microphone,
         *
         * `ask`: Ask when a site wants to access the microphone.
         *
         * Default is `ask`.
         *
         * The primary URL is the URL of the document which requested microphone access. The secondary URL is not used. NOTE: The 'allow' setting is not valid if both patterns are '<all\_urls>'.
         * @since Chrome 46
         */
        const microphone: ContentSetting<`${MicrophoneContentSetting}`>;

        /** @deprecated No longer has any effect. Mouse lock permission is now automatically granted for all sites. Value is always `allow`. */
        const mouselock: ContentSetting<`${MouselockContentSetting}`>;

        /**
         * Whether to allow sites to show desktop notifications. One of
         *
         * `allow`: Allow sites to show desktop notifications,
         *
         * `block`: Don't allow sites to show desktop notifications,
         *
         * `ask`: Ask when a site wants to show desktop notifications.
         *
         * Default is `ask`.
         *
         * The primary URL is the URL of the document which wants to show the notification. The secondary URL is not used.
         */
        const notifications: ContentSetting<`${NotificationsContentSetting}`>;

        /** @deprecated With Flash support removed in Chrome 88, this permission no longer has any effect. Value is always `block`. Calls to `set()` and `clear()` will be ignored. */
        const plugins: ContentSetting<`${PluginsContentSetting}`>;

        /**
         * Whether to allow sites to show pop-ups. One of
         *
         * `allow`: Allow sites to show pop-ups,
         *
         * `block`: Don't allow sites to show pop-ups.
         *
         * Default is `block`.
         *
         * The primary URL is the URL of the top-level frame. The secondary URL is not used.
         */
        const popups: ContentSetting<`${PopupsContentSetting}`>;

        /** @deprecated Previously, controlled whether to allow sites to run plugins unsandboxed, however, with the Flash broker process removed in Chrome 88, this permission no longer has any effect. Value is always `block`. Calls to `set()` and `clear()` will be ignored. */
        const unsandboxedPlugins: ContentSetting<`${PpapiBrokerContentSetting}`>;
    }
}

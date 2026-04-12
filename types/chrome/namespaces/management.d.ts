declare namespace chrome {
    ////////////////////
    // Management
    ////////////////////
    /**
     * The `chrome.management` API provides ways to manage installed apps and extensions.
     *
     * Permissions: "management"
     */
    namespace management {
        /**
         * A reason the item is disabled.
         * @since Chrome 44
         */
        enum ExtensionDisabledReason {
            UNKNOWN = "unknown",
            PERMISSIONS_INCREASE = "permissions_increase",
        }

        /** Information about an installed extension, app, or theme. */
        interface ExtensionInfo {
            /** A reason the item is disabled. */
            disabledReason?: `${ExtensionDisabledReason}`;
            /** The launch url (only present for apps). */
            appLaunchUrl?: string;
            /** The description of this extension, app, or theme. */
            description: string;
            /** Returns a list of API based permissions. */
            permissions: string[];
            /** A list of icon information. Note that this just reflects what was declared in the manifest, and the actual image at that url may be larger or smaller than what was declared, so you might consider using explicit width and height attributes on img tags referencing these images. See the manifest documentation on icons for more details. */
            icons?: IconInfo[];
            /** Returns a list of host based permissions. */
            hostPermissions: string[];
            /** Whether it is currently enabled or disabled. */
            enabled: boolean;
            /** The URL of the homepage of this extension, app, or theme. */
            homepageUrl?: string;
            /** Whether this extension can be disabled or uninstalled by the user. */
            mayDisable: boolean;
            /**
             * Whether this extension can be enabled by the user. This is only returned for extensions which are not enabled.
             * @since Chrome 62
             */
            mayEnable?: boolean;
            /** How the extension was installed. */
            installType: `${ExtensionInstallType}`;
            /** The version of this extension, app, or theme. */
            version: string;
            /**
             * The version name of this extension, app, or theme if the manifest specified one.
             * @since Chrome 50
             */
            versionName?: string;
            /** The extension's unique identifier. */
            id: string;
            /** Whether the extension, app, or theme declares that it supports offline. */
            offlineEnabled: boolean;
            /** The update URL of this extension, app, or theme. */
            updateUrl?: string;
            /** The type of this extension, app, or theme. */
            type: `${ExtensionType}`;
            /** The url for the item's options page, if it has one. */
            optionsUrl: string;
            /** The name of this extension, app, or theme. */
            name: string;
            /** A short version of the name of this extension, app, or theme. */
            shortName: string;
            /**
             * True if this is an app.
             * @deprecated since Chrome 33. Please use {@link management.ExtensionInfo.type}.
             */
            isApp: boolean;
            /** The app launch type (only present for apps). */
            launchType?: `${LaunchType}`;
            /** The currently available launch types (only present for apps). */
            availableLaunchTypes?: `${LaunchType}`[];
        }

        /**
         * How the extension was installed
         * @since Chrome 44
         */
        enum ExtensionInstallType {
            /** The extension was installed because of an administrative policy. */
            ADMIN = "admin",
            /** The extension was loaded unpacked in developer mode. */
            DEVELOPMENT = "development",
            /** The extension was installed normally via a .crx file. */
            NORMAL = "normal",
            /** The extension was installed by other software on the machine. */
            SIDELOAD = "sideload",
            /** The extension was installed by other means. */
            OTHER = "other",
        }

        /**
         * The type of this extension, app, or theme.
         * @since Chrome 44
         */
        enum ExtensionType {
            EXTENSION = "extension",
            HOSTED_APP = "hosted_app",
            PACKAGE_APP = "package_app",
            LEGACY_PACKAGED_APP = "legacy_packaged_app",
            THEME = "theme",
            LOGIN_SCREEN_EXTENSION = "login_screen_extension",
        }

        /** Information about an icon belonging to an extension, app, or theme. */
        interface IconInfo {
            /** The URL for this icon image. To display a grayscale version of the icon (to indicate that an extension is disabled, for example), append `?grayscale=true` to the URL. */
            url: string;
            /** A number representing the width and height of the icon. Likely values include (but are not limited to) 128, 48, 24, and 16. */
            size: number;
        }

        /** These are all possible app launch types. */
        enum LaunchType {
            OPEN_AS_REGULAR_TAB = "OPEN_AS_REGULAR_TAB",
            OPEN_AS_PINNED_TAB = "OPEN_AS_PINNED_TAB",
            OPEN_AS_WINDOW = "OPEN_AS_WINDOW",
            OPEN_FULL_SCREEN = "OPEN_FULL_SCREEN",
        }

        /**
         * Options for how to handle the extension's uninstallation.
         * @since Chrome 88
         */
        interface UninstallOptions {
            /** Whether or not a confirm-uninstall dialog should prompt the user. Defaults to false for self uninstalls. If an extension uninstalls another extension, this parameter is ignored and the dialog is always shown. */
            showConfirmDialog?: boolean | undefined;
        }

        /**
         * Enables or disables an app or extension. In most cases this function must be called in the context of a user gesture (e.g. an onclick handler for a button), and may present the user with a native confirmation UI as a way of preventing abuse.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param id This should be the id from an item of {@link management.ExtensionInfo}.
         * @param enabled Whether this item should be enabled or disabled.
         */
        function setEnabled(id: string, enabled: boolean): Promise<void>;
        function setEnabled(id: string, enabled: boolean, callback: () => void): void;

        /**
         * Returns a list of permission warnings for the given extension id.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param id The ID of an already installed extension.
         */
        function getPermissionWarningsById(id: string): Promise<string[]>;
        function getPermissionWarningsById(id: string, callback: (permissionWarnings: string[]) => void): void;

        /**
         * Returns information about the installed extension, app, or theme that has the given ID.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param id The ID from an item of {@link management.ExtensionInfo}.
         */
        function get(id: string): Promise<ExtensionInfo>;
        function get(id: string, callback: (result: ExtensionInfo) => void): void;

        /**
         * Returns a list of information about installed extensions and apps.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function getAll(): Promise<ExtensionInfo[]>;
        function getAll(callback: (result: ExtensionInfo[]) => void): void;

        /**
         * Returns a list of permission warnings for the given extension manifest string. Note: This function can be used without requesting the 'management' permission in the manifest.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param manifestStr Extension manifest JSON string.
         */
        function getPermissionWarningsByManifest(manifestStr: string): Promise<string[]>;
        function getPermissionWarningsByManifest(
            manifestStr: string,
            callback: (permissionWarnings: string[]) => void,
        ): void;

        /**
         * Launches an application.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param id The extension id of the application.
         */
        function launchApp(id: string): Promise<void>;
        function launchApp(id: string, callback: () => void): void;

        /**
         * Uninstalls a currently installed app or extension. Note: This function does not work in managed environments when the user is not allowed to uninstall the specified extension/app. If the uninstall fails (e.g. the user cancels the dialog) the promise will be rejected or the callback will be called with {@link runtime.lastError} set.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param id This should be the id from an item of {@link management.ExtensionInfo}.
         */
        function uninstall(id: string, options?: UninstallOptions): Promise<void>;
        function uninstall(id: string, callback: () => void): void;
        function uninstall(id: string, options: UninstallOptions | undefined, callback: () => void): void;

        /**
         * Returns information about the calling extension, app, or theme. Note: This function can be used without requesting the 'management' permission in the manifest.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function getSelf(): Promise<ExtensionInfo>;
        function getSelf(callback: (result: ExtensionInfo) => void): void;

        /**
         * Launches the replacement_web_app specified in the manifest. Prompts the user to install if not already installed.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @since Chrome 77
         */
        function installReplacementWebApp(): Promise<void>;
        function installReplacementWebApp(callback: () => void): void;

        /**
         * Uninstalls the calling extension. Note: This function can be used without requesting the 'management' permission in the manifest. This function does not work in managed environments when the user is not allowed to uninstall the specified extension/app.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function uninstallSelf(options?: UninstallOptions): Promise<void>;
        function uninstallSelf(callback: () => void): void;
        function uninstallSelf(options: UninstallOptions | undefined, callback: () => void): void;

        /**
         * Display options to create shortcuts for an app. On Mac, only packaged app shortcuts can be created.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param id This should be the id from an app item of {@link management.ExtensionInfo}.
         */
        function createAppShortcut(id: string): Promise<void>;
        function createAppShortcut(id: string, callback: () => void): void;

        /**
         * Set the launch type of an app.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param id This should be the id from an app item of {@link management.ExtensionInfo}.
         * @param launchType The target launch type. Always check and make sure this launch type is in {@link ExtensionInfo.availableLaunchTypes}, because the available launch types vary on different platforms and configurations.
         */
        function setLaunchType(id: string, launchType: `${LaunchType}`): Promise<void>;
        function setLaunchType(id: string, launchType: `${LaunchType}`, callback: () => void): void;

        /**
         * Generate an app for a URL. Returns the generated bookmark app.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param url The URL of a web page. The scheme of the URL can only be "http" or "https".
         * @param title The title of the generated app.
         */
        function generateAppForLink(url: string, title: string): Promise<ExtensionInfo>;
        function generateAppForLink(url: string, title: string, callback: (result: ExtensionInfo) => void): void;

        /** Fired when an app or extension has been disabled. */
        const onDisabled: events.Event<(info: ExtensionInfo) => void>;

        /** Fired when an app or extension has been uninstalled. */
        const onUninstalled: events.Event<(id: string) => void>;

        /** Fired when an app or extension has been installed. */
        const onInstalled: events.Event<(info: ExtensionInfo) => void>;

        /** Fired when an app or extension has been enabled. */
        const onEnabled: events.Event<(info: ExtensionInfo) => void>;
    }
}

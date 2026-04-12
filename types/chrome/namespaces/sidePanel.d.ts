declare namespace chrome {
    ////////////////////
    // SidePanel
    ////////////////////
    /**
     * Use the `chrome.sidePanel` API to host content in the browser's side panel alongside the main content of a webpage.
     *
     * Permissions: "sidePanel"
     * @since Chrome 114, MV3
     */
    namespace sidePanel {
        /** @since Chrome 141 */
        type CloseOptions =
            | {
                /** The tab in which to close the side panel. If a tab-specific side panel is open in the specified tab, it will be closed for that tab. At least one of this or `windowId` must be provided.  */
                tabId: number;
                /** The window in which to close the side panel. If a global side panel is open in the specified window, it will be closed for all tabs in that window where no tab-specific panel is active. At least one of this or `tabId` must be provided. */
                windowId?: number | undefined;
            }
            | {
                /** The tab in which to close the side panel. If a tab-specific side panel is open in the specified tab, it will be closed for that tab. At least one of this or `windowId` must be provided.  */
                tabId?: number | undefined;
                /** The window in which to close the side panel. If a global side panel is open in the specified window, it will be closed for all tabs in that window where no tab-specific panel is active. At least one of this or `tabId` must be provided. */
                windowId: number;
            };

        interface GetPanelOptions {
            /**
             * If specified, the side panel options for the given tab will be returned.
             * Otherwise, returns the default side panel options (used for any tab that doesn't have specific settings).
             */
            tabId?: number | undefined;
        }

        /** @since Chrome 116 */
        type OpenOptions =
            & {
                /**
                 * The tab in which to open the side panel.
                 * If the corresponding tab has a tab-specific side panel, the panel will only be open for that tab.
                 * If there is not a tab-specific panel, the global panel will be open in the specified tab and any other tabs without a currently-open tab- specific panel.
                 * This will override any currently-active side panel (global or tab-specific) in the corresponding tab.
                 * At least one of this and `windowId` must be provided. */
                tabId?: number | undefined;
                /**
                 * The window in which to open the side panel.
                 * This is only applicable if the extension has a global (non-tab-specific) side panel or `tabId` is also specified.
                 * This will override any currently-active global side panel the user has open in the given window.
                 * At least one of this and `tabId` must be provided.
                 */
                windowId?: number | undefined;
            }
            & ({
                tabId: number;
            } | {
                windowId: number;
            });

        interface PanelBehavior {
            /** Whether clicking the extension's icon will toggle showing the extension's entry in the side panel. Defaults to false. */
            openPanelOnActionClick?: boolean | undefined;
        }

        /** @since Chrome 142 */
        interface PanelClosedInfo {
            /** The path of the local resource within the extension package whose content is displayed in the panel. */
            path: string;
            /** The optional ID of the tab where the side panel was closed. This is provided only when the panel is tab-specific. */
            tabId?: number;
            /** The ID of the window where the side panel was closed. This is available for both global and tab-specific panels. */
            windowId: number;
        }

        /** @since Chrome 140 */
        interface PanelLayout {
            side: `${Side}`;
        }

        /** @since Chrome 141 */
        interface PanelOpenedInfo {
            /** The path of the local resource within the extension package whose content is displayed in the panel. */
            path: string;
            /** The optional ID of the tab where the side panel is opened. This is provided only when the panel is tab-specific. */
            tabId?: number;
            /** The ID of the window where the side panel is opened. This is available for both global and tab-specific panels. */
            windowId: number;
        }

        interface PanelOptions {
            /** Whether the side panel should be enabled. This is optional. The default value is true. */
            enabled?: boolean | undefined;
            /** The path to the side panel HTML file to use. This must be a local resource within the extension package. */
            path?: string | undefined;
            /**
             * If specified, the side panel options will only apply to the tab with this id.
             * If omitted, these options set the default behavior (used for any tab that doesn't have specific settings).
             * Note: if the same path is set for this tabId and the default tabId, then the panel for this tabId will be a different instance than the panel for the default tabId.
             */
            tabId?: number | undefined;
        }

        /**
         * Defines the possible alignment for the side panel in the browser UI.
         * @since Chrome 140
         */
        enum Side {
            LEFT = "left",
            RIGHT = "right",
        }

        interface SidePanel {
            /** Developer specified path for side panel display. */
            default_path: string;
        }

        /**
         * Closes the extension's side panel. This is a no-op if the panel is already closed.
         * @param options Specifies the context in which to close the side panel.
         * @since Chrome 141
         */
        function close(options: CloseOptions): Promise<void>;
        function close(options: CloseOptions, callback: () => void): void;

        /**
         * Returns the side panel's current layout.
         * @since Chrome 140
         */
        function getLayout(): Promise<PanelLayout>;
        function getLayout(callback: (layout: PanelLayout) => void): void;

        /**
         * Returns the active panel configuration.
         *
         * Can return its result via Promise.
         * @param options Specifies the context to return the configuration for.
         */
        function getOptions(options: GetPanelOptions): Promise<PanelOptions>;
        function getOptions(options: GetPanelOptions, callback: (options: PanelOptions) => void): void;

        /**
         * Returns the extension's current side panel behavior.
         *
         * Can return its result via Promise.
         */
        function getPanelBehavior(): Promise<PanelBehavior>;
        function getPanelBehavior(callback: (behavior: PanelBehavior) => void): void;

        /**
         * Opens the side panel for the extension. This may only be called in response to a user action.
         *
         * Can return its result via Promise.
         * @param options Specifies the context in which to open the side panel.
         * @since Chrome 116
         */
        function open(options: OpenOptions): Promise<void>;
        function open(options: OpenOptions, callback: () => void): void;

        /**
         * Configures the side panel.
         *
         * Can return its result via Promise.
         * @param options The configuration options to apply to the panel.
         */
        function setOptions(options: PanelOptions): Promise<void>;
        function setOptions(options: PanelOptions, callback: () => void): void;

        /**
         * Configures the extension's side panel behavior. This is an upsert operation.
         *
         * Can return its result via Promise.
         * @param behavior The new behavior to be set.
         */
        function setPanelBehavior(behavior: PanelBehavior): Promise<void>;
        function setPanelBehavior(behavior: PanelBehavior, callback: () => void): void;

        /**
         * Fired when the extension's side panel is closed.
         * @since Chrome 142
         */
        const onClosed: events.Event<(info: PanelClosedInfo) => void>;

        /**
         * Fired when the extension's side panel is opened.
         * @since Chrome 141
         */
        const onOpened: events.Event<(info: PanelOpenedInfo) => void>;
    }
}

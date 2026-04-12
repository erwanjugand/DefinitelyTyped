declare namespace chrome {
    ////////////////////
    // Dev Tools - Panels
    ////////////////////
    /**
     * Use the `chrome.devtools.panels` API to integrate your extension into Developer Tools window UI: create your own panels, access existing panels, and add sidebars.
     *
     * Manifest: "devtools_page"
     */
    namespace devtools.panels {
        /** Represents a panel created by an extension. */
        interface ExtensionPanel {
            /**
             * Appends a button to the status bar of the panel.
             * @param iconPath Path to the icon of the button. The file should contain a 64x24-pixel image composed of two 32x24 icons. The left icon is used when the button is inactive; the right icon is displayed when the button is pressed.
             * @param tooltipText Text shown as a tooltip when user hovers the mouse over the button.
             * @param disabled Whether the button is disabled.
             */
            createStatusBarButton(iconPath: string, tooltipText: string, disabled: boolean): Button;
            /** Fired when the user switches to the panel. */
            onShown: events.Event<(window: Window) => void>;
            /** Fired when the user switches away from the panel. */
            onHidden: events.Event<() => void>;
            /** Fired upon a search action (start of a new search, search result navigation, or search being canceled). */
            onSearch: events.Event<(action: string, queryString?: string) => void>;
            /**
             * Shows the panel by activating the corresponding tab.
             * @since Chrome 140
             */
            show(): void;
        }

        /** A button created by the extension. */
        interface Button {
            /**
             * Updates the attributes of the button. If some of the arguments are omitted or null, the corresponding attributes are not updated.
             * @param iconPath Path to the new icon of the button.
             * @param tooltipText Text shown as a tooltip when user hovers the mouse over the button.
             * @param disabled Whether the button is disabled.
             */
            update(iconPath?: string | null, tooltipText?: string | null, disabled?: boolean | null): void;
            /** Fired when the button is clicked. */
            onClicked: events.Event<() => void>;
        }

        /** Represents the Elements panel. */
        interface ElementsPanel {
            /**
             * Creates a pane within panel's sidebar.
             * @param title Text that is displayed in sidebar caption.
             */
            createSidebarPane(
                title: string,
                callback?: (
                    /** An ExtensionSidebarPane object for created sidebar pane. */
                    result: ExtensionSidebarPane,
                ) => void,
            ): void;
            /** Fired when an object is selected in the panel. */
            onSelectionChanged: events.Event<() => void>;
        }

        /** Represents the Sources panel. */
        interface SourcesPanel {
            /**
             * Creates a pane within panel's sidebar.
             * @param title Text that is displayed in sidebar caption.
             */
            createSidebarPane(
                title: string,
                callback?: (
                    /** An ExtensionSidebarPane object for created sidebar pane. */
                    result: ExtensionSidebarPane,
                ) => void,
            ): void;
            /** Fired when an object is selected in the panel. */
            onSelectionChanged: events.Event<() => void>;
        }

        /** A sidebar created by the extension. */
        interface ExtensionSidebarPane {
            /**
             * Sets the height of the sidebar.
             * @param height A CSS-like size specification, such as `100px` or `12ex`.
             */
            setHeight(height: string): void;
            /**
             * Sets an expression that is evaluated within the inspected page. The result is displayed in the sidebar pane.
             * @param expression An expression to be evaluated in context of the inspected page. JavaScript objects and DOM nodes are displayed in an expandable tree similar to the console/watch.
             * @param rootTitle An optional title for the root of the expression tree.
             */
            setExpression(expression: string, callback?: () => void): void;
            setExpression(expression: string, rootTitle: string | undefined, callback?: () => void): void;
            /**
             * Sets a JSON-compliant object to be displayed in the sidebar pane.
             * @param jsonObject An object to be displayed in context of the inspected page. Evaluated in the context of the caller (API client).
             * @param rootTitle An optional title for the root of the expression tree.
             */
            setObject(jsonObject: { [key: string]: unknown }, callback?: () => void): void;
            setObject(
                jsonObject: { [key: string]: unknown },
                rootTitle: string | undefined,
                callback?: () => void,
            ): void;
            /**
             * Sets an HTML page to be displayed in the sidebar pane.
             * @param path Relative path of an extension page to display within the sidebar.
             */
            setPage(path: string): void;
            /** Fired when the sidebar pane becomes visible as a result of user switching to the panel that hosts it. */
            onShown: events.Event<(window: Window) => void>;
            /** Fired when the sidebar pane becomes hidden as a result of the user switching away from the panel that hosts the sidebar pane. */
            onHidden: events.Event<() => void>;
        }

        /**
         * Theme used by DevTools.
         * @since Chrome 99
         */
        type Theme = "default" | "dark";

        /** Elements panel. */
        const elements: ElementsPanel;

        /** Sources panel. */
        const sources: SourcesPanel;

        /**
         * Creates an extension panel.
         * @param title Title that is displayed next to the extension icon in the Developer Tools toolbar.
         * @param iconPath Path of the panel's icon relative to the extension directory.
         * @param pagePath Path of the panel's HTML page relative to the extension directory.
         */
        function create(
            title: string,
            iconPath: string,
            pagePath: string,
            callback?: (
                /** An ExtensionPanel object representing the created panel. */
                panel: ExtensionPanel,
            ) => void,
        ): void;

        /** Specifies the function to be called when the user clicks a resource link in the Developer Tools window. To unset the handler, either call the method with no parameters or pass null as the parameter. */
        function setOpenResourceHandler(
            callback?: (
                /** A {@link devtools.inspectedWindow.Resource} object for the resource that was clicked. */
                resource: chrome.devtools.inspectedWindow.Resource,
                /** Specifies the line number within the resource that was clicked. */
                lineNumber: number,
            ) => void,
        ): void;

        /**
         * Specifies the function to be called when the current theme changes in DevTools. To unset the handler, either call the method with no parameters or pass `null` as the parameter.
         * @since Chrome 99
         */
        function setThemeChangeHandler(callback?: (theme: Theme) => void): void;

        /**
         * Requests DevTools to open a URL in a Developer Tools panel.
         * @param url The URL of the resource to open.
         * @param lineNumber Specifies the line number to scroll to when the resource is loaded.
         * @param columnNumber Specifies the column number to scroll to when the resource is loaded.
         */
        function openResource(url: string, lineNumber: number, callback?: () => void): void;
        function openResource(
            url: string,
            lineNumber: number,
            columnNumber: number | undefined,
            callback?: () => void,
        ): void;

        /**
         * The name of the color theme set in user's DevTools settings.
         * @since Chrome 59
         */
        const themeName: Theme;
    }
}

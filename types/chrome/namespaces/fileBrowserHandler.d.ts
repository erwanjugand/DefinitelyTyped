declare namespace chrome {
    ////////////////////
    // File Browser Handler
    ////////////////////
    /**
     * Use the `chrome.fileBrowserHandler` API to extend the Chrome OS file browser. For example, you can use this API to enable users to upload files to your website.
     *
     * Permissions: "fileBrowserHandler"
     * @platform ChromeOS only
     */
    namespace fileBrowserHandler {
        /** Event details payload for fileBrowserHandler.onExecute event. */
        interface FileHandlerExecuteEventDetails {
            /** The ID of the tab that raised this event. Tab IDs are unique within a browser session. */
            tab_id?: number;
            /** Array of Entry instances representing files that are targets of this action (selected in ChromeOS file browser). */
            entries: any[];
        }

        /** Fired when file system action is executed from ChromeOS file browser. */
        const onExecute: events.Event<(id: string, details: FileHandlerExecuteEventDetails) => void>;
    }
}

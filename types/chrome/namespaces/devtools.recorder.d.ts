declare namespace chrome {
    ////////////////////
    // Dev Tools - Recorder
    ////////////////////
    /**
     * Use the `chrome.devtools.recorder` API to customize the Recorder panel in DevTools.
     * @since Chrome 105
     */
    namespace devtools.recorder {
        /** A plugin interface that the Recorder panel invokes to customize the Recorder panel. */
        interface RecorderExtensionPlugin {
            /**
             * Allows the extension to implement custom replay functionality.
             *
             * @param recording A recording of the user interaction with the page. This should match [Puppeteer's recording schema](https://github.com/puppeteer/replay/blob/main/docs/api/interfaces/Schema.UserFlow.md).
             * @since Chrome 112
             */
            replay?(recording: { [key: string]: unknown }): void;

            /**
             * Converts a recording from the Recorder panel format into a string.
             * @param recording A recording of the user interaction with the page. This should match [Puppeteer's recording schema](https://github.com/puppeteer/replay/blob/main/docs/api/interfaces/Schema.UserFlow.md).
             */
            stringify?(recording: { [key: string]: unknown }): void;

            /**
             * Converts a step of the recording from the Recorder panel format into a string.
             * @param step A step of the recording of a user interaction with the page. This should match [Puppeteer's step schema](https://github.com/puppeteer/replay/blob/main/docs/api/modules/Schema.md#step).
             */
            stringifyStep?(step: { [key: string]: unknown }): void;
        }

        /**
         * Represents a view created by extension to be embedded inside the Recorder panel.
         * @since Chrome 112
         */
        interface RecorderView {
            /** Fired when the view is hidden. */
            onHidden: events.Event<() => void>;
            /** Fired when the view is shown. */
            onShown: events.Event<() => void>;
            /** Indicates that the extension wants to show this view in the Recorder panel. */
            show(): void;
        }

        /**
         * Creates a view that can handle the replay. This view will be embedded inside the Recorder panel.
         * @param title Title that is displayed next to the extension icon in the Developer Tools toolbar.
         * @param pagePath Path of the panel's HTML page relative to the extension directory.
         * @since Chrome 112
         */
        function createView(title: string, pagePath: string): RecorderView;

        /**
         * Registers a Recorder extension plugin.
         * @param plugin An instance implementing the RecorderExtensionPlugin interface.
         * @param name The name of the plugin.
         * @param mediaType The media type of the string content that the plugin produces.
         */
        function registerRecorderExtensionPlugin(
            plugin: RecorderExtensionPlugin,
            name: string,
            mediaType: string,
        ): void;
    }
}

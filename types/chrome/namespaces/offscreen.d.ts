declare namespace chrome {
    ////////////////////
    // Offscreen
    ////////////////////
    /**
     * Use the `offscreen` API to create and manage offscreen documents.
     *
     * Permissions: "offscreen"
     * @since Chrome 109, MV3
     */
    namespace offscreen {
        /** The reason(s) the extension is creating the offscreen document. */
        enum Reason {
            /** A reason used for testing purposes only. */
            TESTING = "TESTING",
            /** Specifies that the offscreen document is responsible for playing audio. */
            AUDIO_PLAYBACK = "AUDIO_PLAYBACK",
            /** Specifies that the offscreen document needs to embed and script an iframe in order to modify the iframe's content. */
            IFRAME_SCRIPTING = "IFRAME_SCRIPTING",
            /** Specifies that the offscreen document needs to embed an iframe and scrape its DOM to extract information. */
            DOM_SCRAPING = "DOM_SCRAPING",
            /** Specifies that the offscreen document needs to interact with Blob objects (including `URL.createObjectURL()`). */
            BLOBS = "BLOBS",
            /** Specifies that the offscreen document needs to use the DOMParser API. */
            DOM_PARSER = "DOM_PARSER",
            /** Specifies that the offscreen document needs to interact with media streams from user media (e.g. `getUserMedia()`). */
            USER_MEDIA = "USER_MEDIA",
            /** Specifies that the offscreen document needs to interact with media streams from display media (e.g. `getDisplayMedia()`). */
            DISPLAY_MEDIA = "DISPLAY_MEDIA",
            /** Specifies that the offscreen document needs to use WebRTC APIs. */
            WEB_RTC = "WEB_RTC",
            /** Specifies that the offscreen document needs to interact with the Clipboard API. */
            CLIPBOARD = "CLIPBOARD",
            /** Specifies that the offscreen document needs access to localStorage. */
            LOCAL_STORAGE = "LOCAL_STORAGE",
            /** Specifies that the offscreen document needs to spawn workers. */
            WORKERS = "WORKERS",
            /** Specifies that the offscreen document needs to use navigator.getBattery. */
            BATTERY_STATUS = "BATTERY_STATUS",
            /** Specifies that the offscreen document needs to use window.matchMedia. */
            MATCH_MEDIA = "MATCH_MEDIA",
            /** Specifies that the offscreen document needs to use navigator.geolocation. */
            GEOLOCATION = "GEOLOCATION",
        }

        interface CreateParameters {
            /** The reason(s) the extension is creating the offscreen document. */
            reasons: `${Reason}`[];
            /** The (relative) URL to load in the document. */
            url: string;
            /** A developer-provided string that explains, in more detail, the need for the background context. The user agent _may_ use this in display to the user. */
            justification: string;
        }

        /**
         * Creates a new offscreen document for the extension.
         * @param parameters The parameters describing the offscreen document to create.
         *
         * Can return its result via Promise in Manifest V3.
         */
        function createDocument(parameters: CreateParameters): Promise<void>;
        function createDocument(parameters: CreateParameters, callback: () => void): void;

        /**
         * Closes the currently-open offscreen document for the extension.
         *
         * Can return its result via Promise in Manifest V3.
         */
        function closeDocument(): Promise<void>;
        function closeDocument(callback: () => void): void;

        /**
         * Determines whether the extension has an active document.
         *
         * Can return its result via Promise in Manifest V3.
         */
        function hasDocument(): Promise<boolean>;
        function hasDocument(callback: (result: boolean) => void): void;
    }
}

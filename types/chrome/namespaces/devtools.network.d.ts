/// <reference path="../har-format/index.d.ts" />

declare namespace chrome {
    ////////////////////
    // Dev Tools - Network
    ////////////////////
    /**
     * Use the `chrome.devtools.network` API to retrieve the information about network requests displayed by the Developer Tools in the Network panel.
     *
     * Manifest: "devtools_page"
     */
    namespace devtools.network {
        /** Represents a network request for a document resource (script, image and so on). See HAR Specification for reference. */
        interface Request extends HARFormatEntry {
            /** Returns content of the response body. */
            getContent(
                callback: (
                    /** Content of the response body (potentially encoded). */
                    content: string,
                    /** Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported. */
                    encoding: string,
                ) => void,
            ): void;
        }

        /** Returns HAR log that contains all known network requests. */
        function getHAR(
            callback: (
                /** A HAR log. See HAR specification for details. */
                harLog: HARFormatLog,
            ) => void,
        ): void;

        /** Fired when a network request is finished and all request data are available. */
        const onRequestFinished: events.Event<(request: Request) => void>;

        /** Fired when the inspected window navigates to a new page. */
        const onNavigated: events.Event<(url: string) => void>;
    }
}

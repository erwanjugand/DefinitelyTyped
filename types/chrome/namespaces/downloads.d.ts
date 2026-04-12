declare namespace chrome {
    ////////////////////
    // Downloads
    ////////////////////
    /**
     * Use the `chrome.downloads` API to programmatically initiate, monitor, manipulate, and search for downloads.
     *
     * Permissions: "downloads"
     */
    namespace downloads {
        interface HeaderNameValuePair {
            /** Name of the HTTP header. */
            name: string;
            /** Value of the HTTP header. */
            value: string;
        }

        enum FilenameConflictAction {
            /** To avoid duplication, the filename is changed to include a counter before the filename extension. */
            UNIQUIFY = "uniquify",
            /** The existing file will be overwritten with the new file. */
            OVERWRITE = "overwrite",
            /** The user will be prompted with a file chooser dialog. */
            PROMPT = "prompt",
        }

        enum HttpMethod {
            GET = "GET",
            POST = "POST",
        }

        interface DownloadOptions {
            /** Post body. */
            body?: string | undefined;
            /** Use a file-chooser to allow the user to select a filename regardless of whether `filename` is set or already exists. */
            saveAs?: boolean | undefined;
            /** The URL to download. */
            url: string;
            /** A file path relative to the Downloads directory to contain the downloaded file, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references ".." will cause an error. {@link onDeterminingFilename} allows suggesting a filename after the file's MIME type and a tentative filename have been determined. */
            filename?: string | undefined;
            /** Extra HTTP headers to send with the request if the URL uses the HTTP[s] protocol. Each header is represented as a dictionary containing the keys `name` and either `value` or `binaryValue`, restricted to those allowed by XMLHttpRequest. */
            headers?: HeaderNameValuePair[] | undefined;
            /** The HTTP method to use if the URL uses the HTTP[S] protocol. */
            method?: `${HttpMethod}` | undefined;
            /** The action to take if `filename` already exists. */
            conflictAction?: `${FilenameConflictAction}` | undefined;
        }

        interface DownloadDelta {
            /** The id of the {@link DownloadItem} that changed. */
            id: number;
            /** The change in `danger`, if any. */
            danger?: StringDelta | undefined;
            /** The change in `url`, if any. */
            url?: StringDelta | undefined;
            /**
             * The change in `finalUrl`, if any.
             * @since Chrome 54
             */
            finalUrl?: StringDelta | undefined;
            /** The change in `totalBytes`, if any. */
            totalBytes?: DoubleDelta | undefined;
            /** The change in `filename`, if any. */
            filename?: StringDelta | undefined;
            /** The change in `paused`, if any. */
            paused?: BooleanDelta | undefined;
            /** The change in `state`, if any. */
            state?: StringDelta | undefined;
            /** The change in `mime`, if any. */
            mime?: StringDelta | undefined;
            /** The change in `fileSize`, if any. */
            fileSize?: DoubleDelta | undefined;
            /** The change in `startTime`, if any. */
            startTime?: StringDelta | undefined;
            /** The change in `error`, if any. */
            error?: StringDelta | undefined;
            /** The change in `endTime`, if any. */
            endTime?: StringDelta | undefined;
            /** The change in `canResume`, if any. */
            canResume?: BooleanDelta | undefined;
            /** The change in `exists`, if any. */
            exists?: BooleanDelta | undefined;
        }

        interface BooleanDelta {
            current?: boolean | undefined;
            previous?: boolean | undefined;
        }

        interface DoubleDelta {
            current?: number | undefined;
            previous?: number | undefined;
        }

        interface StringDelta {
            current?: string | undefined;
            previous?: string | undefined;
        }

        enum InterruptReason {
            FILE_FAILED = "FILE_FAILED",
            FILE_ACCESS_DENIED = "FILE_ACCESS_DENIED",
            FILE_NO_SPACE = "FILE_NO_SPACE",
            FILE_NAME_TOO_LONG = "FILE_NAME_TOO_LONG",
            FILE_TOO_LARGE = "FILE_TOO_LARGE",
            FILE_VIRUS_INFECTED = "FILE_VIRUS_INFECTED",
            FILE_TRANSIENT_ERROR = "FILE_TRANSIENT_ERROR",
            FILE_BLOCKED = "FILE_BLOCKED",
            FILE_SECURITY_CHECK_FAILED = "FILE_SECURITY_CHECK_FAILED",
            FILE_TOO_SHORT = "FILE_TOO_SHORT",
            FILE_HASH_MISMATCH = "FILE_HASH_MISMATCH",
            FILE_SAME_AS_SOURCE = "FILE_SAME_AS_SOURCE",
            NETWORK_FAILED = "NETWORK_FAILED",
            NETWORK_TIMEOUT = "NETWORK_TIMEOUT",
            NETWORK_DISCONNECTED = "NETWORK_DISCONNECTED",
            NETWORK_SERVER_DOWN = "NETWORK_SERVER_DOWN",
            NETWORK_INVALID_REQUEST = "NETWORK_INVALID_REQUEST",
            SERVER_FAILED = "SERVER_FAILED",
            SERVER_NO_RANGE = "SERVER_NO_RANGE",
            SERVER_BAD_CONTENT = "SERVER_BAD_CONTENT",
            SERVER_UNAUTHORIZED = "SERVER_UNAUTHORIZED",
            SERVER_CERT_PROBLEM = "SERVER_CERT_PROBLEM",
            SERVER_FORBIDDEN = "SERVER_FORBIDDEN",
            SERVER_UNREACHABLE = "SERVER_UNREACHABLE",
            SERVER_CONTENT_LENGTH_MISMATCH = "SERVER_CONTENT_LENGTH_MISMATCH",
            SERVER_CROSS_ORIGIN_REDIRECT = "SERVER_CROSS_ORIGIN_REDIRECT",
            USER_CANCELED = "USER_CANCELED",
            USER_SHUTDOWN = "USER_SHUTDOWN",
            CRASH = "CRASH",
        }

        enum State {
            /** The download is currently receiving data from the server. */
            IN_PROGRESS = "in_progress",
            /** An error broke the connection with the file host. */
            INTERRUPTED = "interrupted",
            /** The download completed successfully. */
            COMPLETE = "complete",
        }

        enum DangerType {
            /** The download's filename is suspicious. */
            FILE = "file",
            /** The download's URL is known to be malicious. */
            URL = "url",
            /** The downloaded file is known to be malicious. */
            CONTENT = "content",
            /** The download's URL is not commonly downloaded and could be dangerous. */
            UNCOMMON = "uncommon",
            /** The download came from a host known to distribute malicious binaries and is likely dangerous. */
            HOST = "host",
            /** The download is potentially unwanted or unsafe. E.g. it could make changes to browser or computer settings. */
            UNWANTED = "unwanted",
            /** The download presents no known danger to the user's computer. */
            SAFE = "safe",
            /** The user has accepted the dangerous download. */
            ACCEPTED = "accepted",
            /** Enterprise-related values. */
            ALLOWLISTED_BY_POLICY = "allowlistedByPolicy",
            ASYNC_SCANNING = "asyncScanning",
            ASYNC_LOCAL_PASSWORD_SCANNING = "asyncLocalPasswordScanning",
            PASSWORD_PROTECTED = "passwordProtected",
            BLOCKED_TOO_LARGE = "blockedTooLarge",
            SENSITIVE_CONTENT_WARNING = "sensitiveContentWarning",
            SENSITIVE_CONTENT_BLOCK = "sensitiveContentBlock",
            DEEP_SCANNED_FAILED = "deepScannedFailed",
            DEEP_SCANNED_SAFE = "deepScannedSafe",
            DEEP_SCANNED_OPENED_DANGEROUS = "deepScannedOpenedDangerous",
            PROMPT_FOR_SCANNING = "promptForScanning",
            PROMPT_FOR_LOCAL_PASSWORD_SCANNING = "promptForLocalPasswordScanning",
            ACCOUNT_COMPROMISE = "accountCompromise",
            BLOCKED_SCAN_FAILED = "blockedScanFailed",
            /** For use by the Secure Enterprise Browser extension. When required, Chrome will block the download to disc and download the file directly to Google Drive. */
            FORCE_SAVE_TO_GDRIVE = "forceSaveToGdrive",
            /** For use by the Secure Enterprise Browser extension. When required, Chrome will block the download to disc and download the file directly to OneDrive. */
            FORCE_SAVE_TO_ONEDRIVE = "forceSaveToOnedrive",
        }

        interface DownloadItem {
            /** Number of bytes received so far from the host, without considering file compression. */
            bytesReceived: number;
            /** Indication of whether this download is thought to be safe or known to be suspicious. */
            danger: `${DangerType}`;
            /** The absolute URL that this download initiated from, before any redirects. */
            url: string;
            /**
             * The absolute URL that this download is being made from, after all redirects.
             * @since Chrome 54
             */
            finalUrl: string;
            /** Number of bytes in the whole file, without considering file compression, or -1 if unknown. */
            totalBytes: number;
            /** Absolute local path. */
            filename: string;
            /** True if the download has stopped reading data from the host, but kept the connection open. */
            paused: boolean;
            /** Indicates whether the download is progressing, interrupted, or complete. */
            state: `${State}`;
            /** The file's MIME type. */
            mime: string;
            /** Number of bytes in the whole file post-decompression, or -1 if unknown. */
            fileSize: number;
            /** The time when the download began in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){console.log(new Date(item.startTime))})})` */
            startTime: string;
            /** Why the download was interrupted. Several kinds of HTTP errors may be grouped under one of the errors beginning with `SERVER_`. Errors relating to the network begin with `NETWORK_`, errors relating to the process of writing the file to the file system begin with `FILE_`, and interruptions initiated by the user begin with `USER_`. */
            error?: `${InterruptReason}` | undefined;
            /** The time when the download ended in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.endTime) console.log(new Date(item.endTime))})})` */
            endTime?: string | undefined;
            /** An identifier that is persistent across browser sessions. */
            id: number;
            /** False if this download is recorded in the history, true if it is not recorded. */
            incognito: boolean;
            /** Absolute URL. */
            referrer: string;
            /** Estimated time when the download will complete in ISO 8601 format. May be passed directly to the Date constructor: `chrome.downloads.search({}, function(items){items.forEach(function(item){if (item.estimatedEndTime) console.log(new Date(item.estimatedEndTime))})})` */
            estimatedEndTime?: string | undefined;
            /** True if the download is in progress and paused, or else if it is interrupted and can be resumed starting from where it was interrupted. */
            canResume: boolean;
            /** Whether the downloaded file still exists. This information may be out of date because Chrome does not automatically watch for file removal. Call {@link search}() in order to trigger the check for file existence. When the existence check completes, if the file has been deleted, then an {@link onChanged} event will fire. Note that {@link search}() does not wait for the existence check to finish before returning, so results from {@link search}() may not accurately reflect the file system. Also, {@link search}() may be called as often as necessary, but will not check for file existence any more frequently than once every 10 seconds. */
            exists: boolean;
            /** The identifier for the extension that initiated this download if this download was initiated by an extension. Does not change once it is set. */
            byExtensionId?: string | undefined;
            /** The localized name of the extension that initiated this download if this download was initiated by an extension. May change if the extension changes its name or if the user changes their locale. */
            byExtensionName?: string | undefined;
        }

        interface GetFileIconOptions {
            /** The size of the returned icon. The icon will be square with dimensions size * size pixels. The default and largest size for the icon is 32x32 pixels. The only supported sizes are 16 and 32. It is an error to specify any other size. */
            size?: 16 | 32 | undefined;
        }

        interface DownloadQuery {
            /** Set elements of this array to {@link DownloadItem} properties in order to sort search results. For example, setting `orderBy=['startTime']` sorts the {@link DownloadItem} by their start time in ascending order. To specify descending order, prefix with a hyphen: '-startTime'. */
            orderBy?: string[] | undefined;
            /** Limits results to {@link DownloadItem} whose `url` matches the given regular expression. */
            urlRegex?: string | undefined;
            /** Limits results to {@link DownloadItem} that ended before the time in ISO 8601 format. */
            endedBefore?: string | undefined;
            /** Limits results to {@link DownloadItem} whose `totalBytes` is greater than the given integer. */
            totalBytesGreater?: number | undefined;
            /** Indication of whether this download is thought to be safe or known to be suspicious. */
            danger?: `${DangerType}` | undefined;
            /** Number of bytes in the whole file, without considering file compression, or -1 if unknown. */
            totalBytes?: number | undefined;
            /** True if the download has stopped reading data from the host, but kept the connection open. */
            paused?: boolean | undefined;
            /** Limits results to {@link DownloadItem} whose `filename` matches the given regular expression. */
            filenameRegex?: string | undefined;
            /**
             * The absolute URL that this download is being made from, after all redirects.
             * @since Chrome 54
             */
            finalUrl?: string;
            /**
             * Limits results to {@link DownloadItem} whose `finalUrl` matches the given regular expression.
             * @since Chrome 54
             */
            finalUrlRegex?: string;
            /** This array of search terms limits results to {@link DownloadItem} whose `filename` or `url` or `finalUrl` contain all of the search terms that do not begin with a dash '-' and none of the search terms that do begin with a dash. */
            query?: string[] | undefined;
            /** Limits results to {@link DownloadItem} whose `totalBytes` is less than the given integer. */
            totalBytesLess?: number | undefined;
            /** The `id` of the {@link DownloadItem} to query. */
            id?: number | undefined;
            /** Number of bytes received so far from the host, without considering file compression. */
            bytesReceived?: number | undefined;
            /** Limits results to {@link DownloadItem} that ended after the time in ISO 8601 format. */
            endedAfter?: string | undefined;
            /** Absolute local path. */
            filename?: string | undefined;
            /** Indicates whether the download is progressing, interrupted, or complete. */
            state?: `${State}` | undefined;
            /** Limits results to {@link DownloadItem} that started after the time in ISO 8601 format. */
            startedAfter?: string | undefined;
            /** The file's MIME type. */
            mime?: string | undefined;
            /** Number of bytes in the whole file post-decompression, or -1 if unknown. */
            fileSize?: number | undefined;
            /** The time when the download began in ISO 8601 format. */
            startTime?: string | undefined;
            /** The absolute URL that this download initiated from, before any redirects. */
            url?: string | undefined;
            /** Limits results to {@link DownloadItem} that started before the time in ISO 8601 format. */
            startedBefore?: string | undefined;
            /** The maximum number of matching {@link DownloadItem} returned. Defaults to 1000. Set to 0 in order to return all matching {@link DownloadItem}. See {@link search} for how to page through results. */
            limit?: number | undefined;
            /** Why a download was interrupted. */
            error?: `${InterruptReason}` | undefined;
            /** The time when the download ended in ISO 8601 format. */
            endTime?: string | undefined;
            /** Whether the downloaded file exists; */
            exists?: boolean | undefined;
        }

        interface FilenameSuggestion {
            /** The {@link DownloadItem}'s new target {@link DownloadItem.filename}, as a path relative to the user's default Downloads directory, possibly containing subdirectories. Absolute paths, empty paths, and paths containing back-references ".." will be ignored. `filename` is ignored if there are any {@link onDeterminingFilename} listeners registered by any extensions. */
            filename: string;
            /** The action to take if `filename` already exists. */
            conflictAction?: `${FilenameConflictAction}` | undefined;
        }

        /** @since Chrome 105 */
        interface UiOptions {
            /** Enable or disable the download UI. */
            enabled: boolean;
        }

        /**
         * Find {@link DownloadItem}. Set `query` to the empty object to get all {@link DownloadItem}. To get a specific {@link DownloadItem}, set only the `id` field. To page through a large number of items, set `orderBy: ['-startTime']`, set `limit` to the number of items per page, and set `startedAfter` to the `startTime` of the last item from the last page.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function search(query: DownloadQuery): Promise<DownloadItem[]>;
        function search(query: DownloadQuery, callback: (results: DownloadItem[]) => void): void;

        /**
         * Pause the download. If the request was successful the download is in a paused state. Otherwise {@link runtime.lastError} contains an error message. The request will fail if the download is not active.
         * @param downloadId The id of the download to pause.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function pause(downloadId: number): Promise<void>;
        function pause(downloadId: number, callback: () => void): void;

        /**
         * Retrieve an icon for the specified download. For new downloads, file icons are available after the {@link onCreated} event has been received. The image returned by this function while a download is in progress may be different from the image returned after the download is complete. Icon retrieval is done by querying the underlying operating system or toolkit depending on the platform. The icon that is returned will therefore depend on a number of factors including state of the download, platform, registered file types and visual theme. If a file icon cannot be determined, {@link runtime.lastError} will contain an error message.
         * @param downloadId The identifier for the download.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getFileIcon(downloadId: number, options?: GetFileIconOptions): Promise<string | undefined>;
        function getFileIcon(downloadId: number, callback: (iconURL?: string) => void): void;
        function getFileIcon(
            downloadId: number,
            options: GetFileIconOptions,
            callback: (iconURL?: string) => void,
        ): void;

        /**
         * Resume a paused download. If the request was successful the download is in progress and unpaused. Otherwise {@link runtime.lastError} contains an error message. The request will fail if the download is not active.
         * @param downloadId The id of the download to resume.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function resume(downloadId: number): Promise<void>;
        function resume(downloadId: number, callback: () => void): void;

        /**
         * Cancel a download. When `callback` is run, the download is cancelled, completed, interrupted or doesn't exist anymore.
         * @param downloadId The id of the download to cancel.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function cancel(downloadId: number): Promise<void>;
        function cancel(downloadId: number, callback: () => void): void;

        /**
         * Download a URL. If the URL uses the HTTP[S] protocol, then the request will include all cookies currently set for its hostname. If both `filename` and `saveAs` are specified, then the Save As dialog will be displayed, pre-populated with the specified `filename`. If the download started successfully, `callback` will be called with the new {@link DownloadItem}'s `downloadId`. If there was an error starting the download, then `callback` will be called with `downloadId=undefined` and {@link runtime.lastError} will contain a descriptive string. The error strings are not guaranteed to remain backwards compatible between releases. Extensions must not parse it.
         * @param options What to download and how.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function download(options: DownloadOptions): Promise<number>;
        function download(options: DownloadOptions, callback: (downloadId: number) => void): void;

        /**
         * Opens the downloaded file now if the {@link DownloadItem} is complete; otherwise returns an error through {@link runtime.lastError}. This method requires the `"downloads.open"` permission in addition to the `"downloads"` permission. An {@link onChanged} event fires when the item is opened for the first time. This method can only be called in response to a user gesture.
         * @param downloadId The identifier for the downloaded file.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 123.
         */
        function open(downloadId: number): Promise<void>;
        function open(
            downloadId: number,
            /** @since Chrome 123 */
            callback: () => void,
        ): void;

        /**
         * Show the downloaded file in its folder in a file manager.
         * @param downloadId The identifier for the downloaded file.
         */
        function show(downloadId: number): void;

        /** Show the default Downloads folder in a file manager. */
        function showDefaultFolder(): void;

        /**
         * Erase matching {@link DownloadItem} from history without deleting the downloaded file. An {@link onErased} event will fire for each {@link DownloadItem} that matches `query`, then `callback` will be called.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function erase(query: DownloadQuery): Promise<number[]>;
        function erase(query: DownloadQuery, callback: (erasedIds: number[]) => void): void;

        /**
         * Remove the downloaded file if it exists and the {@link DownloadItem} is complete; otherwise return an error through {@link runtime.lastError}.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function removeFile(downloadId: number): Promise<void>;
        function removeFile(downloadId: number, callback: () => void): void;

        /**
         * Prompt the user to accept a dangerous download. Can only be called from a visible context (tab, window, or page/browser action popup). Does not automatically accept dangerous downloads. If the download is accepted, then an {@link onChanged} event will fire, otherwise nothing will happen. When all the data is fetched into a temporary file and either the download is not dangerous or the danger has been accepted, then the temporary file is renamed to the target filename, the `state` changes to 'complete', and {@link onChanged} fires.
         * @param downloadId The identifier for the {@link DownloadItem}.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function acceptDanger(downloadId: number): Promise<void>;
        function acceptDanger(downloadId: number, callback: () => void): void;

        /**
         * Enable or disable the gray shelf at the bottom of every window associated with the current browser profile. The shelf will be disabled as long as at least one extension has disabled it. Enabling the shelf while at least one other extension has disabled it will return an error through {@link runtime.lastError}. Requires the `"downloads.shelf"` permission in addition to the `"downloads"` permission.
         * @deprecated since Chrome 117. Use {@link setUiOptions} instead.
         */
        function setShelfEnabled(enabled: boolean): void;

        /**
         * Change the download UI of every window associated with the current browser profile. As long as at least one extension has set {@link UiOptions.enabled} to false, the download UI will be hidden. Setting {@link UiOptions.enabled} to true while at least one other extension has disabled it will return an error through {@link runtime.lastError}. Requires the `"downloads.ui"` permission in addition to the `"downloads"` permission.
         * @since Chrome 105
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 105.
         */
        function setUiOptions(options: UiOptions): Promise<void>;
        function setUiOptions(options: UiOptions, callback: () => void): void;

        /** When any of a {@link DownloadItem}'s properties except `bytesReceived` and `estimatedEndTime` changes, this event fires with the `downloadId` and an object containing the properties that changed. */
        const onChanged: events.Event<(downloadDelta: DownloadDelta) => void>;

        /** This event fires with the {@link DownloadItem} object when a download begins. */
        const onCreated: events.Event<(downloadItem: DownloadItem) => void>;

        /** Fires with the `downloadId` when a download is erased from history. */
        const onErased: events.Event<(downloadId: number) => void>;

        /** During the filename determination process, extensions will be given the opportunity to override the target {@link DownloadItem.filename}. Each extension may not register more than one listener for this event. Each listener must call `suggest` exactly once, either synchronously or asynchronously. If the listener calls `suggest` asynchronously, then it must return `true`. If the listener neither calls `suggest` synchronously nor returns `true`, then `suggest` will be called automatically. The {@link DownloadItem} will not complete until all listeners have called `suggest`. Listeners may call `suggest` without any arguments in order to allow the download to use `downloadItem.filename` for its filename, or pass a `suggestion` object to `suggest` in order to override the target filename. If more than one extension overrides the filename, then the last extension installed whose listener passes a `suggestion` object to `suggest` wins. In order to avoid confusion regarding which extension will win, users should not install extensions that may conflict. If the download is initiated by {@link download} and the target filename is known before the MIME type and tentative filename have been determined, pass `filename` to {@link download} instead. */
        const onDeterminingFilename: events.Event<
            (downloadItem: DownloadItem, suggest: (suggestion?: FilenameSuggestion) => void) => void
        >;
    }
}

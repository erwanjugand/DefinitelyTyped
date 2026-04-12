declare namespace chrome {
    ////////////////////
    // Web Request
    ////////////////////
    /**
     * Use the `chrome.webRequest` API to observe and analyze traffic and to intercept, block, or modify requests in-flight.
     *
     * Permissions: "webRequest"
     *
     * Manifest: "host_permissions"
     */
    namespace webRequest {
        interface WebRequestEvent<T extends (...args: any) => void, U extends string[]>
            extends Omit<chrome.events.Event<T>, "addListener">
        {
            addListener(callback: T, filter: RequestFilter, extraInfoSpec?: U | undefined): void;
        }

        interface AuthCredentials {
            username: string;
            password: string;
        }

        /** An HTTP Header, represented as an object containing a key and either a value or a binaryValue. */
        interface HttpHeader {
            /** Name of the HTTP header. */
            name: string;
            /** Value of the HTTP header if it can be represented by UTF-8. */
            value?: string | undefined;
            /** Value of the HTTP header if it cannot be represented by UTF-8, stored as individual byte values (0..255). */
            binaryValue?: ArrayBuffer | undefined;
        }

        /** Returns value for event handlers that have the 'blocking' extraInfoSpec applied. Allows the event handler to modify network requests. */
        interface BlockingResponse {
            /** If true, the request is cancelled. This prevents the request from being sent. This can be used as a response to the onBeforeRequest, onBeforeSendHeaders, onHeadersReceived and onAuthRequired events. */
            cancel?: boolean | undefined;
            /** Only used as a response to the onBeforeRequest and onHeadersReceived events. If set, the original request is prevented from being sent/completed and is instead redirected to the given URL. Redirections to non-HTTP schemes such as `data:` are allowed. Redirects initiated by a redirect action use the original request method for the redirect, with one exception: If the redirect is initiated at the onHeadersReceived stage, then the redirect will be issued using the GET method. Redirects from URLs with `ws://` and `wss://` schemes are **ignored**. */
            redirectUrl?: string | undefined;
            /** Only used as a response to the onHeadersReceived event. If set, the server is assumed to have responded with these response headers instead. Only return `responseHeaders` if you really want to modify the headers in order to limit the number of conflicts (only one extension may modify `responseHeaders` for each request). */
            responseHeaders?: HttpHeader[] | undefined;
            /** Only used as a response to the onAuthRequired event. If set, the request is made using the supplied credentials. */
            authCredentials?: AuthCredentials | undefined;
            /** Only used as a response to the onBeforeSendHeaders event. If set, the request is made with these request headers instead. */
            requestHeaders?: HttpHeader[] | undefined;
        }

        /**
         * Contains data passed within form data. For urlencoded form it is stored as string if data is utf-8 string and as ArrayBuffer otherwise. For form-data it is ArrayBuffer. If form-data represents uploading file, it is string with filename, if the filename is provided.
         * @since Chrome 66
         */
        type FormDataItem = string | ArrayBuffer;

        /** @since Chrome 70 */
        enum IgnoredActionType {
            AUTH_CREDENTIALS = "auth_credentials",
            REDIRECT = "redirect",
            REQUEST_HEADERS = "request_headers",
            RESPONSE_HEADERS = "response_headers",
        }

        /** @since Chrome 44 */
        enum OnAuthRequiredOptions {
            /** Specifies that the response headers should be included in the event. */
            RESPONSE_HEADERS = "responseHeaders",
            /** Specifies the request is blocked until the callback function returns. */
            BLOCKING = "blocking",
            /** Specifies that the callback function is handled asynchronously. */
            ASYNC_BLOCKING = "asyncBlocking",
            /** Specifies that headers can violate Cross-Origin Resource Sharing (CORS). */
            EXTRA_HEADERS = "extraHeaders",
        }

        /** @since Chrome 44 */
        enum OnBeforeRedirectOptions {
            /** Specifies that the response headers should be included in the event. */
            RESPONSE_HEADERS = "responseHeaders",
            /** Specifies that headers can violate Cross-Origin Resource Sharing (CORS). */
            EXTRA_HEADERS = "extraHeaders",
        }

        /** @since Chrome 44 */
        enum OnBeforeRequestOptions {
            /** Specifies the request is blocked until the callback function returns. */
            BLOCKING = "blocking",
            /** Specifies that the request body should be included in the event. */
            REQUEST_BODY = "requestBody",
            /** Specifies that headers can violate Cross-Origin Resource Sharing (CORS). */
            EXTRA_HEADERS = "extraHeaders",
        }

        /** @since Chrome 44 */
        enum OnBeforeSendHeadersOptions {
            /** Specifies that the request header should be included in the event. */
            REQUEST_HEADERS = "requestHeaders",
            /** Specifies the request is blocked until the callback function returns. */
            BLOCKING = "blocking",
            /** Specifies that headers can violate Cross-Origin Resource Sharing (CORS). */
            EXTRA_HEADERS = "extraHeaders",
        }

        /** @since Chrome 44 */
        enum OnCompletedOptions {
            /** Specifies that the response headers should be included in the event. */
            RESPONSE_HEADERS = "responseHeaders",
            /** Specifies that headers can violate Cross-Origin Resource Sharing (CORS). */
            EXTRA_HEADERS = "extraHeaders",
        }

        /** @since Chrome 79 */
        enum OnErrorOccurredOptions {
            /** Specifies that headers can violate Cross-Origin Resource Sharing (CORS). */
            EXTRA_HEADERS = "extraHeaders",
        }

        /** @since Chrome 44 */
        enum OnHeadersReceivedOptions {
            /** Specifies the request is blocked until the callback function returns. */
            BLOCKING = "blocking",
            /** Specifies that headers can violate Cross-Origin Resource Sharing (CORS). */
            EXTRA_HEADERS = "extraHeaders",
            /** Specifies that the response headers should be included in the event. */
            RESPONSE_HEADERS = "responseHeaders",
            /** Specifies that the SecurityInfo should be included in the event. */
            SECURITY_INFO = "securityInfo",
            /** Specifies that the SecurityInfo with raw bytes of certificates should be included in the event. */
            SECURITY_INFO_RAW_DER = "securityInfoRawDer",
        }

        /** @since Chrome 44 */
        enum OnResponseStartedOptions {
            /** Specifies that the response headers should be included in the event. */
            RESPONSE_HEADERS = "responseHeaders",
            /** Specifies that headers can violate Cross-Origin Resource Sharing (CORS). */
            EXTRA_HEADERS = "extraHeaders",
        }

        /** @since Chrome 44 */
        enum OnSendHeadersOptions {
            /** Specifies that the request header should be included in the event. */
            REQUEST_HEADERS = "requestHeaders",
            /** Specifies that headers can violate Cross-Origin Resource Sharing (CORS). */
            EXTRA_HEADERS = "extraHeaders",
        }

        /** An object describing filters to apply to webRequest events. */
        interface RequestFilter {
            tabId?: number | undefined;
            /** A list of request types. Requests that cannot match any of the types will be filtered out. */
            types?: `${ResourceType}`[] | undefined;
            /** A list of URLs or URL patterns. Requests that cannot match any of the URLs will be filtered out. */
            urls: string[];
            windowId?: number | undefined;
        }

        /** @since Chrome 44 */
        enum ResourceType {
            /** Specifies the resource as the main frame. */
            MAIN_FRAME = "main_frame",
            /** Specifies the resource as a sub frame. */
            SUB_FRAME = "sub_frame",
            /** Specifies the resource as a stylesheet. */
            STYLESHEET = "stylesheet",
            /** Specifies the resource as a script. */
            SCRIPT = "script",
            /** Specifies the resource as an image. */
            IMAGE = "image",
            /** Specifies the resource as a font. */
            FONT = "font",
            /** Specifies the resource as an object. */
            OBJECT = "object",
            /** Specifies the resource as an XMLHttpRequest. */
            XMLHTTPREQUEST = "xmlhttprequest",
            /** Specifies the resource as a ping. */
            PING = "ping",
            /** Specifies the resource as a Content Security Policy (CSP) report. */
            CSP_REPORT = "csp_report",
            /** Specifies the resource as a media object. */
            MEDIA = "media",
            /** Specifies the resource as a WebSocket. */
            WEBSOCKET = "websocket",
            /** Specifies the resource as a WebBundle. */
            WEBBUNDLE = "webbundle",
            /** Specifies the resource as a type not included in the listed types. */
            OTHER = "other",
        }

        /** @since Chrome 144 */
        interface SecurityInfo {
            /** A list of certificates */
            certificates: {
                /** Fingerprints of the certificate. */
                fingerprint: {
                    /** sha256 fingerprint of the certificate. */
                    sha256: string;
                };
                /** Raw bytes of DER encoded server certificate */
                rawDER?: ArrayBuffer;
            }[];

            /** State of the connection. One of secure, insecure, broken. */
            state: string;
        }

        /** Contains data uploaded in a URL request. */
        interface UploadData {
            /** An ArrayBuffer with a copy of the data. */
            bytes?: ArrayBuffer;
            /** A string with the file's path and name. */
            file?: string;
        }

        /** The maximum number of times that `handlerBehaviorChanged` can be called per 10 minute sustained interval. `handlerBehaviorChanged` is an expensive function call that shouldn't be called often. */
        const MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES: 20;

        /** Common properties for all webRequest events (except {@link onActionIgnored}). */
        interface WebRequestDetails {
            /**
             * The UUID of the document making the request.
             * @since Chrome 106
             */
            documentId?: string;
            /**
             * The lifecycle the document is in.
             * @since Chrome 106
             */
            documentLifecycle: extensionTypes.DocumentLifecycle;
            /** The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab. */
            frameId: number;
            /**
             * The type of frame the request occurred in.
             * @since Chrome 106
             */
            frameType: extensionTypes.FrameType;
            /**
             * The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
             * @since Chrome 63
             */
            initiator?: string;
            /** Standard HTTP method. */
            method: string;
            /**
             * The UUID of the parent document owning this frame. This is not set if there is no parent.
             * @since Chrome 106
             */
            parentDocumentId?: string;
            /** ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists. */
            parentFrameId: number;
            /** The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request. */
            requestId: string;
            /** The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab. */
            tabId: number;
            /** The time when this signal is triggered, in milliseconds since the epoch. */
            timeStamp: number;
            /** How the requested resource will be used. */
            type: `${ResourceType}`;
            url: string;
        }

        interface OnAuthRequiredDetails extends WebRequestDetails {
            /** The server requesting authentication. */
            challenger: {
                host: string;
                port: number;
            };
            /** True for Proxy-Authenticate, false for WWW-Authenticate. */
            isProxy: boolean;
            /** The authentication realm provided by the server, if there is one. */
            realm?: string;
            /** The HTTP response headers that were received along with this response. */
            responseHeaders?: HttpHeader[];
            /** The authentication scheme, e.g. Basic or Digest. */
            scheme: string;
            /**
             * Standard HTTP status code returned by the server.
             * @since Chrome 43
             */
            statusCode: number;
            /** HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.*/
            statusLine: string;
        }

        interface OnBeforeRedirectDetails extends WebRequestDetails {
            /** Indicates if this response was fetched from disk cache. */
            fromCache: boolean;
            /** The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address. */
            ip?: string;
            /** The new URL. */
            redirectUrl: string;
            /** The HTTP response headers that were received along with this redirect. */
            responseHeaders?: HttpHeader[];
            /** Standard HTTP status code returned by the server. */
            statusCode: number;
            /** HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.*/
            statusLine: string;
        }

        interface OnBeforeRequestDetails
            extends SetPartial<WebRequestDetails, "documentId" | "documentLifecycle" | "frameType">
        {
            /** Contains the HTTP request body data. Only provided if extraInfoSpec contains 'requestBody'. */
            requestBody?: {
                /** Errors when obtaining request body data. */
                error?: string;
                /** If the request method is POST and the body is a sequence of key-value pairs encoded in UTF8, encoded as either multipart/form-data, or application/x-www-form-urlencoded, this dictionary is present and for each key contains the list of all values for that key. If the data is of another media type, or if it is malformed, the dictionary is not present. An example value of this dictionary is {'key': \['value1', 'value2'\]}. */
                formData?: { [key: string]: FormDataItem[] };
                /** If the request method is PUT or POST, and the body is not already parsed in formData, then the unparsed request body elements are contained in this array. */
                raw?: UploadData[];
            };
        }

        interface OnBeforeSendHeadersDetails extends WebRequestDetails {
            /** The HTTP request headers that are going to be sent out with this request. */
            requestHeaders?: HttpHeader[];
        }

        interface OnCompletedDetails extends WebRequestDetails {
            /** Indicates if this response was fetched from disk cache. */
            fromCache: boolean;
            /** The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address. */
            ip?: string;
            /** The HTTP response headers that were received along with this response. */
            responseHeaders?: HttpHeader[];
            /** Standard HTTP status code returned by the server. */
            statusCode: number;
            /** HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.*/
            statusLine: string;
        }

        interface OnErrorOccurredDetails extends WebRequestDetails {
            /** The error description. This string is _not_ guaranteed to remain backwards compatible between releases. You must not parse and act based upon its content. */
            error: string;
            /** Indicates if this response was fetched from disk cache. */
            fromCache: boolean;
            /** The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address. */
            ip?: string;
        }

        interface OnHeadersReceivedDetails extends WebRequestDetails {
            /** The HTTP response headers that have been received with this response. */
            responseHeaders?: HttpHeader[];
            /**
             * Information about the TLS/QUIC connection used for the underlying connection. Only provided if `securityInfo` is specified in the `extraInfoSpec` parameter.
             * @since Chrome 144
             */
            securityInfo?: SecurityInfo;
            /** Standard HTTP status code returned by the server. */
            statusCode: number;
            /** HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers.*/
            statusLine: string;
        }

        interface OnResponseStartedDetails extends WebRequestDetails {
            /** Indicates if this response was fetched from disk cache. */
            fromCache: boolean;
            /** The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address. */
            ip?: string;
            /** The HTTP response headers that were received along with this response. */
            responseHeaders?: HttpHeader[];
            /** Standard HTTP status code returned by the server. */
            statusCode: number;
            /** HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line) or an empty string if there are no headers. */
            statusLine: string;
        }

        interface OnSendHeadersDetails extends WebRequestDetails {
            /** The HTTP request headers that have been sent out with this request. */
            requestHeaders?: HttpHeader[];
        }

        /**
         * Needs to be called when the behavior of the webRequest handlers has changed to prevent incorrect handling due to caching. This function call is expensive. Don't call it often.
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         */
        function handlerBehaviorChanged(): Promise<void>;
        function handlerBehaviorChanged(callback: () => void): void;

        const onActionIgnored: events.Event<
            (details: {
                // The proposed action which was ignored.
                action: `${IgnoredActionType}`;
                // The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request.
                requestId: string;
            }) => void
        >;

        /** Fired when a request is about to occur. */
        const onBeforeRequest: WebRequestEvent<
            (details: OnBeforeRequestDetails) => BlockingResponse | undefined,
            `${OnBeforeRequestOptions}`[]
        >;

        /** Fired before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any HTTP data is sent. */
        const onBeforeSendHeaders: WebRequestEvent<
            // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
            (details: OnBeforeSendHeadersDetails) => BlockingResponse | undefined,
            `${OnBeforeSendHeadersOptions}`[]
        >;

        /** Fired just before a request is going to be sent to the server (modifications of previous onBeforeSendHeaders callbacks are visible by the time onSendHeaders is fired). */
        const onSendHeaders: WebRequestEvent<
            (details: OnSendHeadersDetails) => void,
            `${OnSendHeadersOptions}`[]
        >;

        /** Fired when HTTP response headers of a request have been received. */
        const onHeadersReceived: WebRequestEvent<
            (details: OnHeadersReceivedDetails) => BlockingResponse | undefined,
            `${OnHeadersReceivedOptions}`[]
        >;

        /**
         * Fired when an authentication failure is received.
         * The listener has three options: it can provide authentication credentials, it can cancel the request and display the error page, or it can take no action on the challenge.
         * If bad user credentials are provided, this may be called multiple times for the same request.
         * Note, only one of `blocking` or `asyncBlocking` modes must be specified in the extraInfoSpec parameter.
         *
         * Requires the `webRequestAuthProvider` permission.
         */
        const onAuthRequired: WebRequestEvent<
            (
                details: OnAuthRequiredDetails,
                /** @since Chrome 58 */
                asyncCallback?: (response: BlockingResponse) => void,
            ) => BlockingResponse | undefined,
            `${OnAuthRequiredOptions}`[]
        >;
        // const onAuthRequired: WebAuthenticationChallengeEvent;

        /** Fired when the first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available. */
        const onResponseStarted: WebRequestEvent<
            (details: OnResponseStartedDetails) => void,
            `${OnResponseStartedOptions}`[]
        >;

        /** Fired when a server-initiated redirect is about to occur. */
        const onBeforeRedirect: WebRequestEvent<
            (details: OnBeforeRedirectDetails) => void,
            `${OnBeforeRedirectOptions}`[]
        >;

        /** Fired when a request is completed. */
        const onCompleted: WebRequestEvent<
            (details: OnCompletedDetails) => void,
            `${OnCompletedOptions}`[]
        >;

        /** Fired when an error occurs. */
        const onErrorOccurred: WebRequestEvent<
            (details: OnErrorOccurredDetails) => void,
            `${OnErrorOccurredOptions}`[]
        >;
    }
}

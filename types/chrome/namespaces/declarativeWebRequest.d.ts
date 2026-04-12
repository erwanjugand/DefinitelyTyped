declare namespace chrome {
    ////////////////////
    // Declarative Web Request
    ////////////////////
    /**
     * Use the `chrome.declarativeWebRequest` API to intercept, block, or modify requests in-flight. It is significantly faster than the chrome.webRequest API because you can register rules that are evaluated in the browser rather than the JavaScript engine, which reduces roundtrip latencies and allows higher efficiency.
     *
     * Permissions: "declarativeWebRequest"
     *
     * MV2 only
     * @deprecated Check out the {@link declarativeNetRequest} API instead
     */
    namespace declarativeWebRequest {
        /** Filters request headers for various criteria. Multiple criteria are evaluated as a conjunction. */
        interface HeaderFilter {
            /** Matches if the header name is equal to the specified string. */
            nameEquals?: string | undefined;
            /** Matches if the header value contains all of the specified strings. */
            valueContains?: string | string[] | undefined;
            /** Matches if the header name ends with the specified string. */
            nameSuffix?: string | undefined;
            /** Matches if the header value ends with the specified string. */
            valueSuffix?: string | undefined;
            /** Matches if the header value starts with the specified string. */
            valuePrefix?: string | undefined;
            /** Matches if the header name contains all of the specified strings. */
            nameContains?: string | string[] | undefined;
            /** Matches if the header value is equal to the specified string. */
            valueEquals?: string | undefined;
            /** Matches if the header name starts with the specified string. */
            namePrefix?: string | undefined;
        }

        /** Adds the response header to the response of this web request. As multiple response headers may share the same name, you need to first remove and then add a new response header in order to replace one. */
        interface AddResponseHeader {
            /** HTTP response header name. */
            name: string;
            /** HTTP response header value. */
            value: string;
        }

        /** Removes one or more cookies of response. Note that it is preferred to use the Cookies API because this is computationally less expensive. */
        interface RemoveResponseCookie {
            /** Filter for cookies that will be removed. All empty entries are ignored. */
            filter: FilterResponseCookie;
        }

        /** Removes all response headers of the specified names and values. */
        interface RemoveResponseHeader {
            /** HTTP request header name (case-insensitive). */
            name: string;
            /** HTTP request header value (case-insensitive). */
            value?: string | undefined;
        }

        /** Matches network events by various criteria. */
        interface RequestMatcher {
            /** Matches if the MIME media type of a response (from the HTTP Content-Type header) is contained in the list. */
            contentType?: string[] | undefined;
            /** Matches if the conditions of the UrlFilter are fulfilled for the URL of the request. */
            url?: events.UrlFilter | undefined;
            /** Matches if the MIME media type of a response (from the HTTP Content-Type header) is not contained in the list. */
            excludeContentType?: string[] | undefined;
            /** Matches if none of the request headers is matched by any of the HeaderFilters. */
            excludeResponseHeaders?: HeaderFilter[] | undefined;
            /** Matches if none of the response headers is matched by any of the HeaderFilters. */
            excludeResponseHeader?: HeaderFilter[] | undefined;
            /**
             * Matches if the conditions of the UrlFilter are fulfilled for the 'first party' URL of the request. The 'first party' URL of a request, when present, can be different from the request's target URL, and describes what is considered 'first party' for the sake of third-party checks for cookies.
             * @deprecated since Chrome 82
             */
            firstPartyForCookiesUrl?: events.UrlFilter | undefined;
            /** Matches if some of the request headers is matched by one of the HeaderFilters. */
            requestHeaders?: HeaderFilter[] | undefined;
            /** Matches if the request type of a request is contained in the list. Requests that cannot match any of the types will be filtered out. */
            resourceType?: `${webRequest.ResourceType}`[] | undefined;
            /** Matches if some of the response headers is matched by one of the HeaderFilters. */
            responseHeaders?: HeaderFilter[] | undefined;
            /** Contains a list of strings describing stages. Allowed values are 'onBeforeRequest', 'onBeforeSendHeaders', 'onHeadersReceived', 'onAuthRequired'. If this attribute is present, then it limits the applicable stages to those listed. Note that the whole condition is only applicable in stages compatible with all attributes. */
            stages?: `${Stage}`[] | undefined;
            /**
             * If set to true, matches requests that are subject to third-party cookie policies. If set to false, matches all other requests.
             * @deprecated since Chrome 87
             */
            thirdPartyForCookies?: boolean | undefined;
        }

        /** Masks all rules that match the specified criteria. */
        interface IgnoreRules {
            /** If set, rules with the specified tag are ignored. This ignoring is not persisted, it affects only rules and their actions of the same network request stage. Note that rules are executed in descending order of their priorities. This action affects rules of lower priority than the current rule. Rules with the same priority may or may not be ignored. */
            hasTag?: string | undefined;
            /** If set, rules with a lower priority than the specified value are ignored. This boundary is not persisted, it affects only rules and their actions of the same network request stage. */
            lowerPriorityThan?: number | undefined;
        }

        /** Declarative event action that redirects a network request to an empty document. */
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface RedirectToEmptyDocument {}

        /** Declarative event action that redirects a network request. */
        interface RedirectRequest {
            /** Destination to where the request is redirected. */
            redirectUrl: string;
        }

        /** A specification of a cookie in HTTP Responses. */
        interface ResponseCookie {
            /** Value of the Domain cookie attribute. */
            domain?: string | undefined;
            /** Name of a cookie. */
            name?: string | undefined;
            /** Value of the Expires cookie attribute. */
            expires?: string | undefined;
            /** Value of the Max-Age cookie attribute */
            maxAge?: number | undefined;
            /** Value of a cookie, may be padded in double-quotes. */
            value?: string | undefined;
            /** Value of the Path cookie attribute. */
            path?: string | undefined;
            /** Existence of the HttpOnly cookie attribute. */
            httpOnly?: string | undefined;
            /** Existence of the Secure cookie attribute. */
            secure?: string | undefined;
        }

        /** Adds a cookie to the response or overrides a cookie, in case another cookie of the same name exists already. Note that it is preferred to use the Cookies API because this is computationally less expensive. */
        interface AddResponseCookie {
            cookie: ResponseCookie;
        }

        /** Edits one or more cookies of response. Note that it is preferred to use the Cookies API because this is computationally less expensive. */
        interface EditResponseCookie {
            /** Filter for cookies that will be modified. All empty entries are ignored. */
            filter: ResponseCookie;
            /** Attributes that shall be overridden in cookies that machted the filter. Attributes that are set to an empty string are removed. */
            modification: ResponseCookie;
        }

        /** Declarative event action that cancels a network request. */
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface CancelRequest {}

        /** Removes the request header of the specified name. Do not use SetRequestHeader and RemoveRequestHeader with the same header name on the same request. Each request header name occurs only once in each request. */
        interface RemoveRequestHeader {
            /** HTTP request header name (case-insensitive). */
            name: string;
        }

        /** Edits one or more cookies of request. Note that it is preferred to use the Cookies API because this is computationally less expensive. */
        interface EditRequestCookie {
            /** Filter for cookies that will be modified. All empty entries are ignored. */
            filter: RequestCookie;
            /** Attributes that shall be overridden in cookies that machted the filter. Attributes that are set to an empty string are removed. */
            modification: RequestCookie;
        }

        /** A filter of a cookie in HTTP Responses. */
        interface FilterResponseCookie {
            /** Inclusive lower bound on the cookie lifetime (specified in seconds after current time). Only cookies whose expiration date-time is set to 'now + ageLowerBound' or later fulfill this criterion. Session cookies do not meet the criterion of this filter. The cookie lifetime is calculated from either 'max-age' or 'expires' cookie attributes. If both are specified, 'max-age' is used to calculate the cookie lifetime. */
            ageLowerBound?: number | undefined;
            /** Inclusive upper bound on the cookie lifetime (specified in seconds after current time). Only cookies whose expiration date-time is in the interval [now, now + ageUpperBound] fulfill this criterion. Session cookies and cookies whose expiration date-time is in the past do not meet the criterion of this filter. The cookie lifetime is calculated from either 'max-age' or 'expires' cookie attributes. If both are specified, 'max-age' is used to calculate the cookie lifetime. */
            ageUpperBound?: number | undefined;
            /** Value of the Domain cookie attribute. */
            domain?: string | undefined;
            /** Value of the Expires cookie attribute. */
            expires?: string | undefined;
            /** Existence of the HttpOnly cookie attribute. */
            httpOnly?: string | undefined;
            /** Value of the Max-Age cookie attribute */
            maxAge?: number | undefined;
            /** Name of a cookie. */
            name?: string | undefined;
            /** Value of the Path cookie attribute. */
            path?: string | undefined;
            /** Existence of the Secure cookie attribute. */
            secure?: string | undefined;
            /** Filters session cookies. Session cookies have no lifetime specified in any of 'max-age' or 'expires' attributes. */
            session?: boolean | undefined;
            /** Value of a cookie, may be padded in double-quotes. */
            value?: string | undefined;
        }

        /** Sets the request header of the specified name to the specified value. If a header with the specified name did not exist before, a new one is created. Header name comparison is always case-insensitive. Each request header name occurs only once in each request. */
        interface SetRequestHeader {
            /** HTTP request header name. */
            name: string;
            /** HTTP request header value. */
            value: string;
        }

        /** A filter or specification of a cookie in HTTP Requests. */
        interface RequestCookie {
            /** Name of a cookie. */
            name?: string | undefined;
            /** Value of a cookie, may be padded in double-quotes. */
            value?: string | undefined;
        }

        /** Redirects a request by applying a regular expression on the URL. The regular expressions use the RE2 syntax. */
        interface RedirectByRegEx {
            /** Destination pattern. */
            to: string;
            /** A match pattern that may contain capture groups. Capture groups are referenced in the Perl syntax ($1, $2, ...) instead of the RE2 syntax (\1, \2, ...) in order to be closer to JavaScript Regular Expressions. */
            from: string;
        }

        /** Declarative event action that redirects a network request to a transparent image. */
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface RedirectToTransparentImage {}

        /** Adds a cookie to the request or overrides a cookie, in case another cookie of the same name exists already. Note that it is preferred to use the Cookies API because this is computationally less expensive. */
        interface AddRequestCookie {
            cookie: RequestCookie;
        }

        /** Removes one or more cookies of request. Note that it is preferred to use the Cookies API because this is computationally less expensive. */
        interface RemoveRequestCookie {
            /** Filter for cookies that will be removed. All empty entries are ignored. */
            filter: RequestCookie;
        }

        enum Stage {
            ON_AUTH_REQUIRED = "onAuthRequired",
            ON_BEFORE_REQUEST = "onBeforeRequest",
            ON_BEFORE_SEND_HEADERS = "onBeforeSendHeaders",
            ON_HEADERS_RECEIVED = "onHeadersReceived",
        }

        interface MessageDetails {
            /** A UUID of the document that made the request. */
            documentId?: string;
            /** The lifecycle the document is in. */
            documentLifecycle: extensionTypes.DocumentLifecycle;
            /** The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (`type` is `main_frame` or `sub_frame`), `frameId` indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab. */
            frameId: number;
            /** The type of frame the navigation occurred in. */
            frameType: extensionTypes.FrameType;
            /** The message sent by the calling script. */
            message: string;
            /** Standard HTTP method. */
            method: string;
            /** A UUID of the parent document owning this frame. This is not set if there is no parent. */
            parentDocumentId?: string;
            /** ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists. */
            parentFrameId: number;
            /** The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request. */
            requestId: string;
            /** The stage of the network request during which the event was triggered. */
            stage: `${Stage}`;
            /** The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab. */
            tabId: number;
            /** The time when this signal is triggered, in milliseconds since the epoch. */
            timeStamp: number;
            /** How the requested resource will be used. */
            type: `${webRequest.ResourceType}`;
            url: string;
        }

        interface SendMessageToExtension {
            /** The value that will be passed in the message attribute of the dictionary that is passed to the event handler. */
            message: string;
        }

        /** Fired when a message is sent via {@link declarativeWebRequest.SendMessageToExtension} from an action of the declarative web request API. */
        const onMessage: events.Event<(details: MessageDetails) => void>;

        /** Provides the Declarative Event API consisting of `addRules`, `removeRules`, and `getRules`. */
        const onRequest: events.Event<() => void>;
    }
}

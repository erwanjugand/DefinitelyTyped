declare namespace chrome {
    ////////////////////
    // Privacy
    ////////////////////
    /**
     * Use the `chrome.privacy` API to control usage of the features in Chrome that can affect a user's privacy. This API relies on the ChromeSetting prototype of the type API for getting and setting Chrome's configuration.
     * Note: The Chrome Privacy Whitepaper gives background detail regarding the features which this API can control.
     *
     * Permissions: "privacy"
     */
    namespace privacy {
        /**
         * The IP handling policy of WebRTC.
         * @since Chrome 48
         */
        enum IPHandlingPolicy {
            DEFAULT = "default",
            DEFAULT_PUBLIC_AND_PRIVATE_INTERFACES = "default_public_and_private_interfaces",
            DEFAULT_PUBLIC_INTERFACE_ONLY = "default_public_interface_only",
            DISABLE_NON_PROXIED_UDP = "disable_non_proxied_udp",
        }

        /** Settings that enable or disable features that require third-party network services provided by Google and your default search provider. */
        const services: {
            /**
             * If enabled, Chrome uses a web service to help resolve navigation errors.
             * This preference's value is a boolean, defaulting to `true`.
             */
            alternateErrorPagesEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, Chrome offers to automatically fill in addresses and other form data.
             * This preference's value is a boolean, defaulting to `true`.
             * @since Chrome 70
             */
            autofillAddressEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, Chrome offers to automatically fill in credit card forms.
             * This preference's value is a boolean, defaulting to `true`.
             * @since Chrome 70
             */
            autofillCreditCardEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, Chrome offers to automatically fill in forms.
             * This preference's value is a boolean, defaulting to `true`.
             * @deprecated since Chrome 70. Please use privacy.services.autofillAddressEnabled and privacy.services.autofillCreditCardEnabled. This remains for backward compatibility in this release and will be removed in the future */
            autofillEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, the password manager will ask if you want to save passwords.
             * This preference's value is a boolean, defaulting to `true`.
             */
            passwordSavingEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, Chrome does its best to protect you from phishing and malware.
             * This preference's value is a boolean, defaulting to `true`.
             */
            safeBrowsingEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, Chrome will send additional information to Google when SafeBrowsing blocks a page, such as the content of the blocked page.
             * This preference's value is a boolean, defaulting to `false`.
             */
            safeBrowsingExtendedReportingEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, Chrome sends the text you type into the Omnibox to your default search engine, which provides predictions of websites and searches that are likely completions of what you've typed so far.
             * This preference's value is a boolean, defaulting to `true`.
             */
            searchSuggestEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, Chrome uses a web service to help correct spelling errors.
             * This preference's value is a boolean, defaulting to `false`.
             */
            spellingServiceEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, Chrome offers to translate pages that aren't in a language you read.
             * This preference's value is a boolean, defaulting to `true`.
             */
            translationServiceEnabled: chrome.types.ChromeSetting<boolean>;
        };

        /** Settings that influence Chrome's handling of network connections in general. */
        const network: {
            /**
             * If enabled, Chrome attempts to speed up your web browsing experience by pre-resolving DNS entries and preemptively opening TCP and SSL connections to servers.
             * This preference only affects actions taken by Chrome's internal prediction service. It does not affect webpage-initiated prefectches or preconnects.
             * This preference's value is a boolean, defaulting to `true`.
             */
            networkPredictionEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * Allow users to specify the media performance/privacy tradeoffs which impacts how WebRTC traffic will be routed and how much local address information is exposed.
             * This preference's value is of type IPHandlingPolicy, defaulting to `default`.
             *  @since Chrome 48
             */
            webRTCIPHandlingPolicy: chrome.types.ChromeSetting<`${IPHandlingPolicy}`>;
        };

        /** Settings that determine what information Chrome makes available to websites. */
        const websites: {
            /**
             * If disabled, the Attribution Reporting API and Private Aggregation API are deactivated.
             * The value of this preference is of type boolean, and the default value is `true`.
             * Extensions may only disable these APIs by setting the value to `false`. If you try setting these APIs to `true`, it will throw an error.
             * @since Chrome 111
             */
            adMeasurementEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, Chrome sends 'Do Not Track' (`DNT: 1`) header with your requests.
             * The value of this preference is of type boolean, and the default value is `false`.
             * @since Chrome 65
             */
            doNotTrackEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If disabled, the Fledge API is deactivated.
             * The value of this preference is of type boolean, and the default value is `true`.
             * Extensions may only disable this API by setting the value to `false`. If you try setting this API to `true`, it will throw an error.
             * @since Chrome 111
             */
            fledgeEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, Chrome sends auditing pings when requested by a website (`<a ping>`).
             * The value of this preference is of type boolean, and the default value is `true`.
             */
            hyperlinkAuditingEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, Chrome provides a unique ID to plugins in order to run protected content.
             * The value of this preference is of type boolean, and the default value is `true`.
             * @platform Windows and ChromeOS only
             */
            protectedContentEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If enabled, Chrome sends `referer` headers with your requests. Yes, the name of this preference doesn't match the misspelled header. No, we're not going to change it.
             * The value of this preference is of type boolean, and the default value is `true`.
             */
            referrersEnabled: chrome.types.ChromeSetting<boolean>;

            /**
             * If disabled, Related Website Sets is deactivated.
             * The value of this preference is of type boolean, and the default value is `true`.
             * Extensions may only disable this API by setting the value to `false`. If you try setting this API to `true`, it will throw an error.
             * @since Chrome 121
             */
            relatedWebsiteSetsEnabled: chrome.types.ChromeSetting<boolean>;

            /** If disabled, Chrome blocks third-party sites from setting cookies. The value of this preference is of type boolean, and the default value is `true`. Extensions may not enable this API in Incognito mode, where third-party cookies are blocked and can only be allowed at the site level. If you try setting this API to true in Incognito, it will throw an error. */
            thirdPartyCookiesAllowed: chrome.types.ChromeSetting<boolean>;

            /**
             * If disabled, the Topics API is deactivated.
             * The value of this preference is of type boolean, and the default value is `true`.
             * Extensions may only disable this API by setting the value to `false`. If you try setting this API to `true`, it will throw an error.
             * @since Chrome 111
             */
            topicsEnabled: chrome.types.ChromeSetting<boolean>;
        };
    }
}

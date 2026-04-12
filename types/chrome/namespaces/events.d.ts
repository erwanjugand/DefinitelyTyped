declare namespace chrome {
    ////////////////////
    // Events
    ////////////////////
    /**
     * The `chrome.events` namespace contains common types used by APIs dispatching events to notify you when something interesting happens.
     */
    namespace events {
        /** Filters URLs for various criteria. See event filtering. All criteria are case sensitive. */
        interface UrlFilter {
            /**
             * Matches if the host part of the URL is an IP address and is contained in any of the CIDR blocks specified in the array.
             * @since Chrome 123
             */
            cidrBlocks?: string[] | undefined;
            /** Matches if the scheme of the URL is equal to any of the schemes specified in the array. */
            schemes?: string[] | undefined;
            /** Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax. */
            urlMatches?: string | undefined;
            /** Matches if the path segment of the URL contains a specified string. */
            pathContains?: string | undefined;
            /** Matches if the host name of the URL ends with a specified string. */
            hostSuffix?: string | undefined;
            /** Matches if the host name of the URL starts with a specified string. */
            hostPrefix?: string | undefined;
            /** Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name. */
            hostContains?: string | undefined;
            /** Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number. */
            urlContains?: string | undefined;
            /** Matches if the query segment of the URL ends with a specified string. */
            querySuffix?: string | undefined;
            /** Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number. */
            urlPrefix?: string | undefined;
            /** Matches if the host name of the URL is equal to a specified string. */
            hostEquals?: string | undefined;
            /** Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number. */
            urlEquals?: string | undefined;
            /** Matches if the query segment of the URL contains a specified string. */
            queryContains?: string | undefined;
            /** Matches if the path segment of the URL starts with a specified string. */
            pathPrefix?: string | undefined;
            /** Matches if the path segment of the URL is equal to a specified string. */
            pathEquals?: string | undefined;
            /** Matches if the path segment of the URL ends with a specified string. */
            pathSuffix?: string | undefined;
            /** Matches if the query segment of the URL is equal to a specified string. */
            queryEquals?: string | undefined;
            /** Matches if the query segment of the URL starts with a specified string. */
            queryPrefix?: string | undefined;
            /** Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number. */
            urlSuffix?: string | undefined;
            /** Matches if the port of the URL is contained in any of the specified port lists. For example `[80, 443, [1000, 1200]]` matches all requests on port 80, 443 and in the range 1000-1200. */
            ports?: Array<number | number[]> | undefined;
            /** Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax. */
            originAndPathMatches?: string | undefined;
        }

        interface Event<T extends (...args: any) => void> {
            /**
             * Registers an event listener callback to an event.
             * @param callback Called when an event occurs. The parameters of this function depend on the type of event.
             */
            addListener(callback: T): void;

            /**
             * Returns currently registered rules.
             * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are returned.
             */
            getRules(
                /** @param rules Rules that were registered, the optional parameters are filled with values */
                callback: (rules: Rule[]) => void,
            ): void;
            getRules(
                ruleIdentifiers: string[],
                /** @param rules Rules that were registered, the optional parameters are filled with values */
                callback: (rules: Rule[]) => void,
            ): void;

            /**
             * @param callback Listener whose registration status shall be tested.
             * @returns True if _callback_ is registered to the event.
             */
            hasListener(callback: T): boolean;

            /**
             * Unregisters currently registered rules.
             * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are unregistered.
             */
            removeRules(ruleIdentifiers: string[] | undefined, callback?: () => void): void;
            removeRules(callback?: () => void): void;

            /**
             * Registers rules to handle events.
             * @param rules Rules to be registered. These do not replace previously registered rules.
             * @param callback Called with registered rules.
             */
            addRules(
                rules: Rule[],
                /** @param rules Rules that were registered, the optional parameters are filled with values */
                callback?: (rules: Rule[]) => void,
            ): void;

            /**
             * Deregisters an event listener callback from an event.
             * @param callback Listener that shall be unregistered.
             */
            removeListener(callback: T): void;

            /** @returns True if any event listeners are registered to the event. */
            hasListeners(): boolean;
        }

        /** Description of a declarative rule for handling events. */
        interface Rule {
            /** Optional priority of this rule. Defaults to 100. */
            priority?: number | undefined;
            /** List of conditions that can trigger the actions. */
            conditions: any[];
            /** Optional identifier that allows referencing this rule. */
            id?: string | undefined;
            /** List of actions that are triggered if one of the conditions is fulfilled. */
            actions: any[];
            /** Tags can be used to annotate rules and perform operations on sets of rules. */
            tags?: string[] | undefined;
        }
    }
}

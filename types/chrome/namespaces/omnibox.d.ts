declare namespace chrome {
    ////////////////////
    // Omnibox
    ////////////////////
    /**
     * The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox.
     *
     * Manifest: "omnibox"
     */
    namespace omnibox {
        /** A suggest result. */
        interface SuggestResult {
            /** The text that is put into the URL bar, and that is sent to the extension when the user chooses this entry. */
            content: string;
            /** The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match. You must escape the five predefined entities to display them as text: stackoverflow.com/a/1091953/89484 */
            description: string;
            /**
             * Whether the suggest result can be deleted by the user.
             * @since Chrome 63
             */
            deletable?: boolean | undefined;
        }

        /** A suggest result. */
        interface DefaultSuggestResult {
            /** The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match. */
            description: string;
        }

        /**
         * The style type.
         * @since Chrome 44
         */
        enum DescriptionStyleType {
            URL = "url",
            MATCH = "match",
            DIM = "dim",
        }

        /**
         * The window disposition for the omnibox query. This is the recommended context to display results. For example, if the omnibox command is to navigate to a certain URL, a disposition of 'newForegroundTab' means the navigation should take place in a new selected tab.
         * @since Chrome 44
         */
        enum OnInputEnteredDisposition {
            CURRENT_TAB = "currentTab",
            NEW_FOREGROUND_TAB = "newForegroundTab",
            NEW_BACKGROUND_TAB = "newBackgroundTab",
        }

        /**
         * Sets the description and styling for the default suggestion. The default suggestion is the text that is displayed in the first suggestion row underneath the URL bar.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 100
         * @param suggestion A partial SuggestResult object, without the 'content' parameter.
         */
        function setDefaultSuggestion(suggestion: DefaultSuggestResult): Promise<void>;
        function setDefaultSuggestion(suggestion: DefaultSuggestResult, callback: () => void): void;

        /** User has accepted what is typed into the omnibox. */
        const onInputEntered: events.Event<(text: string, disposition: `${OnInputEnteredDisposition}`) => void>;

        /** User has changed what is typed into the omnibox. */
        const onInputChanged: events.Event<
            (text: string, suggest: (suggestResults: SuggestResult[]) => void) => void
        >;

        /** User has started a keyword input session by typing the extension's keyword. This is guaranteed to be sent exactly once per input session, and before any onInputChanged events. */
        const onInputStarted: events.Event<() => void>;

        /** User has ended the keyword input session without accepting the input. */
        const onInputCancelled: events.Event<() => void>;

        /**
         * User has deleted a suggested result
         * @since Chrome 63
         */
        const onDeleteSuggestion: events.Event<(text: string) => void>;
    }
}

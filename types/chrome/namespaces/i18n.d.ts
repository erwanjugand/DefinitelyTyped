declare namespace chrome {
    ////////////////////
    // i18n
    ////////////////////
    /**
     * Use the `chrome.i18n` infrastructure to implement internationalization across your whole app or extension.
     *
     * Manifest: "default_locale"
     */
    namespace i18n {
        interface DetectedLanguage {
            language: string;
            /** The percentage of the detected language */
            percentage: number;
        }

        /** Holds detected language reliability and array of {@link DetectedLanguage} */
        interface LanguageDetectionResult {
            /** CLD detected language reliability */
            isReliable: boolean;
            /** Array of detectedLanguage */
            languages: DetectedLanguage[];
        }

        /** @since Chrome 79 */
        interface GetMessageOptions {
            /** Escape `<` in translation to `&lt;`. This applies only to the message itself, not to the placeholders. Developers might want to use this if the translation is used in an HTML context. Closure Templates used with Closure Compiler generate this automatically. */
            escapeLt?: boolean | undefined;
        }

        /**
         * Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use {@link i18n.getUILanguage}.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 99.
         */
        function getAcceptLanguages(): Promise<string[]>;
        function getAcceptLanguages(callback: (languages: string[]) => void): void;

        /**
         * Gets the localized string for the specified message. If the message is missing, this method returns an empty string (''). If the format of the `getMessage()` call is wrong — for example, messageName is not a string or the substitutions array has more than 9 elements — this method returns `undefined`.
         * @param messageName The name of the message, as specified in the `messages.json` file.
         * @param substitutions Up to 9 substitution strings, if the message requires any.
         */
        function getMessage(messageName: string, substitutions?: string | Array<string | number>): string;
        function getMessage(
            messageName: string,
            substitutions: string | Array<string | number> | undefined,
            options?: GetMessageOptions,
        ): string;

        /** Gets the browser UI language of the browser. This is different from {@link i18n.getAcceptLanguages} which returns the preferred user languages. */
        function getUILanguage(): string;

        /** Detects the language of the provided text using CLD.
         * @param text User input string to be translated.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 99.
         * @since Chrome 47
         */
        function detectLanguage(text: string): Promise<LanguageDetectionResult>;
        function detectLanguage(text: string, callback: (result: LanguageDetectionResult) => void): void;
    }
}

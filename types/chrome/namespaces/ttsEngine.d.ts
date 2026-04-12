declare namespace chrome {
    ////////////////////
    // Text to Speech Engine
    ////////////////////
    /**
     * Use the `chrome.ttsEngine` API to implement a text-to-speech(TTS) engine using an extension. If your extension registers using this API, it will receive events containing an utterance to be spoken and other parameters when any extension or Chrome App uses the {@link tts} API to generate speech. Your extension can then use any available web technology to synthesize and output the speech, and send events back to the calling function to report the status.
     *
     * Permissions: "ttsEngine"
     */
    namespace ttsEngine {
        /**
         * Parameters containing an audio buffer and associated data.
         * @since Chrome 92
         */
        interface AudioBuffer {
            /** The audio buffer from the text-to-speech engine. It should have length exactly audioStreamOptions.bufferSize and encoded as mono, at audioStreamOptions.sampleRate, and as linear pcm, 32-bit signed float i.e. the Float32Array type in javascript. */
            audioBuffer: ArrayBuffer;
            /** The character index associated with this audio buffer. */
            charIndex?: number;
            /** True if this audio buffer is the last for the text being spoken. */
            isLastBuffer?: boolean;
        }
        /**
         * Contains the audio stream format expected to be produced by an engine.
         * @since Chrome 92
         */
        interface AudioStreamOptions {
            /** The number of samples within an audio buffer. */
            bufferSize: number;
            /** The sample rate expected in an audio buffer. */
            sampleRate: number;
        }

        /**
         * The install status of a voice.
         * @since Chrome 132
         */
        enum LanguageInstallStatus {
            FAILED = "failed",
            INSTALLED = "installed",
            INSTALLING = "installing",
            NOT_INSTALLED = "notInstalled",
        }

        /**
         * Install status of a language.
         * @since Chrome 132
         */
        interface LanguageStatus {
            /** Detail about installation failures. Optionally populated if the language failed to install. */
            error?: string;
            /** Installation status. */
            installStatus: `${LanguageInstallStatus}`;
            /** Language string in the form of language code-region code, where the region may be omitted. Examples are en, en-AU, zh-CH. */
            lang: string;
        }

        /**
         * Options for uninstalling a given language.
         * @since Chrome 132
         */
        interface LanguageUninstallOptions {
            /** True if the TTS client wants the language to be immediately uninstalled. The engine may choose whether or when to uninstall the language, based on this parameter and the requestor information. If false, it may use other criteria, such as recent usage, to determine when to uninstall. */
            uninstallImmediately: boolean;
        }

        /**
         * Options specified to the tts.speak() method.
         * @since Chrome 92
         */
        interface SpeakOptions {
            /** The language to be used for synthesis, in the form language-region. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'. */
            lang?: string;
            /** The name of the voice to use for synthesis. */
            voiceName?: string;
            /**
             * Gender of voice for synthesized speech.
             * @deprecated Gender is deprecated since Chrome 92 and will be ignored.
             */
            gender?: `${VoiceGender}`;
            /** Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being highest, with a default of 1.0. */
            volume?: number;
            /** Speaking rate relative to the default rate for this voice. 1.0 is the default rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and 0.5 is half as fast. This value is guaranteed to be between 0.1 and 10.0, inclusive. When a voice does not support this full range of rates, don't return an error. Instead, clip the rate to the range the voice supports. */
            rate?: number;
            /** Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being highest. 1.0 corresponds to this voice's default pitch. */
            pitch?: number;
        }

        /**
         * Identifier for the client requesting status.
         * @since Chrome 131
         */
        interface TtsClient {
            /** Client making a language management request. For an extension, this is the unique extension ID. For Chrome features, this is the human-readable name of the feature. */
            id: string;
            /** Type of requestor. */
            source: `${TtsClientSource}`;
        }

        /**
         * Type of requestor.
         * @since Chrome 131
         */
        enum TtsClientSource {
            CHROMEFEATURE = "chromefeature",
            EXTENSION = "extension",
        }

        /**
         * @since Chrome 54
         * @deprecated Gender is deprecated and will be ignored.
         */
        enum VoiceGender {
            MALE = "male",
            FEMALE = "female",
        }

        /**
         * Called by an engine when a language install is attempted, and when a language is uninstalled. Also called in response to a status request from a client. When a voice is installed or uninstalled, the engine should also call ttsEngine.updateVoices to register the voice.
         * @since Chrome 132
         */
        function updateLanguage(status: LanguageStatus): void;

        /**
         * Called by an engine to update its list of voices. This list overrides any voices declared in this extension's manifest.
         * @since Chrome 66
         */
        function updateVoices(voices: tts.TtsVoice[]): void;

        /**
         * Fired when a TTS client requests to install a new language. The engine should attempt to download and install the language, and call ttsEngine.updateLanguage with the result. On success, the engine should also call ttsEngine.updateVoices to register the newly available voices.
         * @since Chrome 131
         */
        const onInstallLanguageRequest: chrome.events.Event<(requestor: TtsClient, lang: string) => void>;

        /**
         * Fired when a TTS client requests the install status of a language.
         * @since Chrome 132
         */
        const onLanguageStatusRequest: chrome.events.Event<(requestor: TtsClient, lang: string) => void>;

        /** Optional: if an engine supports the pause event, it should pause the current utterance being spoken, if any, until it receives a resume event or stop event. Note that a stop event should also clear the paused state. */
        const onPause: chrome.events.Event<() => void>;

        /** Optional: if an engine supports the pause event, it should also support the resume event, to continue speaking the current utterance, if any. Note that a stop event should also clear the paused state. */
        const onResume: chrome.events.Event<() => void>;

        /** Called when the user makes a call to tts.speak() and one of the voices from this extension's manifest is the first to match the options object. */
        const onSpeak: chrome.events.Event<
            (utterance: string, options: SpeakOptions, sendTtsEvent: (event: chrome.tts.TtsEvent) => void) => void
        >;

        /**
         * Called when the user makes a call to tts.speak() and one of the voices from this extension's manifest is the first to match the options object. Differs from ttsEngine.onSpeak in that Chrome provides audio playback services and handles dispatching tts events.
         * @since Chrome 92
         */

        const onSpeakWithAudioStream: chrome.events.Event<
            (
                utterance: string,
                options: SpeakOptions,
                audioStreamOptions: AudioStreamOptions,
                sendTtsAudio: (audioBufferParams: AudioBuffer) => void,
                sendError: (errorMessage?: string) => void,
            ) => void
        >;

        /** Fired when a call is made to tts.stop and this extension may be in the middle of speaking. If an extension receives a call to onStop and speech is already stopped, it should do nothing (not raise an error). If speech is in the paused state, this should cancel the paused state. */
        const onStop: chrome.events.Event<() => void>;

        /**
         * Fired when a TTS client indicates a language is no longer needed.
         * @since Chrome 132
         */
        const onUninstallLanguageRequest: chrome.events.Event<
            (requestor: TtsClient, lang: string, uninstallOptions: LanguageUninstallOptions) => void
        >;
    }
}

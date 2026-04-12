declare namespace chrome {
    ////////////////////
    // Input - IME
    ////////////////////
    /**
     * Use the `chrome.input.ime` API to implement a custom IME for Chrome OS. This allows your extension to handle keystrokes, set the composition, and manage the candidate window.
     *
     * Permissions: "input"
     * @platform ChromeOS only
     */
    namespace input.ime {
        /** See https://www.w3.org/TR/uievents/#events-KeyboardEvent */
        interface KeyboardEvent {
            /** Whether or not the SHIFT key is pressed. */
            shiftKey?: boolean | undefined;
            /** Whether or not the ALT key is pressed. */
            altKey?: boolean | undefined;
            /**
             * Whether or not the ALTGR key is pressed.
             * @since Chrome 79
             */
            altgrKey?: boolean | undefined;
            /**
             * The ID of the request
             * @deprecated Use the `requestId` param from the `onKeyEvent` event instead.
             */
            requestId?: string | undefined;
            /** Value of the key being pressed. */
            key: string;
            /** Whether or not the CTRL key is pressed. */
            ctrlKey?: boolean | undefined;
            /** One of keyup or keydown. */
            type: `${KeyboardEventType}`;
            /** The extension ID of the sender of this keyevent. */
            extensionId?: string | undefined;
            /** Value of the physical key being pressed. The value is not affected by current keyboard layout or modifier state. */
            code: string;
            /** The deprecated HTML keyCode, which is system- and implementation-dependent numerical code signifying the unmodified identifier associated with the key pressed. */
            keyCode?: number | undefined;
            /** Whether or not the CAPS_LOCK is enabled. */
            capsLock?: boolean | undefined;
        }

        /** @since Chrome 44 */
        enum KeyboardEventType {
            KEYUP = "keyup",
            KEYDOWN = "keydown",
        }

        /**
         * The auto-capitalize type of the text field.
         * @since Chrome 69
         */
        enum AutoCapitalizeType {
            CHARACTERS = "characters",
            WORDS = "words",
            SENTENCES = "sentences",
        }

        /**
         * Type of value this text field edits, (Text, Number, URL, etc)
         * @since Chrome 44
         */
        enum InputContextType {
            TEXT = "text",
            SEARCH = "search",
            TEL = "tel",
            URL = "url",
            EMAIL = "email",
            NUMBER = "number",
            PASSWORD = "password",
            NULL = "null",
        }

        /** Describes an input Context */
        interface InputContext {
            /** This is used to specify targets of text field operations. This ID becomes invalid as soon as onBlur is called. */
            contextID: number;
            /** Type of value this text field edits, (Text, Number, URL, etc) */
            type: `${InputContextType}`;
            /** Whether the text field wants auto-correct. */
            autoCorrect: boolean;
            /** Whether the text field wants auto-complete. */
            autoComplete: boolean;
            /** Whether the text field wants spell-check. */
            spellCheck: boolean;
            /**
             * The auto-capitalize type of the text field.
             * @since Chrome 69
             */
            autoCapitalize: `${AutoCapitalizeType}`;
            /**
             * Whether text entered into the text field should be used to improve typing suggestions for the user.
             * @since Chrome 68
             */
            shouldDoLearning: boolean;
        }

        /** A menu item used by an input method to interact with the user from the language menu. */
        interface MenuItem {
            /** String that will be passed to callbacks referencing this MenuItem. */
            id: string;
            /** Text displayed in the menu for this item. */
            label?: string | undefined;
            /** The type of menu item. */
            style?: `${MenuItemStyle}` | undefined;
            /** Indicates this item is visible. */
            visible?: boolean | undefined;
            /** Indicates this item should be drawn with a check. */
            checked?: boolean | undefined;
            /** Indicates this item is enabled. */
            enabled?: boolean | undefined;
        }

        /**
         * The type of menu item. Radio buttons between separators are considered grouped.
         * @since Chrome 44
         */
        enum MenuItemStyle {
            CHECK = "check",
            RADIO = "radio",
            SEPARATOR = "separator",
        }

        interface CommitTextParameters {
            /** The text to commit */
            text: string;
            /** ID of the context where the text will be committed */
            contextID: number;
        }

        interface CandidateUsage {
            /** The title string of details description. */
            title: string;
            /** The body string of detail description. */
            body: string;
        }

        interface CandidateTemplate {
            /** The candidate */
            candidate: string;
            /** The candidate's id */
            id: number;
            /** The id to add these candidates under */
            parentId?: number | undefined;
            /** Short string displayed to next to the candidate, often the shortcut key or index */
            label?: string | undefined;
            /** Additional text describing the candidate */
            annotation?: string | undefined;
            /** The usage or detail description of word. */
            usage?: CandidateUsage | undefined;
        }

        interface CandidatesParameters {
            /** ID of the context that owns the candidate window. */
            contextID: number;
            /** List of candidates to show in the candidate window */
            candidates: CandidateTemplate[];
        }

        interface CompositionParameterSegment {
            /** Index of the character to start this segment at */
            start: number;
            /** Index of the character to end this segment after. */
            end: number;
            /** The type of the underline to modify this segment. */
            style: `${UnderlineStyle}`;
        }

        interface CompositionParameters {
            /** ID of the context where the composition text will be set */
            contextID: number;
            /** Text to set */
            text: string;
            /** List of segments and their associated types. */
            segments?: CompositionParameterSegment[] | undefined;
            /** Position in the text of the cursor. */
            cursor: number;
            /** Position in the text that the selection starts at. */
            selectionStart?: number | undefined;
            /** Position in the text that the selection ends at. */
            selectionEnd?: number | undefined;
        }

        /** @since Chrome 88 */
        interface MenuParameters {
            /** MenuItems to add or update. They will be added in the order they exist in the array. */
            items: MenuItem[];
            /** ID of the engine to use. */
            engineID: string;
        }

        /**
         * Which mouse buttons was clicked.
         * @since Chrome 44
         */
        enum MouseButton {
            LEFT = "left",
            MIDDLE = "middle",
            RIGHT = "right",
        }

        /**
         * The screen type under which the IME is activated.
         * @since Chrome 44
         */
        enum ScreenType {
            NORMAL = "normal",
            LOGIN = "login",
            LOCK = "lock",
            SECONDARY_LOGIN = "secondary-login",
        }

        /**
         * The type of the underline to modify this segment.
         * @since Chrome 44
         */
        enum UnderlineStyle {
            UNDERLINE = "underline",
            DOUBLE_UNDERLINE = "doubleUnderline",
            NO_UNDERLINE = "noUnderline",
        }

        /**
         * Where to display the candidate window. If set to 'cursor', the window follows the cursor. If set to 'composition', the window is locked to the beginning of the composition.
         * @since Chrome 44
         */
        enum WindowPosition {
            CURSOR = "cursor",
            COMPOSITION = "composition",
        }

        /** Type of assistive window. */
        enum AssistiveWindowType {
            UNDO = "undo",
        }

        /**
         * ID of a button in an assistive window.
         * @since Chrome 85
         */
        enum AssistiveWindowButton {
            UNDO = "undo",
            ADD_TO_DICTIONARY = "addToDictionary",
        }

        /**
         * Properties of the assistive window.
         * @since Chrome 85
         */
        interface AssistiveWindowProperties {
            type: `${AssistiveWindowType}`;
            /** Sets true to show AssistiveWindow, sets false to hide. */
            visible: boolean;
            /** Strings for ChromeVox to announce */
            announceString?: string | undefined;
        }

        interface CandidateWindowParameterProperties {
            /** True to show the cursor, false to hide it. */
            cursorVisible?: boolean | undefined;
            /** True if the candidate window should be rendered vertical, false to make it horizontal. */
            vertical?: boolean | undefined;
            /** The number of candidates to display per page. */
            pageSize?: number | undefined;
            /** True to display the auxiliary text, false to hide it. */
            auxiliaryTextVisible?: boolean | undefined;
            /** Text that is shown at the bottom of the candidate window. */
            auxiliaryText?: string | undefined;
            /** True to show the Candidate window, false to hide it. */
            visible?: boolean | undefined;
            /** Where to display the candidate window. */
            windowPosition?: `${WindowPosition}` | undefined;
            /**
             * The index of the current chosen candidate out of total candidates.
             * @since Chrome 84
             */
            currentCandidateIndex?: number | undefined;
            /**
             * The total number of candidates for the candidate window.
             * @since Chrome 84
             */
            totalCandidates?: number | undefined;
        }

        interface CandidateWindowParameter {
            /** ID of the engine to set properties on. */
            engineID: string;
            properties: CandidateWindowParameterProperties;
        }

        interface ClearCompositionParameters {
            /** ID of the context where the composition will be cleared */
            contextID: number;
        }

        interface CursorPositionParameters {
            /** ID of the candidate to select. */
            candidateID: number;
            /** ID of the context that owns the candidate window. */
            contextID: number;
        }

        interface SendKeyEventParameters {
            /** ID of the context where the key events will be sent, or zero to send key events to non-input field. */
            contextID: number;
            /** Data on the key event. */
            keyData: KeyboardEvent[];
        }

        interface DeleteSurroundingTextParameters {
            /** ID of the engine receiving the event. */
            engineID: string;
            /** ID of the context where the surrounding text will be deleted. */
            contextID: number;
            /** The offset from the caret position where deletion will start. This value can be negative. */
            offset: number;
            /** The number of characters to be deleted */
            length: number;
        }

        interface AssistiveWindowButtonHighlightedParameters {
            /** The text for the screenreader to announce. */
            announceString?: string | undefined;
            /** The ID of the button */
            buttonID: `${AssistiveWindowButton}`;
            /** ID of the context owning the assistive window. */
            contextID: number;
            /** Whether the button should be highlighted. */
            highlighted: boolean;
            /** The window type the button belongs to. */
            windowType: `${AssistiveWindowType}`;
        }

        interface AssistiveWindowPropertiesParameters {
            /** ID of the context owning the assistive window. */
            contextID: number;
            /** Properties of the assistive window. */
            properties: AssistiveWindowProperties;
        }

        interface SurroundingTextInfo {
            /** The text around the cursor. This is only a subset of all text in the input field. */
            text: string;
            /** The ending position of the selection. This value indicates caret position if there is no selection. */
            focus: number;
            /**
             * The offset position of `text`. Since `text` only includes a subset of text around the cursor, offset indicates the absolute position of the first character of `text`.
             * @since Chrome 46
             */
            offset: number;
            /** The beginning position of the selection. This value indicates caret position if there is no selection. */
            anchor: number;
        }

        interface AssistiveWindowButtonClickedDetails {
            /** The ID of the button clicked. */
            buttonID: `${AssistiveWindowButton}`;
            /** The type of the assistive window. */
            windowType: `${AssistiveWindowType}`;
        }

        /**
         * Adds the provided menu items to the language menu when this IME is active.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function setMenuItems(parameters: MenuParameters): Promise<void>;
        function setMenuItems(parameters: MenuParameters, callback: () => void): void;

        /**
         * Commits the provided text to the current input.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function commitText(parameters: CommitTextParameters): Promise<boolean>;
        function commitText(parameters: CommitTextParameters, callback: (success: boolean) => void): void;

        /**
         * Sets the current candidate list. This fails if this extension doesn't own the active IME
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function setCandidates(parameters: CandidatesParameters): Promise<boolean>;
        function setCandidates(parameters: CandidatesParameters, callback: (success: boolean) => void): void;

        /**
         * Set the current composition. If this extension does not own the active IME, this fails.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function setComposition(parameters: CompositionParameters): Promise<boolean>;
        function setComposition(parameters: CompositionParameters, callback: (success: boolean) => void): void;

        /**
         * Updates the state of the MenuItems specified
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function updateMenuItems(parameters: MenuParameters): Promise<void>;
        function updateMenuItems(parameters: MenuParameters, callback: () => void): void;

        /**
         * Shows/Hides an assistive window with the given properties.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function setAssistiveWindowProperties(
            parameters: AssistiveWindowPropertiesParameters,
        ): Promise<boolean>;
        function setAssistiveWindowProperties(
            parameters: AssistiveWindowPropertiesParameters,
            callback: (success: boolean) => void,
        ): void;

        /**
         * Highlights/Unhighlights a button in an assistive window.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function setAssistiveWindowButtonHighlighted(
            parameters: AssistiveWindowButtonHighlightedParameters,
        ): Promise<void>;
        function setAssistiveWindowButtonHighlighted(
            parameters: AssistiveWindowButtonHighlightedParameters,
            callback: () => void,
        ): void;

        /**
         * Sets the properties of the candidate window. This fails if the extension doesn't own the active IME
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function setCandidateWindowProperties(parameters: CandidateWindowParameter): Promise<boolean>;
        function setCandidateWindowProperties(
            parameters: CandidateWindowParameter,
            callback: (success: boolean) => void,
        ): void;

        /**
         * Clear the current composition. If this extension does not own the active IME, this fails.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function clearComposition(parameters: ClearCompositionParameters): Promise<boolean>;
        function clearComposition(
            parameters: ClearCompositionParameters,
            callback: (success: boolean) => void,
        ): void;

        /**
         * Set the position of the cursor in the candidate window. This is a no-op if this extension does not own the active IME.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function setCursorPosition(
            parameters: CursorPositionParameters,
        ): Promise<boolean>;
        function setCursorPosition(
            parameters: CursorPositionParameters,
            callback: (success: boolean) => void,
        ): void;

        /**
         * Sends the key events. This function is expected to be used by virtual keyboards. When key(s) on a virtual keyboard is pressed by a user, this function is used to propagate that event to the system.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function sendKeyEvents(parameters: SendKeyEventParameters): Promise<void>;
        function sendKeyEvents(parameters: SendKeyEventParameters, callback: () => void): void;

        /** Hides the input view window, which is popped up automatically by system. If the input view window is already hidden, this function will do nothing. */
        function hideInputView(): void;

        /**
         * Deletes the text around the caret.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 111.
         */
        function deleteSurroundingText(parameters: DeleteSurroundingTextParameters): Promise<void>;
        function deleteSurroundingText(parameters: DeleteSurroundingTextParameters, callback: () => void): void;

        /**
         * Indicates that the key event received by onKeyEvent is handled. This should only be called if the onKeyEvent listener is asynchronous.
         * @param requestId Request id of the event that was handled. This should come from keyEvent.requestId
         * @param response True if the keystroke was handled, false if not
         */
        function keyEventHandled(requestId: string, response: boolean): void;

        /** This event is sent when focus leaves a text box. It is sent to all extensions that are listening to this event, and enabled by the user. */
        const onBlur: events.Event<(contextID: number) => void>;

        /**
         * This event is sent when a button in an assistive window is clicked.
         * @since Chrome 85
         */
        const onAssistiveWindowButtonClicked: events.Event<
            (details: AssistiveWindowButtonClickedDetails) => void
        >;

        /** This event is sent if this extension owns the active IME. */
        const onCandidateClicked: events.Event<
            (engineID: string, candidateID: number, button: `${MouseButton}`) => void
        >;

        /** Fired when a key event is sent from the operating system. The event will be sent to the extension if this extension owns the active IME. The listener function should return true if the event was handled false if it was not. If the event will be evaluated asynchronously, this function must return undefined and the IME must later call keyEventHandled() with the result. */
        const onKeyEvent: events.Event<(engineID: string, keyData: KeyboardEvent, requestId: string) => void>;

        /** This event is sent when an IME is deactivated. It signals that the IME will no longer be receiving onKeyPress events. */
        const onDeactivated: events.Event<(engineID: string) => void>;

        /** This event is sent when the properties of the current InputContext change, such as the the type. It is sent to all extensions that are listening to this event, and enabled by the user. */
        const onInputContextUpdate: events.Event<(context: InputContext) => void>;

        /** This event is sent when an IME is activated. It signals that the IME will be receiving onKeyPress events. */
        const onActivate: events.Event<(engineID: string, screen: `${ScreenType}`) => void>;

        // /** This event is sent when focus enters a text box. It is sent to all extensions that are listening to this event, and enabled by the user. */
        const onFocus: events.Event<(context: InputContext) => void>;

        /** Called when the user selects a menu item */
        const onMenuItemActivated: events.Event<(engineID: string, name: string) => void>;

        /** Called when the editable string around caret is changed or when the caret position is moved. The text length is limited to 100 characters for each back and forth direction. */
        const onSurroundingTextChanged: events.Event<
            (engineID: string, surroundingInfo: SurroundingTextInfo) => void
        >;

        /** This event is sent when chrome terminates ongoing text input session. */
        const onReset: events.Event<(engineID: string) => void>;
    }
}

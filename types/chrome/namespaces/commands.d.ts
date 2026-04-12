declare namespace chrome {
    ////////////////////
    // Commands
    ////////////////////
    /**
     * Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the extension.
     *
     * Manifest: "commands"
     */
    namespace commands {
        interface Command {
            /** The name of the Extension Command */
            name?: string;
            /** The Extension Command description */
            description?: string;
            /** The shortcut active for this command, or blank if not active. */
            shortcut?: string;
        }

        /**
         * Returns all the registered extension commands for this extension and their shortcut (if active). Before Chrome 110, this command did not return `_execute_action`.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getAll(): Promise<Command[]>;
        function getAll(callback: (commands: Command[]) => void): void;

        /** Fired when a registered command is activated using a keyboard shortcut. */
        const onCommand: events.Event<(command: string, tab?: tabs.Tab) => void>;
    }
}

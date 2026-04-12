declare namespace chrome {
    ////////////////////
    // Google Cloud Messaging
    ////////////////////
    /**
     * Use `chrome.gcm` to enable apps and extensions to send and receive messages through Firebase Cloud Messaging (FCM).
     *
     * Permissions: "gcm"
     */
    namespace gcm {
        interface OutgoingMessage {
            /** The ID of the server to send the message to as assigned by Google API Console. */
            destinationId: string;
            /** The ID of the message. It must be unique for each message in scope of the applications. See the Cloud Messaging documentation for advice for picking and handling an ID. */
            messageId: string;
            /** Time-to-live of the message in seconds. If it is not possible to send the message within that time, an onSendError event will be raised. A time-to-live of 0 indicates that the message should be sent immediately or fail if it's not possible. The default value of time-to-live is 86,400 seconds (1 day) and the maximum value is 2,419,200 seconds (28 days). */
            timeToLive?: number | undefined;
            /** Message data to send to the server. Case-insensitive `goog.` and `google`, as well as case-sensitive `collapse_key` are disallowed as key prefixes. Sum of all key/value pairs should not exceed {@link gcm.MAX_MESSAGE_SIZE}. */
            data: { [key: string]: unknown };
        }

        /** The maximum size (in bytes) of all key/value pairs in a message. */
        const MAX_MESSAGE_SIZE: 4096;

        /**
         * Registers the application with FCM. The registration ID will be returned by the `callback`. If `register` is called again with the same list of `senderIds`, the same registration ID will be returned.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         * @param senderIds A list of server IDs that are allowed to send messages to the application. It should contain at least one and no more than 100 sender IDs.
         */
        function register(senderIds: string[]): Promise<string>;
        function register(senderIds: string[], callback: (registrationId: string) => void): void;

        /**
         * Unregister the application from FCM.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         */
        function unregister(): Promise<void>;
        function unregister(callback: () => void): void;

        /**
         * Sends a message according to its contents.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         * @param message A message to send to the other party via FCM.
         */
        function send(message: OutgoingMessage): Promise<string>;
        function send(message: OutgoingMessage, callback: (messageId: string) => void): void;

        /** Fired when a message is received through FCM. */
        const onMessage: events.Event<
            (message: {
                /** The collapse key of a message. See the Non-collapsible and collapsible messages for details. */
                collapseKey?: string;
                /** The message data. */
                data: { [key: string]: unknown };
                /** The sender who issued the message. */
                from?: string;
            }) => void
        >;

        /** Fired when a FCM server had to delete messages sent by an app server to the application. See Lifetime of a message for details on handling this event. */
        const onMessagesDeleted: events.Event<() => void>;

        /** Fired when it was not possible to send a message to the FCM server. */
        const onSendError: events.Event<
            (error: {
                /** Additional details related to the error, when available. */
                details: { [key: string]: unknown };
                /** The error message describing the problem. */
                errorMessage: string;
                /** The ID of the message with this error, if error is related to a specific message. */
                messageId?: string;
            }) => void
        >;
    }
}

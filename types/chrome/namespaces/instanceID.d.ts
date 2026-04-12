declare namespace chrome {
    ////////////////////
    // Instance ID
    ////////////////////
    /**
     * Use `chrome.instanceID` to access the Instance ID service.
     *
     * Permissions: "gcm"
     * @since Chrome 44
     */
    namespace instanceID {
        /**
         * Resets the app instance identifier and revokes all tokens associated with it.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function deleteID(): Promise<void>;
        function deleteID(callback: () => void): void;

        /** Parameters for {@link deleteToken}. */
        interface DeleteTokenParams {
            /**
             * The authorized entity that is used to obtain the token.
             * @since Chrome 46
             */
            authorizedEntity: string;
            /**
             * The scope that is used to obtain the token.
             * @since Chrome 46
             */
            scope: string;
        }

        /**
         * Revokes a granted token.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function deleteToken(deleteTokenParams: DeleteTokenParams): Promise<void>;
        function deleteToken(
            deleteTokenParams: DeleteTokenParams,
            callback: () => void,
        ): void;

        /**
         * Retrieves the time when the InstanceID has been generated.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @return The time when the Instance ID has been generated, represented in milliseconds since the epoch.
         */
        function getCreationTime(): Promise<number>;
        function getCreationTime(callback: (creationTime: number) => void): void;

        /**
         * Retrieves an identifier for the app instance.
         * The same ID will be returned as long as the application identity has not been revoked or expired.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @return An Instance ID assigned to the app instance.
         */
        function getID(): Promise<string>;
        function getID(callback: (instanceID: string) => void): void;

        /** Parameters for {@link getToken}. */
        interface GetTokenParams {
            /**
             * Identifies the entity that is authorized to access resources associated with this Instance ID. It can be a project ID from Google developer console.
             * @since Chrome 46
             */
            authorizedEntity: string;
            /**
             * Allows including a small number of string key/value pairs that will be associated with the token and may be used in processing the request.
             * @deprecated since Chrome 89. `options` are deprecated and will be ignored.
             */
            options?: { [key: string]: string };
            /**
             * Identifies authorized actions that the authorized entity can take. E.g. for sending GCM messages, `GCM` scope should be used.
             * @since Chrome 46
             */
            scope: string;
        }
        /**
         * Return a token that allows the authorized entity to access the service defined by scope.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @return A token assigned by the requested service.
         */
        function getToken(getTokenParams: GetTokenParams): Promise<string>;
        function getToken(getTokenParams: GetTokenParams, callback: (token: string) => void): void;

        const onTokenRefresh: events.Event<() => void>;
    }
}

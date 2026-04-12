declare namespace chrome {
    ////////////////////
    // Enterprise Platform Keys
    ////////////////////
    /**
     * Use the `chrome.enterprise.platformKeys` API to generate keys and install certificates for these keys. The certificates will be managed by the platform and can be used for TLS authentication, network access or by other extension through {@link chrome.platformKeys}.
     *
     * Permissions: "enterprise.platformKeys"
     *
     * Note: Only available to policy installed extensions.
     * @platform ChromeOS only
     */
    namespace enterprise.platformKeys {
        interface Token {
            /**
             * Uniquely identifies this Token.
             * Static IDs are `user` and `system`, referring to the platform's user-specific and the system-wide hardware token, respectively. Any other tokens (with other identifiers) might be returned by enterprise.platformKeys.getTokens.
             */
            id: string;
            /**
             * Implements the WebCrypto's SubtleCrypto interface. The cryptographic operations, including key generation, are hardware-backed.
             *
             * Only non-extractable keys can be generated. The supported key types are RSASSA-PKCS1-V1_5 with `modulusLength` up to 2048 and ECDSA with `namedCurve` P-256. Each key can be used for signing data at most once, unless the extension is allowlisted by the KeyPermissions policy, in which case the key can be used indefinitely.
             *
             * Keys generated on a specific `Token` cannot be used with any other Tokens, nor can they be used with `window.crypto.subtle`. Equally, `Key` objects created with `window.crypto.subtle` cannot be used with this interface.
             */
            subtleCrypto: SubtleCrypto;
            /**
             * Implements the WebCrypto's SubtleCrypto interface. The cryptographic operations, including key generation, are software-backed. Protection of the keys, and thus implementation of the non-extractable property, is done in software, so the keys are less protected than hardware-backed keys.
             *
             * Only non-extractable keys can be generated. The only supported key type is RSASSA-PKCS1-V1_5 with `modulusLength` up to 2048. up to 2048. Each key can be used for signing data at most once, unless the extension is allowlisted through the KeyPermissions policy, in which case the key can be used indefinitely.
             *
             * Keys generated on a specific `Token` cannot be used with any other Tokens, nor can they be used with `window.crypto.subtle`. Equally, `Key` objects created with `window.crypto.subtle` cannot be used with this interface.
             * @since Chrome 97
             */
            softwareBackedSubtleCrypto: SubtleCrypto;
        }

        /** @since Chrome 110 */
        interface ChallengeKeyOptions {
            /**
             * A challenge as emitted by the Verified Access Web API.
             */
            challenge: ArrayBuffer;
            /**
             * Which Enterprise Key to challenge.
             * @since Chrome 110
             */
            scope: `${Scope}`;
            /**
             * If present, registers the challenged key with the specified scope's token.
             * The key can then be associated with a certificate and used like any other signing key.
             * Subsequent calls to this function will then generate a new Enterprise Key in the specified scope.
             */
            registerKey?: RegisterKeyOptions | undefined;
        }

        /** @since Chrome 110 */
        interface RegisterKeyOptions {
            /**
             * Which algorithm the registered key should use.
             */
            algorithm: `${Algorithm}`;
        }

        /**
         * Type of key to generate.
         * @since Chrome 110
         */
        enum Algorithm {
            ECDSA = "ECDSA",
            RSA = "RSA",
        }

        /**
         * Whether to use the Enterprise User Key or the Enterprise Machine Key.
         * @since Chrome 110
         */
        enum Scope {
            USER = "USER",
            MACHINE = "MACHINE",
        }

        /**
         * Returns the available Tokens. In a regular user's session the list will always contain the user's token with id "user". If a system-wide TPM token is available, the returned list will also contain the system-wide token with id "system". The system-wide token will be the same for all sessions on this device (device in the sense of e.g. a Chromebook).
         *
         * Can return its result via Promise since Chrome 131.
         */
        function getTokens(): Promise<Token[]>;
        function getTokens(callback: (tokens: Token[]) => void): void;

        /**
         * Returns the list of all client certificates available from the given token. Can be used to check for the existence and expiration of client certificates that are usable for a certain authentication.
         * @param tokenId The id of a Token returned by getTokens.
         *
         * Can return its result via Promise since Chrome 131.
         */
        function getCertificates(tokenId: string): Promise<ArrayBuffer[]>;
        function getCertificates(tokenId: string, callback: (certificates: ArrayBuffer[]) => void): void;

        /**
         * Imports `certificate` to the given token if the certified key is already stored in this token. After a successful certification request, this function should be used to store the obtained certificate and to make it available to the operating system and browser for authentication.
         * @param tokenId The id of a Token returned by getTokens.
         * @param certificate The DER encoding of a X.509 certificate.
         *
         * Can return its result via Promise since Chrome 131.
         */
        function importCertificate(tokenId: string, certificate: ArrayBuffer): Promise<void>;
        function importCertificate(tokenId: string, certificate: ArrayBuffer, callback: () => void): void;

        /**
         * Removes `certificate` from the given token if present. Should be used to remove obsolete certificates so that they are not considered during authentication and do not clutter the certificate choice. Should be used to free storage in the certificate store.
         * @param tokenId The id of a Token returned by getTokens.
         * @param certificate The DER encoding of a X.509 certificate.
         *
         * Can return its result via Promise since Chrome 131.
         */
        function removeCertificate(tokenId: string, certificate: ArrayBuffer): Promise<void>;
        function removeCertificate(tokenId: string, certificate: ArrayBuffer, callback: () => void): void;

        /**
         * Similar to `challengeMachineKey` and `challengeUserKey`, but allows specifying the algorithm of a registered key. Challenges a hardware-backed Enterprise Machine Key and emits the response as part of a remote attestation protocol. Only useful on ChromeOS and in conjunction with the Verified Access Web API which both issues challenges and verifies responses.
         *
         * A successful verification by the Verified Access Web API is a strong signal that the current device is a legitimate ChromeOS device, the current device is managed by the domain specified during verification, the current signed-in user is managed by the domain specified during verification, and the current device state complies with enterprise device policy. For example, a policy may specify that the device must not be in developer mode. Any device identity emitted by the verification is tightly bound to the hardware of the current device. If `user` Scope is specified, the identity is also tightly bound to the current signed-in user.
         *
         * This function is highly restricted and will fail if the current device is not managed, the current user is not managed, or if this operation has not explicitly been enabled for the caller by enterprise device policy. The challenged key does not reside in the `system` or `user` token and is not accessible by any other API.
         *
         * @param options Object containing the fields defined in {@link ChallengeKeyOptions}.
         *
         * Can return its result via Promise since Chrome 131.
         * @since Chrome 110
         */
        function challengeKey(options: ChallengeKeyOptions): Promise<ArrayBuffer>;
        function challengeKey(options: ChallengeKeyOptions, callback: (response: ArrayBuffer) => void): void;

        /**
         * @deprecated Deprecated since Chrome 110, use {@link challengeKey} instead.
         *
         * Challenges a hardware-backed Enterprise Machine Key and emits the response as part of a remote attestation protocol. Only useful on Chrome OS and in conjunction with the Verified Access Web API which both issues challenges and verifies responses. A successful verification by the Verified Access Web API is a strong signal of all of the following:
         *
         * * The current device is a legitimate ChromeOS device.
         * * The current device is managed by the domain specified during verification.
         * * The current signed-in user is managed by the domain specified during verification.
         * * The current device state complies with enterprise device policy. For example, a policy may specify that the device must not be in developer mode.
         * * Any device identity emitted by the verification is tightly bound to the hardware of the current device.
         *
         * This function is highly restricted and will fail if the current device is not managed, the current user is not managed, or if this operation has not explicitly been enabled for the caller by enterprise device policy. The Enterprise Machine Key does not reside in the `system` token and is not accessible by any other API.
         * @param challenge A challenge as emitted by the Verified Access Web API.
         * @param registerKey If set, the current Enterprise Machine Key is registered with the `system` token and relinquishes the Enterprise Machine Key role. The key can then be associated with a certificate and used like any other signing key. This key is 2048-bit RSA. Subsequent calls to this function will then generate a new Enterprise Machine Key. Since Chrome 59.
         *
         * Can return its result via Promise since Chrome 131.
         * @since Chrome 50
         */
        function challengeMachineKey(challenge: ArrayBuffer): Promise<ArrayBuffer>;
        function challengeMachineKey(challenge: ArrayBuffer, registerKey: boolean): Promise<ArrayBuffer>;
        function challengeMachineKey(challenge: ArrayBuffer, callback: (response: ArrayBuffer) => void): void;
        function challengeMachineKey(
            challenge: ArrayBuffer,
            registerKey: boolean,
            callback: (response: ArrayBuffer) => void,
        ): void;

        /**
         * @deprecated Deprecated since Chrome 110, use {@link challengeKey} instead.
         *
         * Challenges a hardware-backed Enterprise User Key and emits the response as part of a remote attestation protocol. Only useful on ChromeOS and in conjunction with the Verified Access Web API which both issues challenges and verifies responses. A successful verification by the Verified Access Web API is a strong signal of all of the following:
         *
         * * The current device is a legitimate ChromeOS device.
         * * The current device is managed by the domain specified during verification.
         * * The current signed-in user is managed by the domain specified during verification.
         * * The current device state complies with enterprise user policy. For example, a policy may specify that the device must not be in developer mode.
         * * The public key emitted by the verification is tightly bound to the hardware of the current device and to the current signed-in user.
         *
         * This function is highly restricted and will fail if the current device is not managed, the current user is not managed, or if this operation has not explicitly been enabled for the caller by enterprise user policy. The Enterprise User Key does not reside in the `user` token and is not accessible by any other API.
         * @param challenge A challenge as emitted by the Verified Access Web API.
         * @param registerKey If set, the current Enterprise User Key is registered with the `user` token and relinquishes the Enterprise User Key role. The key can then be associated with a certificate and used like any other signing key. This key is 2048-bit RSA. Subsequent calls to this function will then generate a new Enterprise User Key.
         * @param callback Called back with the challenge response.
         * @since Chrome 50
         */
        function challengeUserKey(challenge: ArrayBuffer, registerKey: boolean): Promise<ArrayBuffer>;
        function challengeUserKey(
            challenge: ArrayBuffer,
            registerKey: boolean,
            callback: (response: ArrayBuffer) => void,
        ): void;
    }
}

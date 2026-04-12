declare namespace chrome {
    ////////////////////
    // Certificate Provider
    ////////////////////
    /**
     * Use this API to expose certificates to the platform which can use these certificates for TLS authentications.
     *
     * Manifest: "certificateProvider"
     * @platform ChromeOS only
     * @since Chrome 46
     */
    namespace certificateProvider {
        /** Types of supported cryptographic signature algorithms. */
        enum Algorithm {
            /**
             * Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the MD5-SHA-1 hashing. The extension must not prepend a DigestInfo prefix but only add PKCS#1 padding.
             * @deprecated This algorithm is deprecated and will never be requested by Chrome as of version 109.
             */
            RSASSA_PKCS1_V1_5_MD5_SHA1 = "RSASSA_PKCS1_v1_5_MD5_SHA1",
            /** Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the SHA-1 hash function. */
            RSASSA_PKCS1_V1_5_SHA1 = "RSASSA_PKCS1_v1_5_SHA1",
            /** Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the SHA-256 hashing function. */
            RSASSA_PKCS1_V1_5_SHA256 = "RSASSA_PKCS1_v1_5_SHA256",
            /** Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the SHA-384 hashing function. */
            RSASSA_PKCS1_V1_5_SHA384 = "RSASSA_PKCS1_v1_5_SHA384",
            /** Specifies the RSASSA PKCS#1 v1.5 signature algorithm with the SHA-512 hashing function. */
            RSASSA_PKCS1_V1_5_SHA512 = "RSASSA_PKCS1_v1_5_SHA512",
            /** Specifies the RSASSA PSS signature algorithm with the SHA-256 hashing function, MGF1 mask generation function and the salt of the same size as the hash. */
            RSASSA_PSS_SHA256 = "RSASSA_PSS_SHA256",
            /** Specifies the RSASSA PSS signature algorithm with the SHA-384 hashing function, MGF1 mask generation function and the salt of the same size as the hash. */
            RSASSA_PSS_SHA384 = "RSASSA_PSS_SHA384",
            /** Specifies the RSASSA PSS signature algorithm with the SHA-512 hashing function, MGF1 mask generation function and the salt of the same size as the hash. */
            RSASSA_PSS_SHA512 = "RSASSA_PSS_SHA512",
        }

        interface CertificateInfo {
            /** Must be the DER encoding of a X.509 certificate. Currently, only certificates of RSA keys are supported. */
            certificate: ArrayBuffer;
            /** Must be set to all hashes supported for this certificate. This extension will only be asked for signatures of digests calculated with one of these hash algorithms. This should be in order of decreasing hash preference. */
            supportedHashes: `${Hash}`[];
        }

        /** @since Chrome 86 */
        interface CertificatesUpdateRequest {
            /** Request identifier to be passed to {@link setCertificates}. */
            certificatesRequestId: number;
        }

        /** @since Chrome 86 */
        interface ClientCertificateInfo {
            /**
             * The array must contain the DER encoding of the X.509 client certificate as its first element.
             *
             * This must include exactly one certificate.
             */
            certificateChain: ArrayBuffer[];
            /** All algorithms supported for this certificate. The extension will only be asked for signatures using one of these algorithms. */
            supportedAlgorithms: `${Algorithm}`[];
        }

        /**
         * Types of errors that the extension can report.
         * @since Chrome 86
         */
        enum Error {
            GENERAL_ERROR = "GENERAL_ERROR",
        }

        /** @deprecated Replaced by {@link Algorithm}.*/
        enum Hash {
            /** Specifies the MD5 and SHA1 hashing algorithms. */
            MD5_SHA1 = "MD5_SHA1",
            /** Specifies the SHA1 hashing algorithm. */
            SHA1 = "SHA1",
            /** Specifies the SHA256 hashing algorithm. */
            SHA256 = "SHA256",
            /** Specifies the SHA384 hashing algorithm. */
            SHA384 = "SHA384",
            /** Specifies the SHA512 hashing algorithm. */
            SHA512 = "SHA512",
        }

        /**
         * The types of errors that can be presented to the user through the requestPin function.
         * @since Chrome 57
         */
        enum PinRequestErrorType {
            /** Specifies the PIN is invalid. */
            INVALID_PIN = "INVALID_PIN",
            /** Specifies the PUK is invalid. */
            INVALID_PUK = "INVALID_PUK",
            /** Specifies the maximum attempt number has been exceeded. */
            MAX_ATTEMPTS_EXCEEDED = "MAX_ATTEMPTS_EXCEEDED",
            /** Specifies that the error cannot be represented by the above types. */
            UNKNOWN_ERROR = "UNKNOWN_ERROR",
        }

        /**
         * The type of code being requested by the extension with requestPin function.
         * @since Chrome 57
         */
        enum PinRequestType {
            /** Specifies the requested code is a PIN. */
            PIN = "PIN",
            /** Specifies the requested code is a PUK. */
            PUK = "PUK",
        }

        /** @since Chrome 57 */
        interface PinResponseDetails {
            /** The code provided by the user. Empty if user closed the dialog or some other error occurred. */
            userInput?: string | undefined;
        }

        /** @since Chrome 86 */
        interface ReportSignatureDetails {
            /** Error that occurred while generating the signature, if any. */
            error?: `${Error}` | undefined;
            /** Request identifier that was received via the {@link onSignatureRequested} event. */
            signRequestId: number;
            /** The signature, if successfully generated. */
            signature?: ArrayBuffer | undefined;
        }

        /** @since Chrome 57 */
        interface RequestPinDetails {
            /** The number of attempts left. This is provided so that any UI can present this information to the user. Chrome is not expected to enforce this, instead stopPinRequest should be called by the extension with errorType = MAX_ATTEMPTS_EXCEEDED when the number of pin requests is exceeded. */
            attemptsLeft?: number | undefined;
            /** The error template displayed to the user. This should be set if the previous request failed, to notify the user of the failure reason. */
            errorType?: `${PinRequestErrorType}` | undefined;
            /** The type of code requested. Default is PIN. */
            requestType?: `${PinRequestType}` | undefined;
            /** The ID given by Chrome in SignRequest. */
            signRequestId: number;
        }

        /** @since Chrome 86 */
        interface SetCertificatesDetails {
            /** When called in response to {@link onCertificatesUpdateRequested}, should contain the received `certificatesRequestId` value. Otherwise, should be unset. */
            certificatesRequestId?: number | undefined;
            /** List of currently available client certificates. */
            clientCertificates: ClientCertificateInfo[];
            /** Error that occurred while extracting the certificates, if any. This error will be surfaced to the user when appropriate. */
            error?: `${Error}` | undefined;
        }

        /**  @since Chrome 86 */
        interface SignatureRequest {
            /** Signature algorithm to be used. */
            algorithm: `${Algorithm}`;
            /** The DER encoding of a X.509 certificate. The extension must sign `input` using the associated private key. */
            certificate: ArrayBuffer;
            /** Data to be signed. Note that the data is not hashed. */
            input: ArrayBuffer;
            /** Request identifier to be passed to {@link reportSignature}. */
            signRequestId: number;
        }

        interface SignRequest {
            /** The DER encoding of a X.509 certificate. The extension must sign `digest` using the associated private key. */
            certificate: ArrayBuffer;
            /**  The digest that must be signed. */
            digest: ArrayBuffer;
            /** Refers to the hash algorithm that was used to create `digest`. */
            hash: `${Hash}`;
            /**
             * The unique ID to be used by the extension should it need to call a method that requires it, e.g. requestPin.
             * @since Chrome 57
             */
            signRequestId: number;
        }

        /** @since Chrome 57 */
        interface StopPinRequestDetails {
            /** The error template. If present it is displayed to user. Intended to contain the reason for stopping the flow if it was caused by an error, e.g. MAX\_ATTEMPTS\_EXCEEDED. */
            errorType?: `${PinRequestErrorType}` | undefined;
            /** The ID given by Chrome in SignRequest. */
            signRequestId: number;
        }

        /**
         * Should be called as a response to {@link onSignatureRequested}.
         *
         * The extension must eventually call this function for every {@link onSignatureRequested} event; the API implementation will stop waiting for this call after some time and respond with a timeout error when this function is called.
         *
         * Can return its result via Promise since Chrome 96.
         * @since Chrome 86
         */
        function reportSignature(details: ReportSignatureDetails): Promise<void>;
        function reportSignature(details: ReportSignatureDetails, callback: () => void): void;

        /**
         * Requests the PIN from the user. Only one ongoing request at a time is allowed. The requests issued while another flow is ongoing are rejected. It's the extension's responsibility to try again later if another flow is in progress.
         *
         * Can return its result via Promise since Chrome 96.
         * @param details Contains the details about the requested dialog.
         * @since Chrome 57
         */
        function requestPin(details: RequestPinDetails): Promise<PinResponseDetails | undefined>;
        function requestPin(
            details: RequestPinDetails,
            callback: (details?: PinResponseDetails | undefined) => void,
        ): void;

        /**
         * Sets a list of certificates to use in the browser.
         *
         * The extension should call this function after initialization and on every change in the set of currently available certificates. The extension should also call this function in response to {@link onCertificatesUpdateRequested} every time this event is received.
         *
         * Can return its result via Promise since Chrome 96.
         * @param details The certificates to set. Invalid certificates will be ignored.
         * @since Chrome 86
         */
        function setCertificates(details: SetCertificatesDetails): Promise<void>;
        function setCertificates(details: SetCertificatesDetails, callback: () => void): void;

        /**
         * Stops the pin request started by the {@link requestPin} function.
         *
         * Can return its result via Promise since Chrome 96.
         * @param details Contains the details about the reason for stopping the request flow.
         * @since Chrome 57
         */
        function stopPinRequest(details: StopPinRequestDetails): Promise<void>;
        function stopPinRequest(details: StopPinRequestDetails, callback: () => void): void;

        /**
         * This event fires if the certificates set via {@link setCertificates} are insufficient or the browser requests updated information. The extension must call {@link setCertificates} with the updated list of certificates and the received `certificatesRequestId`.
         * @since Chrome 86
         */
        const onCertificatesUpdateRequested: events.Event<(request: CertificatesUpdateRequest) => void>;

        /**
         * This event fires every time the browser needs to sign a message using a certificate provided by this extension via {@link setCertificates}.
         *
         * The extension must sign the input data from `request` using the appropriate algorithm and private key and return it by calling {@link reportSignature} with the received `signRequestId`.
         * @since Chrome 86
         */
        const onSignatureRequested: events.Event<(request: SignatureRequest) => void>;
    }
}

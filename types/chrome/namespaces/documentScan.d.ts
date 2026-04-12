declare namespace chrome {
    ////////////////////
    // Document Scan
    ////////////////////
    /**
     * Use the `chrome.documentScan` API to discover and retrieve images from attached document scanners.
     * The Document Scan API is designed to allow apps and extensions to view the content of paper documents on an attached document scanner.
     *
     * Permissions: "documentScan"
     * @platform ChromeOS only
     * @since Chrome 44
     */
    namespace documentScan {
        /** @since Chrome 125 */
        interface CancelScanResponse<T> {
            /** Provides the same job handle that was passed to {@link cancelScan}. */
            job: T;
            /** The backend's cancel scan result. If the result is `OperationResult.SUCCESS` or `OperationResult.CANCELLED`, the scan has been cancelled and the scanner is ready to start a new scan. If the result is `OperationResult.DEVICE_BUSY` , the scanner is still processing the requested cancellation; the caller should wait a short time and try the request again. Other result values indicate a permanent error that should not be retried. */
            result: `${OperationResult}`;
        }

        /** @since Chrome 125 */
        interface CloseScannerResponse<T> {
            /** The same scanner handle as was passed to {@link closeScanner}. */
            scannerHandle: T;
            /** The result of closing the scanner. Even if this value is not `SUCCESS`, the handle will be invalid and should not be used for any further operations. */
            result: `${OperationResult}`;
        }

        /**
         * How an option can be changed.
         * @since Chrome 125
         */
        enum Configurability {
            /** The option is read-only. */
            NOT_CONFIGURABLE = "NOT_CONFIGURABLE",
            /** The option can be set in software. */
            SOFTWARE_CONFIGURABLE = "SOFTWARE_CONFIGURABLE",
            /** The option can be set by the user toggling or pushing a button on the scanner. */
            HARDWARE_CONFIGURABLE = "HARDWARE_CONFIGURABLE",
        }

        /**
         * Indicates how the scanner is connected to the computer.
         * @since Chrome 125
         */
        enum ConnectionType {
            UNSPECIFIED = "UNSPECIFIED",
            USB = "USB",
            NETWORK = "NETWORK",
        }

        /**
         * The data type of constraint represented by an {@link OptionConstraint}.
         * @since Chrome 125
         */
        enum ConstraintType {
            /** The constraint on a range of `OptionType.INT` values. The `min`, `max`, and `quant` properties of `OptionConstraint` will be `long`, and its `list` property will be unset. */
            INT_RANGE = "INT_RANGE",
            /** The constraint on a range of `OptionType.FIXED` values. The `min`, `max`, and `quant` properties of `OptionConstraint` will be `double`, and its `list` property will be unset. */
            FIXED_RANGE = "FIXED_RANGE",
            /** The constraint on a specific list of `OptionType.INT` values. The `OptionConstraint.list` property will contain `long` values, and the other properties will be unset. */
            INT_LIST = "INT_LIST",
            /** The constraint on a specific list of `OptionType.FIXED` values. The `OptionConstraint.list` property will contain `double` values, and the other properties will be unset. */
            FIXED_LIST = "FIXED_LIST",
            /** The constraint on a specific list of `OptionType.STRING` values. The `OptionConstraint.list` property will contain `DOMString` values, and the other properties will be unset. */
            STRING_LIST = "STRING_LIST",
        }

        /** @since Chrome 125 */
        interface DeviceFilter {
            /** Only return scanners that are directly attached to the computer. */
            local?: boolean;
            /** Only return scanners that use a secure transport, such as USB or TLS. */
            secure?: boolean;
        }

        /** @since Chrome 125 */
        interface GetOptionGroupsResponse<T> {
            /** If `result` is `SUCCESS`, provides a list of option groups in the order supplied by the scanner driver. */
            groups?: OptionGroup[];
            /** The result of getting the option groups. If the value of this is `SUCCESS`, the `groups` property will be populated. */
            result: `${OperationResult}`;
            /** The same scanner handle as was passed to {@link getOptionGroups}. */
            scannerHandle: T;
        }

        /** @since Chrome 125 */
        interface GetScannerListResponse {
            /** The enumeration result. Note that partial results could be returned even if this indicates an error. */
            result: `${OperationResult}`;
            /** A possibly-empty list of scanners that match the provided {@link DeviceFilter}. */
            scanners: ScannerInfo[];
        }

        /** @since Chrome 125 */
        interface OpenScannerResponse<T> {
            /** If `result` is `SUCCESS`, provides a key-value mapping where the key is a device-specific option and the value is an instance of {@link ScannerOption}. */
            options?: { [name: string]: unknown };
            /** The result of opening the scanner. If the value of this is `SUCCESS`, the `scannerHandle` and `options` properties will be populated. */
            result: `${OperationResult}`;
            /** If `result` is `SUCCESS`, a handle to the scanner that can be used for further operations. */
            scannerHandle?: string;
            /** The scanner ID passed to {@link openScanner}. */
            scannerId: T;
        }

        /**
         * An enum that indicates the result of each operation.
         * @since Chrome 125
         */
        enum OperationResult {
            /** An unknown or generic failure occurred. */
            UNKNOWN = "UNKNOWN",
            /**The operation succeeded. */
            SUCCESS = "SUCCESS",
            /** The operation is not supported. */
            UNSUPPORTED = "UNSUPPORTED",
            /** The operation was cancelled. */
            CANCELLED = "CANCELLED",
            /** The device is busy. */
            DEVICE_BUSY = "DEVICE_BUSY",
            /** Either the data or an argument passed to the method is not valid. */
            INVALID = "INVALID",
            /** The supplied value is the wrong data type for the underlying option. */
            WRONG_TYPE = "WRONG_TYPE",
            /** No more data is available. */
            EOF = "EOF",
            /** The document feeder is jammed */
            ADF_JAMMED = "ADF_JAMMED",
            /** The document feeder is empty */
            ADF_EMPTY = "ADF_EMPTY",
            /** The flatbed cover is open. */
            COVER_OPEN = "COVER_OPEN",
            /** An error occurred while communicating with the device. */
            IO_ERROR = "IO_ERROR",
            /** The device requires authentication. */
            ACCESS_DENIED = "ACCESS_DENIED",
            /** Not enough memory is available on the Chromebook to complete the operation. */
            NO_MEMORY = "NO_MEMORY",
            /** The device is not reachable. */
            UNREACHABLE = "UNREACHABLE",
            /** The device is disconnected. */
            MISSING = "MISSING",
            /** An error has occurred somewhere other than the calling application. */
            INTERNAL_ERROR = "INTERNAL_ERROR",
        }

        /** @since Chrome 125 */
        interface OptionConstraint {
            list?: string[] | number[];
            max?: number;
            min?: number;
            quant?: number;
            type: `${ConstraintType}`;
        }

        /** @since Chrome 125 */
        interface OptionGroup {
            /** An array of option names in driver-provided order. */
            members: string[];
            /** Provides a printable title, for example "Geometry options". */
            title: string;
        }

        /** @since Chrome 125 */
        interface OptionSetting {
            /** Indicates the name of the option to set. */
            name: string;
            /** Indicates the data type of the option. The requested data type must match the real data type of the underlying option. */
            type: `${OptionType}`;
            /** Indicates the value to set. Leave unset to request automatic setting for options that have `autoSettable` enabled. The data type supplied for `value` must match `type`. */
            value?: string | number | boolean | number[];
        }

        /**
         * The data type of an option.
         * @since Chrome 125
         */
        enum OptionType {
            /** The option's data type is `unknown`. The value property will be unset. */
            UNKNOWN = "UNKNOWN",
            /** The `value` property will be one of `true` false. */
            BOOL = "BOOL",
            /** A signed 32-bit integer. The `value` property will be long or long[], depending on whether the option takes more than one value. */
            INT = "INT",
            /** A double in the range -32768-32767.9999 with a resolution of 1/65535. The `value` property will be double or double[] depending on whether the option takes more than one value. Double values that can't be exactly represented will be rounded to the available range and precision. */
            FIXED = "FIXED",
            /** A sequence of any bytes except NUL ('\0'). The `value` property will be a DOMString. */
            STRING = "STRING",
            /** An option of this type has no value. Instead, setting an option of this type causes an option-specific side effect in the scanner driver. For example, a button-typed option could be used by a scanner driver to provide a means to select default values or to tell an automatic document feeder to advance to the next sheet of paper. */
            BUTTON = "BUTTON",
            /** Grouping option. No value. This is included for compatibility, but will not normally be returned in `ScannerOption` values. Use `getOptionGroups()` to retrieve the list of groups with their member options. */
            GROUP = "GROUP",
        }

        /**
         * Indicates the data type for {@link ScannerOption.unit}.
         * @since Chrome 125
         */
        enum OptionUnit {
            /** The value is a unitless number. For example, it can be a threshold. */
            UNITLESS = "UNITLESS",
            /** The value is a number of pixels, for example, scan dimensions. */
            PIXEL = "PIXEL",
            /** The value is the number of bits, for example, color depth. */
            BIT = "BIT",
            /** The value is measured in millimeters, for example, scan dimensions. */
            MM = "MM",
            /** The value is measured in dots per inch, for example, resolution. */
            DPI = "DPI",
            /** The value is a percent, for example, brightness. */
            PERCENT = "PERCENT",
            /** The value is measured in microseconds, for example, exposure time. */
            MICROSECOND = "MICROSECOND",
        }

        /** @since Chrome 125 */
        interface ReadScanDataResponse<T> {
            /** If `result` is `SUCCESS`, contains the _next_ chunk of scanned image data. If `result` is `EOF`, contains the _last_ chunk of scanned image data. */
            data?: ArrayBuffer;
            /** If `result` is `SUCCESS`, an estimate of how much of the total scan data has been delivered so far, in the range 0 to 100. */
            estimatedCompletion?: number;
            /** Provides the job handle passed to {@link readScanData}. */
            job: T;
            /** The result of reading data. If its value is `SUCCESS`, then `data` contains the _next_ (possibly zero-length) chunk of image data that is ready for reading. If its value is `EOF`, the `data` contains the _last_ chunk of image data. */
            result: `${OperationResult}`;
        }

        /** @since Chrome 125 */
        interface ScannerInfo {
            /** Indicates how the scanner is connected to the computer. */
            connectionType: `${ConnectionType}`;
            /** For matching against other `ScannerInfo` entries that point to the same physical device. */
            deviceUuid: string;
            /** An array of MIME types that can be requested for returned scans. */
            imageFormats: string[];
            /** The scanner manufacturer. */
            manufacturer: string;
            /** The scanner model if it is available, or a generic description. */
            model: string;
            /** A human-readable name for the scanner to display in the UI. */
            name: string;
            /** A human-readable description of the protocol or driver used to access the scanner, such as Mopria, WSD, or epsonds. This is primarily useful for allowing a user to choose between protocols if a device supports multiple protocols. */
            protocolType: string;
            /** The ID of a specific scanner. */
            scannerId: string;
            /** If true, the scanner connection's transport cannot be intercepted by a passive listener, such as TLS or USB. */
            secure: boolean;
        }

        /** @since Chrome 125 */
        interface ScannerOption {
            /** Indicates whether and how the option can be changed. */
            configurability: `${Configurability}`;
            /** Defines {@link OptionConstraint} on the current scanner option. */
            constraint?: OptionConstraint;
            /** A longer description of the option. */
            description: string;
            /** Indicates the option is active and can be set or retrieved. If false, the `value` property will not be set. */
            isActive: boolean;
            /** Indicates that the UI should not display this option by default. */
            isAdvanced: boolean;
            /** Can be automatically set by the scanner driver. */
            isAutoSettable: boolean;
            /** Indicates that this option can be detected from software. */
            isDetectable: boolean;
            /** Emulated by the scanner driver if true. */
            isEmulated: boolean;
            /** The option name using lowercase ASCII letters, numbers, and dashes. Diacritics are not allowed. */
            name: string;
            /** A printable one-line title. */
            title: string;
            /** The data type contained in the `value` property, which is needed for setting this option. */
            type: `${OptionType}`;
            /** The unit of measurement for this option. */
            unit: `${OptionUnit}`;
            /** The current value of the option, if relevant. Note that the data type of this property must match the data type specified in `type`. */
            value?: string | number | boolean | number[];
        }

        interface ScanOptions {
            /** The number of scanned images allowed. The default is 1. */
            maxImages?: number;
            /** The MIME types that are accepted by the caller. */
            mimeTypes?: string[];
        }

        interface ScanResults {
            /** An array of data image URLs in a form that can be passed as the "src" value to an image tag. */
            dataUrls: string[];
            /** The MIME type of the `dataUrls`. */
            mimeType: string;
        }

        /** @since Chrome 125 */
        interface SetOptionResult {
            /**  Indicates the name of the option that was set. */
            name: string;
            /** Indicates the result of setting the option. */
            result: `${OperationResult}`;
        }

        /** @since Chrome 125 */
        interface SetOptionsResponse<T> {
            /**
             * An updated key-value mapping from option names to {@link ScannerOption} values containing the new configuration after attempting to set all supplied options. This has the same structure as the `options` property in {@link OpenScannerResponse}.
             *
             * This property will be set even if some options were not set successfully, but will be unset if retrieving the updated configuration fails (for example, if the scanner is disconnected in the middle of scanning).
             */
            options?: { [name: string]: unknown };
            /** An array of results, one each for every passed-in `OptionSetting`. */
            results: SetOptionResult[];
            /** Provides the scanner handle passed to {@link setOptions}. */
            scannerHandle: T;
        }

        /** @since Chrome 125 */
        interface StartScanOptions {
            /** Specifies the MIME type to return scanned data in. */
            format: string;
            /** If a non-zero value is specified, limits the maximum scanned bytes returned in a single {@link readScanData} response to that value. The smallest allowed value is 32768 (32 KB). If this property is not specified, the size of a returned chunk may be as large as the entire scanned image. */
            maxReadSize?: number;
        }

        /** @since Chrome 125 */
        interface StartScanResponse<T> {
            /** If `result` is `SUCCESS`, provides a handle that can be used to read scan data or cancel the job. */
            job?: string;
            /**  The result of starting a scan. If the value of this is `SUCCESS`, the `job` property will be populated. */
            result: `${OperationResult}`;
            /** Provides the same scanner handle that was passed to {@link startScan}. */
            scannerHandle: T;
        }

        /**
         * Cancels a started scan and returns a Promise that resolves with a {@link CancelScanResponse} object. If a callback is used, the object is passed to it instead.
         * @param job The handle of an active scan job previously returned from a call to {@link startScan}.
         * @since Chrome 125
         */
        function cancelScan<T = string>(job: T): Promise<CancelScanResponse<T>>;
        function cancelScan<T = string>(job: T, callback: (response: CancelScanResponse<T>) => void): void;

        /**
         * Closes the scanner with the passed in handle and returns a Promise that resolves with a {@link CloseScannerResponse} object. If a callback is used, the object is passed to it instead. Even if the response is not a success, the supplied handle becomes invalid and should not be used for further operations.
         * @param scannerHandle Specifies the handle of an open scanner that was previously returned from a call to {@link openScanner}.
         * @since Chrome 125
         */
        function closeScanner<T = string>(scannerHandle: T): Promise<CloseScannerResponse<T>>;
        function closeScanner<T = string>(
            scannerHandle: T,
            callback: (response: CloseScannerResponse<T>) => void,
        ): void;

        /**
         * Gets the group names and member options from a scanner previously opened by {@link openScanner}. This method returns a Promise that resolves with a {@link GetOptionGroupsResponse} object. If a callback is passed to this function, returned data is passed to it instead.
         * @param scannerHandle The handle of an open scanner returned from a call to {@link openScanner}.
         * @since Chrome 125
         */
        function getOptionGroups<T = string>(scannerHandle: T): Promise<GetOptionGroupsResponse<T>>;
        function getOptionGroups<T = string>(
            scannerHandle: T,
            callback: (response: GetOptionGroupsResponse<T>) => void,
        ): void;

        /**
         * Gets the list of available scanners and returns a Promise that resolves with a {@link GetScannerListResponse} object. If a callback is passed to this function, returned data is passed to it instead.
         * @param filter A {@link DeviceFilter} indicating which types of scanners should be returned.
         * @since Chrome 125
         */
        function getScannerList(filter: DeviceFilter): Promise<GetScannerListResponse>;
        function getScannerList(
            filter: DeviceFilter,
            callback: (response: GetScannerListResponse) => void,
        ): void;

        /**
         * Opens a scanner for exclusive access and returns a Promise that resolves with an {@link OpenScannerResponse} object. If a callback is passed to this function, returned data is passed to it instead.
         * @param scannerId The ID of a scanner to be opened. This value is one returned from a previous call to {@link getScannerList}.
         * @since Chrome 125
         */
        function openScanner<T = string>(scannerId: T): Promise<OpenScannerResponse<T>>;
        function openScanner<T = string>(
            scannerId: T,
            callback: (response: OpenScannerResponse<T>) => void,
        ): void;

        /**
         * Reads the next chunk of available image data from an active job handle, and returns a Promise that resolves with a {@link ReadScanDataResponse} object. If a callback is used, the object is passed to it instead.
         *
         * **Note:**It is valid for a response result to be `SUCCESS` with a zero-length `data` member. This means the scanner is still working but does not yet have additional data ready. The caller should wait a short time and try again.
         *
         * When the scan job completes, the response will have the result value of `EOF`. This response may contain a final non-zero `data` member.
         * @param job Active job handle previously returned from {@link startScan}.
         * @since Chrome 125
         */
        function readScanData<T = string>(job: T): Promise<ReadScanDataResponse<T>>;
        function readScanData<T = string>(job: T, callback: (response: ReadScanDataResponse<T>) => void): void;

        /**
         * Performs a document scan and returns a Promise that resolves with a {@link ScanResults} object. If a callback is passed to this function, the returned data is passed to it instead.
         * @param options An object containing scan parameters.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function scan(options: ScanOptions): Promise<ScanResults>;
        function scan(options: ScanOptions, callback: (result: ScanResults) => void): void;

        /**
         * Sets options on the specified scanner and returns a Promise that resolves with a {@link SetOptionsResponse} object containing the result of trying to set every value in the order of the passed-in {@link OptionSetting} object. If a callback is used, the object is passed to it instead.
         * @param scannerHandle The handle of the scanner to set options on. This should be a value previously returned from a call to {@link openScanner}.
         * @param options A list of `OptionSetting` objects to be applied to the scanner.
         * @since Chrome 125
         */
        function setOptions<T = string>(
            scannerHandle: T,
            options: OptionSetting[],
        ): Promise<SetOptionsResponse<T>>;
        function setOptions<T = string>(
            scannerHandle: T,
            options: OptionSetting[],
            callback: (response: SetOptionsResponse<T>) => void,
        ): void;

        /**
         * Starts a scan on the specified scanner and returns a Promise that resolves with a {@link StartScanResponse}. If a callback is used, the object is passed to it instead. If the call was successful, the response includes a job handle that can be used in subsequent calls to read scan data or cancel a scan.
         * @param scannerHandle The handle of an open scanner. This should be a value previously returned from a call to {@link openScanner}.
         * @param options A {@link StartScanOptions} object indicating the options to be used for the scan. The `StartScanOptions.format` property must match one of the entries returned in the scanner's `ScannerInfo`.
         * @since Chrome 125
         */
        function startScan<T = string>(
            scannerHandle: T,
            options: StartScanOptions,
        ): Promise<StartScanResponse<T>>;
        function startScan<T = string>(
            scannerHandle: T,
            options: StartScanOptions,
            callback: (response: StartScanResponse<T>) => void,
        ): void;
    }
}

declare namespace chrome {
    ////////////////////
    // Printing
    ////////////////////
    /**
     * Use the `chrome.printing` API to send print jobs to printers installed on Chromebook.

    * Permissions: "printing"
    * @platform ChromeOS only
    * @since Chrome 81
    */
    namespace printing {
        interface GetPrinterInfoResponse {
            /** Printer capabilities in [CDD format](https://developers.google.com/cloud-print/docs/cdd#cdd-example). The property may be missing. */
            capabilities?: { [key: string]: unknown };
            /** The status of the printer. */
            status: PrinterStatus;
        }

        /** Status of the print job. */
        enum JobStatus {
            /** Print job is received on Chrome side but was not processed yet. */
            PENDING = "PENDING",
            /** Print job is sent for printing. */
            IN_PROGRESS = "IN_PROGRESS",
            /** Print job was interrupted due to some error. */
            FAILED = "FAILED",
            /** Print job was canceled by the user or via API. */
            CANCELED = "CANCELED",
            /** Print job was printed without any errors. */
            PRINTED = "PRINTED",
        }

        interface Printer {
            /** The human-readable description of the printer. */
            description: string;
            /** The printer's identifier; guaranteed to be unique among printers on the device. */
            id: string;
            /** The flag which shows whether the printer fits DefaultPrinterSelection rules. Note that several printers could be flagged. */
            isDefault: boolean;
            /** The name of the printer. */
            name: string;
            /**
             * The value showing how recent the printer was used for printing from Chrome.
             * The lower the value is the more recent the printer was used.
             * The minimum value is 0.
             * Missing value indicates that the printer wasn't used recently.
             * This value is guaranteed to be unique amongst printers.
             */
            recentlyUsedRank?: number;
            /** The source of the printer (user or policy configured). */
            source: PrinterSource;
            /** The printer URI. This can be used by extensions to choose the printer for the user. */
            uri: string;
        }

        /** The source of the printer. */
        enum PrinterSource {
            /** Printer was added by user. */
            USER = "USER",
            /** Printer was added via policy. */
            POLICY = "POLICY",
        }

        /** The status of the printer. */
        enum PrinterStatus {
            /** The door of the printer is open. Printer still accepts print jobs. */
            DOOR_OPEN = "DOOR_OPEN",
            /** The tray of the printer is missing. Printer still accepts print jobs. */
            TRAY_MISSING = "TRAY_MISSING",
            /** The printer is out of ink. Printer still accepts print jobs. */
            OUT_OF_INK = "OUT_OF_INK",
            /** The printer is out of paper. Printer still accepts print jobs. */
            OUT_OF_PAPER = "OUT_OF_PAPER",
            /** The output area of the printer (e.g. tray) is full. Printer still accepts print jobs. */
            OUTPUT_FULL = "OUTPUT_FULL",
            /** The printer has a paper jam. Printer still accepts print jobs. */
            PAPER_JAM = "PAPER_JAM",
            /** Some generic issue. Printer still accepts print jobs. */
            GENERIC_ISSUE = "GENERIC_ISSUE",
            /** The printer is stopped and doesn't print but still accepts print jobs. */
            STOPPED = "STOPPED",
            /** The printer is unreachable and doesn't accept print jobs. */
            UNREACHABLE = "UNREACHABLE",
            /** The SSL certificate is expired. Printer accepts jobs but they fail. */
            EXPIRED_CERTIFICATE = "EXPIRED_CERTIFICATE",
            /** The printer is available. */
            AVAILABLE = "AVAILABLE",
        }

        interface SubmitJobRequest {
            /**
             * The print job to be submitted.
             * Supported content types are "application/pdf" and "image/png". The Cloud Job Ticket shouldn't include `FitToPageTicketItem`, `PageRangeTicketItem` and `ReverseOrderTicketItem` fields since they are irrelevant for native printing. `VendorTicketItem` is optional
             * All other fields must be present.
             */
            job: chrome.printerProvider.PrintJob;
        }

        interface SubmitJobResponse {
            /** The id of created print job. This is a unique identifier among all print jobs on the device. If status is not OK, jobId will be null. */
            jobId: string | null;
            /** The status of the request. */
            status: SubmitJobStatus;
        }

        /** The status of submitJob request. */
        enum SubmitJobStatus {
            /** Sent print job request is accepted. */
            OK = "OK",
            /** Sent print job request is rejected by the user. */
            USER_REJECTED = "USER_REJECTED",
        }

        /** The maximum number of times that getPrinterInfo can be called per minute. */
        const MAX_GET_PRINTER_INFO_CALLS_PER_MINUTE: 20;

        /** The maximum number of times that submitJob can be called per minute. */
        const MAX_SUBMIT_JOB_CALLS_PER_MINUTE: 40;

        /**
         * Cancels previously submitted job.
         * Can return its result via Promise in Manifest V3 or later since Chrome 100.
         */
        function cancelJob(jobId: string): Promise<void>;
        function cancelJob(jobId: string, callback: () => void): void;

        /**
         * Returns the status of the print job. This call will fail with a runtime error if the print job with the given `jobId` doesn't exist. `jobId`: The id of the print job to return the status of. This should be the same id received in a {@link SubmitJobResponse}.
         * @since Chrome 135
         */
        function getJobStatus(jobId: string): Promise<`${JobStatus}`>;
        function getJobStatus(jobId: string, callback: (status: `${JobStatus}`) => void): void;

        /**
         * Returns the status and capabilities of the printer in CDD format. This call will fail with a runtime error if no printers with given id are installed.
         * Can return its result via Promise in Manifest V3 or later since Chrome 100.
         */
        function getPrinterInfo(printerId: string): Promise<GetPrinterInfoResponse>;
        function getPrinterInfo(printerId: string, callback: (response: GetPrinterInfoResponse) => void): void;

        /**
         * Returns the list of available printers on the device. This includes manually added, enterprise and discovered printers.
         * Can return its result via Promise in Manifest V3 or later since Chrome 100.
         */
        function getPrinters(): Promise<Printer[]>;
        function getPrinters(callback: (printers: Printer[]) => void): void;

        /**
         * Submits the job for printing. If the extension is not listed in the PrintingAPIExtensionsAllowlist policy, the user is prompted to accept the print job.
         * Can return its result via Promise in Manifest V3 or later since Chrome 120.
         */
        function submitJob(request: SubmitJobRequest): Promise<SubmitJobResponse>;
        function submitJob(request: SubmitJobRequest, callback: (response: SubmitJobResponse) => void): void;

        /**
         * Event fired when the status of the job is changed. This is only fired for the jobs created by this extension.
         */
        const onJobStatusChanged: chrome.events.Event<(jobId: string, status: `${JobStatus}`) => void>;
    }
}

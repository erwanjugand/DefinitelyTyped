declare namespace chrome {
    ////////////////////
    // Printing Metrics
    ////////////////////
    /**
     * Use the `chrome.printingMetrics` API to fetch data about printing usage.
     *
     * Permissions: "printingMetrics"
     *
     * Note: Only available to policy installed extensions.
     * @platform ChromeOS only
     * @since Chrome 79
     */
    namespace printingMetrics {
        enum ColorMode {
            /** Specifies that black and white mode was used. */
            BLACK_AND_WHITE = "BLACK_AND_WHITE",
            /** Specifies that color mode was used. */
            COLOR = "COLOR",
        }

        enum DuplexMode {
            /** Specifies that one-sided printing was used. */
            ONE_SIDED = "ONE_SIDED",
            /** Specifies that two-sided printing was used, flipping on long edge. */
            TWO_SIDED_LONG_EDGE = "TWO_SIDED_LONG_EDGE",
            /** Specifies that two-sided printing was used, flipping on short edge. */
            TWO_SIDED_SHORT_EDGE = "TWO_SIDED_SHORT_EDGE",
        }

        interface MediaSize {
            /** Height (in micrometers) of the media used for printing. */
            height: number;
            /**
             * Vendor-provided ID, e.g. "iso_a3_297x420mm" or "na_index-3x5_3x5in".
             * Possible values are values of "media" IPP attribute and can be found on [IANA page](https://www.iana.org/assignments/ipp-registrations/ipp-registrations.xhtml).
             */
            vendorId: string;
            /** Width (in micrometers) of the media used for printing. */
            width: number;
        }

        interface Printer {
            /** Displayed name of the printer. */
            name: string;
            /** The source of the printer. */
            source: PrinterSource;
            /** The full path for the printer. Contains protocol, hostname, port, and queue. */
            uri: string;
        }

        /** The source of the printer. */
        enum PrinterSource {
            /** Specifies that the printer was added by user. */
            USER = "USER",
            /** Specifies that the printer was added via policy. */
            POLICY = "POLICY",
        }

        interface PrintJobInfo {
            /** The job completion time (in milliseconds past the Unix epoch). */
            completionTime: number;
            /** The job creation time (in milliseconds past the Unix epoch). */
            creationTime: number;
            /** The ID of the job. */
            id: string;
            /** The number of pages in the document. */
            numberOfPages: number;
            /** The info about the printer which printed the document. */
            printer: Printer;
            /**
             * The status of the printer.
             * @since Chrome 85
             */
            printer_status: chrome.printing.PrinterStatus;
            /** The settings of the print job. */
            settings: PrintSettings;
            /** Source showing who initiated the print job. */
            source: PrintJobSource;
            /** ID of source. Null if source is PRINT_PREVIEW or ANDROID_APP. */
            sourceId: string | null;
            /** The final status of the job. */
            status: PrintJobStatus;
            /** The title of the document which was printed. */
            title: string;
        }

        /** The source of the print job. */
        enum PrintJobSource {
            /** Specifies that the job was created from the Print Preview page initiated by the user. */
            PRINT_PREVIEW = "PRINT_PREVIEW",
            /** Specifies that the job was created from an Android App. */
            ANDROID_APP = "ANDROID_APP",
            /** Specifies that the job was created by extension via Chrome API. */
            EXTENSION = "EXTENSION",
            /** Specifies that the job was created by an Isolated Web App via API. */
            ISOLATED_WEB_APP = "ISOLATED_WEB_APP",
        }

        /** Specifies the final status of the print job. */
        enum PrintJobStatus {
            /** Specifies that the print job was interrupted due to some error. */
            FAILED = "FAILED",
            /** Specifies that the print job was canceled by the user or via API. */
            CANCELED = "CANCELED",
            /** Specifies that the print job was printed without any errors. */
            PRINTED = "PRINTED",
        }

        interface PrintSettings {
            /** The requested color mode. */
            color: ColorMode;
            /** The requested number of copies. */
            copies: number;
            /** The requested duplex mode. */
            duplex: DuplexMode;
            /** The requested media size. */
            mediaSize: MediaSize;
        }

        /**
         * Returns the list of the finished print jobs.
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getPrintJobs(): Promise<PrintJobInfo[]>;
        function getPrintJobs(callback: (jobs: PrintJobInfo[]) => void): void;

        /** Event fired when the print job is finished. This includes any of termination statuses: FAILED, CANCELED and PRINTED. */
        const onPrintJobFinished: chrome.events.Event<(jobInfo: PrintJobInfo) => void>;
    }
}

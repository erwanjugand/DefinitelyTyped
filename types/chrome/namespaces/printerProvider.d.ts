declare namespace chrome {
    ////////////////////
    // Printer Provider
    ////////////////////
    /**
     * The `chrome.printerProvider` API exposes events used by print manager to query printers controlled by extensions, to query their capabilities and to submit print jobs to these printers.
     *
     * Permissions: "printerProvider"
     * @since Chrome 44
     */
    namespace printerProvider {
        interface PrinterInfo {
            /** Unique printer ID. */
            id: string;
            /** Printer's human readable name. */
            name: string;
            /** Printer's human readable description. */
            description?: string | undefined;
        }

        /** Error codes returned in response to {@link onPrintRequested} event. */
        enum PrintError {
            /** Specifies that the operation was completed successfully. */
            OK = "OK",
            /** Specifies that a general failure occured. */
            FAILED = "FAILED",
            /** Specifies that the print ticket is invalid. For example, the ticket is inconsistent with some capabilities, or the extension is not able to handle all settings from the ticket. */
            INVALID_TICKET = "INVALID_TICKET",
            /** Specifies that the document is invalid. For example, data may be corrupted or the format is incompatible with the extension. */
            INVALID_DATA = "INVALID_DATA",
        }

        interface PrinterCapabilities {
            /** Device capabilities in CDD format. */
            capabilities: { [key: string]: unknown };
        }

        interface PrintJob {
            /** ID of the printer which should handle the job. */
            printerId: string;
            /** The print job title. */
            title: string;
            /** Print ticket in CJT format. */
            ticket: { [key: string]: unknown };
            /** The document content type. Supported formats are `application/pdf` and `image/pwg-raster`. */
            contentType: string;
            /** Blob containing the document data to print. Format must match `contentType`. */
            document: Blob;
        }

        /** from https://developer.chrome.com/docs/apps/reference/usb#type-Device */
        interface Device {
            /** An opaque ID for the USB device. It remains unchanged until the device is unplugged. */
            device: number;
            /**
             * The iManufacturer string read from the device, if available.
             * @since Chrome 46
             */
            manufacturerName: string;
            /** The product ID. */
            productId: number;
            /**
             * The iProduct string read from the device, if available.
             * @since Chrome 46
             */
            productName: string;
            /**
             * The iSerialNumber string read from the device, if available.
             * @since Chrome 46
             */
            serialNumber: string;
            /** The device vendor ID. */
            vendorId: number;
            /**
             * The device version (bcdDevice field).
             * @since Chrome 51
             */
            version: number;
        }

        /** Event fired when print manager requests printers provided by extensions. */
        const onGetPrintersRequested: events.Event<
            (resultCallback: (printerInfo: PrinterInfo[]) => void) => void
        >;

        /**
         * Event fired when print manager requests information about a USB device that may be a printer.
         *
         * Note: An application should not rely on this event being fired more than once per device. If a connected device is supported it should be returned in the {@link onGetPrintersRequested} event.
         * @since Chrome 45
         */
        const onGetUsbPrinterInfoRequested: events.Event<
            (device: Device, resultCallback: (printerInfo?: PrinterInfo) => void) => void
        >;

        /** Event fired when print manager requests printer capabilities. */
        const onGetCapabilityRequested: events.Event<
            (printerId: string, resultCallback: (capabilities: PrinterCapabilities) => void) => void
        >;

        /** Event fired when print manager requests printing. */
        const onPrintRequested: events.Event<
            (printJob: PrintJob, resultCallback: (result: `${PrintError}`) => void) => void
        >;
    }
}

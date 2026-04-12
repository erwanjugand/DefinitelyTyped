declare namespace chrome {
    ////////////////////
    // System CPU
    ////////////////////
    /**
     * Use the `system.cpu` API to query CPU metadata.
     *
     * Permissions: "system.cpu"
     */
    namespace system.cpu {
        interface CpuTime {
            /** The cumulative time used by userspace programs on this processor. */
            user: number;
            /** The cumulative time used by kernel programs on this processor. */
            kernel: number;
            /** The cumulative time spent idle by this processor. */
            idle: number;
            /** The total cumulative time for this processor. This value is equal to user + kernel + idle. */
            total: number;
        }

        /** @deprecated Use {@link CpuTime} instead. */
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface ProcessorUsage extends CpuTime {}

        interface ProcessorInfo {
            /** Cumulative usage info for this logical processor. */
            usage: CpuTime;
        }

        interface CpuInfo {
            /** The number of logical processors. */
            numOfProcessors: number;
            /** The architecture name of the processors. */
            archName: string;
            /** The model name of the processors. */
            modelName: string;
            /**
             * A set of feature codes indicating some of the processor's capabilities.
             * The currently supported codes are "mmx", "sse", "sse2", "sse3", "ssse3", "sse4_1", "sse4_2", and "avx".
             */
            features: string[];
            /** Information about each logical processor. */
            processors: ProcessorInfo[];
            /**
             * List of CPU temperature readings from each thermal zone of the CPU. Temperatures are in degrees Celsius.
             * @since Chrome 60
             */
            temperatures: number[];
        }

        /**
         * Queries basic CPU information of the system.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 91.
         */
        function getInfo(): Promise<CpuInfo>;
        function getInfo(callback: (info: CpuInfo) => void): void;
    }
}

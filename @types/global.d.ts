
export { };

declare global
{
    interface Performance extends Performance
    {
        /**
         * Returns the size of the JavaScript heap which can be helpful to measure and reduce the memory footprint of websites. Only exists on Chrome else undefined. 
         */
        memory: {
            /** The maximum size of the heap, in bytes, that is available to the context. */
            jsHeapSizeLimit: number;
            /** The total allocated heap size, in bytes. */
            totalJSHeapSize: number;
            /** The currently active segment of JS heap, in bytes. */
            usedJSHeapSize: number;
        };
    }
}

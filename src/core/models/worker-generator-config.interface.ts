/**
 * Interface for the worker generator config.
 */
export interface WorkerGeneratorConfig {
  /**
   * The number of data items to generate.
   */
  dataSize: number;

  /**
   * Ids of the data items for overwrite.
   */
  additionalIds: string[];
}

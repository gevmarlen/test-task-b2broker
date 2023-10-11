import { DataItem } from '../models';

/**
 * Helper class for generating random data.
 */
export class DataGeneratorHelper {
  /**
   * Creates a random data item with random values.
   */
  public static createRandomDataItem(): DataItem {
    return new DataItem(
      this.generateRandomString(10),
      this.generateRandomInteger(1, 1000),
      this.generateRandomFloat(0, 1, 18),
      this.generateRandomColor(),
      {
        id: this.generateRandomString(5),
        color: this.generateRandomColor(),
      }
    );
  }

  /**
   * Generates a random string of the given length.
   *
   * @param length
   * @private
   */
  private static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generates a random integer between min and max.
   *
   * @param min
   * @param max
   * @private
   */
  private static generateRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a random float between min and max with the given precision.
   *
   * @param min
   * @param max
   * @param precision
   * @private
   */
  private static generateRandomFloat(min: number, max: number, precision: number): number {
    const value: number = Math.random() * (max - min) + min;
    return parseFloat(value.toFixed(precision));
  }

  /**
   * Generates a random color.
   *
   * @private
   */
  private static generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color: string = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

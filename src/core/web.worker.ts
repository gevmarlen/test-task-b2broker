/// <reference lib="webworker" />

import { DataGeneratorHelper } from './helpers';
import { DataItem, WorkerGeneratorConfig } from './models';

addEventListener('message', ({ data }: { data: WorkerGeneratorConfig }): void => {
  // According to logic, data should be generated in the socket and sent to the worker,
  // but I decided to delegate it to the worker for better performance.
  const dataItems: DataItem[] = generateData(data);

  data.additionalIds.forEach((id: string, index: number): void => {
    dataItems[index].id = id;
  });

  postMessage(dataItems);
});

function generateData(data: WorkerGeneratorConfig): DataItem[] {
  return Array.from({ length: data.dataSize }, () => DataGeneratorHelper.createRandomDataItem());
}

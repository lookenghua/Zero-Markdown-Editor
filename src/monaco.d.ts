/*eslint-disable*/
declare namespace monaco {
  interface Environment {
    baseUrl?: string
    getWorker?(workerId: string, label: string): Worker
    getWorkerUrl?(workerId: string, label: string): string
  }
}

let MonacoEnvironment: monaco.Environment | undefined

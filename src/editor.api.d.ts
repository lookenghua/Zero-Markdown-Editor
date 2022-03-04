/*eslint-disable*/
interface Environment {
  baseUrl?: string
  getWorker?(workerId: string, label: string): Worker
  getWorkerUrl?(workerId: string, label: string): string
}

declare global {
  let MonacoEnvironment: Environment | undefined
}

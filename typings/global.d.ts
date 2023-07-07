declare interface Window {
  $storage: {
    setType: (key: 'localStorage' | 'sessionStorage') => any
    get: (key: string) => unkonwn | undefined
    set: (key: string, val: unknown) => void
    remove: (key: string) => void
    clear: () => void
  }
}

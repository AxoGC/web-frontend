export function numberTransform(defaultValue = 0) {
  return {
    transform: {
      get: (v: any) => {
        const n = Number(v)
        return isNaN(n) ? defaultValue : n
      },
      set: (v: number) => String(v)
    }
  }
}

export const booleanTransform = {
  transform: {
    get: (v: any) => v === 'true',
    set: (v: boolean) => String(v)
  }
}


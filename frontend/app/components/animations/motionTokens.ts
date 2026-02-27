export type MotionTokenSet = {
  durations: {
    micro: number
    tabSwitch: number
    contentSwap: number
  }
  easing: {
    standard: [number, number, number, number]
    emphasized: [number, number, number, number]
  }
  springs: {
    cursor: {
      stiffness: number
      damping: number
      mass: number
    }
  }
}

export type CountUpConfig = {
  minDuration: number
  maxDuration: number
  inViewAmount: number
  ease: [number, number, number, number]
}

export type CategoryAccentMap<K extends string = string> = Record<
  K,
  {
    activeBorder: string
    activeGlow: string
    activeTint: string
    hoverBorder: string
    hoverTint: string
  }
>

export const motionTokens: MotionTokenSet = {
  durations: {
    micro: 0.16,
    tabSwitch: 0.24,
    contentSwap: 0.3,
  },
  easing: {
    standard: [0.22, 1, 0.36, 1],
    emphasized: [0.16, 1, 0.3, 1],
  },
  springs: {
    cursor: {
      stiffness: 320,
      damping: 34,
      mass: 0.22,
    },
  },
}

export const countUpDefaults: CountUpConfig = {
  minDuration: 2.2,
  maxDuration: 3.0,
  inViewAmount: 0.5,
  ease: [0.22, 1, 0.36, 1],
}

'use client'

import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import {useEffect, useRef, useState} from 'react'

import {countUpDefaults} from '@/app/components/animations/motionTokens'

type CountUpValueProps = {
  value: number
  suffix?: string
  className?: string
}

function getDurationForValue(value: number): number {
  const normalized = Math.min(Math.max(value / 120, 0), 1)
  return (
    countUpDefaults.minDuration +
    (countUpDefaults.maxDuration - countUpDefaults.minDuration) * normalized
  )
}

export default function CountUpValue({value, suffix = '', className}: CountUpValueProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, {
    amount: countUpDefaults.inViewAmount,
    margin: '0px 0px -10% 0px',
  })
  const prefersReducedMotion = useReducedMotion()

  const counter = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState(0)

  useMotionValueEvent(counter, 'change', (latest) => {
    setDisplayValue(Math.round(latest))
  })

  useEffect(() => {
    if (prefersReducedMotion) {
      counter.set(value)
      return
    }

    if (!inView) {
      counter.set(0)
      return
    }

    counter.set(0)

    const controls = animate(counter, value, {
      duration: getDurationForValue(value),
      ease: countUpDefaults.ease,
    })

    return () => {
      controls.stop()
    }
  }, [counter, inView, prefersReducedMotion, value])

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  )
}

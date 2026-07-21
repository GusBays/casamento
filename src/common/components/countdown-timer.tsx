"use client"

import { useEffect, useState } from "react"

const TARGET_DATE = new Date("2026-10-17T14:30:00-03:00").getTime()

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET_DATE - Date.now())
  const totalSeconds = Math.floor(diff / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function FlipUnit({ label, value }: { label: string; value: string }) {
  return (
    <div className="flip-unit">
      <div className="flip-digits" aria-label={`${value} ${label}`}>
        {value.split("").map((digit, index) => (
          <span className="flip-digit" key={`${label}-${index}`}>
            {digit}
          </span>
        ))}
      </div>
      <span className="flip-label">{label}</span>
    </div>
  )
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const units = [
    { label: "DIAS", value: String(timeLeft.days).padStart(3, "0") },
    { label: "HORAS", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "MIN", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "SEG", value: String(timeLeft.seconds).padStart(2, "0") },
  ]

  return (
    <div className="flip-clock" aria-label="Contagem regressiva para 17 de outubro às 14h30">
      {units.map((unit, index) => (
        <div className="flip-clock__group" key={unit.label}>
          <FlipUnit label={unit.label} value={unit.value} />
          {index < units.length - 1 ? <span className="flip-separator">:</span> : null}
        </div>
      ))}
    </div>
  )
}

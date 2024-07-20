import React from "react"
import styled from "styled-components"

// TODO: MUST REFACTOR THIS COMPONENT

const Container = styled.div`
  height: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  // TODO: this might be tricky. children are out of the container
  margin-right: .5rem;
`

const Point = styled.div<
  {
    left: number
    fixed: boolean
  }
>`
  width: .5rem;
  height: .5rem;
  position: absolute;
  left: ${props => props.left.toFixed(2)}%;
  background-color: ${props => props.fixed ? "#eee" : "#c0debf"};
  z-index: ${props => props.fixed ? 0 : 1};
`

export default function GrassActivity(
  {
    dates,
    range,
  }: {
    dates: Date[]
    range?: Date[]
  },
) {
  const activityDates = dates.sort((a, b) => a.getTime() - b.getTime())
  const steps = parseSteps(range ?? [], activityDates.at(0))
  const points = calculatePoints(steps, activityDates)
  return (
    <Container>
      {
        points.map((point, index) => {
          return (
            <Point
              key={index}
              left={point.rate * 100}
              fixed={point.isFixed}
            >
            </Point>
          )
        })
      }
    </Container>
  )
}

function parseSteps(range: Date[], fallback?: Date) {
  function getMinimumDate() {
    return fallback !== undefined
      ? (fallback > range[0] ? minusDays(new Date(), 10) : fallback)
      : minusDays(new Date(), 10)
  }
  const steps = []
  if (range.length === 0) {
    steps.push(getMinimumDate())
    steps.push(new Date())
  } else if (range.length === 1) {
    steps.unshift(getMinimumDate())
  }
  return steps
}

function minusDays(date: Date, days: number) {
  return new Date(date.setDate(date.getDate() - days))
}

function calculatePoints(steps: Date[], dates: Date[]): Point[] {
  const range = steps[steps.length - 1].getTime() - steps[0].getTime()
  const points = steps.map(x => (
    {
      date: x,
      rate: (x.getTime() - steps[0].getTime()) / range,
      isFixed: true,
    }
  ))
  return dates
    .filter(x => x >= steps[0] && x <= steps[steps.length - 1])
    .sort((a, b) => a.getTime() - b.getTime())
    .reduce((acc, date) => {
      const p = {
        date,
        rate: (date.getTime() - steps[0].getTime()) / range,
        isFixed: false,
      }
      acc.splice(acc.length - 1, 0, p)
      return acc
    }, points)
}

type Point = {
  date: Date
  rate: number
  isFixed: boolean
}

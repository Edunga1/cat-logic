import React from "react"
import styled from "styled-components"

// TODO: MUST REFACTOR THIS COMPONENT

const Container = styled.div`
  height: 3rem;
  overflow: hidden;
`

const PointContainer = styled.div`
  width: calc(100% - .5rem);
  height: 100%;
  position: relative;
  display: flex;
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
  background-color: ${props => props.fixed ? "rgba(200,200,200,.5)" : "rgba(192,222,191,.5)"};
  z-index: ${props => props.fixed ? 0 : 1};

  > span {
    font-size: .5rem;
    top: 1rem;
    white-space: nowrap;
    transform: rotate(-15deg);
    position: inherit;
    cursor: default;
    user-select: none;
  }
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
      <PointContainer>
        {
          points.map((point, index) => {
            return (
              <Point
                key={index}
                left={point.rate * 100}
                fixed={point.isFixed}
              >
                <span>{point.label}</span>
              </Point>
            )
          })
        }
      </PointContainer>
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

function calculatePoints(steps: Date[], dates: Date[]): PointData[] {
  const range = steps[steps.length - 1].getTime() - steps[0].getTime()
  const points = steps.map(x => (
    new PointData(
      x,
      (x.getTime() - steps[0].getTime()) / range,
      true,
      x.toLocaleDateString(),
    )
  ))
  return dates
    .filter(x => x >= steps[0] && x <= steps[steps.length - 1])
    .sort((a, b) => a.getTime() - b.getTime())
    .reduce((acc, date) => {
      const p = new PointData(
        date,
        (date.getTime() - steps[0].getTime()) / range,
        false,
      )
      acc.splice(acc.length - 1, 0, p)
      return acc
    }, points)
}

class PointData {
  constructor(
    public date: Date,
    public rate: number,
    public isFixed: boolean,
    public label?: string,
  ) { }
}

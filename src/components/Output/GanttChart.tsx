import { useLayoutEffect, useRef, useState } from "react";
import { ganttChartInfoType } from "../../algorithms";
import styled from "styled-components";

import { media } from "../GlobalStyle.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: var(--glass-bg);
  border: 1px solid var(--border-glass);
  border-radius: 20px;
  backdrop-filter: var(--blur-bg);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    background: var(--gradient-secondary);
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0.3;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  margin: 0 0 2rem 0;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${media["600"]`
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  `}

  &::before {
    content: "📊";
    font-size: 1.2em;
  }
`;

const JobContainer = styled.div`
  display: flex;
  margin-bottom: -1px;
`;

const Job = styled.div`
  width: 50px;
  height: 40px;
  background: var(--gradient-primary);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  ${media["600"]`
    width: 40px;
    height: 32px;
    font-size: 12px;
  `}

  &:not(:last-child) {
    margin-right: -1px;
  }

  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &:hover {
    transform: translateY(-2px);
    z-index: 10;
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const TimeContainer = styled.div`
  display: flex;
`;

const Time = styled.div`
  width: 50px;
  height: 24px;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  border: 1px solid transparent;
  transition: all 0.2s ease;

  ${media["600"]`
    width: 40px;
    height: 20px;
    font-size: 11px;
  `}

  &:not(:last-child) {
    margin-right: -1px;
  }

  &:hover {
    color: var(--accent-primary);
    background: rgba(99, 102, 241, 0.1);
    border-radius: 6px;
  }
`;

const MultilineContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 12px;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

type GanttChartProps = {
  ganttChartInfo: ganttChartInfoType;
};

const GanttChart = ({ ganttChartInfo }: GanttChartProps) => {
  const containerEl = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);

  const job: string[] = [];
  const time: number[] = [];
  ganttChartInfo.forEach((item, index) => {
    if (index === 0) {
      job.push(item.job);
      time.push(item.start, item.stop);
    } else if (time.slice(-1)[0] === item.start) {
      job.push(item.job);
      time.push(item.stop);
    } else if (time.slice(-1)[0] !== item.start) {
      job.push("⏸️", item.job);
      time.push(item.start, item.stop);
    }
  });

  useLayoutEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth);
      setContainerWidth(containerEl.current.offsetWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  let itemWidth = 0;
  if (windowWidth <= 600) {
    itemWidth = 40;
  } else {
    itemWidth = 50;
  }

  const timeContainerWidth = time.length * itemWidth - (time.length - 1);

  let maxTimeItemCount = ~~(containerWidth / itemWidth);

  let numberOfLines = 0;
  let acc = 0;
  while (true) {
    if (containerWidth === null) {
      break;
    }
    acc += maxTimeItemCount - 1;
    numberOfLines++;
    if (acc >= time.length) {
      acc -= maxTimeItemCount - 1;
      break;
    }
  }

  let lastLineItemCount: number;
  if (time.length - 1 === acc) {
    lastLineItemCount = 0;
    numberOfLines--;
  } else {
    lastLineItemCount = time.length - acc;
  }

  let timeCounter = 0;
  let jobCounter = 0;

  return (
    <Container ref={containerEl}>
      <Title>Gantt Chart Timeline</Title>
      {containerWidth !== null && containerWidth <= timeContainerWidth && (
        <>
          {Array.from({ length: numberOfLines }).map((_, ind) => {
            if (ind === numberOfLines - 1 && lastLineItemCount !== 0) {
              return (
                <MultilineContainer key={`multiline-container-${ind}`}>
                  <JobContainer>
                    {Array.from({
                      length: lastLineItemCount - 1,
                    }).map((_, i) => (
                      <Job key={`gc-job-lastline${i}`} className="flex-center">
                        {job[jobCounter + 1 + i]}
                      </Job>
                    ))}
                  </JobContainer>
                  <TimeContainer>
                    {Array.from({
                      length: lastLineItemCount,
                    }).map((_, i) => (
                      <Time
                        key={`gc-time-lastline${i}`}
                        className="flex-center"
                      >
                        {time[timeCounter + i]}
                      </Time>
                    ))}
                  </TimeContainer>
                </MultilineContainer>
              );
            } else if (ind == 0) {
              timeCounter += maxTimeItemCount - 1;
              jobCounter += timeCounter - 1;
              return (
                <MultilineContainer key={`multiline-container-${ind}`}>
                  <JobContainer>
                    {Array.from({ length: jobCounter + 1 }).map((_, i) => (
                      <Job key={`gc-job-firstline${i}`} className="flex-center">
                        {job[i]}
                      </Job>
                    ))}
                  </JobContainer>
                  <TimeContainer>
                    {Array.from({ length: timeCounter + ind + 1 }).map(
                      (_, i) => (
                        <Time
                          key={`gc-time-firstline${i}`}
                          className="flex-center"
                        >
                          {time[i]}
                        </Time>
                      )
                    )}
                  </TimeContainer>
                </MultilineContainer>
              );
            } else {
              let prevCounter = timeCounter;
              timeCounter += maxTimeItemCount - 1;
              let prevJobCounter = jobCounter;
              jobCounter += maxTimeItemCount - 1;
              return (
                <MultilineContainer key={`multiline-container-${ind}`}>
                  <JobContainer>
                    {Array.from({ length: maxTimeItemCount - 1 }).map(
                      (_, i) => (
                        <Job key={`gc-job-${i}-${ind}`} className="flex-center">
                          {job[prevJobCounter + i + 1]}
                        </Job>
                      )
                    )}
                  </JobContainer>
                  <TimeContainer>
                    {Array.from({ length: maxTimeItemCount }).map((_, i) => (
                      <Time key={`gc-time-${i}-${ind}`} className="flex-center">
                        {time[prevCounter + i]}
                      </Time>
                    ))}
                  </TimeContainer>
                </MultilineContainer>
              );
            }
          })}
        </>
      )}
      {containerWidth !== null && containerWidth > timeContainerWidth && (
        <>
          <JobContainer>
            {job.map((job, index) => (
              <Job key={`gc-job-${index}`} className="flex-center">
                {job}
              </Job>
            ))}
          </JobContainer>
          <TimeContainer>
            {time.map((time, index) => (
              <Time key={`gc-time-${index}`} className="flex-center">
                {time}
              </Time>
            ))}
          </TimeContainer>
        </>
      )}
    </Container>
  );
};

export default GanttChart;

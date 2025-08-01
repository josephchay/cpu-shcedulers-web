import styled, { keyframes } from "styled-components";
import GanttChart from "./GanttChart";
import Table from "./Table";
import { solve } from "../../algorithms";
import { OptionType } from "../Input/AlgorithmSelection";

import { media } from "../GlobalStyle.css";

const StyledOutput = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--border-glass);
  border-radius: 24px;
  backdrop-filter: var(--blur-bg);
  box-shadow: var(--shadow-xl);
  padding: 2rem;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  align-self: baseline;
  position: relative;

  ${media["1050"]`align-self: normal;`}
  ${media["600"]`
    padding: 1.5rem;
    border-radius: 20px;
  `}

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    background: var(--gradient-primary);
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0.5;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;

  ${media["600"]`
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  `}
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  ${media["600"]`
    font-size: 1.5rem;
  `}
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  gap: 1rem;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 400px;

  ${media["600"]`
    font-size: 1rem;
  `}
`;

const AlgoValue = styled.div`
  background: var(--gradient-accent);
  color: white;
  font-weight: 600;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  position: relative;
  overflow: hidden;

  ${media["600"]`
    font-size: 12px;
    padding: 10px 16px;
  `}

  &::before {
    content: "🔧 ";
    margin-right: 0.5rem;
  }

  &::after {
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

  &:hover::after {
    transform: translateX(100%);
  }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FadeIn = ({ duration = 600, delay = 0, children, ...delegated }) => {
  return (
    <Wrapper
      {...delegated}
      style={{
        ...(delegated.style || {}),
        animationDuration: duration + "ms",
        animationDelay: delay + "ms",
      }}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${slideInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  }
`;

type OutputProps = {
  selectedAlgo: OptionType;
  arrivalTime: number[];
  burstTime: number[];
  timeQuantum: number;
  priorities: number[];
};

const Output = ({
  selectedAlgo,
  arrivalTime,
  burstTime,
  timeQuantum,
  priorities,
}: OutputProps) => {
  if (!arrivalTime.length || !burstTime.length) {
    return (
      <StyledOutput>
        <Header>
          <Title>Simulation Results</Title>
        </Header>
        <EmptyState>
          <EmptyIcon>📈</EmptyIcon>
          <EmptyText>
            Configure your processes and select a scheduling algorithm to see
            the simulation results here
          </EmptyText>
        </EmptyState>
      </StyledOutput>
    );
  } else {
    const { solvedProcessesInfo, ganttChartInfo } = solve(
      selectedAlgo.value,
      arrivalTime,
      burstTime,
      timeQuantum,
      priorities
    );

    return (
      <StyledOutput>
        <Header>
          <Title>Simulation Results</Title>
          <AlgoValue title={`Algorithm: ${selectedAlgo.label}`}>
            {selectedAlgo.value}
          </AlgoValue>
        </Header>
        <FadeIn>
          <GanttChart {...{ ganttChartInfo }} />
          <Table {...{ solvedProcessesInfo }} />
        </FadeIn>
      </StyledOutput>
    );
  }
};

export default Output;

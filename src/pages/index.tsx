import Head from "next/head";
import React, { useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import Output from "../components/Output";

import { media } from "../components/GlobalStyle.css";

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--primary-bg);
  position: relative;
  overflow-x: hidden;
`;

const BackgroundPattern = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  background-image: radial-gradient(
      ellipse at top left,
      var(--accent-primary) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at bottom right,
      var(--accent-secondary) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at center,
      var(--accent-tertiary) 0%,
      transparent 70%
    );
  pointer-events: none;
`;

const GitHubSection = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 1rem;

  ${media["600"]`
    top: 1rem;
    right: 1rem;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
  `}
`;

const GitHubLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--glass-bg);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 14px;
  backdrop-filter: var(--blur-bg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
    transition: all 0.3s ease;
  }

  &:hover {
    color: var(--accent-primary);
    background: rgba(99, 102, 241, 0.1);
    border-color: var(--accent-primary);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);

    svg {
      transform: scale(1.1);
    }
  }

  ${media["600"]`
    padding: 10px 14px;
    font-size: 13px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  `}
`;

const CreatorText = styled.div`
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 400;
  background: var(--glass-bg);
  border: 1px solid var(--border-glass);
  border-radius: 10px;
  padding: 8px 12px;
  backdrop-filter: var(--blur-bg);
  white-space: nowrap;

  ${media["600"]`
    font-size: 12px;
    padding: 6px 10px;
  `}
`;

const HeaderSection = styled.header`
  text-align: center;
  padding: 3rem 0 2rem 0;
  position: relative;
  z-index: 1;

  ${media["600"]`
    padding: 2rem 0 1.5rem 0;
  `}
`;

const MainTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;

  ${media["1150"]`
    font-size: 2.5rem;
  `}

  ${media["600"]`
    font-size: 2rem;
  `}
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin: 0 auto;
  max-width: 700px;
  line-height: 1.7;
  font-weight: 400;

  ${media["600"]`
    font-size: 1rem;
    padding: 0 1rem;
  `}
`;

const Main = styled.main`
  display: flex;
  margin: 0 auto 2rem;
  gap: clamp(1rem, 3vw, 2.5rem);
  align-items: flex-start;
  position: relative;
  z-index: 1;

  ${media["1050"]`
    flex-direction: column;
    gap: 2rem;
  `}

  ${media["600"]`
    gap: 1.5rem;
  `}
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  ${media["600"]`
    grid-template-columns: 1fr;
    gap: 1rem;
  `}
`;

const FeatureCard = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: var(--blur-bg);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: var(--accent-primary);
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    display: block;
  }

  h3 {
    color: var(--text-primary);
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.5;
  }
`;

export default function Home() {
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [arrivalTime, setArrivalTime] = useState<number[]>([]);
  const [burstTime, setBurstTime] = useState<number[]>([]);
  const [timeQuantum, setTimeQuantum] = useState<number>();
  const [priorities, setPriorities] = useState<number[]>([]);

  return (
    <AppContainer>
      <Head>
        <title>CPU Process Scheduling Solver</title>
        <meta
          name="description"
          content="Interactive CPU scheduling simulator with Gantt charts. Analyze FCFS, SJF, SRTF, Round-Robin, and Priority algorithms. Calculate turnaround and waiting times with beautiful visualizations."
        />
        <meta property="og:title" content="CPU Process Scheduling Solver" />
        <meta
          property="og:description"
          content="Interactive CPU scheduling simulator with Gantt charts. Analyze FCFS, SJF, SRTF, Round-Robin, and Priority algorithms."
        />
        <meta name="twitter:title" content="CPU Process Scheduling Solver" />
        <meta
          name="twitter:description"
          content="Interactive CPU scheduling simulator with Gantt charts and detailed performance metrics."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <BackgroundPattern />

      <GitHubSection>
        <CreatorText>Built by Joseph Chay</CreatorText>
        <GitHubLink
          href="https://github.com/josephchay/cpu-shcedulers-web"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 438.549 438.549"
          >
            <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 0 1-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.840 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
          </svg>
          View Source
        </GitHubLink>
      </GitHubSection>

      <div className="container">
        <HeaderSection>
          <MainTitle>CPU Scheduler Simulator</MainTitle>
          <Subtitle>
            Visualize and analyze different process scheduling algorithms with
            interactive Gantt charts, detailed performance metrics, and
            real-time process simulation
          </Subtitle>

          <FeatureGrid>
            <FeatureCard>
              <span className="icon">⚡</span>
              <h3>Real-time Simulation</h3>
              <p>Interactive process scheduling with instant visual feedback</p>
            </FeatureCard>
            <FeatureCard>
              <span className="icon">📊</span>
              <h3>Multiple Algorithms</h3>
              <p>FCFS, SJF, SRTF, Round-Robin, Priority scheduling support</p>
            </FeatureCard>
            <FeatureCard>
              <span className="icon">📈</span>
              <h3>Performance Metrics</h3>
              <p>Detailed turnaround time and waiting time analysis</p>
            </FeatureCard>
          </FeatureGrid>
        </HeaderSection>

        <Main>
          <Input
            selectedAlgo={selectedAlgo}
            setSelectedAlgo={setSelectedAlgo}
            setArrivalTime={setArrivalTime}
            setBurstTime={setBurstTime}
            setTimeQuantum={setTimeQuantum}
            setPriorities={setPriorities}
          />
          <Output
            selectedAlgo={selectedAlgo}
            arrivalTime={arrivalTime}
            burstTime={burstTime}
            timeQuantum={timeQuantum}
            priorities={priorities}
          />
        </Main>
      </div>
    </AppContainer>
  );
}

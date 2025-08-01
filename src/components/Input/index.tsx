import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import AlgoSelect, { OptionType, defaultOption } from "./AlgorithmSelection";
import Button from "./Button";
import { invalidInputSwal } from "./swal";

import { media } from "../GlobalStyle.css";

const StyledInput = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--border-glass);
  border-radius: 24px;
  backdrop-filter: var(--blur-bg);
  box-shadow: var(--shadow-xl);
  padding: 2rem;
  align-self: flex-start;
  min-width: 320px;
  max-width: 400px;
  width: 30vw;
  position: relative;
  z-index: 1;

  ${media["1050"]`
    align-self: normal;
    max-width: 100%;
    width: 100%;
  `}

  ${media["600"]`
    padding: 1.5rem;
    border-radius: 20px;
  `}

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    background: var(--gradient-secondary);
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0.5;
    z-index: -1;
    pointer-events: none;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 2;

  ${media["600"]`
    font-size: 1.5rem;
    margin-bottom: 1rem;
  `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 2;

  fieldset {
    padding: 0;
    margin: 0;
    border: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    z-index: 3;

    &:first-of-type {
      z-index: 100;
    }
  }

  label {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }

  input {
    width: 100%;
    background: var(--glass-bg);
    border: 1px solid var(--border-glass);
    border-radius: 12px;
    padding: 14px 16px;
    font-size: 15px;
    color: var(--text-primary);
    backdrop-filter: var(--blur-bg);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 4;

    &::placeholder {
      color: var(--text-muted);
    }

    &:hover {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    &:focus {
      border-color: var(--accent-primary);
      background: rgba(255, 255, 255, 0.08);
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0px 1000px var(--secondary-bg) inset;
      -webkit-text-fill-color: var(--text-primary);
      transition: background-color 5000s ease-in-out 0s;
    }
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  position: relative;
  z-index: 4;

  ${media["600"]`
    grid-template-columns: 1fr;
  `}
`;

const ProcessInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ProcessInput = styled.input`
  width: 100% !important;
  padding: 10px 12px !important;
  font-size: 14px !important;
`;

const ProcessLabel = styled.label`
  font-size: 12px !important;
  color: var(--text-secondary) !important;
  font-weight: 500 !important;
`;

const ClickableButton = styled.div`
  background: rgba(99, 102, 241, 0.1);
  border: 1px dashed var(--accent-primary);
  border-radius: 10px;
  color: var(--accent-primary);
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  cursor: pointer;
  text-align: center;
  user-select: none;
  position: relative;
  z-index: 10;
  pointer-events: auto;

  &:hover {
    background: rgba(99, 102, 241, 0.2);
    border-style: solid;
    transform: translateY(-1px);
    z-index: 11;
  }

  &:active {
    transform: translateY(0);
    background: rgba(99, 102, 241, 0.3);
  }

  &::before,
  &::after {
    pointer-events: none;
  }
`;

const ClearButton = styled(ClickableButton)`
  background: rgba(239, 68, 68, 0.1);
  border-color: var(--error);
  color: var(--error);

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    background: rgba(239, 68, 68, 0.3);
  }
`;

const ProcessesContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 3;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--accent-primary);
    border-radius: 3px;
  }
`;

const ProcessItem = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  position: relative;
  transition: all 0.3s ease;
  z-index: 4;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--accent-primary);
  }

  .process-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .process-title {
    color: var(--accent-primary);
    font-weight: 600;
    font-size: 14px;
  }

  .remove-btn {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: var(--error);
    border-radius: 8px;
    width: 28px;
    height: 28px;
    font-size: 16px;
    font-weight: 400;
    font-family: "Arial", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative;
    z-index: 5;
    pointer-events: auto;
    line-height: 1;

    &::before {
      content: "✕";
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      background: rgba(239, 68, 68, 0.2);
      transform: scale(1.05);
      z-index: 6;
      border-color: var(--error);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

const ProcessCount = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 3;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 5;
  pointer-events: auto;
`;

const HelperText = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 3;
`;

type ProcessData = {
  id: number;
  arrivalTime: string;
  burstTime: string;
  priority: string;
};

type InputProps = {
  selectedAlgo: OptionType;
  setSelectedAlgo: Dispatch<SetStateAction<{}>>;
  setArrivalTime: Dispatch<SetStateAction<number[]>>;
  setBurstTime: Dispatch<SetStateAction<number[]>>;
  setTimeQuantum: Dispatch<SetStateAction<number>>;
  setPriorities: Dispatch<SetStateAction<number[]>>;
};

const Input = (props: InputProps) => {
  const [selectedAlgo, setSelectedAlgo] = useState<OptionType>(defaultOption);
  const [processes, setProcesses] = useState<ProcessData[]>([
    { id: 1, arrivalTime: "", burstTime: "", priority: "" },
  ]);
  const [timeQuantum, setTimeQuantum] = useState("");
  const [processCounter, setProcessCounter] = useState(2);

  useEffect(() => {
    props.setSelectedAlgo(selectedAlgo);
  }, [selectedAlgo]);

  const handleAddProcess = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    console.log("🟢 Add Process Button Clicked!");
    console.log("Current processes before:", processes);

    const newProcess: ProcessData = {
      id: processCounter,
      arrivalTime: "",
      burstTime: "",
      priority: "",
    };

    const newProcesses = [...processes, newProcess];
    setProcesses(newProcesses);
    setProcessCounter(processCounter + 1);

    console.log("New processes after:", newProcesses);
  };

  const handleRemoveProcess = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    console.log("🔴 Remove Process clicked for ID:", id);
    if (processes.length > 1) {
      const filteredProcesses = processes.filter((p) => p.id !== id);
      setProcesses(filteredProcesses);
    }
  };

  const handleUpdateProcess = (
    id: number,
    field: keyof ProcessData,
    value: string
  ) => {
    const updatedProcesses = processes.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    setProcesses(updatedProcesses);
  };

  const handleClearAll = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    console.log("🧹 Clear All clicked!");
    setProcesses([{ id: 1, arrivalTime: "", burstTime: "", priority: "" }]);
    setProcessCounter(2);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validProcesses = processes.filter(
      (p) => p.arrivalTime.trim() !== "" && p.burstTime.trim() !== ""
    );

    if (validProcesses.length === 0) {
      invalidInputSwal("Please fill in at least one complete process");
      return;
    }

    const arrivalTimeArr = validProcesses.map((p) => parseInt(p.arrivalTime));
    const burstTimeArr = validProcesses.map((p) => parseInt(p.burstTime));
    const timeQuantumInt = parseInt(timeQuantum);

    const prioritiesArr = validProcesses.map((p) => {
      const priority = parseInt(p.priority);
      return isNaN(priority) ? 0 : priority;
    });

    if (arrivalTimeArr.some(isNaN) || burstTimeArr.some(isNaN)) {
      invalidInputSwal("Please enter valid numbers for all fields");
      return;
    }

    if (burstTimeArr.some((bt) => bt <= 0)) {
      invalidInputSwal("Burst time must be greater than zero");
      return;
    }

    if (arrivalTimeArr.some((at) => at < 0)) {
      invalidInputSwal("Arrival time cannot be negative");
      return;
    }

    if (selectedAlgo.value === "RR") {
      if (isNaN(timeQuantumInt) || timeQuantumInt <= 0) {
        invalidInputSwal(
          "Please enter a valid time quantum (greater than 0) for Round-Robin"
        );
        return;
      }
    }

    if (
      (selectedAlgo.value === "NPP" || selectedAlgo.value === "PP") &&
      prioritiesArr.some((p) => p < 0)
    ) {
      invalidInputSwal("Priority values cannot be negative");
      return;
    }

    props.setArrivalTime(arrivalTimeArr);
    props.setBurstTime(burstTimeArr);
    props.setTimeQuantum(timeQuantumInt || 0);
    props.setPriorities(prioritiesArr);
  };

  const handleTimeQuantumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeQuantum(e.target.value);
  };

  return (
    <StyledInput>
      <Title>Configure Process</Title>

      <Form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="react-select-algo">Scheduling Algorithm</label>
          <AlgoSelect
            selectedAlgo={selectedAlgo}
            setSelectedAlgo={setSelectedAlgo}
          />
        </fieldset>

        <fieldset>
          <label>Process Configuration</label>
          <ProcessCount>
            {processes.length} process{processes.length !== 1 ? "es" : ""}{" "}
            configured
          </ProcessCount>

          <ProcessesContainer>
            {processes.map((process, index) => (
              <ProcessItem key={`process-${process.id}-${index}`}>
                <div className="process-header">
                  <span className="process-title">Process {index + 1}</span>
                  {processes.length > 1 && (
                    <div
                      className="remove-btn"
                      onClick={(e) => handleRemoveProcess(process.id, e)}
                      title="Remove this process"
                    ></div>
                  )}
                </div>
                <ProcessGrid>
                  <ProcessInputGroup>
                    <ProcessLabel>Arrival Time</ProcessLabel>
                    <ProcessInput
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      value={process.arrivalTime}
                      onChange={(e) =>
                        handleUpdateProcess(
                          process.id,
                          "arrivalTime",
                          e.target.value
                        )
                      }
                    />
                  </ProcessInputGroup>
                  <ProcessInputGroup>
                    <ProcessLabel>Burst Time</ProcessLabel>
                    <ProcessInput
                      type="number"
                      min="1"
                      step="1"
                      placeholder="5"
                      value={process.burstTime}
                      onChange={(e) =>
                        handleUpdateProcess(
                          process.id,
                          "burstTime",
                          e.target.value
                        )
                      }
                    />
                  </ProcessInputGroup>
                  {(selectedAlgo.value === "NPP" ||
                    selectedAlgo.value === "PP") && (
                    <ProcessInputGroup style={{ gridColumn: "1 / -1" }}>
                      <ProcessLabel>
                        Priority (lower = higher priority)
                      </ProcessLabel>
                      <ProcessInput
                        type="number"
                        min="0"
                        step="1"
                        placeholder="1"
                        value={process.priority}
                        onChange={(e) =>
                          handleUpdateProcess(
                            process.id,
                            "priority",
                            e.target.value
                          )
                        }
                      />
                    </ProcessInputGroup>
                  )}
                </ProcessGrid>
              </ProcessItem>
            ))}
          </ProcessesContainer>

          <ButtonContainer>
            <ClickableButton onClick={handleAddProcess}>
              ➕ Add Process
            </ClickableButton>
            {processes.length > 1 && (
              <ClearButton onClick={handleClearAll}>🗑️ Clear All</ClearButton>
            )}
          </ButtonContainer>

          <HelperText>
            📋 Configure each process individually for better accuracy
          </HelperText>
        </fieldset>

        {selectedAlgo.value === "RR" && (
          <fieldset>
            <label htmlFor="time-quantum">Time Quantum</label>
            <input
              value={timeQuantum}
              onChange={handleTimeQuantumChange}
              type="number"
              id="time-quantum"
              placeholder="3"
              min="1"
              step="1"
            />
            <HelperText>🔄 Time slice for Round-Robin scheduling</HelperText>
          </fieldset>
        )}

        <Button>Simulate Process</Button>
      </Form>
    </StyledInput>
  );
};

export default Input;

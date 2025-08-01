import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";

export type AlgoType = "FCFS" | "SJF" | "SRTF" | "RR" | "NPP" | "PP";
export type OptionType = {
  value: AlgoType;
  label: string;
};

export const defaultOption: OptionType = {
  value: "FCFS",
  label: "First Come First Serve (FCFS)",
};

const options: OptionType[] = [
  defaultOption,
  {
    value: "SJF",
    label: "Shortest Job First (SJF)",
  },
  {
    value: "SRTF",
    label: "Shortest Remaining Time First (SRTF)",
  },
  {
    value: "RR",
    label: "Round-Robin (RR)",
  },
  {
    value: "NPP",
    label: "Priority (Non-preemptive)",
  },
  {
    value: "PP",
    label: "Priority (Preemptive)",
  },
];

type AlgoSelectProps = {
  selectedAlgo: {};
  setSelectedAlgo: Dispatch<SetStateAction<{}>>;
};

export const StyledSelect = styled(Select)`
  .react-select__control {
    box-sizing: border-box;
    background: var(--glass-bg);
    border: 1px solid var(--border-glass);
    border-radius: 12px;
    height: 48px;
    backdrop-filter: var(--blur-bg);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;

    &:hover {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
  }

  .react-select__control--is-focused {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2),
      0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 15;

    &:hover {
      border-color: var(--accent-primary);
    }
  }

  .react-select__control--menu-is-open {
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    z-index: 20;
  }

  .react-select__value-container {
    padding: 0 16px;
    font-size: 15px;
    color: var(--text-primary);
    position: relative;
    z-index: 11;
  }

  .react-select__single-value {
    color: var(--text-primary);
  }

  .react-select__placeholder {
    color: var(--text-muted);
  }

  .react-select__dropdown-indicator {
    color: var(--text-secondary);
    transition: all 0.3s ease;
    position: relative;
    z-index: 11;

    &:hover {
      color: var(--accent-primary);
    }
  }

  .react-select__menu {
    background: var(--secondary-bg) !important;
    border: 1px solid var(--border-glass) !important;
    border-radius: 12px !important;
    box-shadow: var(--shadow-xl) !important;
    margin-top: 8px;
    backdrop-filter: none;
    position: absolute;
    z-index: 9999 !important;
    width: 100%;
    top: 100%;
    left: 0;
  }

  .react-select__menu-list {
    position: relative;
    z-index: 10000;
  }

  .react-select__option {
    font-size: 15px !important;
    padding: 12px 16px !important;
    color: var(--text-secondary) !important;
    transition: all 0.2s ease;
    background: transparent !important;
    position: relative;
    z-index: 10001;

    &:hover {
      background: rgba(99, 102, 241, 0.15) !important;
      color: var(--text-primary) !important;
    }

    &--is-selected {
      background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%) !important;
      color: white !important;

      &:hover {
        background: linear-gradient(
          135deg,
          #6366f1 0%,
          #06b6d4 100%
        ) !important;
        opacity: 0.9;
      }
    }

    &--is-focused {
      background: rgba(99, 102, 241, 0.1) !important;
      color: var(--text-primary) !important;
    }
  }
`;

const SelectContainer = styled.div`
  position: relative;
  z-index: 50;

  .react-select__menu-portal {
    z-index: 9999 !important;
  }
`;

const AlgoSelect: React.FC<AlgoSelectProps> = ({
  selectedAlgo,
  setSelectedAlgo,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <SelectContainer>
      <StyledSelect
        defaultValue={selectedAlgo}
        onChange={setSelectedAlgo}
        options={options}
        instanceId="react-select-algo"
        inputId="react-select-algo"
        classNamePrefix="react-select"
        isSearchable={false}
        placeholder="Select an algorithm..."
        // Portal to body for SSR compatibility, with enhanced styling
        menuPortalTarget={isMounted ? document.body : null}
        menuPosition="absolute"
        menuPlacement="auto"
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
            // Apply theme colors directly for portaled menu
            "--primary-bg": "#0a0e27",
            "--secondary-bg": "#1a1f3a",
            "--border-glass": "rgba(255, 255, 255, 0.1)",
            "--text-primary": "#f1f5f9",
            "--text-secondary": "#94a3b8",
            "--text-muted": "#64748b",
            "--accent-primary": "#6366f1",
            "--shadow-xl":
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }),
          menu: (base) => ({
            ...base,
            background: "#1a1f3a",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            zIndex: 9999,
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)"
              : state.isFocused
              ? "rgba(99, 102, 241, 0.1)"
              : "transparent",
            color: state.isSelected
              ? "white"
              : state.isFocused
              ? "#f1f5f9"
              : "#94a3b8",
            padding: "12px 16px",
            fontSize: "15px",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: state.isSelected
                ? "rgba(99, 102, 241, 0.9)"
                : "rgba(99, 102, 241, 0.15)",
              color: "#f1f5f9",
            },
          }),
        }}
      />
    </SelectContainer>
  );
};

export default AlgoSelect;

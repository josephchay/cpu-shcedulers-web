import React from "react";
import styled from "styled-components";

import { media } from "../GlobalStyle.css";

const TableContainer = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  backdrop-filter: var(--blur-bg);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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

const TableWrapper = styled.div`
  overflow: auto;
  max-width: 100%;
  max-height: 400px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--secondary-bg);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--accent-primary);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--accent-secondary);
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  ${media["1275"]`font-size: 13px;`}
  ${media["600"]`font-size: 12px;`}

  tr {
    transition: all 0.3s ease;

    &:hover:not(:last-child) {
      background: rgba(99, 102, 241, 0.05);
    }
  }

  th,
  td {
    text-align: left;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border-glass);

    ${media["1275"]`padding: 14px 16px;`}
    ${media["600"]`padding: 12px 14px;`}
  }
`;

const HeaderCell = styled.th`
  font-weight: 700;
  color: var(--text-primary);
  background: rgba(99, 102, 241, 0.1);
  position: sticky;
  top: 0;
  backdrop-filter: var(--blur-bg);
  white-space: nowrap;
  font-size: 13px;

  ${media["600"]`font-size: 11px;`}

  &:first-child {
    border-top-left-radius: 12px;
  }

  &:last-child {
    border-top-right-radius: 12px;
  }
`;

const DataCell = styled.td`
  color: var(--text-secondary);
  font-weight: 500;
  position: relative;

  &:first-child {
    color: var(--accent-primary);
    font-weight: 700;
  }
`;

const AverageRow = styled.tr`
  background: rgba(139, 92, 246, 0.1);
  border-top: 2px solid var(--border-glass);

  td {
    font-weight: 700;
    color: var(--text-primary);

    &:nth-child(4) {
      text-align: right;
      color: var(--accent-secondary);
    }
  }
`;

const MetricValue = styled.span`
  color: var(--accent-primary);
  font-weight: 700;
`;

const Formula = styled.span`
  color: var(--text-muted);
  font-size: 0.9em;
`;

const precisionRound = (number: number, precision: number) => {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

type TableProps = {
  solvedProcessesInfo: {
    job: string;
    at: number;
    bt: number;
    ft: number;
    tat: number;
    wat: number;
  }[];
};

const Table = ({ solvedProcessesInfo }: TableProps) => {
  const total = (array: number[]) =>
    array.reduce((acc, currentValue) => acc + currentValue, 0);

  const numberOfProcesses = solvedProcessesInfo.length;
  const turnaroundTime = solvedProcessesInfo.map((process) => process.tat);
  const waitingTime = solvedProcessesInfo.map((process) => process.wat);

  const totalTAT = total(turnaroundTime);
  const averageTAT = totalTAT / numberOfProcesses;

  const totalWAT = total(waitingTime);
  const averageWAT = totalWAT / numberOfProcesses;

  return (
    <TableContainer>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <HeaderCell>Process</HeaderCell>
              <HeaderCell>Arrival</HeaderCell>
              <HeaderCell>Burst</HeaderCell>
              <HeaderCell>Completion</HeaderCell>
              <HeaderCell>Turnaround</HeaderCell>
              <HeaderCell>Waiting</HeaderCell>
            </tr>
          </thead>
          <tbody>
            {solvedProcessesInfo.map((item, index) => (
              <tr key={`process-row-${item.job}`}>
                <DataCell>P{item.job}</DataCell>
                <DataCell>{item.at}</DataCell>
                <DataCell>{item.bt}</DataCell>
                <DataCell>{item.ft}</DataCell>
                <DataCell>{item.tat}</DataCell>
                <DataCell>{item.wat}</DataCell>
              </tr>
            ))}
            <AverageRow>
              <td
                colSpan={4}
                style={{ textAlign: "right", paddingRight: "20px" }}
              >
                📊 Average Metrics
              </td>
              <td>
                <Formula>
                  {totalTAT} ÷ {numberOfProcesses} ={" "}
                </Formula>
                <MetricValue>{precisionRound(averageTAT, 3)}</MetricValue>
              </td>
              <td>
                <Formula>
                  {totalWAT} ÷ {numberOfProcesses} ={" "}
                </Formula>
                <MetricValue>{precisionRound(averageWAT, 3)}</MetricValue>
              </td>
            </AverageRow>
          </tbody>
        </StyledTable>
      </TableWrapper>
    </TableContainer>
  );
};

export default Table;

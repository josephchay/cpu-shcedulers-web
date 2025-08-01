# CPU Scheduler Simulator

A web-based application for simulating and analyzing CPU scheduling algorithms with real-time Gantt charts and performance metrics.

## Overview

![Sample Image](https://github.com/user-attachments/assets/cf3647da-9f6a-470e-b0af-e8374b67328e)

This simulator demonstrates the behavior of various CPU scheduling algorithms used in operating systems. Built with Next.js and TypeScript, it provides an intuitive interface for process configuration and comprehensive performance analysis.

## Supported Algorithms

- **First Come First Serve (FCFS)**: Non-preemptive, processes jobs in arrival order
- **Shortest Job First (SJF)**: Non-preemptive, prioritizes shortest burst time
- **Shortest Remaining Time First (SRTF)**: Preemptive version of SJF
- **Round-Robin (RR)**: Preemptive with configurable time quantum
- **Priority Scheduling**: Both preemptive and non-preemptive variants

## Features

- Interactive Gantt chart visualization
- Performance metrics calculation (turnaround time, waiting time)
- Individual process configuration
- Real-time input validation
- Mobile-responsive design

## Installation

```
git clone https://github.com/josephchay/cpu-shcedulers-web.git
cd YOUR_REPOSITORY_NAME
npm install
npm run dev
```

Access the application at http://localhost:3000

## Usage

1. Select a scheduling algorithm from the dropdown
2. Configure processes with arrival time and burst time
3. Set additional parameters (time quantum for RR, priorities for priority scheduling)
4. Click "Simulate Process" to view results

## Technology Stack

- Next.js 14
- TypeScript
- Styled Components
- React Select

## Performance Metrics

- Completion Time: When each process finishes
- Turnaround Time: Total time from arrival to completion
- Waiting Time: Time spent in ready queue
- Average metrics across all processes

## Author

Joseph Chay

import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: var(--gradient-accent);
  border-radius: 12px;
  color: white;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  min-width: 120px;
  height: 48px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-glass);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms cubic-bezier(0.4, 0, 0.2, 1);
    background-color: rgba(255, 255, 255, 0.3);
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    background: var(--gradient-accent);
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }
`;

const Button = ({ children }) => {
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <StyledButton onClick={createRipple} type="submit">
      {children}
    </StyledButton>
  );
};

export default Button;

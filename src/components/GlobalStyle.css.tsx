import { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    font-size: 16px;
    --primary-bg: #0a0e27;
    --secondary-bg: #1a1f3a;
    --card-bg: rgba(26, 31, 58, 0.6);
    --glass-bg: rgba(255, 255, 255, 0.05);
    --border-glass: rgba(255, 255, 255, 0.1);
    --accent-primary: #6366f1;
    --accent-secondary: #06b6d4;
    --accent-tertiary: #8b5cf6;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --success: #10b981;
    --warning: #f59e0b;
    --error: #ef4444;
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-secondary: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
    --gradient-accent: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
    --shadow-lg: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --blur-bg: blur(20px);
  }

  html,
  body {
    padding: 0;
    margin: 0;
    background: var(--primary-bg);
    background-image: 
      radial-gradient(ellipse at top left, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%);
    font-size: 1rem;
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }  

  button {
    border: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    appearance: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:focus {
      outline: 2px solid var(--accent-primary);
      outline-offset: 2px;
    }
  }

  .container {
    width: 90%;
    max-width: 1400px;
    margin: auto;
    padding: 2rem 0;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // Enhanced SweetAlert styling
  .swal-overlay {
    background: rgba(10, 14, 39, 0.75);
    backdrop-filter: var(--blur-bg);
  }

  .swal-modal {
    background: var(--card-bg);
    border: 1px solid var(--border-glass);
    border-radius: 20px;
    backdrop-filter: var(--blur-bg);
    box-shadow: var(--shadow-xl);
  }

  .swal-icon--error {
    width: 70px;
    height: 70px;
    margin-bottom: 20px;
    
    &__line {
      width: 30px;
      height: 5px;
      top: 33px;
      background: var(--error);
    }
  }

  .swal-title {
    color: var(--text-primary);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .swal-text {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.6;
  }

  .swal-button {
    background: var(--gradient-accent);
    border-radius: 12px;
    padding: 12px 24px;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 1px solid var(--border-glass);

    &:not([disabled]):active, 
    &:not([disabled]):hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
    }
  }
  
  @media (max-width: 1150px) {
    h1 {
      font-size: 2rem;
    }
  }
  
  @media (max-width: 600px) {
    h1 {
      font-size: 1.5rem;
    }
    
    .container {
      width: 95%;
      padding: 1rem 0;
    }
  }

  // Custom scrollbar styling
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--secondary-bg);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent-primary);
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-secondary);
  }

  ::-webkit-scrollbar-corner {
    background: var(--secondary-bg);
  }

  // Firefox scrollbar
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--accent-primary) var(--secondary-bg);
  }
`;

const sizes = {
  "1275": 1275,
  "1150": 1150,
  "1050": 1050,
  "600": 600,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args: any[]) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css.call(undefined, ...args)}
    }
  `;

  return acc;
}, {});

export default GlobalStyle;

<div align="center">
  <h1>🌍 World of Alafia Logistics</h1>
  <p>A comprehensive business platform connecting service users with trusted service providers across Sierra Leone.</p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

  [Live Demo](#) | [Features](#features) | [Installation](#installation) | [Tech Stack](#tech-stack) | [Contributing](#contributing)
</div>

## ✨ Features

- **Service Marketplace**: Browse and book various services including electronics, vehicle rentals, and money transfers
- **User Authentication**: Secure sign-up and login system
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Built with shadcn/ui and Tailwind CSS for a clean, accessible interface
- **Performance Optimized**: Fast loading times with Vite and code splitting

## 🚀 Deployment

### GitHub Pages

This project is set up to deploy to GitHub Pages automatically via GitHub Actions. Follow these steps:

1. Push your code to the `main` branch
2. Go to your repository Settings > Pages
3. Set the source to `Deploy from a branch`
4. Select `gh-pages` as the branch and `/ (root)` as the folder
5. Click Save

Your site will be live at: `https://kalbertson85.github.io/worldofalafialogistics/`

**Note:** The first deployment might take a few minutes. Subsequent pushes to the `main` branch will trigger automatic deployments.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later) or pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kalbertson85/alafiaweb.git
   cd alafiaweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Update the .env file with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable UI components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and configurations
├── pages/            # Page components
├── styles/           # Global styles and themes
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## 🔧 Tech Stack

- **Frontend Framework**: [React 18](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: React Context + [TanStack Query](https://tanstack.com/query)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide](https://lucide.dev/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For inquiries or support, please contact us at [kalbertjack@yahoo.com](mailto:kalbertjack@yahoo.com)

---

<div align="center">
  Made with ❤️ by World of Alafia Team
</div>

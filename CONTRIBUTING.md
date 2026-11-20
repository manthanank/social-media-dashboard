# Contributing Guidelines

Thank you for your interest in contributing! We welcome contributions, bug fixes, and feature enhancements.

## Development Workflow

1. Fork the repository and create your branch from main:
   `ash
   git checkout -b feature/your-feature-name
   `

2. Install dependencies:
   `ash
   npm install
   `

3. Ensure code formatting and type safety:
   `ash
   npm run build
   `

4. Commit your changes with clear, semantic commit messages:
   `ash
   git commit -m "feat: add your descriptive feature"
   `

5. Push to your branch and submit a Pull Request.

## Code Standards

- **TypeScript**: Strict mode enabled. Ensure all new components and utilities are typed.
- **Styling**: Use Tailwind CSS utility classes.
- **Components**: Adhere to Next.js 15 App Router conventions (Server Components by default, "use client" only when interactivity is needed).

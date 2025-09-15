# Fireblocks Embedded Wallet Demo

A modern, production-ready React application showcasing Fireblocks Embedded Wallet integration with enterprise-grade features and best practices.

## 🚀 Features

- **Modern Tech Stack**: React 18+ with TypeScript in strict mode
- **State Management**: MobX with React integration
- **Routing**: React Router v6 with lazy loading
- **Styling**: Tailwind CSS with dark mode support
- **Build Tool**: Vite for fast development and optimized builds
- **Testing**: Vitest for unit tests, Playwright for E2E
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks
- **Security**: CSP headers, input sanitization, secure storage
- **CI/CD**: GitHub Actions with automated testing and deployment

## 📁 Project Structure

```
src/
├── app/                    # Application core
│   ├── providers/          # React context providers
│   ├── router/            # Routing configuration
│   └── App.tsx            
├── components/            # Reusable UI components
│   ├── common/           # Generic components
│   ├── layout/           # Layout components
│   └── ui/               # Primitive UI components
├── features/             # Feature-based modules
│   ├── auth/            # Authentication feature
│   ├── wallet/          # Wallet management feature
│   └── demo/            # Demo showcase feature
├── hooks/               # Custom React hooks
├── lib/                 # External library configurations
│   ├── fireblocks/     # Fireblocks EW SDK setup
│   └── api/            # API client setup
├── stores/             # MobX stores
│   ├── RootStore.ts   # Root store combining all stores
│   ├── AuthStore.ts   # Authentication state
│   ├── WalletStore.ts # Wallet state
│   └── UIStore.ts     # UI state
├── services/           # Business logic and external services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── config/             # App configuration
```

## 🛠 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fireblocks-ew-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:
   ```env
   VITE_FIREBLOCKS_CLIENT_ID=your_client_id
   VITE_FIREBLOCKS_WORKSPACE_ID=your_workspace_id
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run E2E tests
- `npm run typecheck` - Run TypeScript type checking

### Code Quality

This project enforces code quality through:

- **ESLint**: Configured with React 18+ and TypeScript rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for automated checks
- **Lint-staged**: Run linting only on staged files
- **Commitlint**: Conventional commit message format

### Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Vitest with React Testing Library
- **E2E Tests**: Playwright for cross-browser testing
- **Coverage**: Automated coverage reports
- **Mock Service Worker**: API mocking for tests

Run tests:
```bash
npm run test          # Watch mode
npm run test:run      # Single run
npm run test:coverage # With coverage
npm run test:e2e      # E2E tests
```

## 🔒 Security

Security features implemented:

- **Content Security Policy (CSP)**: Prevents XSS attacks
- **Input Sanitization**: All user inputs are sanitized
- **Secure Storage**: Encrypted local storage for sensitive data
- **HTTPS Enforcement**: Production builds force HTTPS
- **Security Headers**: Comprehensive security headers via nginx
- **Rate Limiting**: API rate limiting configuration

## 🎨 Theming

The application supports both light and dark modes:

- Automatic system theme detection
- Manual theme toggle
- Persistent theme preference
- Tailwind CSS dark mode classes

## 📱 Responsive Design

Fully responsive design with:

- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚢 Deployment

### Production Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Docker

Build and run with Docker:

```bash
# Build image
docker build -t fireblocks-ew-demo .

# Run container
docker run -p 80:80 fireblocks-ew-demo
```

### Environment Variables

Production environment variables:

```env
VITE_API_URL=https://your-api-url
VITE_FIREBLOCKS_CLIENT_ID=your_production_client_id
VITE_FIREBLOCKS_WORKSPACE_ID=your_production_workspace_id
VITE_GOOGLE_CLIENT_ID=your_production_google_client_id
VITE_ENABLE_CSP=true
VITE_ENABLE_HTTPS=true
VITE_ENABLE_ANALYTICS=true
```

## 🔗 Fireblocks Integration

To integrate with Fireblocks Embedded Wallet SDK:

1. Install the Fireblocks SDK:
   ```bash
   npm install @fireblocks/web3-provider
   ```

2. Configure the SDK in `src/lib/fireblocks/`:
   ```typescript
   import { FireblocksWeb3Provider } from '@fireblocks/web3-provider'
   
   export const fireblocksProvider = new FireblocksWeb3Provider({
     clientId: import.meta.env.VITE_FIREBLOCKS_CLIENT_ID,
     workspaceId: import.meta.env.VITE_FIREBLOCKS_WORKSPACE_ID,
   })
   ```

3. Update the `WalletStore` to use the Fireblocks provider
4. Replace mock functions with actual SDK calls

## 📄 Architecture Decisions

- **MobX over Redux**: Chosen for simplicity and TypeScript integration
- **Feature-based Structure**: Organized by business domains
- **Strict TypeScript**: Enforces type safety across the application
- **Component Co-location**: Components, hooks, and types are co-located
- **Security-first**: Security considerations in every architectural decision

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and add tests
4. Run quality checks: `npm run lint && npm run test`
5. Commit changes: `git commit -m 'feat: add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Create a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

## 📊 Performance

Performance optimizations included:

- **Code Splitting**: Route-based lazy loading
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Tree Shaking**: Dead code elimination
- **Asset Optimization**: Image and font optimization
- **Caching**: Aggressive caching strategies

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📞 Support

For questions or issues:

1. Check the [documentation](./docs/)
2. Search existing [issues](../../issues)
3. Create a new issue with detailed information

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MobX](https://mobx.js.org/) - State management
- [Vite](https://vitejs.dev/) - Build tool
- [Vitest](https://vitest.dev/) - Testing framework
- [Playwright](https://playwright.dev/) - E2E testing
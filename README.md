# Personal Homepage

A modern personal homepage built with Vue 3, TypeScript, and Vite.

## Features

- 🚀 Built with Vue 3 + TypeScript + Vite
- 📦 State management using Pinia
- 🎨 UI components from Element Plus
- 🎵 Integrated APlayer music player
- 📱 Responsive design
- 🔄 PWA support
- ⚡ High performance and optimization
- 🔐 TypeScript for type safety

## Quick Start

### Prerequisites

- Node.js >= 16
- pnpm >= 8

### Installation

```bash
# Clone the repository
git clone [https://github.com/ioococ/ioococ.github.io]

# Navigate to project directory
cd home

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

### Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
home/
├── public/         # Static assets
├── src/
│   ├── assets/    # Project assets
│   ├── components/# Vue components
│   ├── stores/    # Pinia stores
│   ├── utils/     # Utility functions
│   ├── views/     # Page views
│   ├── App.vue    # Root component
│   └── main.ts    # Entry point
├── index.html     # HTML template
└── vite.config.ts # Vite configuration
```

## Features

### Music Player

Integrated APlayer for music playback with playlist and lyrics support.

### PWA Support

Supports offline access and app installation.

## Deployment

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Development

### Code Formatting

```bash
# Format code
pnpm format
```

### Type Checking

```bash
# Run type check
pnpm type-check
```

## Contributing

Issues and Pull Requests are welcome.

## License

[MIT License](LICENSE)
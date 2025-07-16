# Dashboard Microfrontend

This folder contains the **Dashboard** microfrontend for the project. It is responsible for providing dashboard-related features and UI, and is designed to be integrated into a container application using Webpack Module Federation.

## Structure

- `src/` — Source code for the Dashboard microfrontend
- `public/` — Static assets and HTML template
- `config/` — Webpack configuration files (supports Vue.js and JavaScript)
- `package.json` — Project dependencies and scripts

## Key Features

- Built with Vue.js (supports `.vue` single-file components)
- Handles dashboard-specific routes and UI
- Exposes modules for consumption by the container app via Module Federation
- Uses Webpack and Babel for bundling and transpilation
- Can be developed and run independently or as part of the larger microfrontend architecture

## Development

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm start
   ```
3. Build for production:
   ```sh
   npm run build
   ```

## Deployment

- Deployment is automated via GitHub Actions (`.github/workflows/dashboard.yml`).
- The build output is synced to an AWS S3 bucket and CloudFront cache is invalidated for the latest remote entry.

## Integration

- The container app loads the Dashboard microfrontend at runtime using Module Federation.
- The Dashboard exposes its modules for use by the container or other microfrontends.

## License

MIT

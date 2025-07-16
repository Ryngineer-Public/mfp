# Auth Microfrontend

This folder contains the **Auth** microfrontend for the project. It is responsible for user authentication, including sign-in and sign-up functionality, and is designed to be integrated into a container application using Webpack Module Federation.

## Structure

- `src/` — Source code for the Auth microfrontend
  - `components/Signin.js` — Sign-in form component
  - `components/Signup.js` — Sign-up form component
  - `App.js` — Main React entry point, sets up routing for auth pages
  - `bootstrap.js` — Mount function for integration with container
- `public/` — Static assets and HTML template
- `config/` — Webpack configuration files
- `package.json` — Project dependencies and scripts

## Key Features

- Built with React and Material-UI
- Handles `/auth/signin` and `/auth/signup` routes
- Exposes a `mount` function for use by the container app
- Uses memory history for routing when embedded, browser history in isolation
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

- Deployment is automated via GitHub Actions (`.github/workflows/auth.yml`).
- The build output is synced to an AWS S3 bucket and CloudFront cache is invalidated for the latest remote entry.

## Integration

- The container app loads the Auth microfrontend at runtime using Module Federation.
- The `mount` function is called by the container, rendering the Auth app into a provided DOM node and syncing navigation events.

## License

MIT

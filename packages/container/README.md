# Container Microfrontend

This package serves as the main container for the Microfrontends project. It orchestrates and integrates the various microfrontend applications.

## Features

- Hosts and manages multiple microfrontends
- Handles routing and shared state
- Provides a unified user experience

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the container:**

   ```bash
   npm start
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
/container
  ├── src/
  ├── public/
  ├── package.json
  └── README.md
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License.

## Notes

This container application is accessible via aws cloufront distribution. Cloudfront caches the application for performance. To invalidate the cache after deployment, the github workflow has a run step that invalidates the index.html under the container/latest path. This ensures that users always get the latest version of the application. The other files are updated automatically since the file name is appended with the build hash thus ensuring that the browser fetches the latest version of the files.

The container application needs to have access to the dynamic domain where the marketing application is hosted. This is done by setting the `PRODUCTION_DOMAIN` environment variable in the GitHub secrets. The container application uses this domain to load the remote entry file of the marketing application dynamically.
The `webpack.prod.js` file in the container package is configured to use this domain for the `marketing` remote application.
The `publicPath` in the `webpack.prod.js` file is set to `/container/latest/`, which defines the base path for all assets within the application. This ensures that all static files are served from the correct path when deployed to production.

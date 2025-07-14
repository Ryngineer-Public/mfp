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

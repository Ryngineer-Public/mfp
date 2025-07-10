# Packages Directory

This directory contains the core microfrontend applications for the project. Each subfolder represents a separate microfrontend or module, managed independently but designed to work together as part of a larger application.

## Structure

- **auth/**: Handles authentication-related UI and logic. Uses React, Material-UI, and React Router DOM.
- **container/**: The main host application that composes and orchestrates the microfrontends.
- **dashboard/**: Provides dashboard features and UI components.
- **marketing/**: Contains marketing pages and related UI.

Each package is set up as an individual project with its own `package.json`, dependencies, and build configuration. Most packages use React and Material-UI for UI development, and Webpack for bundling.

## Development

- Install dependencies for each package by running `npm install` or `yarn` inside the respective folder.
- Each package can be developed and run independently using its own scripts.
- For local development, use `webpack-dev-server` for hot reloading and fast feedback.

## Technologies Used

- React
- Material-UI
- Webpack
- Babel

## Notes

- This structure supports a microfrontend architecture, allowing teams to work on different features in isolation.
- Shared dependencies should be managed carefully to avoid duplication and version conflicts.

## Configuration

Webpack is used for bundling application into s single js file.

- webpack.common.js is used to define shared configurations and plugins that can be reused across different packages. This helps maintain consistency in build processes and optimizations.

- webpack.dev.js and webpack.prod.js are used for development and production builds, respectively. They extend the common configuration and can include environment-specific settings.

## APIs

### useRef Hook

The `useRef` hook is used to create a mutable object that persists for the full lifetime of the component. It can be used to store a reference to a DOM element or any other value that you want to keep across renders without causing re-renders when updated.

```javascript
import React, { useRef } from "react";
function MyComponent() {
  const myRef = useRef(null);

  const handleClick = () => {
    console.log(myRef.current); // Access the current value of the ref
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <div ref={myRef}>This is a ref element</div>
    </div>
  );
}
```

myRef will hold a reference to the div element, and you can access it in the `handleClick` function.

1. myRef is initiailized to nll when the component mounts.
2. ref is a react attribute the attaches the dev to myRef object.
3. myRef.current will hold the reference to DIV / DOM element.

The UseRef is simialr to UseState hook, but it does not trigger a re-render when the value changes. It is often used for accessing DOM elements directly or for storing mutable values that do not require re-rendering the component.

### how is it used in the project

In this project it is used within the `MarketingApp.js` file to mount the marketing application to a specific DOM element. The `mount` function is called with the `el` parameter, which is a reference to the DOM element where the marketing app will be rendered.

In this case the div element within the MarketingApp component is referenced by the object created by `useRef`, and the `mount` function is called with this reference to render the marketing app into that element.

## What did I learn from this project ?

### Setting up AWS cloud resources for hosting microfrontends

To set up an AWS S3 bucket for hosting static files, follow these steps:

1. **Create an S3 Bucket**:
   - Log in to the AWS Management Console.
   - Navigate to the S3 service.
   - Click on "Create bucket".
   - Enter a unique bucket name and select a region.
   - Configure options as needed
   - enable static website hosting if you want to serve files directly.
   - Disabled "Block all public access" if you want the bucket to be publicly accessible.
   - Added a Bucket policy using policy generator to allow public read access to the bucket contents.
   - Click "Create bucket".
2. **Create AWS Cloudfront**

## Resources

https://childish-legal-44d.notion.site/Micro-Frontends-224941c82f25809daba9eaa9f7f279e7?source=copy_link

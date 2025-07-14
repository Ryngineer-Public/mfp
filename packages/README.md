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

1. myRef is initiailized to nUll when the component mounts.
2. ref is a react attribute the attaches the dev to myRef object.
3. myRef.current will hold the reference to DIV / DOM element.

The UseRef is simialr to UseState hook, but it does not trigger a re-render when the value changes. It is often used for accessing DOM elements directly or for storing mutable values that do not require re-rendering the component.

### how is it used in the project

In this project it is used within the `MarketingApp.js` file to mount the marketing application to a specific DOM element. The `mount` function is called with the `el` parameter, which is a reference to the DOM element where the marketing app will be rendered.

In this case the div element within the MarketingApp component is referenced by the object created by `useRef`, and the `mount` function is called with this reference to render the marketing app into that element.

## What did I learn from this project ?

### Issues with CSS in microfrontends

When working with microfrontends, one common issue is CSS conflicts between different microfrontend applications. This can happen when multiple applications use the same class names or global styles, leading to unexpected styling issues.

Eg - Project one sets a css rule of h1 { color: red; } and project two sets h1 { color: blue; }. When these two applications are loaded together, the last applied style will take precedence, causing the h1 elements to appear in the color of the last loaded application.

#### Resolution

To resolve CSS conflicts in microfrontends, you can use several strategies:

1. CSS-in-JS: Use libraries like styled-components or Emotion to scope styles to specific components, preventing global conflicts.
2. "Namespacing" CSS: Use unique prefixes for class names to avoid conflicts. For example, use `.app1-header` and `.app2-header` instead of just `.header`. or set the parent element class name to the microfrontend name and use that as a prefix for all the classes within that microfrontend. eg :

```css
.app1 h1 {
  color: red;
}
.app2 h1 {
  color: blue;
}
```

Where app1 is for microfrontend one and app2 is for microfrontend two. This way, the styles are scoped to the specific microfrontend and do not conflict with each other.

#### How about CSS coming from third-party libraries?

To handle CSS from third-party libraries, you can:

1. Use a component library that supports CSS-in-JS or scoped styles.
2. Maunally builf the css llibrary and apply namespacing to the classes used by the library.

#### `makestyles` from material-ui

Material-UI's `makeStyles` function allows you to create scoped styles for your components. It generates unique class names for the styles, which helps prevent conflicts with other styles in the application. This is particularly useful in a microfrontend architecture where multiple applications may be loaded together.

'Landing.js' and 'Pricing.js` use makeStyles function which basically does the below:

```javascript
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
}));

export default function Album() {
  const classes = useStyles();
  return <div className={classes.root}>{/* Your component content */}</div>;
}
```

In the above case makeStyles reads teh data passed to the function in this case 'root'

1. generates a JS file with key beiing the key "root" and the vaue being the unique class name - "makeStyles-root-12345". The makestyles
2. Also generates a CSS file with the same class name and the styles defined in the function. eg - "makeStyles-root-12345 { background-color: #fff; padding: 16px; }"

the component then invkes the useStyles() that returns the JS object which contains the class name as the key and the unique class name as the value. This is then used
in the component to apply the styles.

##### But there was an issue when the projects were built and deployed to production - why ?

The reason was , whent the projects are built in production, the stylke names are shortened to reduce the file size and improve performance. This means that the unique class names generated by `makeStyles` may not match the ones used in development, leading to conflicting styles between 2 different microfrontends.

To reolve this we uses anoterh matrial-ui function called `createGenerateClassName` which allows you to customize the class name generation process. This function can be used to ensure that class names are unique across different microfrontends, even when they are built and deployed separately.

The usage can be seen in app.js file of the projects.

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
2. **Create AWS Cloudfront (CDN)**

- Create a new ditribution.
- The Distibution Key / ID will need to stored as a secret in github secrets for the github workflow to use it.
- CDN cacahes the files for performance. WE will need to create an invalidation for the index.html file after deployment to ensure that users always get the latest version of the application. This is done as a part of the github workflows run command. The other files are updated automatically since the file name is appended with the build hash thus ensuring that the browser fetches the latest version of the files.

**S3 Bucket Creation and Configuration**
Go to AWS Management Console and use the search bar to find S3
Click Create Bucket
Specify an AWS Region
Provide unique Bucket Name and click Create Bucket
Click the new Bucket you have created from the Bucket list.
Select Properties
Scroll down to Static website hosting and click Edit
Change to Enable
Enter index.html in the Index document field
Click Save changes
Select Permissions
Click Edit in Block all public access
Untick the Block all public access box.
Click Save changes
Type confirm in the field and click Confirm
Find the Bucket Policy and click Edit
Click Policy generator
Change Policy type to S3 Bucket Policy
Set Principle to \*
Set Action to Get Object
Copy the S3 bucket ARN to add to the ARN field and add /_ to the end.
eg: arn:aws:s3:::mfe-dashboard/_
Click Add Statement
Click Generate Policy
Copy paste the generated policy text to the Policy editor
Click Save changes

**CloudFront setup**
Go to AWS Management Console and use the search bar to find CloudFront
Click Create distribution
Set Origin domain to your S3 bucket
Find the Default cache behavior section and change Viewer protocol policy to Redirect HTTP to HTTPS
Scroll down and click Create Distribution
After Distribution creation has finalized click the Distribution from the list, find its Settings and click Edit
Scroll down to find the Default root object field and enter /container/latest/index.html
Click Save changes
Click Error pages
Click Create custom error response
Change HTTP error code to 403: Forbidden
Change Customize error response to Yes
Set Response page path to /container/latest/index.html
Set HTTP Response Code to 200: OK

**CreatE IAM user**

1. Search for "IAM"
2. In the left sidebar, click Users under Access Management.
3. Click "Create user"
4. Enter any name you’d like in the "User Name" field.
5. Click "Next"
6. Click "Attach Policies Directly"
7. Use the search bar to find and tick AmazonS3FullAccess and CloudFrontFullAccess
8. Click "Next"
9. Click "Create user"
10. Select the IAM user that was just created from the list of users
11. Click "Security Credentials"
12. Scroll down to find "Access Keys"
13. Click "Create access key"
14. Select "Command Line Interface (CLI)"
15. Scroll down and tick the "I understand..." check box and click "Next"
16. Copy and/or download the Access Key ID and Secret Access Key to use for deployment.

## Resources

https://childish-legal-44d.notion.site/Micro-Frontends-224941c82f25809daba9eaa9f7f279e7?source=copy_link

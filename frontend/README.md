# E-Commerce Frontend Application

A modern, responsive E-Commerce web application built with React, Vite, and Tailwind CSS. This application features product browsing, shopping cart functionality, user authentication, and a beautiful user interface.

## 🚀 Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **React Router DOM 7.9.6** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Three.js** - 3D graphics library
- **Swiper** - Touch slider component
- **FontAwesome** - Icon library

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **Node.js** (version 16.x or higher recommended)
   - Download from: https://nodejs.org/
   - Verify installation by running: `node --version`
   - Verify npm installation: `npm --version`

2. **npm** (comes with Node.js) or **yarn** (optional)
   - npm is included with Node.js
   - If you prefer yarn: `npm install -g yarn`

3. **Git** (optional, for cloning the repository)
   - Download from: https://git-scm.com/

## 📦 Installation Steps

### Step 1: Navigate to the Project Directory

Open your terminal (Command Prompt, PowerShell, or Git Bash on Windows) and navigate to the frontend directory:

```bash
cd E-Commerce/frontend
```

If you're already in the E-Commerce folder:
```bash
cd frontend
```

### Step 2: Install Dependencies

Install all required packages and dependencies:

**Using npm:**
```bash
npm install
```

**Using yarn (if you prefer):**
```bash
yarn install
```

This command will:
- Read the `package.json` file
- Download and install all dependencies listed in `dependencies` and `devDependencies`
- Create a `node_modules` folder with all packages
- This process may take a few minutes depending on your internet connection

**Expected output:**
You should see progress indicators and eventually a message indicating successful installation. The `node_modules` folder will be created in the `frontend` directory.

### Step 3: Verify Installation

After installation completes, verify that everything is set up correctly:

```bash
npm list --depth=0
```

This will show you the installed packages. You should see packages like:
- react
- react-dom
- vite
- tailwindcss
- react-router-dom
- etc.

## 🏃 Running the Application

### Development Mode

To start the development server:

```bash
npm run dev
```

**What happens:**
- Vite will start a development server
- The application will be compiled and served
- You'll see output in your terminal showing:
  - Local URL (usually `http://localhost:5173`)
  - Network URL (for accessing from other devices on your network)
  - Ready status

**Example output:**
```
  VITE v7.2.4  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

### Accessing the Application

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Navigate to the URL shown in the terminal (usually `http://localhost:5173`)
3. You should see the E-Commerce application homepage

### Hot Module Replacement (HMR)

The development server includes Hot Module Replacement, which means:
- Changes to your code will automatically refresh in the browser
- You don't need to manually refresh the page
- The page state is preserved when possible

### Stopping the Development Server

To stop the development server:
- Press `Ctrl + C` in the terminal where the server is running
- Or close the terminal window

## 🛠️ Available Scripts

The project includes several npm scripts defined in `package.json`:

### `npm run dev`
- Starts the development server
- Enables hot module replacement
- Opens the app at `http://localhost:5173`

### `npm run build`
- Creates an optimized production build
- Outputs files to the `dist` folder
- Minifies and optimizes code for production
- Use this before deploying to production

### `npm run preview`
- Previews the production build locally
- Must run `npm run build` first
- Useful for testing the production build before deployment

### `npm run lint`
- Runs ESLint to check code quality
- Identifies potential errors and code style issues
- Helps maintain consistent code quality

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
│   ├── index.html      # HTML template
│   └── vite.svg        # Favicon
├── src/
│   ├── components/     # Reusable React components
│   │   ├── common/     # Common components (Button, Carousel, etc.)
│   │   └── layout/     # Layout components (Navbar, Footer)
│   ├── context/        # React Context providers
│   │   └── CartContext.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── utils/          # Utility functions and data
│   │   └── data.js     # Product data
│   ├── App.jsx         # Main App component
│   ├── App.css         # App-specific styles
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── images/             # Image assets
├── node_modules/       # Dependencies (auto-generated)
├── package.json        # Project configuration and dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.js   # PostCSS configuration
```

## 🌐 Application Routes

The application includes the following routes:

- `/` - Home page
- `/products` - Products listing page
- `/product/:id` - Individual product details page
- `/cart` - Shopping cart page
- `/login` - User login page
- `/register` - User registration page

## 🐛 Troubleshooting

### Issue: `npm install` fails

**Possible solutions:**
1. Check your Node.js version: `node --version` (should be 16.x or higher)
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` folder and `package-lock.json`, then run `npm install` again
4. Check your internet connection
5. Try using a different network or VPN if behind a firewall

### Issue: Port 5173 is already in use

**Solution:**
- Vite will automatically try the next available port (5174, 5175, etc.)
- Or manually specify a port in `vite.config.js`:
  ```js
  export default defineConfig({
    plugins: [react()],
    server: {
      port: 3000
    }
  })
  ```

### Issue: Dependencies installation takes too long

**Solutions:**
1. This is normal for the first installation
2. Consider using a faster package manager like `pnpm` or `yarn`
3. Check your internet connection speed
4. Some packages (like Three.js) are large and may take time

### Issue: Module not found errors

**Solution:**
1. Make sure you've run `npm install`
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install` again
4. Restart your development server

### Issue: Styles not loading (Tailwind CSS)

**Solution:**
1. Make sure `tailwind.config.js` is properly configured
2. Check that `index.css` includes Tailwind directives
3. Restart the development server after configuration changes

## 🔧 Development Tips

1. **Code Formatting**: The project uses ESLint for code quality. Run `npm run lint` regularly.

2. **Browser DevTools**: Use React DevTools browser extension for debugging React components.

3. **Hot Reload**: Save your files and see changes instantly in the browser.

4. **Console Errors**: Check the browser console (F12) for any runtime errors.

5. **Network Tab**: Use browser DevTools Network tab to debug API calls (if you add a backend later).

## 📝 Next Steps

After successfully running the application:

1. Explore the codebase to understand the structure
2. Modify components to customize the design
3. Add new features or pages
4. Connect to a backend API (if needed)
5. Deploy to a hosting service (Vercel, Netlify, etc.)

## 🚀 Building for Production

When you're ready to deploy:

1. Build the production version:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

3. The `dist` folder contains the optimized files ready for deployment

4. Deploy the `dist` folder to your hosting service:
   - **Vercel**: `vercel deploy`
   - **Netlify**: Drag and drop the `dist` folder
   - **GitHub Pages**: Follow their deployment guide

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/)

## 💡 Support

If you encounter any issues not covered in this guide:

1. Check the browser console for error messages
2. Review the terminal output for build errors
3. Verify all prerequisites are installed correctly
4. Ensure you're in the correct directory (`frontend/`)

---

**Happy Coding! 🎉**

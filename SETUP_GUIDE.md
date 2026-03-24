# Portfolio Website - Complete Setup Guide

A full-stack portfolio website built with HTML, CSS, JavaScript (frontend), Node.js + Express (backend), and Supabase (database).

## 📁 Project Structure

```
Portfolio Website/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Responsive styling
│   └── script.js           # Frontend logic
│
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Node dependencies
│   ├── .env.example        # Environment variables template
│   ├── .env                # Your actual environment variables (create this)
│   └── routes/
│       ├── projects.js     # Projects API endpoints
│       └── contact.js      # Contact form API endpoints
│
└── README.md               # This file
```

## ✨ Features

- **Responsive Design**: Mobile-first approach with CSS Grid/Flexbox
- **Smooth Scrolling**: Navigation with smooth scroll animations
- **Dynamic Projects**: Projects fetched from Supabase via backend API
- **Contact Form**: Form submission stored in Supabase database
- **Error Handling**: Proper error handling and validation
- **Clean UI**: Modern gradient design with hover effects
- **RESTful API**: Express backend with proper routing and middleware
- **Database**: Supabase for reliable data storage

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+) and npm installed
- Supabase account (free tier works)
- A code editor (VS Code recommended)
- Browser (Chrome, Firefox, Edge, Safari)

### Step 1: Clone/Setup Project

```bash
# Navigate to the project folder
cd "Portfolio Website"

# Create .env file in backend folder
copy backend\.env.example backend\.env
```

### Step 2: Setup Supabase

1. **Go to [supabase.com](https://supabase.com)** and sign up/login
2. **Create a new project**:
   - Click "New project"
   - Name it "portfolio-website"
   - Choose a region closest to you
   - Create a strong password
   - Click "Create new project"

3. **Create the `projects` table**:
   ```sql
   CREATE TABLE projects (
     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     title VARCHAR(255) NOT NULL,
     description TEXT NOT NULL,
     link VARCHAR(500) NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```
   
   - Go to SQL Editor in Supabase
   - Paste the above SQL
   - Click "Run"

4. **Create the `contacts` table**:
   ```sql
   CREATE TABLE contacts (
     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```
   
   - Paste this SQL in a new query
   - Click "Run"

5. **Get your Supabase credentials**:
   - Go to "Settings" → "API" in Supabase dashboard
   - Copy your **Project URL** (looks like: `https://yourproject.supabase.co`)
   - Copy your **anon public key** (starts with `eyJh...`)

### Step 3: Configure Environment Variables

1. **Open `backend/.env`** file
2. **Add your Supabase credentials**:
   ```env
   PORT=3000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5500
   SUPABASE_URL=https://yourproject.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 4: Install Dependencies

```bash
# Navigate to backend folder
cd backend

# Install Node packages
npm install

# Go back to root
cd ..
```

### Step 5: Add Sample Projects to Database

1. **Open Supabase dashboard**
2. **Go to Table Editor** → Click on `projects` table
3. **Click "Insert row"** and add these sample projects:

**Project 1:**
- title: `E-Commerce Platform`
- description: `Full-stack e-commerce site with payment integration and inventory management`
- link: `https://github.com/yourusername/ecommerce`

**Project 2:**
- title: `Task Management App`
- description: `Collaborative task manager with real-time updates and team features`
- link: `https://github.com/yourusername/task-manager`

**Project 3:**
- title: `Weather Dashboard`
- description: `Real-time weather application using public weather API with beautiful UI`
- link: `https://github.com/yourusername/weather-app`

### Step 6: Run the Application

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm run dev
```

You should see:
```
✅ Server is running on http://localhost:3000
📝 API Documentation:
   - GET /api/projects - Fetch all projects
   - POST /api/contact - Submit contact form
   - GET /api/health - Health check
```

**Terminal 2 - Start Frontend (Live Server):**

Option A - Using VS Code Live Server:
- Right-click on `frontend/index.html`
- Select "Open with Live Server"
- Browser opens to `http://localhost:5500`

Option B - Using Python:
```bash
cd frontend
python -m http.server 5500
```

Option C - Using Node's http-server:
```bash
# Install globally (if not already)
npm install -g http-server

# In frontend folder
cd frontend
http-server -p 5500
```

### Step 7: Test the Application

1. Open browser to `http://localhost:5500`
2. **Test Navigation**: Click nav links (smooth scroll)
3. **Test Projects**: Scroll to projects section - should display your 3 sample projects
4. **Test Contact Form**:
   - Fill in name, email, and message
   - Click "Send Message"
   - Should see success message
   - Check Supabase `contacts` table for your submission

## 🔧 API Endpoints

### GET /api/projects
Fetches all projects from database

**Response:**
```json
[
  {
    "id": 1,
    "title": "E-Commerce Platform",
    "description": "Full-stack e-commerce site...",
    "link": "https://github.com/...",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

**Status Codes:**
- `200`: Success
- `500`: Server error

### POST /api/contact
Submits contact form data

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great portfolio!"
}
```

**Response (Success):**
```json
{
  "message": "Contact message received successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great portfolio!",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

**Status Codes:**
- `201`: Message created
- `400`: Validation error
- `500`: Server error

## 🎨 Customization Guide

### Change Colors
Edit `frontend/style.css`:
```css
/* Primary gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to your colors, e.g.: */
background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
```

### Update Personal Information
Edit `frontend/index.html`:
```html
<h1 class="hero-title">Hi, I'm Your Name</h1>
<p class="hero-tagline">Your Title | Your Description</p>
```

Edit About section:
```html
<p>Write your bio here...</p>
```

Update skills:
```html
<div class="skill-tag">Your Skill</div>
```

### Modify Navigation Items
Edit `frontend/index.html` - `<nav>` section to add/remove menu items

### Change Project Card Layout
Edit `frontend/style.css` - `.projects-grid`:
```css
/* Default: 3 columns on desktop, 1 on mobile */
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

/* Change to 4 columns: */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

### Add More Backend Routes
Create new files in `backend/routes/`:
```javascript
const express = require('express');
const router = express.Router();

// Your route logic here

module.exports = router;
```

Then in `backend/server.js`:
```javascript
const yourRoutes = require('./routes/yourfile');
app.use('/api/yourpath', yourRoutes);
```

## 📦 Deployment

### Deploy Backend (Heroku Example)

1. **Create Heroku account** at [heroku.com](https://heroku.com)
2. **Install Heroku CLI**
3. **Navigate to backend folder** and initialize git:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   ```
4. **Create Heroku app**:
   ```bash
   heroku create your-portfolio-api
   ```
5. **Set environment variables**:
   ```bash
   heroku config:set SUPABASE_URL=your_url
   heroku config:set SUPABASE_ANON_KEY=your_key
   ```
6. **Deploy**:
   ```bash
   git push heroku main
   ```

### Deploy Frontend (Netlify Example)

1. Go to [netlify.com](https://netlify.com)
2. Sign up and connect your GitHub repo
3. Set build command: (leave blank)
4. Set publish directory: `frontend/`
5. Deploy

## 🐛 Troubleshooting

### "Cannot GET /api/projects"
- Backend server not running - Start it with `npm run dev`
- Wrong API_URL in `frontend/script.js`
- Check if ports match (3000 for backend, 5500 for frontend)

### Projects not loading
- Check browser console (F12 → Console tab)
- Verify Supabase credentials in `.env`
- Confirm `projects` table exists in Supabase
- Verify table has sample data

### Contact form not working
- Backend must be running
- Check network tab (F12 → Network) for failed requests
- Verify email validation in backend
- Check Supabase `contacts` table permissions

### CORS Errors
- Make sure `CLIENT_URL` in `.env` matches your frontend URL
- Check that `frontend/script.js` has correct `API_URL`

### Port already in use
**For Port 3000:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Mac/Linux
lsof -i :3000
kill -9 [PID]
```

**For Port 5500:**
```bash
# Use different port
http-server -p 8000
# Then open http://localhost:8000
```

## 📚 Technologies Used

- **Frontend**:
  - HTML5 for markup
  - CSS3 for styling (Flex, Grid, animations)
  - Vanilla JavaScript (no frameworks)

- **Backend**:
  - Node.js runtime
  - Express.js framework
  - CORS middleware
  - dotenv for environment variables

- **Database**:
  - Supabase (PostgreSQL)
  - SQL for table creation
  - Supabase JS client library

## 📝 File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Page structure with all sections |
| `style.css` | Responsive design and animations |
| `script.js` | API calls and form handling |
| `server.js` | Express app setup and middleware |
| `projects.js` | GET endpoint for projects |
| `contact.js` | POST endpoint for contact submissions |
| `.env` | Your Supabase credentials |
| `package.json` | Node dependencies |

## 🎯 Next Steps

1. **Customize** colors, fonts, and content
2. **Add** more projects to Supabase
3. **Enhance** with animations or additional pages
4. **Deploy** frontend and backend
5. **Add** Google Analytics or other tracking
6. **Set up** email notifications for contact submissions

## 📄 License

MIT License - feel free to use this project for your portfolio!

## 💡 Tips

- Update your social media links in the footer
- Add your actual projects with real links
- Test on mobile devices (use dev tools)
- Keep `.env` file secret (add to `.gitignore`)
- Monitor Supabase usage in free tier (usually sufficient)
- Use Supabase backups before major changes

## 🤝 Support

If you encounter issues:
1. Check the Troubleshooting section
2. Verify all credentials are correct
3. Ensure all files are in the right folders
4. Check browser console for error messages
5. Verify Supabase tables and data

Happy coding! 🚀

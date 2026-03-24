<<<<<<< HEAD
# Portfolio Website

A modern, responsive full-stack portfolio website built with vanilla JavaScript, Node.js/Express, and Supabase.

## ✨ Features

✅ **Responsive Design** - Mobile, tablet, and desktop optimized
✅ **Dynamic Projects** - Fetch projects from Supabase database
✅ **Contact Form** - Submit messages stored in database
✅ **Modern UI** - Beautiful gradients and smooth animations
✅ **RESTful API** - Express backend with proper routing
✅ **Database** - Supabase PostgreSQL integration
✅ **Error Handling** - Comprehensive validation and error messages
✅ **Clean Code** - Well-commented and organized

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ and npm
- Supabase account (free)
- Code editor (VS Code recommended)

### Installation

1. **Navigate to project directory**
   ```bash
   cd "Portfolio Website"
   ```

2. **Set up Supabase**
   - Create account at [supabase.com](https://supabase.com)
   - Create two tables (see [SETUP_GUIDE.md](SETUP_GUIDE.md) for SQL)
   - Get your URL and anon key from Settings → API

3. **Configure Backend**
   ```bash
   # Copy example env file
   copy backend\.env.example backend\.env
   
   # Edit backend/.env and add your Supabase credentials
   ```

4. **Install Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

5. **Run Backend**
   ```bash
   cd backend
   npm run dev
   # Server runs on http://localhost:3000
   ```

6. **Run Frontend**
   - Option A: Right-click `frontend/index.html` → "Open with Live Server"
   - Option B: `cd frontend && python -m http.server 5500`
   - Open browser to `http://localhost:5500`

## 📁 Project Structure

```
Portfolio Website/
├── frontend/
│   ├── index.html           # Main page
│   ├── style.css            # Styling & animations
│   ├── script.js            # Frontend logic & API calls
│   └── .env.example         # Frontend config notes
├── backend/
│   ├── server.js            # Express server
│   ├── package.json         # Dependencies
│   ├── .env                 # Your credentials (create from .env.example)
│   ├── .env.example         # Template
│   └── routes/
│       ├── projects.js      # GET /api/projects
│       └── contact.js       # POST /api/contact
├── SETUP_GUIDE.md           # Detailed setup instructions
└── README.md                # This file
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Fetch all projects |
| GET | `/api/projects/:id` | Fetch single project |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/health` | Server health check |

## 🎨 Customization

### Update Your Information
Edit `frontend/index.html`:
- Change name and tagline in hero section
- Update bio in about section
- Add your skills in skills section

### Change Colors
Edit `frontend/style.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Change to your brand colors */
```

### Add Projects
1. Open Supabase dashboard
2. Go to `projects` table
3. Click "Insert row" and add your project details

### Deploy
See [SETUP_GUIDE.md](SETUP_GUIDE.md) for Heroku, Netlify, and other deployment options.

## 📚 Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **Deployment Ready**: Compatible with Heroku, Netlify, Vercel

## 🐛 Troubleshooting

**Projects not loading?**
- Check browser console (F12)
- Verify backend is running
- Confirm Supabase credentials in `.env`

**Contact form not working?**
- Backend must be running
- Check network tab in dev tools
- Verify Supabase tables exist

**Port conflicts?**
- Change port in `.env` or use different port for frontend

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for more troubleshooting.

## 📖 Full Documentation

For detailed setup instructions, API documentation, deployment guides, and troubleshooting, see [SETUP_GUIDE.md](SETUP_GUIDE.md).

## 📄 License

MIT License - Feel free to use for your portfolio!

## 🚀 Next Steps

1. Follow [SETUP_GUIDE.md](SETUP_GUIDE.md) for complete setup
2. Customize with your information
3. Add your real projects to Supabase
4. Test all features
5. Deploy to production

Happy coding! 💻
=======
# Amruthas-Portfolio
People can contact me and connect with me using my portfolio
>>>>>>> 20b95e26fe27bf835561dfdaf496b5140ff58fdf

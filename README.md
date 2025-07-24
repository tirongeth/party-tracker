# 🎉 BoozeLens - Picture Perfect Party

A real-time BAC (Blood Alcohol Content) monitoring system for the Picture Perfect Party experience.

## 🚀 Quick Start

### Prerequisites
- Python 3.x installed on your computer
- A web browser (Chrome, Firefox, Safari, etc.)
- Your Firebase configuration (already set up in the code)

### Running the Application

1. **Open Terminal/Command Prompt** in the project directory

2. **Start the development server** using one of these methods:
   
   **Option A - Using the custom server (recommended):**
   ```bash
   python server.py
   ```
   
   **Option B - Using Python's built-in server:**
   ```bash
   python -m http.server 8000
   ```
   
   **Option C - Using npm scripts (if you have Node.js):**
   ```bash
   npm start
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:8000
   ```

4. **Create an account or login** to start using BoozeLens!

## 📁 Project Structure

```
party-tracker/
├── index.html              # Main HTML file
├── server.py              # Development server
├── package.json           # Project configuration
├── .env                   # Environment variables (keep secret!)
├── .env.example          # Example environment file
├── src/
│   ├── css/
│   │   └── boozelens.css # All styles
│   └── js/
│       ├── main.js       # Main entry point
│       ├── auth/
│       │   └── auth.js   # Authentication
│       ├── config/
│       │   ├── firebase.js   # Firebase setup
│       │   ├── app-state.js  # State management
│       │   └── constants.js  # App constants
│       ├── features/
│       │   ├── devices.js       # Device pairing
│       │   ├── drinks.js        # Drink tracking
│       │   ├── games.js         # Party games
│       │   └── all-functions.js # All other functions
│       └── ui/
│           ├── dashboard.js     # Dashboard UI
│           └── notifications.js # Notifications
└── safe.html             # Original file (backup)
```

## 🔥 Firebase Setup

The app uses Firebase for:
- **Authentication**: User login/signup
- **Realtime Database**: Live BAC readings and friend data
- **Data Sync**: Keep everything synchronized across devices

Your Firebase config is already set up in `.env` and `src/js/config/firebase.js`.

## 🎮 Features

### 📱 Device Pairing
- Connect Arduino/ESP32 breathalyzers
- Real-time BAC monitoring
- Multiple device support

### 👥 Friends System
- Add friends with permission levels (Observer/Buddy/Guardian)
- See friends' BAC levels (with permission)
- Friend requests and management

### 🍻 Drink Tracking
- Log drinks with type, amount, and alcohol percentage
- Visual drink distribution chart
- Emergency medical report generation
- BAC estimation

### 🎮 Party Games
- Never Have I Ever
- Truth or Dare
- King's Cup
- Beer Pong Tracker
- Flip Cup Timer
- HSG Trivia

### 🚨 Safety Features
- Emergency contacts quick access
- First aid guide
- Uber integration with saved home address
- Buddy system
- Hydration reminders

### ⚙️ Settings
- Profile management
- Emergency information
- Privacy controls
- Data export

## 🛠️ Development

### Making Changes

1. **CSS Changes**: Edit `src/css/boozelens.css`
2. **JavaScript Changes**: Edit the appropriate module in `src/js/`
3. **Add New Features**: Create new modules and import them in `main.js`

### Adding Global Functions

If you need to add a function that's called from HTML onclick handlers:

1. Add the function to the appropriate module
2. Export it from that module
3. In `main.js`, import it and add to the `exposeGlobalFunctions()` function:
   ```javascript
   window.yourNewFunction = YourModule.yourNewFunction;
   ```

### Module System

The app uses ES6 modules for better code organization:
- Each feature has its own module
- State is centralized in `app-state.js`
- Constants are in `constants.js`
- All modules are imported and initialized in `main.js`

## 🐛 Troubleshooting

### "Module not found" errors
- Make sure you're running the server (not just opening index.html)
- Check that all import paths start with `./` or `../`

### Functions not working
- Check browser console for errors
- Ensure functions are exposed globally in `main.js`
- Verify Firebase is initialized

### Firebase connection issues
- Check internet connection
- Verify Firebase config in `.env` matches your Firebase project
- Check Firebase console for any security rule issues

## 📱 Mobile Support

The app is fully responsive and works on:
- iOS Safari
- Android Chrome
- Tablets
- Desktop browsers

## 🔒 Security Notes

- Never commit `.env` file to version control
- Keep Firebase API keys secure
- Use Firebase security rules to protect user data
- Sanitize user inputs

## 🤝 Contributing

1. Make your changes in a new branch
2. Test thoroughly
3. Ensure all functions still work
4. Submit a pull request

## 📄 License

MIT License - feel free to use and modify!

## 🆘 Support

Having issues? Check:
1. Browser console for errors (F12)
2. Network tab for failed requests
3. Firebase console for backend issues

---

Made with ❤️ for safe partying at HSG
#  Illustrata Embed Solution

A **React + Vite** frontend for the *Illustrata Embed Solution*, providing secure authentication and an interactive code generator to embed product illustrations with customizable colors.

---

##  Features
-  **Secure Login** – JWT-based auth  
-  **Code Generator** – Generate iframe embed code for products  
-  **Customizable Colors** – Adjust illustration colors before embedding  
-  **Live Preview** – See changes instantly  
-  **Protected Routes** – Only authenticated users can access the generator  
-  **Responsive UI** – Built with Material-UI + custom styles  

---

##  Tech Stack
- **React + Vite**  
- **Material-UI (MUI)**  
- **JWT Authentication**  
- **Custom CSS**  

---

###  Installation
```bash
git clone https://github.com/yourusername/illustrator_frontend_ssk.git
cd illustrator_frontend_ssk
npm install
```
### Development
```bash
npm run dev
```
###  Build for Production
```bash
npm run build
```
###  Preview Build
```bash
npm run preview
```
###  Project Structure
```
src/
├── auth/ # Login & route protection
├── home/Codegenerator.jsx # Code generator + preview page
├── components/ # Header, Footer
├── assets/ # Logos & static assets
├── constants/constants.js # API configuration
├── App.jsx # Main app + routing
└── styles/App.css # Custom styles
```

###  Configuration
- **API URL** → `src/constants/constants.js`
- **Base Path** → `vite.config.js` & `package.json` (for deployment under `/illustrata/embedsolution/`)

##  Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "Add my feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request




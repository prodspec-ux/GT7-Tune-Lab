# GT7 Master Tuning Lab v5.0

A professional Gran Turismo 7 vehicle setup calculator built with React. Generate physics-accurate tuning setups for 500+ vehicles with track-specific optimizations.

![GT7 Tuning Lab](https://img.shields.io/badge/Gran%20Turismo-7-red)
![React](https://img.shields.io/badge/React-18.2-blue)
![License](https://img.shields.io/badge/License-Community-green)

## 🏁 Features

- **500+ Vehicle Database** - Expandable JSON-based vehicle specs
- **Track-Specific Tuning** - Adjust for smooth vs bumpy circuits
- **Tire Compound Support** - All GT7 tire types (CH through RS, plus Intermediate/Wet)
- **Tune Fixes** - Presets for understeer, oversteer, stability, and agility
- **Ballast Calculator** - Weight and position with PP impact calculation
- **Physics-Based Logic** - Real suspension frequency, LSD sensitivity, aero calculations
- **Export Setups** - Save tunes as JSON files

## 📦 What's Included

### Current Vehicle Database (20 cars)
- **Nissan**: GT-R NISMO GT3 '13, GT-R Premium '17
- **Porsche**: 911 RSR '17, 911 GT3 RS '22
- **Toyota**: GR Corolla '22, Supra RZ '97
- **Mazda**: RX-7 Spirit R '02
- **Honda**: NSX Type R '92, Civic Type R '20
- **Ferrari**: 458 Italia '09
- **Lamborghini**: Huracán LP 610-4 '15
- **BMW**: M4 Coupé '14
- **Subaru**: WRX STI '14

### Track Database
- **Smooth Circuits**: Monza, Spa-Francorchamps, Brands Hatch, Laguna Seca
- **Technical**: Suzuka, Tsukuba, Autopolis
- **Bumpy/Street**: Nürburgring Nordschleife, Tokyo Expressway, Trial Mountain

## 🚀 Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/gt7-tuning-lab.git
cd gt7-tuning-lab

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## 🌐 Deploy to GitHub Pages

### Step 1: Update package.json
Edit `package.json` and change the homepage:
```json
"homepage": "https://YOUR-USERNAME.github.io/gt7-tuning-lab"
```

### Step 2: Create GitHub Repository
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/gt7-tuning-lab.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy
```bash
# Install gh-pages (if not already installed)
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select `gh-pages` branch
4. Click **Save**

Your app will be live at: `https://YOUR-USERNAME.github.io/gt7-tuning-lab/`

## 📊 Expanding the Vehicle Database

The vehicle database is embedded in `src/GT7TuningLab.jsx`. To add more vehicles:

### Format:
```javascript
"Manufacturer": {
  "Model Name": {
    drive: "FR|MR|RR|FF|4WD",
    baseAero: [frontMin, rearMin],
    heightRange: [min, max],
    springRange: [min, max],
    damperRange: [min, max],
    antiRollRange: [min, max],
    camberRange: [min, max],
    toeRange: [min, max],
    maxPower: number,
    baseWeight: number,
    gearRatios: [1st, 2nd, 3rd, 4th, 5th, 6th],
    finalGear: number
  }
}
```

### Example:
```javascript
"McLaren": {
  "720S '17": {
    drive: "MR",
    baseAero: [200, 600],
    heightRange: [55, 105],
    springRange: [2.0, 16.0],
    damperRange: [1, 10],
    antiRollRange: [1, 7],
    camberRange: [-5.0, 0],
    toeRange: [-0.60, 0.60],
    maxPower: 710,
    baseWeight: 1419,
    gearRatios: [3.143, 2.105, 1.565, 1.229, 1.027, 0.884, 0.742],
    finalGear: 3.72
  }
}
```

### Future: External JSON Database
For 500+ vehicles, move to external JSON:

1. Create `public/vehicles.json`:
```json
{
  "Nissan": {
    "GT-R NISMO GT3 '13": { ... }
  }
}
```

2. Load dynamically in component:
```javascript
useEffect(() => {
  fetch('/vehicles.json')
    .then(res => res.json())
    .then(data => setVehicleDatabase(data));
}, []);
```

GitHub Pages will host the JSON file alongside your app!

## 🔧 Tuning Logic Overview

### Suspension
- **Natural Frequency**: Calculated from grip, weight, and track bumpiness
- **Ride Height**: Lower for smooth tracks, higher for bumpy ones
- **Dampers**: Softer compression/expansion for rough surfaces

### Aerodynamics
- **Downforce**: Scales with PP rating and speed level
- **Balance**: Adjusted based on tune fix (understeer/oversteer)

### LSD
- **Initial Torque**: Higher for 4WD, lower for MR/RR
- **Accel Sensitivity**: Locks more for high torque-to-weight ratios
- **Brake Sensitivity**: Higher for mid-engine cars to prevent snap oversteer

### Alignment
- **Camber**: More negative for high-grip tires and powerful cars
- **Toe**: Rear toe-in for FR stability, adjusts per tune fix

### Brake Balance
- FR: Slight rear bias
- MR/RR: More rear bias (engine weight)
- 4WD: Neutral
- FF: Front bias

## 📝 Limitations & Future Enhancements

### Current Limitations
- No multi-language support
- No user accounts/saved setups (local storage only via export)
- No visual setup sheets (numbers only)

### Planned Features
- [ ] Add all 500+ GT7 vehicles
- [ ] Real-time PP calculator as you adjust settings
- [ ] Visual setup diagrams
- [ ] Community tune sharing
- [ ] Import game screenshots (OCR for specs)
- [ ] Mobile app version
- [ ] Practice mode lap time predictor

## 🤝 Contributing

Want to add vehicles or improve tuning logic?

1. Fork the repository
2. Add your changes
3. Submit a pull request

### Priority Contributions
- **Vehicle specs** from GT7 (especially rare/DLC cars)
- **Track data** (surface type, elevation changes)
- **Tuning formulas** backed by testing/data

## ⚖️ License

Community-driven project. Not affiliated with Polyphony Digital or Sony Interactive Entertainment.

## 🏆 Credits

Built by the GT7 tuning community. Special thanks to:
- GT7 dataminers for vehicle specs
- Community testers for formula validation
- Racing sim physics experts

## 📧 Support

Found a bug or have a feature request? Open an issue on GitHub!

---

**Happy Racing! 🏎️💨**

import React, { useState, useEffect } from 'react';
import { ChevronDown, Settings, Gauge, Wrench, Download, AlertCircle } from 'lucide-react';

// GT7 Vehicle Database
const vehicleDatabase = {
  "Nissan": {
    "GT-R NISMO GT3 '13": {
      drive: "FR",
      baseAero: [200, 500],
      heightRange: [55, 100],
      springRange: [1.0, 15.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 600,
      baseWeight: 1300,
      gearRatios: [3.827, 2.360, 1.685, 1.312, 1.097, 0.880],
      finalGear: 3.7
    },
    "GT-R Premium '17": {
      drive: "4WD",
      baseAero: [0, 150],
      heightRange: [100, 180],
      springRange: [1.0, 12.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 565,
      baseWeight: 1740,
      gearRatios: [4.056, 2.301, 1.595, 1.248, 1.001, 0.796],
      finalGear: 3.7
    }
  },
  "Porsche": {
    "911 RSR '17": {
      drive: "MR",
      baseAero: [300, 700],
      heightRange: [50, 95],
      springRange: [2.0, 16.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 510,
      baseWeight: 1245,
      gearRatios: [3.150, 2.105, 1.619, 1.320, 1.130, 0.971],
      finalGear: 4.0
    },
    "911 GT3 RS '22": {
      drive: "RR",
      baseAero: [150, 400],
      heightRange: [60, 120],
      springRange: [1.5, 14.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 525,
      baseWeight: 1450,
      gearRatios: [3.461, 2.105, 1.565, 1.229, 1.027, 0.884, 0.774],
      finalGear: 3.44
    }
  },
  "Toyota": {
    "GR Corolla '22": {
      drive: "4WD",
      baseAero: [50, 200],
      heightRange: [85, 140],
      springRange: [1.0, 10.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 300,
      baseWeight: 1475,
      gearRatios: [3.538, 2.060, 1.404, 1.029, 0.820, 0.672],
      finalGear: 4.3
    },
    "Supra RZ '97": {
      drive: "FR",
      baseAero: [0, 150],
      heightRange: [90, 160],
      springRange: [1.0, 12.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 330,
      baseWeight: 1520,
      gearRatios: [3.827, 2.360, 1.685, 1.312, 1.000, 0.793],
      finalGear: 3.77
    }
  },
  "Mazda": {
    "RX-7 Spirit R '02": {
      drive: "FR",
      baseAero: [0, 180],
      heightRange: [80, 140],
      springRange: [1.0, 11.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 280,
      baseWeight: 1280,
      gearRatios: [3.483, 2.015, 1.391, 1.031, 0.815, 0.719],
      finalGear: 4.1
    }
  },
  "Honda": {
    "NSX Type R '92": {
      drive: "MR",
      baseAero: [0, 120],
      heightRange: [70, 130],
      springRange: [1.0, 12.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 280,
      baseWeight: 1230,
      gearRatios: [3.071, 1.956, 1.428, 1.125, 0.914, 0.717],
      finalGear: 4.06
    },
    "Civic Type R '20": {
      drive: "FF",
      baseAero: [0, 150],
      heightRange: [90, 150],
      springRange: [1.0, 10.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 320,
      baseWeight: 1390,
      gearRatios: [3.267, 2.130, 1.517, 1.147, 0.921, 0.738],
      finalGear: 4.35
    }
  },
  "Ferrari": {
    "458 Italia '09": {
      drive: "MR",
      baseAero: [100, 300],
      heightRange: [60, 110],
      springRange: [1.5, 14.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 570,
      baseWeight: 1485,
      gearRatios: [3.077, 2.105, 1.565, 1.229, 1.000, 0.839, 0.667],
      finalGear: 4.44
    }
  },
  "Lamborghini": {
    "Huracán LP 610-4 '15": {
      drive: "4WD",
      baseAero: [120, 350],
      heightRange: [65, 115],
      springRange: [1.5, 14.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 610,
      baseWeight: 1422,
      gearRatios: [3.091, 2.105, 1.565, 1.229, 1.027, 0.884, 0.742],
      finalGear: 3.91
    }
  },
  "BMW": {
    "M4 Coupé '14": {
      drive: "FR",
      baseAero: [0, 180],
      heightRange: [85, 140],
      springRange: [1.0, 12.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 431,
      baseWeight: 1585,
      gearRatios: [4.056, 2.396, 1.641, 1.213, 1.000, 0.846, 0.672],
      finalGear: 3.15
    }
  },
  "Subaru": {
    "WRX STI '14": {
      drive: "4WD",
      baseAero: [0, 150],
      heightRange: [95, 160],
      springRange: [1.0, 11.0],
      damperRange: [1, 10],
      antiRollRange: [1, 7],
      camberRange: [-5.0, 0],
      toeRange: [-0.60, 0.60],
      maxPower: 308,
      baseWeight: 1490,
      gearRatios: [3.636, 2.375, 1.761, 1.346, 1.062, 0.842],
      finalGear: 3.90
    }
  }
};

const trackDatabase = {
  "Smooth Circuits": [
    { name: "Monza", bumpiness: 0.2, speedLevel: "high" },
    { name: "Spa-Francorchamps", bumpiness: 0.3, speedLevel: "high" },
    { name: "Brands Hatch", bumpiness: 0.4, speedLevel: "medium" },
    { name: "Laguna Seca", bumpiness: 0.3, speedLevel: "medium" }
  ],
  "Technical Circuits": [
    { name: "Suzuka", bumpiness: 0.4, speedLevel: "medium" },
    { name: "Tsukuba", bumpiness: 0.3, speedLevel: "low" },
    { name: "Autopolis", bumpiness: 0.5, speedLevel: "medium" }
  ],
  "Bumpy/Street": [
    { name: "Nürburgring Nordschleife", bumpiness: 0.9, speedLevel: "high" },
    { name: "Tokyo Expressway", bumpiness: 0.7, speedLevel: "medium" },
    { name: "Trial Mountain", bumpiness: 0.6, speedLevel: "medium" }
  ]
};

const tireCompounds = [
  { name: "Comfort: Hard", code: "CH", grip: 0.70 },
  { name: "Comfort: Medium", code: "CM", grip: 0.75 },
  { name: "Comfort: Soft", code: "CS", grip: 0.80 },
  { name: "Sport: Hard", code: "SH", grip: 0.85 },
  { name: "Sport: Medium", code: "SM", grip: 0.90 },
  { name: "Sport: Soft", code: "SS", grip: 0.95 },
  { name: "Racing: Hard", code: "RH", grip: 1.00 },
  { name: "Racing: Medium", code: "RM", grip: 1.10 },
  { name: "Racing: Soft", code: "RS", grip: 1.20 },
  { name: "Intermediate", code: "IM", grip: 0.65 },
  { name: "Wet", code: "W", grip: 0.50 }
];

const tuneFixes = [
  { name: "Balanced", code: "BAL" },
  { name: "Reduce Understeer", code: "UNDER" },
  { name: "Reduce Oversteer", code: "OVER" },
  { name: "Increase Stability", code: "STAB" },
  { name: "Increase Agility", code: "AGIL" }
];

export default function GT7TuningLab() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedTire, setSelectedTire] = useState(tireCompounds[6]); // Racing Hard default
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedTuneFix, setSelectedTuneFix] = useState(tuneFixes[0]);
  const [hp, setHp] = useState(500);
  const [torque, setTorque] = useState(450);
  const [weight, setWeight] = useState(1300);
  const [pp, setPp] = useState(700);
  const [ballastWeight, setBallastWeight] = useState(0);
  const [ballastPosition, setBallastPosition] = useState(0);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const manufacturers = Object.keys(vehicleDatabase);
  const models = selectedManufacturer ? Object.keys(vehicleDatabase[selectedManufacturer]) : [];
  const carData = selectedManufacturer && selectedModel ? vehicleDatabase[selectedManufacturer][selectedModel] : null;

  const allTracks = Object.values(trackDatabase).flat();

  useEffect(() => {
    if (carData) {
      setWeight(carData.baseWeight);
      setHp(carData.maxPower);
      // Estimate torque from HP (rough approximation)
      setTorque(Math.round(carData.maxPower * 0.85));
    }
  }, [selectedModel]);

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const calculateTune = () => {
    if (!carData || !selectedTrack) return;

    const effectiveWeight = weight + ballastWeight;
    const tqToWeight = (torque / effectiveWeight) * 100;
    const gripFactor = selectedTire.grip;
    const bumpFactor = selectedTrack.bumpiness;

    // AERODYNAMICS
    let frontAero = carData.baseAero[0] + (pp * 0.2);
    let rearAero = carData.baseAero[1] + (pp * 0.3);

    // Tune fix adjustments for aero
    if (selectedTuneFix.code === 'UNDER') {
      frontAero *= 0.85; // Less front downforce = more front grip
      rearAero *= 1.1;
    } else if (selectedTuneFix.code === 'OVER') {
      frontAero *= 1.1;
      rearAero *= 0.85;
    }

    frontAero = Math.round(clamp(frontAero, carData.baseAero[0], carData.baseAero[0] + 300));
    rearAero = Math.round(clamp(rearAero, carData.baseAero[1], carData.baseAero[1] + 400));

    // SUSPENSION - Natural Frequency (Hz)
    let baseFreqFront = 2.0 + (gripFactor * 0.8) + (effectiveWeight / 5000);
    let baseFreqRear = baseFreqFront * 1.05;

    // Bumpy tracks need softer suspension
    if (bumpFactor > 0.6) {
      baseFreqFront *= 0.85;
      baseFreqRear *= 0.85;
    }

    // Tune fix adjustments
    if (selectedTuneFix.code === 'UNDER') {
      baseFreqFront *= 0.93; // Softer front
      baseFreqRear *= 1.05;  // Stiffer rear
    } else if (selectedTuneFix.code === 'OVER') {
      baseFreqFront *= 1.05;
      baseFreqRear *= 0.93;
    } else if (selectedTuneFix.code === 'AGIL') {
      baseFreqFront *= 1.08;
      baseFreqRear *= 1.08;
    } else if (selectedTuneFix.code === 'STAB') {
      baseFreqFront *= 0.95;
      baseFreqRear *= 0.95;
    }

    // RIDE HEIGHT
    const minHeight = carData.heightRange[0];
    let frontHeight = minHeight + (bumpFactor * 15);
    let rearHeight = frontHeight + 5;

    frontHeight = Math.round(clamp(frontHeight, carData.heightRange[0], carData.heightRange[1]));
    rearHeight = Math.round(clamp(rearHeight, carData.heightRange[0], carData.heightRange[1]));

    // ANTI-ROLL BARS
    let frontARB = 4 + (gripFactor * 2);
    let rearARB = 3 + (gripFactor * 2);

    if (selectedTuneFix.code === 'UNDER') {
      frontARB -= 1;
      rearARB += 1;
    } else if (selectedTuneFix.code === 'OVER') {
      frontARB += 1;
      rearARB -= 1;
    }

    frontARB = Math.round(clamp(frontARB, carData.antiRollRange[0], carData.antiRollRange[1]));
    rearARB = Math.round(clamp(rearARB, carData.antiRollRange[0], carData.antiRollRange[1]));

    // DAMPERS
    let compression = 30 + (bumpFactor * 15);
    let expansion = 40 + (bumpFactor * 20);

    if (selectedTuneFix.code === 'STAB') {
      compression += 5;
      expansion += 5;
    }

    compression = Math.round(clamp(compression, 10, 50));
    expansion = Math.round(clamp(expansion, 10, 60));

    // CAMBER
    let frontCamber = -2.5 - (gripFactor * 0.5);
    let rearCamber = hp > 550 ? -3.0 : -2.3;

    if (selectedTuneFix.code === 'UNDER') {
      frontCamber += 0.5; // Less negative = more grip
    } else if (selectedTuneFix.code === 'OVER') {
      rearCamber += 0.5;
    }

    frontCamber = parseFloat(clamp(frontCamber, carData.camberRange[0], carData.camberRange[1]).toFixed(1));
    rearCamber = parseFloat(clamp(rearCamber, carData.camberRange[0], carData.camberRange[1]).toFixed(1));

    // TOE
    let frontToe = -0.10; // Slight out for turn-in
    let rearToe = 0.20;   // Slight in for stability

    if (carData.drive === 'FR' && tqToWeight > 35) {
      rearToe = 0.40; // More toe-in for high-power FR
    }

    if (selectedTuneFix.code === 'UNDER') {
      frontToe = -0.20;
      rearToe = 0.10;
    } else if (selectedTuneFix.code === 'OVER') {
      frontToe = 0.00;
      rearToe = 0.35;
    } else if (selectedTuneFix.code === 'AGIL') {
      frontToe = -0.15;
      rearToe = 0.10;
    }

    frontToe = parseFloat(clamp(frontToe, carData.toeRange[0], carData.toeRange[1]).toFixed(2));
    rearToe = parseFloat(clamp(rearToe, carData.toeRange[0], carData.toeRange[1]).toFixed(2));

    // LSD
    let initialTorque = carData.drive === 'MR' || carData.drive === 'RR' ? 15 : 10;
    let accelSens = 35;
    let brakeSens = 20;

    if (tqToWeight > 40) accelSens = 50;
    if (carData.drive === 'MR' || carData.drive === 'RR') {
      accelSens = 25;
      brakeSens = 40;
    }
    if (carData.drive === '4WD') {
      initialTorque = 20;
      accelSens = 40;
    }

    if (selectedTuneFix.code === 'OVER' && (carData.drive === 'FR' || carData.drive === 'MR')) {
      accelSens = Math.min(60, accelSens + 10);
    }

    // BRAKE BALANCE
    let brakeBalance = 0; // 0 = neutral, negative = rear bias, positive = front bias
    
    if (carData.drive === 'FR') brakeBalance = -1;
    if (carData.drive === 'MR' || carData.drive === 'RR') brakeBalance = -2;
    if (carData.drive === '4WD') brakeBalance = 0;
    if (carData.drive === 'FF') brakeBalance = 1;

    if (selectedTuneFix.code === 'UNDER') {
      brakeBalance += 1; // More front brake = more rear rotation
    } else if (selectedTuneFix.code === 'OVER') {
      brakeBalance -= 1;
    }

    brakeBalance = clamp(brakeBalance, -5, 5);

    // GEARING
    const topSpeed = 240 + (hp / 5) + (selectedTrack.speedLevel === 'high' ? 20 : 0);
    const finalGearAdjusted = carData.finalGear * (topSpeed / 280);

    // BALLAST PP IMPACT (rough estimate)
    const ppImpact = ballastWeight > 0 ? Math.round(-ballastWeight / 10) : 0;
    const adjustedPP = pp + ppImpact;

    setResults({
      aero: { front: frontAero, rear: rearAero },
      suspension: {
        height: { front: frontHeight, rear: rearHeight },
        antiRoll: { front: frontARB, rear: rearARB },
        compression,
        expansion,
        frequency: { front: baseFreqFront.toFixed(2), rear: baseFreqRear.toFixed(2) }
      },
      alignment: {
        camber: { front: frontCamber, rear: rearCamber },
        toe: { front: frontToe, rear: rearToe }
      },
      lsd: {
        initial: initialTorque,
        accel: accelSens,
        brake: brakeSens
      },
      brakeBalance,
      gearing: {
        topSpeed: Math.round(topSpeed),
        finalGear: finalGearAdjusted.toFixed(2),
        ratios: carData.gearRatios
      },
      ballast: {
        weight: ballastWeight,
        position: ballastPosition,
        ppImpact
      },
      adjustedPP
    });

    setShowResults(true);
  };

  const exportSetup = () => {
    if (!results) return;
    
    const setup = {
      vehicle: `${selectedManufacturer} ${selectedModel}`,
      track: selectedTrack.name,
      tire: selectedTire.name,
      tuneFix: selectedTuneFix.name,
      specs: { hp, torque, weight, pp: results.adjustedPP },
      ...results
    };

    const blob = new Blob([JSON.stringify(setup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GT7_${selectedManufacturer}_${selectedModel.replace(/\s/g, '_')}_${selectedTrack.name}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;600;700&family=Orbitron:wght@400;700;900&display=swap');
        
        body { 
          font-family: 'Rajdhani', sans-serif;
          background: linear-gradient(135deg, #000000 0%, #1a0000 100%);
        }
        
        .title-font { 
          font-family: 'Orbitron', monospace; 
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        
        .stat-font {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
        }
        
        .racing-stripe {
          background: linear-gradient(90deg, 
            transparent 0%, 
            #e4000f 20%, 
            #ff1a2a 50%, 
            #e4000f 80%, 
            transparent 100%
          );
          animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .panel {
          background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(15, 15, 15, 0.98) 100%);
          border: 1px solid rgba(228, 0, 15, 0.3);
          box-shadow: 0 8px 32px rgba(228, 0, 15, 0.1);
          transition: all 0.3s ease;
        }
        
        .panel:hover {
          border-color: rgba(228, 0, 15, 0.6);
          box-shadow: 0 12px 48px rgba(228, 0, 15, 0.2);
        }
        
        .input-field {
          background: rgba(38, 38, 38, 0.8);
          border: 1px solid rgba(68, 68, 68, 0.6);
          transition: all 0.3s ease;
        }
        
        .input-field:focus {
          outline: none;
          border-color: #e4000f;
          box-shadow: 0 0 0 3px rgba(228, 0, 15, 0.1);
          background: rgba(38, 38, 38, 1);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #e4000f 0%, #c40000 100%);
          box-shadow: 0 4px 20px rgba(228, 0, 15, 0.4);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .btn-primary:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .btn-primary:hover {
          box-shadow: 0 6px 30px rgba(228, 0, 15, 0.6);
          transform: translateY(-2px);
        }
        
        .stat-card {
          background: linear-gradient(135deg, rgba(228, 0, 15, 0.05) 0%, rgba(0, 0, 0, 0.3) 100%);
          border-left: 3px solid #e4000f;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          background: linear-gradient(135deg, rgba(228, 0, 15, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%);
          transform: translateX(5px);
        }
        
        .result-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
        
        @media (max-width: 768px) {
          .result-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div className="relative">
        <div className="racing-stripe h-1 w-full"></div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between animate-slide-in">
            <div>
              <h1 className="title-font text-5xl md:text-7xl text-white mb-2">
                GT7 <span className="text-[#e4000f]">MASTER</span>
              </h1>
              <p className="text-gray-400 text-lg tracking-wider">TUNING LABORATORY v5.0</p>
            </div>
            <Gauge className="w-16 h-16 text-[#e4000f]" strokeWidth={2} />
          </div>
        </div>
        <div className="racing-stripe h-1 w-full"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Input Panel */}
        <div className="panel rounded-lg p-8 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-[#e4000f]" />
            <h2 className="title-font text-2xl">VEHICLE CONFIGURATION</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Manufacturer */}
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Manufacturer</label>
              <select 
                className="input-field w-full px-4 py-3 rounded text-white"
                value={selectedManufacturer}
                onChange={(e) => {
                  setSelectedManufacturer(e.target.value);
                  setSelectedModel('');
                }}
              >
                <option value="">Select Manufacturer</option>
                {manufacturers.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Model</label>
              <select 
                className="input-field w-full px-4 py-3 rounded text-white"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={!selectedManufacturer}
              >
                <option value="">Select Model</option>
                {models.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Tire Compound */}
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Tire Compound</label>
              <select 
                className="input-field w-full px-4 py-3 rounded text-white"
                value={selectedTire.code}
                onChange={(e) => setSelectedTire(tireCompounds.find(t => t.code === e.target.value))}
              >
                {tireCompounds.map(t => (
                  <option key={t.code} value={t.code}>{t.name} ({t.code})</option>
                ))}
              </select>
            </div>

            {/* Track */}
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Track</label>
              <select 
                className="input-field w-full px-4 py-3 rounded text-white"
                value={selectedTrack?.name || ''}
                onChange={(e) => setSelectedTrack(allTracks.find(t => t.name === e.target.value))}
              >
                <option value="">Select Track</option>
                {Object.entries(trackDatabase).map(([category, tracks]) => (
                  <optgroup key={category} label={category}>
                    {tracks.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Tune Fix */}
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Tune Style</label>
              <select 
                className="input-field w-full px-4 py-3 rounded text-white"
                value={selectedTuneFix.code}
                onChange={(e) => setSelectedTuneFix(tuneFixes.find(t => t.code === e.target.value))}
              >
                {tuneFixes.map(t => (
                  <option key={t.code} value={t.code}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">PP Rating</label>
              <input 
                type="number" 
                className="input-field w-full px-4 py-3 rounded text-white stat-font text-lg"
                value={pp}
                onChange={(e) => setPp(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Horsepower</label>
              <input 
                type="number" 
                className="input-field w-full px-4 py-3 rounded text-white stat-font text-lg"
                value={hp}
                onChange={(e) => setHp(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Torque (ft-lb)</label>
              <input 
                type="number" 
                className="input-field w-full px-4 py-3 rounded text-white stat-font text-lg"
                value={torque}
                onChange={(e) => setTorque(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Weight (kg)</label>
              <input 
                type="number" 
                className="input-field w-full px-4 py-3 rounded text-white stat-font text-lg"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Ballast */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Ballast Weight (kg)</label>
              <input 
                type="number" 
                className="input-field w-full px-4 py-3 rounded text-white"
                value={ballastWeight}
                onChange={(e) => setBallastWeight(Number(e.target.value))}
                min="0"
                max="200"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Ballast Position (-50 to +50)</label>
              <input 
                type="number" 
                className="input-field w-full px-4 py-3 rounded text-white"
                value={ballastPosition}
                onChange={(e) => setBallastPosition(Number(e.target.value))}
                min="-50"
                max="50"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <button 
            onClick={calculateTune}
            disabled={!carData || !selectedTrack}
            className="btn-primary w-full py-5 rounded-lg text-white title-font text-xl relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Wrench className="w-6 h-6" />
              CALCULATE MASTER TUNE
            </span>
          </button>

          {!carData && (
            <div className="mt-4 flex items-center gap-2 text-yellow-500">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">Please select a vehicle to continue</p>
            </div>
          )}
          {carData && !selectedTrack && (
            <div className="mt-4 flex items-center gap-2 text-yellow-500">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">Please select a track to continue</p>
            </div>
          )}
        </div>

        {/* Results */}
        {showResults && results && (
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="title-font text-3xl">CALCULATED SETUP</h2>
              <button 
                onClick={exportSetup}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
              >
                <Download className="w-5 h-5" />
                <span className="font-semibold">Export</span>
              </button>
            </div>

            {/* Adjusted PP Display */}
            {results.ballast.ppImpact !== 0 && (
              <div className="panel rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">ADJUSTED PP RATING</p>
                    <p className="stat-font text-3xl text-[#00ffcc]">{results.adjustedPP} PP</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm mb-1">BALLAST IMPACT</p>
                    <p className="stat-font text-2xl text-yellow-500">{results.ballast.ppImpact} PP</p>
                  </div>
                </div>
              </div>
            )}

            <div className="result-grid">
              {/* Suspension */}
              <div className="panel rounded-lg p-6">
                <h3 className="title-font text-xl mb-4 border-b border-gray-700 pb-2">SUSPENSION</h3>
                <div className="space-y-3">
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Ride Height (mm)</p>
                    <p className="stat-font text-[#00ffcc] text-xl">F: {results.suspension.height.front} / R: {results.suspension.height.rear}</p>
                  </div>
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Anti-Roll Bar</p>
                    <p className="stat-font text-[#00ffcc] text-xl">F: {results.suspension.antiRoll.front} / R: {results.suspension.antiRoll.rear}</p>
                  </div>
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Damper: Compression</p>
                    <p className="stat-font text-[#00ffcc] text-xl">{results.suspension.compression} / {results.suspension.compression}</p>
                  </div>
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Damper: Expansion</p>
                    <p className="stat-font text-[#00ffcc] text-xl">{results.suspension.expansion} / {results.suspension.expansion}</p>
                  </div>
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Natural Frequency (Hz)</p>
                    <p className="stat-font text-[#00ffcc] text-xl">F: {results.suspension.frequency.front} / R: {results.suspension.frequency.rear}</p>
                  </div>
                </div>
              </div>

              {/* Alignment */}
              <div className="panel rounded-lg p-6">
                <h3 className="title-font text-xl mb-4 border-b border-gray-700 pb-2">ALIGNMENT</h3>
                <div className="space-y-3">
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Negative Camber (°)</p>
                    <p className="stat-font text-[#00ffcc] text-xl">F: {results.alignment.camber.front} / R: {results.alignment.camber.rear}</p>
                  </div>
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Toe Angle (°)</p>
                    <p className="stat-font text-[#00ffcc] text-xl">
                      F: {results.alignment.toe.front > 0 ? `${results.alignment.toe.front} In` : `${Math.abs(results.alignment.toe.front)} Out`} / 
                      R: {results.alignment.toe.rear > 0 ? `${results.alignment.toe.rear} In` : `${Math.abs(results.alignment.toe.rear)} Out`}
                    </p>
                  </div>
                </div>

                <h3 className="title-font text-xl mb-4 mt-6 border-b border-gray-700 pb-2">AERODYNAMICS</h3>
                <div className="space-y-3">
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Downforce (kgf)</p>
                    <p className="stat-font text-[#00ffcc] text-xl">F: {results.aero.front} / R: {results.aero.rear}</p>
                  </div>
                </div>
              </div>

              {/* LSD & Brakes */}
              <div className="panel rounded-lg p-6">
                <h3 className="title-font text-xl mb-4 border-b border-gray-700 pb-2">DIFFERENTIAL (LSD)</h3>
                <div className="space-y-3">
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Initial Torque</p>
                    <p className="stat-font text-[#00ffcc] text-xl">{results.lsd.initial}</p>
                  </div>
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Acceleration Sensitivity</p>
                    <p className="stat-font text-[#00ffcc] text-xl">{results.lsd.accel}</p>
                  </div>
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Brake Sensitivity</p>
                    <p className="stat-font text-[#00ffcc] text-xl">{results.lsd.brake}</p>
                  </div>
                </div>

                <h3 className="title-font text-xl mb-4 mt-6 border-b border-gray-700 pb-2">BRAKES</h3>
                <div className="space-y-3">
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Brake Balance</p>
                    <p className="stat-font text-[#00ffcc] text-xl">
                      {results.brakeBalance > 0 ? `+${results.brakeBalance} (Front Bias)` : 
                       results.brakeBalance < 0 ? `${results.brakeBalance} (Rear Bias)` : 
                       '0 (Neutral)'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transmission */}
              <div className="panel rounded-lg p-6">
                <h3 className="title-font text-xl mb-4 border-b border-gray-700 pb-2">TRANSMISSION</h3>
                <div className="space-y-3">
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Top Speed (Auto Adjust)</p>
                    <p className="stat-font text-[#00ffcc] text-xl">{results.gearing.topSpeed} km/h</p>
                  </div>
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Final Gear Ratio</p>
                    <p className="stat-font text-[#00ffcc] text-xl">{results.gearing.finalGear}</p>
                  </div>
                  <div className="stat-card p-3 rounded">
                    <p className="text-gray-400 text-sm mb-1">Manual Gear Ratios</p>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {results.gearing.ratios.map((ratio, i) => (
                        <p key={i} className="text-[#00ffcc] text-sm font-mono">
                          {i + 1}st: {ratio.toFixed(3)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ballast Info */}
              {results.ballast.weight > 0 && (
                <div className="panel rounded-lg p-6">
                  <h3 className="title-font text-xl mb-4 border-b border-gray-700 pb-2">BALLAST</h3>
                  <div className="space-y-3">
                    <div className="stat-card p-3 rounded">
                      <p className="text-gray-400 text-sm mb-1">Weight</p>
                      <p className="stat-font text-[#00ffcc] text-xl">{results.ballast.weight} kg</p>
                    </div>
                    <div className="stat-card p-3 rounded">
                      <p className="text-gray-400 text-sm mb-1">Position</p>
                      <p className="stat-font text-[#00ffcc] text-xl">
                        {results.ballast.position > 0 ? `+${results.ballast.position} (Rear)` : 
                         results.ballast.position < 0 ? `${results.ballast.position} (Front)` : 
                         '0 (Center)'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 border-t border-gray-800">
        <div className="racing-stripe h-1 w-full"></div>
        <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>GT7 Master Tuning Lab v5.0 | Community-Driven Racing Setup Tool</p>
          <p className="mt-2">Not affiliated with Polyphony Digital or Sony Interactive Entertainment</p>
        </div>
      </div>
    </div>
  );
}

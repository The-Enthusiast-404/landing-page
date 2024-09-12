import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Globe,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  X,
} from "lucide-react";
import Draggable from "react-draggable";

const themes = {
  dark: {
    bg: "bg-gray-900",
    text: "text-green-400",
    accent: "text-yellow-400",
  },
  light: { bg: "bg-gray-100", text: "text-gray-800", accent: "text-blue-600" },
};

const fonts = [
  "font-mono",
  'font-["VT323"]',
  'font-["Press_Start_2P"]',
  'font-["Courier_Prime"]',
];

const tracks = [
  { name: "Retro Groove", file: "/music/retro_music.mp3" },
  { name: "Synthwave Dreams", file: "/music/retro_music_arcade.mp3" },
  { name: "Pixel Memories", file: "/music/retro_game.mp3" },
  { name: "8-Bit Adventure", file: "/music/retro_funk.mp3" },
];

const RetroStripeLandingPage = () => {
  const [theme, setTheme] = useState("dark");
  const [font, setFont] = useState(0);
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState(
    "Initializing RetroStripe Core..."
  );
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [isConsoleMinimized, setIsConsoleMinimized] = useState(false);
  const [consolePosition, setConsolePosition] = useState({ x: 20, y: 20 });
  const [consoleSize, setConsoleSize] = useState({ width: 500, height: 300 });
  const audioRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(tracks[currentTrack].file);
    audioRef.current.addEventListener("ended", () => setIsPlaying(false));

    const bootSequence = [
      { message: "Initializing RetroStripe Core...", duration: 1000 },
      { message: "Loading Retro Fonts...", duration: 800 },
      { message: "Calibrating Time Circuits...", duration: 1200 },
      { message: "Engaging Flux Capacitor...", duration: 1000 },
      { message: "Booting RetroStripe OS...", duration: 1500 },
    ];

    let totalDuration = 0;
    bootSequence.forEach((step, index) => {
      setTimeout(() => {
        setBootMessage(step.message);
        setBootProgress(((index + 1) / bootSequence.length) * 100);
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 150);
      }, totalDuration);
      totalDuration += step.duration;
    });

    setTimeout(() => setIsBooting(false), totalDuration + 500);

    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 50 + Math.random() * 100);
    }, 2000 + Math.random() * 3000);

    return () => {
      audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
      audioRef.current.pause();
      bootSequence.forEach((_, index) => clearTimeout(index));
      clearInterval(glitchInterval);
    };
  }, []);

  const handleConsoleSubmit = (e) => {
    e.preventDefault();
    const input = consoleInput.trim().toLowerCase();
    let response =
      'Command not recognized. Type "help" for available commands.';

    if (input === "help") {
      response =
        "Available commands: theme, font, clear, about, music play, music stop, music next, music prev, music list";
    } else if (input === "theme") {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      response = `Theme changed to ${theme === "dark" ? "light" : "dark"}`;
    } else if (input === "font") {
      setFont((prev) => (prev + 1) % fonts.length);
      response = `Font changed to ${fonts[font]
        .replace("font-", "")
        .replace(/["\[\]]/g, "")}`;
    } else if (input === "clear") {
      setConsoleOutput([]);
      setConsoleInput("");
      return;
    } else if (input === "about") {
      response =
        "RetroStripe v1.1 - A nostalgic twist on modern web payments. Now with music!";
    } else if (input === "music play") {
      audioRef.current.play();
      setIsPlaying(true);
      response = `Now playing: ${tracks[currentTrack].name}`;
    } else if (input === "music stop") {
      audioRef.current.pause();
      setIsPlaying(false);
      response = "Music stopped";
    } else if (input === "music next") {
      changeTrack((currentTrack + 1) % tracks.length);
      response = `Switched to: ${tracks[currentTrack].name}`;
    } else if (input === "music prev") {
      changeTrack((currentTrack - 1 + tracks.length) % tracks.length);
      response = `Switched to: ${tracks[currentTrack].name}`;
    } else if (input === "music list") {
      response =
        "Available tracks:\n" +
        tracks.map((track, index) => `${index + 1}. ${track.name}`).join("\n");
    }

    setConsoleOutput((prev) => [...prev, `> ${consoleInput}`, response]);
    setConsoleInput("");
  };

  const changeTrack = (newTrack) => {
    audioRef.current.pause();
    setCurrentTrack(newTrack);
    audioRef.current.src = tracks[newTrack].file;
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  const handleDrag = (e, ui) => {
    setConsolePosition({ x: ui.x, y: ui.y });
  };

  const toggleConsoleSize = () => {
    setIsConsoleMinimized(!isConsoleMinimized);
    setConsoleSize(
      isConsoleMinimized
        ? { width: 500, height: 300 }
        : { width: 300, height: 40 }
    );
  };

  const closeConsole = () => {
    setIsConsoleOpen(false);
  };

  const GlitchText = ({ children }) => (
    <div className={`relative ${glitchEffect ? "animate-glitch" : ""}`}>
      <span
        className="absolute top-0 left-0 text-red-500 opacity-50"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 text-blue-500 opacity-50"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        {children}
      </span>
      {children}
    </div>
  );

  const glitchStyles = `
    @keyframes glitch {
      0% { transform: translate(0) }
      20% { transform: translate(-2px, 2px) }
      40% { transform: translate(-2px, -2px) }
      60% { transform: translate(2px, 2px) }
      80% { transform: translate(2px, -2px) }
      100% { transform: translate(0) }
    }
    .animate-glitch {
      animation: glitch 0.3s infinite;
    }
  `;

  if (isBooting) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-green-400 font-mono">
        <style>{glitchStyles}</style>
        <div className="mb-8">
          <img
            src="/the_enthusiast_logo.svg"
            alt="RetroStripe Logo"
            className="w-64 h-64"
          />
        </div>
        <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300 ease-linear"
            style={{ width: `${bootProgress}%` }}
          ></div>
        </div>
        <GlitchText>
          <div className="mt-4">{bootMessage}</div>
        </GlitchText>
        <div className="mt-2">{Math.round(bootProgress)}%</div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${themes[theme].bg} ${themes[theme].text} ${fonts[font]} transition-all duration-300`}
    >
      <style>{glitchStyles}</style>
      <nav className="flex justify-between items-center p-4 border-b border-gray-700">
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            [B]log
          </a>
          <a href="#" className="hover:underline">
            [D]ocs
          </a>
          <a href="#" className="hover:underline">
            [Y]ouTube
          </a>
          <a href="#" className="hover:underline">
            [G]itHub
          </a>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() =>
              setTheme((prev) => (prev === "dark" ? "light" : "dark"))
            }
            className="focus:outline-none"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsConsoleOpen(!isConsoleOpen)}
            className="focus:outline-none"
          >
            <Terminal size={20} />
          </button>
          <button onClick={toggleMusic} className="focus:outline-none">
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <Globe size={20} />
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <h1 className={`text-6xl font-bold mb-4 ${themes[theme].accent}`}>
          RetroStripe.dev
        </h1>
        <p className="text-xl mb-8">
          Build web and mobile apps with a nostalgic twist. Accept payments,
          send payouts, and manage your business online with RetroStripe.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`p-6 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } border ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">
              RetroStripe CLI: Your Time Machine to Productivity
            </h2>
            <p>
              Journey through time with our CLI. Embrace the green-on-black
              aesthetic while powering your modern workflow.
            </p>
            <div className="mt-4 space-x-2">
              <span className="px-2 py-1 rounded bg-purple-600 text-white text-sm">
                YOUTUBE
              </span>
              <span className="px-2 py-1 rounded bg-green-600 text-white text-sm">
                TOOLING
              </span>
            </div>
          </div>
          <div
            className={`p-6 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } border ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">
              RetroConnect: Where Past Meets Future
            </h2>
            <p>
              Experience the flexibility of modern platforms with the charm of
              retro interfaces. RetroConnect: Because nostalgia never goes out
              of style.
            </p>
            <div className="mt-4 space-x-2">
              <span className="px-2 py-1 rounded bg-purple-600 text-white text-sm">
                YOUTUBE
              </span>
              <span className="px-2 py-1 rounded bg-blue-600 text-white text-sm">
                PAYMENTS
              </span>
            </div>
          </div>
        </div>
      </main>

      {isConsoleOpen && (
        <Draggable
          handle=".console-handle"
          bounds="parent"
          position={consolePosition}
          onDrag={handleDrag}
        >
          <div
            className={`fixed ${
              theme === "dark" ? "bg-black" : "bg-gray-200"
            } ${themes[theme].text} rounded-lg overflow-hidden`}
            style={{
              width: `${consoleSize.width}px`,
              height: `${consoleSize.height}px`,
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              border: `1px solid ${theme === "dark" ? "#333" : "#ccc"}`,
            }}
          >
            <div className="console-handle flex justify-between items-center p-2 bg-gray-800 cursor-move">
              <span>RetroStripe Terminal</span>
              <div className="flex space-x-2">
                <button
                  onClick={toggleConsoleSize}
                  className="focus:outline-none"
                >
                  {isConsoleMinimized ? (
                    <Maximize2 size={16} />
                  ) : (
                    <Minimize2 size={16} />
                  )}
                </button>
                <button onClick={closeConsole} className="focus:outline-none">
                  <X size={16} />
                </button>
              </div>
            </div>
            {!isConsoleMinimized && (
              <div
                ref={terminalRef}
                className="p-4 overflow-auto"
                style={{ height: "calc(100% - 40px)" }}
              >
                <div className="mb-4">
                  {consoleOutput.map((line, index) => (
                    <p key={index} className="my-1">
                      {line}
                    </p>
                  ))}
                </div>
                <form
                  onSubmit={handleConsoleSubmit}
                  className="flex items-center"
                >
                  <span className="mr-2 text-green-500">{">"}</span>
                  <input
                    type="text"
                    value={consoleInput}
                    onChange={(e) => setConsoleInput(e.target.value)}
                    className={`flex-grow bg-transparent focus:outline-none ${themes[theme].text}`}
                    placeholder="Type a command..."
                    style={{ caretColor: theme === "dark" ? "green" : "black" }}
                  />
                </form>
              </div>
            )}
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default RetroStripeLandingPage;

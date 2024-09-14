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
    terminal: "bg-black",
  },
  light: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    accent: "text-blue-600",
    terminal: "bg-white",
  },
  retro: {
    bg: "bg-blue-900",
    text: "text-amber-500",
    accent: "text-red-500",
    terminal: "bg-blue-800",
  },
  neon: {
    bg: "bg-purple-900",
    text: "text-pink-500",
    accent: "text-cyan-400",
    terminal: "bg-purple-800",
  },
  matrix: {
    bg: "bg-black",
    text: "text-green-500",
    accent: "text-lime-400",
    terminal: "bg-gray-900",
  },
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

const commands = {
  help: {
    description: "List all available commands",
    usage: "help",
  },
  theme: {
    description: "Change the theme of the page",
    usage: "theme <theme_name>",
    subcommands: "Available themes: dark, light, retro, neon, matrix",
  },
  font: {
    description: "Change the font of the page",
    usage: "font",
  },
  clear: {
    description: "Clear the terminal screen",
    usage: "clear",
  },
  about: {
    description: "Display information about RetroStripe",
    usage: "about",
  },
  music: {
    description: "Control music playback",
    usage: "music <subcommand>",
    subcommands: "Available subcommands: play, stop, next, prev, list",
  },
  goto: {
    description: "Open external links",
    usage: "goto <destination>",
    subcommands: "Available destinations: youtube, github, twitter",
  },
  man: {
    description: "Display the manual for a command",
    usage: "man <command>",
  },
};

const RetroStripeLandingPage = () => {
  const [theme, setTheme] = useState("dark");
  const [font, setFont] = useState(0);
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState([
    "Welcome to RetroStripe Terminal!",
    'Type "help" to see available commands.',
  ]);
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
    const [command, ...args] = input.split(" ");
    let response =
      'Command not recognized. Type "help" for available commands.';

    switch (command) {
      case "help":
        response = "Available commands:\n" + Object.keys(commands).join(", ");
        break;
      case "theme":
        if (args[0] && themes[args[0]]) {
          setTheme(args[0]);
          response = `Theme changed to ${args[0]}`;
        } else {
          response = `Invalid theme. ${commands.theme.subcommands}`;
        }
        break;
      case "font":
        setFont((prev) => (prev + 1) % fonts.length);
        response = `Font changed to ${fonts[font]
          .replace("font-", "")
          .replace(/["\[\]]/g, "")}`;
        break;
      case "clear":
        setConsoleOutput([]);
        setConsoleInput("");
        return;
      case "about":
        response =
          "RetroStripe v1.2 - A nostalgic twist on modern web payments. Now with enhanced terminal!";
        break;
      case "music":
        response = handleMusicCommand(args[0]);
        break;
      case "goto":
        response = handleGotoCommand(args[0]);
        break;
      case "man":
        response = handleManCommand(args[0]);
        break;
      default:
        break;
    }

    setConsoleOutput((prev) => [...prev, `> ${consoleInput}`, response]);
    setConsoleInput("");
  };

  const handleMusicCommand = (subcommand) => {
    switch (subcommand) {
      case "play":
        audioRef.current.play();
        setIsPlaying(true);
        return `Now playing: ${tracks[currentTrack].name}`;
      case "stop":
        audioRef.current.pause();
        setIsPlaying(false);
        return "Music stopped";
      case "next":
        changeTrack((currentTrack + 1) % tracks.length);
        return `Switched to: ${tracks[currentTrack].name}`;
      case "prev":
        changeTrack((currentTrack - 1 + tracks.length) % tracks.length);
        return `Switched to: ${tracks[currentTrack].name}`;
      case "list":
        return (
          "Available tracks:\n" +
          tracks.map((track, index) => `${index + 1}. ${track.name}`).join("\n")
        );
      default:
        return `Invalid subcommand. ${commands.music.subcommands}`;
    }
  };

  const handleGotoCommand = (destination) => {
    const urls = {
      youtube: "https://www.youtube.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
    };
    if (urls[destination]) {
      window.open(urls[destination], "_blank");
      return `Opening ${destination} in a new tab...`;
    }
    return `Invalid destination. ${commands.goto.subcommands}`;
  };

  const handleManCommand = (commandName) => {
    const command = commands[commandName];
    if (command) {
      return `
        NAME
            ${commandName} - ${command.description}

        SYNOPSIS
            ${command.usage}

        DESCRIPTION
            ${command.description}
            ${command.subcommands ? `\n        ${command.subcommands}` : ""}
      `;
    }
    return `No manual entry for ${commandName}`;
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

  const StackedHeroImages = () => (
    <div className="relative w-full h-[500px] mb-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl">
        <img
          src="/blog.png"
          alt="Blog Homepage"
          className="absolute top-4 left-0 w-4/5 h-auto object-cover rounded-lg shadow-lg transform -rotate-6 hover:rotate-0 transition-all duration-300 hover:scale-105 z-30"
        />
        <img
          src="/gitbegin.png"
          alt="GitBegin Screenshot"
          className="absolute top-8 left-[10%] w-4/5 h-auto object-cover rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-105 z-20"
        />
        <img
          src="/textbin.png"
          alt="TextBin Screenshot"
          className="absolute top-12 left-[20%] w-4/5 h-auto object-cover rounded-lg shadow-lg transform rotate-12 hover:rotate-0 transition-all duration-300 hover:scale-105 z-10"
        />
      </div>
    </div>
  );
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

        <StackedHeroImages />

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Discover RetroStripe</h2>
          <p className="text-xl">
            Experience the perfect blend of retro aesthetics and modern
            functionality. RetroStripe brings you powerful tools wrapped in
            nostalgia-inducing interfaces.
          </p>
        </div>
      </main>

      {isConsoleOpen && (
        <Draggable
          handle=".console-handle"
          bounds="parent"
          position={consolePosition}
          onDrag={(e, ui) => setConsolePosition({ x: ui.x, y: ui.y })}
        >
          <div
            className={`fixed ${themes[theme].terminal} ${themes[theme].text} rounded-lg overflow-hidden`}
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
                  onClick={() => {
                    setIsConsoleMinimized(!isConsoleMinimized);
                    setConsoleSize(
                      isConsoleMinimized
                        ? { width: 500, height: 300 }
                        : { width: 300, height: 40 }
                    );
                  }}
                  className="focus:outline-none"
                >
                  {isConsoleMinimized ? (
                    <Maximize2 size={16} />
                  ) : (
                    <Minimize2 size={16} />
                  )}
                </button>
                <button
                  onClick={() => setIsConsoleOpen(false)}
                  className="focus:outline-none"
                >
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
                    style={{ caretColor: themes[theme].text }}
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

# 🎯 Anviksha - AI Interview Simulator

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success.svg)

<strong>An intelligent AI-powered interview simulator with comprehensive proctoring and real-time feedback</strong>

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Demo](#-demo) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

Anviksha is a production-ready AI interview simulator that provides realistic technical interviews with:

- 🤖 **Multi-Provider LLM Support** - OpenAI, Gemini, Groq, Anthropic, OpenRouter
- 👁️ **Advanced Proctoring** - Face tracking + tab detection with violation management
- 🎤 **Speech Integration** - Whisper STT for transcription, TTS for question reading
- 📄 **Resume Parsing** - Intelligent OCR extraction from PDF/DOCX files
- 🔐 **Secure Storage** - Encrypted API keys with Fernet encryption
- 📊 **AI Evaluation** - Comprehensive scoring with detailed feedback

---

## ✨ Features

### 🎭 Complete Interview Flow (5 Modules)

1. **Guidelines & Compliance** - Interview rules and anti-cheat policy
2. **Candidate Profiling** - Resume upload with OCR parsing
3. **System Permissions** - Camera, microphone, screen share validation
4. **AI Interview** - Dynamic questions with real-time proctoring
5. **Evaluation & Feedback** - AI-generated scores and insights

### 🛡️ Proctoring System

- **Face Tracking**: HeadPoseDetector (dlib + OpenCV DNN)
  - Max 5 violations (2+ seconds continuous looking away)
  - Real-time head pose estimation (pitch, yaw, roll)
- **Tab Detection**: Page Visibility API
  - Max 2 tab switches before termination
- **Time Limit**: 30-minute maximum interview duration

### 🧠 AI Capabilities

- **Dynamic Question Generation** - Based on resume and previous answers
- **Answer Evaluation** - Technical accuracy, clarity, relevance scoring
- **Final Assessment** - Overall score with strengths and improvements

### 🔒 Security Features

- **Encrypted API Keys** - Fernet symmetric encryption
- **Secure Storage** - Keys encrypted at rest in database
- **Session Management** - Isolated sessions with violation tracking

---

## 🚀 Quick Start

### Prerequisites

- Git installed
- Python 3.11+
- Virtual environment (required)
- Webcam (for proctoring)
- Microphone (for speech recognition)
- An AI's API Keys (OpenAI, Gemini, Groq, Anthropic)

### Installation

#### A. **Step-by-Step for Windows**

Using PowerShell or Command Prompt (CMD):

1. Clone the Repository:

```PowerShell
git clone https://github.com/hackerstoreofficial/Anviksha-The-AI-Interviewer.git
cd Anviksha-The-AI-Interviewer
```

2.Create a Virtual Environment:

```PowerShell
python -m venv venv
```

3.Activate the Virtual Environment:

- For PowerShell:

```PowerShell
.\venv\Scripts\Activate.ps1
```

- For Command Prompt (CMD):

```cmd
.\venv\Scripts\activate.bat
```

4.Install Dependencies:

```PowerShell
pip install -r requirements.txt
```

5.Setup Environment Variables:

Create a file named .env in the root folder and add:

```Plaintext
ENCRYPTION_KEY=your-encryption-key-here
DATABASE_URL=sqlite+aiosqlite:///./database/anviksha_interviews.db
```

Replace `your_gemini_api_key_here` with your actual Google Gemini API key.

#### B. Step-by-Step for Linux (Ubuntu/Debian)

Using the Terminal:

1.Update and Install Essentials:

```bash
sudo apt update && sudo apt install git python3-pip python3-venv -y
```

2.Clone and Navigate:

```bash
git clone https://github.com/hackerstoreofficial/Anviksha-The-AI-Interviewer.git
cd Anviksha-The-AI-Interviewer
```

3.Create and Activate Virtual Environment:
```bash
python3 -m venv venv
source venv/bin/activate
```
4.Install Requirements:

```bash
pip install -r requirements.txt
```

5.Setup Environment Variables:
nano .env and paste:

```Plaintext
ENCRYPTION_KEY=your-encryption-key-here
DATABASE_URL=sqlite+aiosqlite:///./database/anviksha_interviews.db
```

#### C. Step-by-Step for macOS

Using the Terminal:

1.Clone the Repository:

```bash
git clone https://github.com/hackerstoreofficial/Anviksha-The-AI-Interviewer.git
cd Anviksha-The-AI-Interviewer
```

2.Create and Activate Virtual Environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

3.Install Dependencies:

```bash
pip install -r requirements.txt
```

4.Setup Environment Variables:

Create a .env file and add your AI_API_KEY.

### Final Critical Steps (Common for All)

After installing the dependencies, you must initialize the database tables to avoid the "no such table: candidates" error.

A. Initialize the Database
Run this command once in your terminal (with the virtual environment active):

```bash
python3 -c "import asyncio; from backend.database import engine, Base; async def init(): async with engine.begin() as conn: await conn.run_sync(Base.metadata.create_all); asyncio.run(init())"
```

B. Start the Backend Server

```bash
uvicorn backend.main:app --reload --port 8000
```

C. Access the Application
Open your web browser and navigate to:

- Web Interface: http://127.0.0.1:8000/static/index.html
- API Documentation: http://127.0.0.1:8000/docs

---

## 📁 Project Structure

```text
anviksha-ai-interview/
├── backend/              # FastAPI server handling all business logic, candidate interviews, and API endpoints
├── services/            # Core AI/ML services: resume OCR parsing, speech recognition, text-to-speech, and face proctoring for integrity
├── frontend/            # Web UI for candidates to take interviews and view results
├── database/            # SQLite schema and initialization scripts
└── requirements.txt     # Python dependencies
```

---

## 🎨 Design Philosophy

**Zen Focus Theme** - A calm, anxiety-reducing interface designed to help candidates perform their best:

- 🌿 Soft sage green color palette
- 🎭 Smooth, breathing-like animations
- 📱 Responsive design for all devices
- ♿ Accessible and user-friendly

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file (copy from `.env.example`):

```bash
# Database
DATABASE_URL=database/anviksha_interviews.db

# Encryption (REQUIRED for production)
ENCRYPTION_KEY=your-fernet-key-here

# Services
TTS_ENGINE=pyttsx3
STT_MODEL=base

# Face Tracking
FACE_YAW_THRESHOLD=30.0
FACE_LOOKING_AWAY_DURATION=2.0
```

### API Keys

Users provide their own API keys during the interview setup:

- OpenAI: `sk-...`
- Google Gemini: `AIza...`
- Groq: `gsk_...`
- Anthropic: `sk-ant-...`

Keys are encrypted and stored securely in the database.

---

## 📊 Database Schema

6 tables tracking the complete interview lifecycle:

| Table | Purpose |
|-------|---------|
| `candidates` | Profile + resume data |
| `interview_sessions` | Session metadata + encrypted credentials |
| `interview_questions` | Questions asked |
| `interview_answers` | Candidate responses |
| `evaluations` | AI-generated feedback |
| `proctoring_events` | Violation logs |

---

## 🧪 Testing

### Service Tests

```bash
# OCR Service
python services/test_ocr.py

# STT Service
python services/test_stt.py

# TTS Service
python services/test_tts.py
```

### Database Management

```bash
# Clear database (interactive)
python database/clear_database.py

# Reset database
python database/init_db.py --reset
```

---

## 📚 Documentation

- **[Project Description](project%20description.md)** - Detailed specification
- **[Context](context.md)** - Architecture and workflow
- **[Progress](progress.md)** - Development history
- **[Database README](database/README.md)** - Schema documentation
- **[Services README](services/README.md)** - API reference

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests
5. Commit (`git commit -m 'Add amazing feature'`)
6. Push (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 🐛 Known Issues & Limitations

- Face proctoring requires dlib models (auto-downloaded on first run)
- Whisper STT requires backend server running
- Screen sharing is browser-dependent (Chrome/Edge recommended)
- Default encryption key for development (set `ENCRYPTION_KEY` in production)

---

## 🗺️ Roadmap

- [ ] WebSocket for real-time proctoring updates
- [ ] Audio recording and playback
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Admin dashboard for HR managers
- [ ] Code sandbox for live coding rounds

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenAI** - Whisper STT and GPT models
- **Google** - Gemini AI
- **Groq** - Fast LLM inference
- **dlib** - Face landmark detection
- **OpenCV** - Computer vision
- **FastAPI** - Modern web framework

---

## 📞 Support

- 📧 **Email**: <support@anviksha-ai.example.com>
- 🐛 **Issues**: [GitHub Issues](https://github.com/hackerstoreofficial/Anviksha-The-AI-Interviewer/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/anviksha-ai-interview/discussions)

---

<div align="center">

**Made with ❤️ for better interview preparation**

⭐ Star this repo if you find it helpful!

</div>

# 🎯 Anviksha - AI Interview Simulator

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success.svg)

**An intelligent AI-powered interview simulator with comprehensive proctoring and real-time feedback**

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
- Python 3.11+
- Virtual environment (required)
- Webcam (for proctoring)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/hackerstoreofficial/Anviksha-The-AI-Interviewer.git
cd anviksha-ai-interview
```

2. **Create and activate virtual environment**
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux/Mac
python3 -m venv .venv
source .venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Download face detection models**
```bash
python services/download_models.py
```

5. **Initialize database**
```bash
python database/init_db.py
```

6. **Configure environment**
```bash
# Copy example env file
cp .env.example .env

# Edit .env and set your encryption key
# Generate key: python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

7. **Start the server**
```bash
uvicorn backend.main:app --reload --port 8000
```

8. **Open in browser**
```
http://127.0.0.1:8000/static/index.html
```

---

## 📁 Project Structure

```
anviksha-ai-interview/
├── backend/              # FastAPI application
│   ├── main.py          # Application entry point
│   ├── database.py      # Async SQLite operations
│   ├── llm_service.py   # Multi-provider LLM service
│   ├── crypto_utils.py  # API key encryption
│   └── routers/         # API endpoints
├── services/            # Core services
│   ├── ocr_service.py   # Resume parsing
│   ├── stt_service.py   # Whisper STT
│   ├── tts_service.py   # Text-to-speech
│   └── headpose_detection.py  # Face proctoring
├── frontend/            # Web interface
│   ├── index.html       # Landing page
│   ├── interview.html   # Interview interface
│   ├── evaluation.html  # Results page
│   └── styles.css       # Zen Focus design
├── database/            # SQLite database
│   ├── schema.sql       # Database schema
│   └── init_db.py       # Initialization
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

- 📧 **Email**: support@anviksha-ai.example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/anviksha-ai-interview/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/anviksha-ai-interview/discussions)

---

<div align="center">

**Made with ❤️ for better interview preparation**

⭐ Star this repo if you find it helpful!

</div>

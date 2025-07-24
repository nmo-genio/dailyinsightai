# DailyInsight AI

![Tests](https://github.com/nmo-genio/dailyinsightai/actions/workflows/python-tests.yml/badge.svg)

> Your personal journaling assistant powered by Generative AI — reflect better, grow smarter.

---

## ![Architecture](./resources/DailyInsightAIArchitecture.png)

---

## 🧠 What is DailyInsight AI?

**DailyInsight AI** is a personalized journaling and idea management app that uses GenAI to:
- Generate insights and summaries from your journal entries
- Store them securely in the cloud via MongoDB Atlas
- Offer a lightweight, structured way to reflect daily — for personal growth, mood tracking, and idea capture

> 🧪 **Current version** is CLI-based. Web interface coming soon!

---

## 🚀 Features (Current Iteration)

- ✍️ Add free-form journal entries via the command line
- 🧠 Get AI-generated insights (via OpenAI integration)
- 💾 Store data securely in MongoDB Atlas
- 🔐 Manage secrets and config via environment variables in `.env` (e.g., OpenAI key, Mongo URI, and DEBUG mode). Secrets are controlled using environment variables, and debug output can be toggled.
- 🧪 Automated testing using Pytest and GitHub Actions for continuous integration
- 📝 Clear, structured docstrings across all modules
- 🛠️ Project scaffolded using Poetry (dependency + packaging)

---

## 🛠️ Tech Stack

| Layer         | Backend                        | Frontend                      |
|---------------|--------------------------------|-------------------------------|
| Language      | Python 3.13                    | TypeScript/JavaScript        |
| Framework     | FastAPI                        | React 19                      |
| AI Integration| OpenAI GPT (via `openai` lib)  | -                            |
| Database      | MongoDB Atlas (via `pymongo`)  | -                            |
| Styling       | -                              | Tailwind CSS v4 (via CRACO)  |
| Build Tools   | Poetry, python-dotenv, pytest | CRACO, Create React App      |
| Testing       | Pytest, GitHub Actions        | React Testing Library        |


## ⚙️ Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/nmo-genio/dailyinsightai.git
cd dailyinsightai
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your credentials
# Copy .env.example to .env and fill in your values
cp .env.example .env

# Run the backend server
python -m uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm start

# Or build for production
npm run build
```

The frontend will be available at http://localhost:3000 and the backend API at http://localhost:8000.

**Note**: The frontend uses CRACO (Create React App Configuration Override) to customize PostCSS configuration for Tailwind CSS v4. The configuration is in `craco.config.js`.

### 4. Run the CLI App (Legacy)

```bash
# From the root directory
poetry install
poetry run python -m dailyinsightai.main
```

---

## 🤝 Contributing

We love community contributions! Please follow these guidelines to keep the project healthy.

### Ground Rules

- **Conventional Commits**: Use the `<type>(scope): subject` format, e.g., `feat(cli): add mood flag`.
- **Style**: Code must pass `black`, `isort`, and `flake8`. Run `poetry run task lint` before pushing.
- **Tests**: Add or update tests for any change. Ensure `pytest` passes locally and in CI.
- **Secrets**: Never commit `.env` or credentials. Our secret‑scanning action will block the PR.
- **Docs**: Update docstrings and this README when behavior changes.

### How to Contribute

1. Fork the repository and create a feature branch:

   ```bash
   git checkout -b feat/amazing-feature
   ```

2. Install development dependencies and pre‑commit hooks:

   ```bash
   poetry install --with dev
   pre-commit install
   ```

3. Make your changes and run lint + tests locally:

   ```bash
   poetry run task lint && poetry run pytest
   ```

4. Commit using Conventional Commits and push your branch:

   ```bash
   git push --set-upstream origin feat/amazing-feature
   ```

5. Open a Pull Request. GitHub Actions will run the test suite; please fix any failures and respond to review comments.

### Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/) v2.1. By participating, you agree to abide by its terms.

---

## 👩‍💻 Built by Nicoleta Mocanu

This project was built with love for reflection, growth, and AI experimentation.  
If you have feedback or ideas, feel free to open an issue or connect on [LinkedIn](https://www.linkedin.com/in/nicoletamocanu/).

## 🎥 Demo Video

Click to watch a quick walkthrough of DailyInsight AI in action (Click the thumbnail below):

[![Watch the video walkthrough](./resources/loom-thumbnail.png)](https://www.loom.com/share/23bdbb05d9a248b7b26a34c1b20ed88b)

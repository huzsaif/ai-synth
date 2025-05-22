# LLM Compare

A modern web application to compare responses from different Large Language Models (LLMs) side by side.

## Features

- **Comparison Interface**: Compare responses from ChatGPT and Gemini side by side
- **Response Metrics**: See how long each model took to respond
- **Syntax Highlighting**: Code in responses is properly formatted with syntax highlighting
- **API Integration**: Connect to OpenAI and Google APIs with your own API keys
- **History Tracking**: Save recent prompts for quick access
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: API keys and settings are stored securely in your browser

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- API keys for:
  - OpenAI (for ChatGPT)
  - Google (for Gemini)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/llm-compare.git
   cd llm-compare
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

### Configuration

1. Click the settings icon in the top-right corner
2. Enter your API keys:
   - OpenAI API key (for ChatGPT)
   - Google API key (for Gemini)
3. Toggle any display preferences
4. Click Save

## Usage

1. Enter your prompt in the text area
2. Click "Compare" to send the prompt to both models
3. View the responses side by side
4. Use the history sidebar to access recent prompts

## Security

Your API keys are stored locally in your browser and are never sent to our servers. All API requests are made directly from your browser to the respective APIs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [OpenAI API](https://openai.com/api/)
- [Google Gemini API](https://ai.google.dev/)

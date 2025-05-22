# AI-Synth: LLM Comparison Tool

AI-Synth is a modern web application that allows you to compare responses from different large language models (LLMs) including OpenAI's GPT and Google's Gemini. The application provides a clean, intuitive interface for prompting different models and analyzing their outputs side by side.

## Features

- Compare responses from multiple LLMs (OpenAI GPT and Google Gemini)
- Clean, modern UI built with React and Material-UI
- Syntax highlighting for code in responses
- Configurable settings with browser storage
- Support for environment variables for deployment
- Mobile-responsive design

## Live Demo

[View the live demo on Render](your-render-url-here)

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key (for GPT models)
- Google API key (for Gemini models)

### Local Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ai-synth.git
   cd ai-synth
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file based on `.env.example`
   - Add your API keys

4. Start the development server:
   ```
   npm run dev
   ```
   Or use the start script:
   ```
   ./start.sh
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Configuration

There are two ways to configure the application:

#### 1. Using the Settings UI (Recommended for development)

1. Click the settings icon in the top-right corner
2. Enter your API keys:
   - OpenAI API key (for ChatGPT)
   - Google API key (for Gemini)
3. Toggle any display preferences
4. Click Save

#### 2. Using Environment Variables (Recommended for deployment)

1. Create a `.env` file in the root directory based on `.env.example`
2. Add your API keys:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_GOOGLE_API_KEY=your_google_api_key_here
   ```
3. Run the application using the start script to automatically load environment variables:
   ```
   ./start.sh
   ```
   Or manually restart the development server if it's already running.

**Note:** Environment variables take precedence over the settings stored in the browser.

## Deployment

### Deploying to Render

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure the service with:
   - Build Command: `npm run build`
   - Start Command: `npm run start`
5. Add environment variables in the Render dashboard
6. Deploy and enjoy!

## Usage

1. Enter your prompt in the input field
2. Select the models you want to compare
3. Click "Generate" to get responses
4. View the comparison in the output panel
5. Save interesting comparisons for future reference

## Technologies Used

- React.js
- TypeScript
- Vite
- Material-UI
- OpenAI API
- Google Gemini API

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for the GPT API
- Google for the Gemini API
- The React and Vite teams for the excellent development tools 
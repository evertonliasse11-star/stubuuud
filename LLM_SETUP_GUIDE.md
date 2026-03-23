# Local LLM Setup Guide for STUBUU

## What is Ollama?
Ollama is a tool that lets you run powerful AI models locally on your computer without needing an internet connection or paying API fees.

## Installation & Setup

### Step 1: Install Ollama
1. Go to **https://ollama.ai**
2. Click "Download" and select Windows
3. Run the installer and follow the installation wizard
4. Restart your computer after installation

### Step 2: Download a Language Model
Open PowerShell and run ONE of these commands:

**Recommended for beginners (fastest):**
```powershell
ollama pull neural-chat
```

**More capable (balanced):**
```powershell
ollama pull mistral
```

**Most powerful (slowest, needs 8GB+ RAM):**
```powershell
ollama pull llama2
```

The first download takes 5-30 minutes depending on your internet speed.

### Step 3: Enable CORS (Required for file:// access)

If you open `index.html` directly from your file system (double-clicking the file), you **must** configure Ollama to allow cross-origin requests. Without this, the browser blocks the AI from communicating.

**Windows (PowerShell - run as Administrator):**
```powershell
[System.Environment]::SetEnvironmentVariable('OLLAMA_ORIGINS', '*', 'User')
```
Then **restart your computer** (or close and reopen all PowerShell windows and Ollama).

**Alternative: Use a local HTTP server** (no CORS config needed):
```powershell
# Install Node.js first if you haven't, then:
npx -y serve .
```
This serves the website at `http://localhost:3000` — open that URL instead of the `file://` path.

### Step 4: Start the Ollama Server
Before using your website, open PowerShell and run:
```powershell
ollama serve
```

You should see output like:
```
pulling manifest
pulling 8ddc4c48c33f
success
2024/01/07 12:34:56 Loading model
2024/01/07 12:34:58 Listening on 127.0.0.1:11434
```

**Keep this PowerShell window open while using your website!**

### Step 5: Use Your Website
1. Open `index.html` in your browser (or use the local server URL)
2. Login with any option
3. Check the STU-BOT connection indicator (green dot = connected)
4. Type questions in the STU-BOT chatbox
5. The AI will respond using your local model!

## Changing Models

If you want to use a different model, go to **Settings > AI Settings** and change the Model field. Or edit `script.js`:

Find this line:
```javascript
ollamaModel: 'mistral',
```

Change it to:
```javascript
ollamaModel: 'neural-chat', // or 'llama2'
```

## Troubleshooting

**"CORS blocked" or "Failed to fetch" error?**
- You're likely opening the HTML file directly (`file://` URL)
- Set `OLLAMA_ORIGINS=*` (see Step 3 above) OR use a local HTTP server
- Restart Ollama after changing the environment variable

**"Model not found" error?**
- The model you configured hasn't been downloaded yet
- Run `ollama pull <model-name>` (e.g., `ollama pull mistral`)

**"Sorry, I encountered an error" message?**
- Make sure `ollama serve` is running in PowerShell
- Check that it says "Listening on 127.0.0.1:11434"
- Wait a few seconds before trying again

**Connection status shows red/offline?**
- Hover over the red dot to see the specific error
- Verify Ollama is running: open `http://127.0.0.1:11434` in your browser (should show "Ollama is running")
- Check Settings > AI Settings to verify the URL is `http://127.0.0.1:11434`

**Website is slow?**
- First response takes longer as the model loads into memory
- Subsequent responses are faster
- Using a smaller model (neural-chat) speeds things up

**Out of memory errors?**
- Download a smaller model: `ollama pull neural-chat`
- Close other applications

## Model Comparison

| Model | Size | Speed | Quality | RAM Needed |
|-------|------|-------|---------|-----------|
| neural-chat | 4GB | ⚡⚡⚡ | Good | 4GB |
| mistral | 4GB | ⚡⚡ | Very Good | 6GB |
| llama2 | 7GB | ⚡ | Excellent | 8GB+ |

## Advanced: Using Other Websites with Local LLM

Any website can use Ollama by making a fetch request like your STUBUU does!

## Security Note
Your local LLM runs only on your computer. No data is sent to external servers.

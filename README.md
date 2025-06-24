# openai-streaming-generator
Use the fetch API to stream OpenAI chat completions wrapped in an async generator


```javascript
import { chat, complete } from 'openai-streaming-generator'

// Local ollama
let endpoint = 'http://localhost:11434/v1/chat/completions'
const model = 'qwen2.5-coder:7b'
const messages = [{
  role: 'user',
  content: `Hey, help me out.
What is the value of peer to peer protocols?
Summarize in two sentances max.
Be short and concise.`
}]

for await (const chunk of chat({ endpoint, model, messages })) {
  process.stdout.write(chunk)
}

endpoint = 'http://localhost:11434/v1/completions'
const prompt = 'Say "this is a test"'

process.stdout.write('\n')
process.stdout.write(prompt)

for await (const chunk of complete({ endpoint, model, prompt })) {
  process.stdout.write(chunk)
}
```

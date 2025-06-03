import { chat } from './index.js'

// Local ollama
const endpoint = 'http://localhost:11434/v1/chat/completions'
const model = 'qwen2.5-coder:3b'
const messages = [{
  role: 'user',
  content: 'What is the value of peer to peer protocols? Summarize in two sentances max. Be short and concise.'
}]

for await (const chunk of chat({ endpoint, model, messages })) {
  process.stdout.write(chunk)
}

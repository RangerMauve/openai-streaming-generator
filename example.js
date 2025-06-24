import { chat, complete } from './index.js'

// Local ollama
let endpoint = 'http://localhost:11434/v1/chat/completions'
const model = 'qwen2.5-coder:7b'
let messages = [{
  role: 'user',
  content: `Hey, help me out.
What is the value of peer to peer protocols?
Summarize in two sentances max.
Be short and concise.`
}]

/*
for await (const {content} of chat({ endpoint, model, messages })) {
  process.stdout.write(content)
}
*/

const tools = [{
  type: 'function',
  function: {
    name: 'echo',
    description: 'Repeat a message to the user',
    parameters: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'The message to repeat'
        }
      },
      required: ['message']
    }
  }
}]

messages = [{
  role: 'user',
  content: 'Use the echo tool to say "Hello World!"'
}]

for await (const {content, tool_calls} of chat({ endpoint, model, messages, tools })) {
  process.stdout.write(content)
  if(tool_calls) console.log(tool_calls)
}

endpoint = 'http://localhost:11434/v1/completions'
const prompt = 'Say "this is a test"'

process.stdout.write('\n')
process.stdout.write(prompt)

for await (const {text} of complete({ endpoint, model, prompt })) {
  process.stdout.write(text)
}

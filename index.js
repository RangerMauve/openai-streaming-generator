export async function * chat ({ endpoint, apiKey, model, messages } = {}) {
  const headers = {
    'Content-Type': 'application/json'
  }
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`
  const body = JSON.stringify({
    model,
    messages,
    stream: true
  })

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body
  })

  if (!response.ok) throw new Error(await response.text())

  const decoder = new TextDecoder('utf-8')
  let remaining = ''

  const reader = response.body.getReader()

  for await (const chunk of iterate(reader)) {
    remaining += decoder.decode(chunk)
    const lines = remaining.split('data: ')
    remaining = lines.splice(-1)[0]
    yield * lines
      .filter((line) => !!line)
      .map((line) => JSON.parse(line))
      .map(({choices}) => choices[0].delta.content)
  }
}

async function * iterate (reader) {
  while (true) {
    const { done, value } = await reader.read()
    if (done) return
    yield value
  }
}

/**
 * Temporary Grok initialization command.
 *
 * Run this curl request manually (outside the Next.js runtime) to verify the Grok agent
 * responds as expected before wiring it into the project.
 *
 * Set the XAI_API_KEY environment variable before using this command.
 */
const XAI_API_KEY = process.env.XAI_API_KEY ?? "<add-your-xai-api-key>";

export const GROK_INIT_CURL_COMMAND = `curl https://api.x.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${XAI_API_KEY}" \
  -d '{
    "messages": [
      {
        "role": "system",
        "content": "You are a test assistant."
      },
      {
        "role": "user",
        "content": "Testing. Just say hi and hello world and nothing else."
      }
    ],
    "model": "grok-4-latest",
    "stream": false,
    "temperature": 0
  }'`;

/**
 * Utility helper to print the initialization instructions wherever needed.
 */
export function describeGrokInitialization(): string {
  return [
    "Run the GROK_INIT_CURL_COMMAND in a terminal that has outbound access.",
    "Confirm the response says: 'hi and hello world'.",
    "Once validated, you can replace this placeholder with a proper API client.",
  ].join("\n- ");
}

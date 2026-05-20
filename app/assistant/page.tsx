import type { Metadata } from 'next'
import AssistantClient from './AssistantClient'

export const metadata: Metadata = {
  title: 'Assistant',
  description: 'Ask the Witflag assistant to recommend phones, compare specs, or explain scores.',
}

export default function AssistantPage() {
  return <AssistantClient />
}

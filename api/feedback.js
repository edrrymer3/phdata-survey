export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { property, suite, feedback } = req.body
  if (!feedback?.trim()) return res.status(400).json({ error: 'No feedback provided' })

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8658971661:AAFtBtgM7kXWDAgwxTKSGtXJpMekSgDwCso'
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '6504586741'

  const msg = `💬 phData Client Feedback\n\n🏢 Property: ${property || 'Unknown'}\n🚪 Suite: ${suite || 'General'}\n\n"${feedback}"\n\n— Submitted via phData survey site`

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg })
    })
  }

  res.status(200).json({ success: true })
}

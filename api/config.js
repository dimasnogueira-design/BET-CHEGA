module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return res.status(500).json({ error: 'Configuração do Supabase não encontrada.' });
  }

  return res.status(200).json({ url, key });
};

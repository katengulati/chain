export default async function handler(req, res) {
  try {
    const { amount = 10, email = "test@example.com" } = req.query;

    const response = await fetch("https://chain2pay.cloud/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: parseFloat(amount),
        currency: "USD",
        merchant_wallet: "0xF97f0804AC9831fc150EF61779A79DA25977C725",
        callback_url: "https://chain1-dusky.vercel.app/api/webhook",
        customer_email: email
      })
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

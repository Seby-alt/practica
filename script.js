const OPENAI_API_KEY = "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";  // înlocuiește cu cheia ta

async function sendToGPT() {
  const input = document.getElementById("input").value;
  const responseDiv = document.getElementById("response");

  const headers = {
    "Content-Type": "application/json",
    "Authorization": 'Bearer ${OPENAI_API_KEY}'
  };

  const body = {
    model: "gpt-4",  // sau "gpt-3.5-turbo"
    messages: [{ role: "user", content: input }]
  };

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const data = await res.json();
    const reply = data.choices[0].message.content;
    responseDiv.innerText = reply;

    // Detechează comenzi pentru LED
    const normalized = reply.toLowerCase();
    if (normalized.includes("aprinde led") || normalized.includes("pornește led")) {
      await fetch("http://192.168.1.139:5000/on");  // IP-ul tău local
    } else if (normalized.includes("stinge led") || normalized.includes("oprește led")) {
      await fetch("http://192.168.1.139:5000/off");
    }

  } catch (err) {
    console.error(err);
    responseDiv.innerText = "Eroare la trimitere.";
  }
}

export async function classifySentiment(remark: string): Promise<'positive' | 'negative' | 'neutral'> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  const res = await fetch("https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: remark }),
  });

  const data = await res.json();

  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    console.error("Unexpected sentiment model response:", data);
    return "neutral"; // fallback
  }

  const topLabel = data[0].reduce((prev, curr) => (curr.score > prev.score ? curr : prev)).label;

  const labelMap: Record<string, 'positive' | 'neutral' | 'negative'> = {
    LABEL_0: 'negative',
    LABEL_1: 'neutral',
    LABEL_2: 'positive',
  };

  return labelMap[topLabel] || 'neutral';
}

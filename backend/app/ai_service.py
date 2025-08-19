import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def summarize_text(text: str):
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Você é um assistente que resume textos e gera insights."},
            {"role": "user", "content": f"Resuma o seguinte texto e traga insights:\n\n{text}"}
        ],
        max_tokens=300
    )
    result = response.choices[0].message["content"].strip()
    parts = result.split("Insights:")
    summary = parts[0].strip()
    insights = parts[1].strip() if len(parts) > 1 else "Sem insights gerados."
    return summary, insights

job = """
You are given a snippet of a transcript (first 150 characters) with speaker diarization labels. Identify the role of each speaker 
(whether they are the client, attorney, or other roles based on context) and include their name if possible. 
If a name is not mentioned, just leave their role (client for example). Return the reponse ONLY in a json format!
This is important otherwise it can break the system when parsing the expected output.

example:
transcripted_text (string) first 100 character, will include [timestamp] [speaker]: [text]
speaker will be only in the format 'Speaker 0' or 'Speaker 1'

Always return a **valid JSON object** with double quotes for keys and values, like this:


just return this reponse, example if Speaker 0 is client with name Bob and Speaker 1 is attorney with name James
{
    "Speaker 0": "Client (Bob)",
    "Speaker 1": "Attorney (James)"
}

If a name is unknown, still return a structured JSON response:

If no name is figured, for the client for example
{
    "Speaker 0": "Client",
    "Speaker 1": "Attorney (James)"
}

Do **not** include extra text, explanations, or formatting outside of the JSON.


"""

job1 = """
You are an AI assistant specializing in legal conversations and document summarization. Please carefully read the following conversation between a client and a lawyer, which is based in North Carolina. Your task is to contextualize the conversation and extract key takeaways, especially focusing on any specific laws or legal terms discussed. Provide a brief, easy to read summary report of the phone call, such as:
- Summary of the main legal topics discussed.
- Any specific laws or regulations from North Carolina mentioned.
- Key legal advice or actions recommended by the lawyer.
- Any questions or concerns raised by the client.
- Key takeaways from the conversation in simple terms.

Make sure the summary is concise, clear, and understandable. Focus on the most important points of the conversation.

Content:
A text of the transcription it is in the format:
[time stamp] [speaker]: [text]

I will also pass a speaker information which can look like:

{
    "Speaker 0": "Client (Bob)",
    "Speaker 1": "Attorney (James)"
}

This should help in contextualizing from understanding who the speakers are.

"""

job2  = job1 + """
It seems the initial contextualization did not capture all the important details or clarity needed. Please recontextualize the conversation with more focus on the legal aspects discussed, ensuring the following:
- Summarize the key legal topics discussed with a clear emphasis on any North Carolina laws or regulations mentioned.
- Provide more precise legal advice or recommendations based on the conversation.
- Clarify any client concerns or questions in a way that is easy to understand.
- Ensure the summary highlights the most critical takeaways for the client in plain language.

Make sure the summary is concise, yet more comprehensive, with added clarity and attention to detail.
"""

# Local LLM Desktop Chat

Aplicație desktop realizată cu React, Tauri și Ollama.
Permite conversații cu un model LLM rulat local, încărcarea fișierelor PDF și salvarea istoricului conversațiilor în SQLite.

## Tehnologii folosite

- React
- Tauri
- Ollama
- SQLite
- pdfjs-dist

## Cerințe

Pentru rulare sunt necesare:

- Node.js
- Rust
- Tauri CLI
- Ollama instalat
- un model Ollama instalat local

Exemplu instalare model:

ollama pull gemma4:latest

## Instalare

Instalează dependențele proiectului:

npm install

## Rulare

Pornește Ollama:

ollama serve

Rulează aplicația:

npm run tauri dev

## Configurare model

Modelul folosit se poate schimba din fișierul:

src/services/ollamaService.js

Exemplu:

const MODEL = "gemma4:latest"

## Funcționalități

- chat cu model LLM local
- încărcare fișiere PDF
- folosirea textului din PDF ca informație de context
- salvarea conversațiilor în SQLite
- afișarea istoricului conversațiilor
- redeschiderea conversațiilor salvate
- ștergerea conversațiilor

## Observații

Aplicația comunică local cu Ollama prin endpoint-ul:

http://localhost:11434/api/chat

PDF-urile scanate ca imagine nu pot fi citite direct.
Pentru acestea ar fi nevoie de OCR.
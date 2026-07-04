# 🧠 MCP Coach — Hábitos Atômicos

Servidor MCP em Python para você acompanhar mentoradas aplicando as
4 Leis da Mudança de Comportamento de **James Clear**.

## O que este MCP faz

Depois de instalar, o Claude Desktop passa a ter estas ferramentas:

| Ferramenta | Lei do James Clear | O que faz |
|---|---|---|
| `definir_identidade` | Base | Define quem a mentorada quer se tornar |
| `cadastrar_habito` | 1ª (Óbvio) + 2ª (Atraente) | Registra hábito com gatilho + local + horário + empilhamento |
| `checkin_diario` | 3ª (Fácil) | Marca hoje como ✅ ou ❌ com uma nota curta |
| `ver_progresso` | 4ª (Satisfatório) | Streak, taxa de cumprimento, reforço positivo |
| `sessao_coach` | Metodologia | 5 perguntas socráticas pra provocar reflexão |
| `listar_mentoradas` | — | Lista todas as mentoradas cadastradas |

## 1) Instalar no seu Mac

```bash
cd meu-primeiro-agente/mcp-coach-habitos

# Se você não tem o uv (gerenciador Python rápido), instale:
brew install uv

# Instala as dependências
uv sync
```

## 2) Testar antes de conectar no Claude

```bash
uv run mcp dev server.py
```

Isso abre o **MCP Inspector** no navegador — uma tela onde você pode
clicar em cada ferramenta e ver o retorno. Ótimo pra confirmar que
tudo funciona antes de plugar no Claude.

## 3) Conectar no Claude Desktop

Abra o arquivo de config:

```bash
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Adicione o bloco `coach-habitos` dentro de `mcpServers`
(substitua `/caminho/absoluto/para` pelo caminho real da pasta):

```json
{
  "mcpServers": {
    "coach-habitos": {
      "command": "uv",
      "args": [
        "--directory",
        "/caminho/absoluto/para/meu-primeiro-agente/mcp-coach-habitos",
        "run",
        "server.py"
      ]
    }
  }
}
```

Feche o Claude Desktop com **⌘+Q** e abra de novo.

## 4) Usar em uma sessão de coach

Exemplos de conversa com o Claude depois de conectar:

- "Cadastra pra Ana a identidade *sou uma líder que escuta com presença*."
- "Cria pro Fernando o hábito *5 min de escrita reflexiva*, gatilho *depois do café*, horário 7h, na cozinha."
- "Marca check-in de hoje da Ana no hábito *caminhada*: cumprido, ela caminhou 20min."
- "Me mostra o progresso da Ana."
- "Roda uma sessão coach com a Ana sobre *sinto que não tenho tempo pra estudar*."

## Onde ficam os dados

Tudo em `habitos.json` na mesma pasta — texto simples, backup fácil,
você pode versionar no Git ou sincronizar via iCloud.

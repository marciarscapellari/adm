"""
🧠 MCP Coach de Hábitos Atômicos
Baseado no livro de James Clear — expõe ferramentas para acompanhar
uma mentorada aplicando as 4 Leis da Mudança de Comportamento.
"""
from __future__ import annotations
import json
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any

from mcp.server.fastmcp import FastMCP

DATA_FILE = Path(__file__).parent / "habitos.json"

mcp = FastMCP("coach-habitos-atomicos")


def _carregar() -> dict[str, Any]:
    if not DATA_FILE.exists():
        return {"mentoradas": {}}
    return json.loads(DATA_FILE.read_text(encoding="utf-8"))


def _salvar(dados: dict[str, Any]) -> None:
    DATA_FILE.write_text(
        json.dumps(dados, indent=2, ensure_ascii=False), encoding="utf-8"
    )


def _mentorada(dados: dict, nome: str) -> dict:
    return dados["mentoradas"].setdefault(
        nome, {"identidade": "", "habitos": {}}
    )


@mcp.tool()
def definir_identidade(mentorada: str, identidade: str) -> str:
    """
    Define a IDENTIDADE que a mentorada quer construir.
    Ex.: 'sou uma pessoa que cuida da saúde', 'sou uma líder que escuta'.
    Clear diz: mudança de identidade > mudança de resultado.
    """
    dados = _carregar()
    m = _mentorada(dados, mentorada)
    m["identidade"] = identidade
    _salvar(dados)
    return f"✅ Identidade de {mentorada}: “{identidade}”"


@mcp.tool()
def cadastrar_habito(
    mentorada: str,
    nome: str,
    gatilho: str,
    local: str,
    horario: str,
    empilhado_apos: str = "",
) -> str:
    """
    1ª Lei: TORNE ÓBVIO. Cadastra um novo hábito com implementação clara:
    'Eu vou [nome] às [horario] em [local]'. Se preencher empilhado_apos,
    aplica também a 2ª Lei (empilhamento): 'Depois de X, farei Y'.
    """
    dados = _carregar()
    m = _mentorada(dados, mentorada)
    if nome in m["habitos"]:
        return f"⚠️ Hábito “{nome}” já existe pra {mentorada}."
    m["habitos"][nome] = {
        "gatilho": gatilho,
        "local": local,
        "horario": horario,
        "empilhado_apos": empilhado_apos,
        "criado_em": date.today().isoformat(),
        "checkins": {},
    }
    _salvar(dados)
    frase = f"Eu vou {nome} às {horario} em {local}."
    if empilhado_apos:
        frase = f"Depois de {empilhado_apos}, {nome} às {horario} em {local}."
    return f"✅ Hábito cadastrado.\n📌 {frase}"


@mcp.tool()
def checkin_diario(
    mentorada: str, nome: str, cumprido: bool, nota: str = ""
) -> str:
    """
    3ª Lei: TORNE FÁCIL (regra dos 2 minutos). Marca o hábito como
    cumprido ou não hoje. Aceita uma nota curta de contexto.
    """
    dados = _carregar()
    m = _mentorada(dados, mentorada)
    if nome not in m["habitos"]:
        return f"❌ Hábito “{nome}” não existe. Cadastre primeiro."
    hoje = date.today().isoformat()
    m["habitos"][nome]["checkins"][hoje] = {"cumprido": cumprido, "nota": nota}
    _salvar(dados)
    icon = "🟢" if cumprido else "🔴"
    return f"{icon} Check-in de {mentorada} em “{nome}” ({hoje}): {'cumprido' if cumprido else 'não cumprido'}"


def _streak(checkins: dict) -> int:
    dias = sorted(checkins.keys(), reverse=True)
    streak = 0
    esperado = date.today()
    for d in dias:
        if d == esperado.isoformat() and checkins[d]["cumprido"]:
            streak += 1
            esperado -= timedelta(days=1)
        else:
            break
    return streak


def _taxa(checkins: dict) -> float:
    if not checkins:
        return 0.0
    cumpridos = sum(1 for c in checkins.values() if c["cumprido"])
    return round(100 * cumpridos / len(checkins), 1)


@mcp.tool()
def ver_progresso(mentorada: str) -> str:
    """
    4ª Lei: TORNE SATISFATÓRIO. Retorna o painel completo da mentorada:
    identidade, streak por hábito, taxa de cumprimento e reforço positivo.
    """
    dados = _carregar()
    m = dados["mentoradas"].get(mentorada)
    if not m or not m["habitos"]:
        return f"📭 {mentorada} ainda não tem hábitos cadastrados."
    linhas = [f"🎯 Identidade: “{m['identidade'] or '(sem identidade definida)'}”", ""]
    for nome, h in m["habitos"].items():
        streak = _streak(h["checkins"])
        taxa = _taxa(h["checkins"])
        barra = "🟩" * min(streak, 14) or "▫️"
        linhas.append(
            f"• {nome}\n"
            f"   {barra}  {streak} dia(s) seguidos • {taxa}% de cumprimento\n"
            f"   📍 {h['horario']} em {h['local']}"
        )
    return "\n".join(linhas)


@mcp.tool()
def sessao_coach(mentorada: str, situacao: str) -> str:
    """
    Retorna PERGUNTAS SOCRÁTICAS que a coach pode fazer para a mentorada,
    baseadas na situação atual e na metodologia dos Hábitos Atômicos.
    Não dá conselho — provoca reflexão.
    """
    dados = _carregar()
    m = dados["mentoradas"].get(mentorada, {})
    identidade = m.get("identidade") or "(ainda sem identidade definida)"
    perguntas = [
        f"1. Quando você imagina alguém que “{identidade}”, o que ela faria hoje?",
        f"2. Nessa situação — “{situacao}” — qual das 4 Leis está fraca? "
        f"(óbvia? atraente? fácil? satisfatória?)",
        "3. Como você pode reduzir esse hábito à sua versão de 2 minutos?",
        "4. A qual hábito atual você pode empilhar esse novo comportamento?",
        "5. Que evidência de progresso você quer poder olhar no fim da semana?",
    ]
    return "🎧 Roteiro de sessão coach:\n\n" + "\n\n".join(perguntas)


@mcp.tool()
def listar_mentoradas() -> str:
    """Retorna a lista de mentoradas cadastradas e quantos hábitos cada uma tem."""
    dados = _carregar()
    if not dados["mentoradas"]:
        return "📭 Nenhuma mentorada cadastrada ainda."
    linhas = ["👥 Mentoradas:"]
    for nome, m in dados["mentoradas"].items():
        linhas.append(f"• {nome} — {len(m['habitos'])} hábito(s)")
    return "\n".join(linhas)


if __name__ == "__main__":
    mcp.run()

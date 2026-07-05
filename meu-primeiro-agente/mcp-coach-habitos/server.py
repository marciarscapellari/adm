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


@mcp.tool()
def sugerir_recompensa(mentorada: str, habito: str) -> str:
    """
    4ª Lei: TORNE SATISFATÓRIO. Retorna 3 sugestões de recompensa
    imediata que reforçam a identidade da mentorada, e não um prêmio
    que sabota o hábito (ex.: não recompensa 'corri 5km' com sorvete).
    """
    dados = _carregar()
    m = dados["mentoradas"].get(mentorada, {})
    identidade = m.get("identidade") or "quem você quer se tornar"
    streak = _streak(m.get("habitos", {}).get(habito, {}).get("checkins", {}))
    return (
        f"🎁 Recompensas alinhadas à identidade “{identidade}”:\n\n"
        f"1. 🌱 Ritual de reconhecimento: escreva uma frase no diário — "
        f"‘hoje agi como {identidade}’. Reforça a identidade a cada dia.\n\n"
        f"2. 📊 Marcador visível: mova uma bolinha, adesivo ou marca no "
        f"habit tracker de papel. Ver o streak crescer ativa dopamina.\n\n"
        f"3. 🤝 Anúncio público: mande uma mensagem curta pra alguém que "
        f"apoia (‘cumpri {habito} hoje — dia {streak + 1}’). Compromisso "
        f"social é a recompensa mais poderosa segundo Clear."
    )


@mcp.tool()
def historico_habito(mentorada: str, habito: str, ultimos_dias: int = 14) -> str:
    """
    Mostra o histórico de check-ins dos últimos N dias (default 14)
    em formato calendário 🟩/🟥/⬜, útil pra sessão coach revisar padrões.
    """
    dados = _carregar()
    m = dados["mentoradas"].get(mentorada, {})
    h = m.get("habitos", {}).get(habito)
    if not h:
        return f"❌ Hábito “{habito}” não existe pra {mentorada}."
    linhas = [f"📅 Últimos {ultimos_dias} dias — {habito} ({mentorada})", ""]
    calendario = []
    for i in range(ultimos_dias - 1, -1, -1):
        dia = (date.today() - timedelta(days=i)).isoformat()
        c = h["checkins"].get(dia)
        if c is None:
            calendario.append("⬜")
        elif c["cumprido"]:
            calendario.append("🟩")
        else:
            calendario.append("🟥")
    linhas.append("".join(calendario))
    linhas.append(
        f"\n🟩 cumprido  🟥 não cumprido  ⬜ sem registro"
    )
    linhas.append(f"\n🔥 Streak atual: {_streak(h['checkins'])} dia(s)")
    linhas.append(f"📈 Taxa geral: {_taxa(h['checkins'])}%")
    notas = [
        f"  • {d}: {c['nota']}"
        for d, c in sorted(h["checkins"].items(), reverse=True)
        if c.get("nota")
    ][:5]
    if notas:
        linhas.append("\n📝 Últimas notas:\n" + "\n".join(notas))
    return "\n".join(linhas)


@mcp.tool()
def exportar_relatorio_semanal(mentorada: str) -> str:
    """
    Gera um relatório em Markdown com o resumo da semana da mentorada:
    identidade, cada hábito com streak e taxa, notas registradas.
    Pronto pra copiar/colar no Notion, WhatsApp ou e-mail.
    """
    dados = _carregar()
    m = dados["mentoradas"].get(mentorada)
    if not m:
        return f"❌ {mentorada} não cadastrada."
    hoje = date.today()
    inicio = hoje - timedelta(days=6)
    md = [
        f"# 📊 Relatório Semanal — {mentorada}",
        f"> Período: {inicio.strftime('%d/%m')} a {hoje.strftime('%d/%m/%Y')}",
        "",
        f"## 🎯 Identidade",
        f"> “{m.get('identidade') or '(sem identidade definida)'}”",
        "",
        "## 📈 Hábitos da semana",
        "",
        "| Hábito | Streak | Taxa | Cumpridos na semana |",
        "|---|---|---|---|",
    ]
    for nome, h in m["habitos"].items():
        semana = [
            (inicio + timedelta(days=i)).isoformat()
            for i in range(7)
        ]
        cumpridos = sum(
            1 for d in semana
            if h["checkins"].get(d, {}).get("cumprido")
        )
        md.append(
            f"| {nome} | {_streak(h['checkins'])}d | {_taxa(h['checkins'])}% | {cumpridos}/7 |"
        )
    md.append("")
    md.append("## 💬 Reflexão da semana")
    md.append("")
    for nome, h in m["habitos"].items():
        notas = [
            f"- **{d}** ({nome}): {c['nota']}"
            for d, c in sorted(h["checkins"].items(), reverse=True)
            if c.get("nota") and d >= inicio.isoformat()
        ]
        if notas:
            md.extend(notas)
    return "\n".join(md)


@mcp.tool()
def remover_habito(mentorada: str, habito: str) -> str:
    """Remove um hábito da mentorada (mantém o histórico das outras)."""
    dados = _carregar()
    m = dados["mentoradas"].get(mentorada, {})
    if habito not in m.get("habitos", {}):
        return f"❌ Hábito “{habito}” não existe pra {mentorada}."
    del m["habitos"][habito]
    _salvar(dados)
    return f"🗑️ Hábito “{habito}” removido de {mentorada}."


if __name__ == "__main__":
    mcp.run()

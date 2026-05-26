#!/bin/bash
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
PLANO="$DIR/plano_semanal.md"
RESUMO="$DIR/resumo_rapido.txt"

echo "🚀 Iniciando rotina de segunda-feira..."
echo ""

# 1. Busca tarefas do Notion e gera plano_semanal.md
echo "📋 Buscando tarefas no Notion e gerando plano semanal..."
claude "Acesse meu Notion e:

1. Busque todas as tarefas da minha lista de tarefas pessoais
2. Com base no método da triade do tempo de christian barbosa, sugira para cada tarefa uma estimativa de tempo e ao final mostre um gráfico de pizza com o tempo dedicado a tarefas importantes, urgentes e circunstanciais
3. Filtre apenas tarefas que estão 'em andamento' ou 'a fazer'
4. Crie um arquivo $PLANO organizando por:
   - 🔴 URGENTE (prazo até amanhã ou marcadas como alta prioridade)
   - 🟡 IMPORTANTE (prazo esta semana)
   - 🟢 PODE ESPERAR (sem prazo ou próxima semana)
   - 📅 COMPROMISSOS FIXOS (reuniões e eventos)

5. Para cada tarefa inclua:
   - Título
   - Prazo (se tiver)
   - Estimativa de tempo
   - Tags/categorias

6. No final, adicione:
   - Total de tarefas por categoria
   - Carga de trabalho estimada por dia e o total da semana
   - Link direto para cada tarefa no Notion"

# 2. Gera resumo_rapido.txt a partir do plano gerado
echo ""
echo "📝 Gerando resumo rápido..."

if [[ ! -f "$PLANO" ]]; then
  echo "❌ Erro: $PLANO não foi gerado." >&2
  exit 1
fi

# Extrai contagens do plano_semanal.md
URGENTES=$(grep -E '^\| [0-9]+' "$PLANO" | awk 'NR==1' | head -0; \
           awk '/## 🔴 URGENTE/{f=1} /## 🟡/{f=0} f && /^\| [0-9]+/' "$PLANO" | wc -l | tr -d ' ')
IMPORTANTES=$(awk '/## 🟡 IMPORTANTE/{f=1} /## 🟢/{f=0} f && /^\| [0-9]+/' "$PLANO" | wc -l | tr -d ' ')
PODEM_ESPERAR=$(awk '/## 🟢 PODE ESPERAR/{f=1} /## 📅/{f=0} f && /^\| [0-9]+/' "$PLANO" | wc -l | tr -d ' ')
TOTAL_TAREFAS=$(( URGENTES + IMPORTANTES + PODEM_ESPERAR ))

CARGA_TOTAL=$(grep -E '^> \*\*Total semana' "$PLANO" | grep -oE '[0-9]+h [0-9]+min' | head -1)
if [[ -z "$CARGA_TOTAL" ]]; then
  CARGA_TOTAL=$(grep -E 'Total semana|total semana' "$PLANO" | grep -oE '[~≈]?[0-9]+h[^|]*' | head -1 | tr -d ' ')
fi
[[ -z "$CARGA_TOTAL" ]] && CARGA_TOTAL="ver plano_semanal.md"

DATA=$(date '+%d/%m/%Y %H:%M')

cat > "$RESUMO" <<EOF
================================================
  RESUMO RÁPIDO — SEMANA $(date '+%d/%m/%Y')
================================================

  🔴 Tarefas URGENTES:      $URGENTES
  🟡 Tarefas IMPORTANTES:   $IMPORTANTES
  🟢 Podem esperar:         $PODEM_ESPERAR
  ──────────────────────────────────────────────
  📌 Total de tarefas:      $TOTAL_TAREFAS

  ⏱  Carga de trabalho:     $CARGA_TOTAL

  📄 Plano completo:        $PLANO
  🕐 Gerado em:             $DATA
================================================
EOF

echo ""
echo "✅ Concluído!"
echo ""
cat "$RESUMO"

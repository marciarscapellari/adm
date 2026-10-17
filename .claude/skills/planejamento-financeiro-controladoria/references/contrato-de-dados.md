# Contrato de dados das abas de entrada

Use este documento como modelo. Ele serve ao mesmo tempo como **manual da equipe**
(o que preencher em cada coluna) e como **especificação para agentes** (o formato
exato que eles devem gerar).

## 1. Aba `Entrada_Realizado`

| Coluna | Tipo | Obrigatório | Regra / valores permitidos | Exemplo |
|--------|------|-------------|----------------------------|---------|
| `id_lancamento` | texto | sim | Único. Agentes: derivar da fonte (`NF-`, `EXT-`, `FOLHA-`). Equipe: gerado automaticamente | `EXT-2026-10-03-001` |
| `data_competencia` | data | sim | `AAAA-MM-DD`; dentro do período aberto | `2026-10-03` |
| `data_caixa` | data | não | `AAAA-MM-DD`; vazio se ainda não pago/recebido | `2026-10-10` |
| `conta` | lista | sim | Código existente em `Cadastros!PlanoContas` | `3.1.01` |
| `centro_custo` | lista | sim | Código existente em `Cadastros!CentrosCusto` | `CC-ENSINO` |
| `unidade` | lista | sim | Código existente em `Cadastros!Unidades` | `POA` |
| `descricao` | texto | sim | Até 120 caracteres, sem dados pessoais | `Energia elétrica outubro` |
| `valor` | número | sim | Ponto decimal, sem "R$", 2 casas | `1520.40` |
| `natureza` | lista | sim | `Receita` / `Despesa` / `Investimento` / `Financeiro` | `Despesa` |
| `documento` | texto | não | Nº NF, contrato, link do comprovante | `NF 4587` |
| `origem` | lista | sim | `Equipe` / `Agente` / `Integracao` | `Agente` |
| `responsavel` | texto | sim | Pessoa ou nome do agente | `agente-extrato` |
| `registrado_em` | data-hora | sim | `AAAA-MM-DD HH:MM` | `2026-10-04 08:15` |
| `status` | lista | sim | `Rascunho` / `Pendente` / `Validado` / `Rejeitado` | `Rascunho` |
| `comentario` | texto | não | Obrigatório se `status = Pendente` ou `Rejeitado` | `Conta incerta: energia ou manutenção?` |

## 2. Aba `Entrada_Orcado`

| Coluna | Tipo | Regra |
|--------|------|-------|
| `cenario` | lista | `Base` / `Otimista` / `Pessimista` / `Reforecast_Q1`… |
| `mes` | data | Primeiro dia do mês, `AAAA-MM-01` |
| `conta`, `centro_custo`, `unidade` | lista | Mesmos cadastros do realizado |
| `valor` | número | Mesmo padrão de sinal do realizado |
| `driver` | texto | Qual premissa gerou o valor (ex.: `alunos × mensalidade`) |
| `versao` | texto | `2027-v1`, `2027-v2`… |

## 3. Aba `Premissas`

| Coluna | Exemplo |
|--------|---------|
| `codigo` | `INFLACAO_2027` |
| `descricao` | Inflação esperada (IPCA) 2027 |
| `valor_base` / `valor_otimista` / `valor_pessimista` | `0.040` / `0.035` / `0.055` |
| `unidade` | `% a.a.` |
| `fonte` | Boletim Focus 2026-10-10 |
| `atualizado_em` / `aprovado_por` | `2026-10-12` / `Diretoria Financeira` |

## 4. Aba `Log`

| Coluna | Exemplo |
|--------|---------|
| `data_hora` | `2026-10-04 08:15` |
| `executor` | `agente-extrato` |
| `acao` | `importacao` / `validacao` / `correcao` / `fechamento` |
| `fonte` | `extrato_banco_out.ofx` |
| `linhas_ok` / `linhas_erro` | `142` / `3` |
| `observacao` | `3 linhas sem regra de-para, marcadas como Pendente` |

## 5. Formato de saída esperado de um agente

CSV (UTF-8, separador `;` se a planilha for em português, ou `,` — documente no
LEIA-ME) **ou** JSON com as mesmas chaves:

```json
[
  {
    "id_lancamento": "EXT-2026-10-03-001",
    "data_competencia": "2026-10-03",
    "data_caixa": "2026-10-03",
    "conta": "4.2.05",
    "centro_custo": "CC-ADM",
    "unidade": "POA",
    "descricao": "Energia elétrica outubro",
    "valor": 1520.40,
    "natureza": "Despesa",
    "documento": "Débito automático",
    "origem": "Agente",
    "responsavel": "agente-extrato",
    "registrado_em": "2026-10-04 08:15",
    "status": "Rascunho",
    "comentario": ""
  }
]
```

## 6. Checklist do agente antes de gravar

1. Todos os campos obrigatórios preenchidos?
2. `conta`, `centro_custo` e `unidade` existem nos Cadastros?
3. `id_lancamento` ainda não existe na aba?
4. Data dentro do período aberto?
5. Na dúvida sobre classificação → `status = Pendente` + `comentario` explicando.
6. Registrou a carga no `Log`?

## 7. Tabela de-para (classificação automática)

| `palavra_chave` (no histórico) | `conta` | `centro_custo` | `confianca` |
|-------------------------------|---------|----------------|-------------|
| `CEEE` / `ENERGIA` | `4.2.05` | `CC-ADM` | alta |
| `FOLHA` | `4.1.01` | conforme rateio | alta |
| `PIX RECEBIDO MENSALIDADE` | `3.1.01` | `CC-ENSINO` | média |

Regra: confiança **alta** → agente lança como `Rascunho`; **média/baixa** ou sem
regra → `Pendente`. Cada exceção resolvida por uma pessoa vira uma nova linha no
de-para — assim a automação melhora todo mês.

# BET, CHEGA. — ARQUITETURA TÉCNICA V1

**Status:** arquitetura base para implementação
**Objetivo:** transformar a Especificação de Produto V1 em uma estrutura técnica implementável.

---

## 1. PRINCÍPIO ARQUITETURAL

O sistema deve ser construído em torno da **jornada do usuário**, não em torno de telas isoladas.

Arquitetura conceitual:

**INTERFACE → JORNADA → ESTADO → DADOS → AÇÕES → IA/INTEGRAÇÕES**

Cada tela deve saber:
- onde o usuário está;
- por que aquela tela existe;
- qual decisão ou ação ela produz;
- para onde o usuário pode ir;
- o que precisa ser salvo;
- quando deve interromper a jornada e encaminhar para segurança/ajuda.

---

## 2. STACK V1

Base já adotada no projeto:

- **GitHub:** código, documentação e versionamento;
- **Next.js:** aplicação web;
- **Vercel:** hospedagem/deploy;
- **Supabase:** banco, autenticação e serviços de dados;
- **IA:** camada conversacional desacoplada da interface.

A implementação deve manter serviços externos substituíveis sempre que possível.

---

## 3. ESTRUTURA DE ROTAS

Estrutura conceitual:

```text
/
├── /
├── /parar
├── /impulso
├── /espelho
├── /autoexclui
├── /recaida
├── /familia
├── /dinheiro
├── /crise
├── /conversar
├── /jornada
├── /check-in
├── /protecao
├── /perfil
├── /privacidade
└── /ajuda
```

As rotas podem ser reorganizadas durante implementação se isso melhorar segurança, SEO ou arquitetura do App Router, mas os **fluxos funcionais** permanecem estáveis.

---

## 4. HOME

### Função
Não é dashboard. É porta de entrada.

### Prioridade visual

1. **QUERO PARAR AGORA**
2. Quero entender meu padrão
3. Já me autoexcluí
4. Quero ajudar alguém
5. Preciso falar agora
6. Emergência

### Regra
A pessoa deve conseguir iniciar uma ação útil em poucos segundos.

---

## 5. MOTOR DE ESTADO

O sistema deve ter um estado persistente de jornada.

Exemplo conceitual:

```text
ENTRY
  ↓
RECOGNIZE
  ↓
DECIDE
  ↓
PROTECT
  ↓
SELF_EXCLUSION
  ↓
RETURN
  ↓
CROSSING
  ↓
REBUILD
  ↓
LIVE
```

Estados transversais:

```text
IMPULSE
RELAPSE
CRISIS
FAMILY
MONEY
```

Um estado transversal pode interromper temporariamente o fluxo principal e depois devolver o usuário ao ponto adequado.

---

## 6. MÁQUINA DE ESTADOS

Cada sessão deve manter, no mínimo:

- `journey_stage`
- `active_flow`
- `active_step`
- `risk_signal`
- `protection_level`
- `self_exclusion_status`
- `last_checkin`
- `last_relapse`
- `updated_at`

### Exemplo

```text
journey_stage = PROTECT
active_flow = STOP
active_step = MONEY_BARRIER
risk_signal = ELEVATED
protection_level = 2
self_exclusion_status = UNKNOWN
```

Não criar um rótulo permanente de usuário baseado em um único resultado.

---

## 7. BANCO SUPABASE — MODELO V1

### `profiles`

```text
id uuid PK
created_at timestamptz
updated_at timestamptz
consent_version text
consent_at timestamptz
onboarding_complete boolean
```

### `journey_states`

```text
id uuid PK
user_id uuid FK
journey_stage text
active_flow text
active_step text
status text
created_at timestamptz
updated_at timestamptz
```

### `assessments`

```text
id uuid PK
user_id uuid FK
type text
version text
answers jsonb
result_band text
created_at timestamptz
```

### `barriers`

```text
id uuid PK
user_id uuid FK
category text
action text
status text
created_at timestamptz
completed_at timestamptz
```

### `triggers`

```text
id uuid PK
user_id uuid FK
trigger_type text
context text
intensity integer
created_at timestamptz
```

### `checkins`

```text
id uuid PK
user_id uuid FK
checkin_date date
urge_level integer
bet_occurred boolean
protection_status text
hardest_moment text
action_taken text
created_at timestamptz
```

### `financial_snapshots`

```text
id uuid PK
user_id uuid FK
gambling_loss numeric
debt_total numeric
essential_cash numeric
protected_amount numeric
created_at timestamptz
```

### `trusted_contacts`

```text
id uuid PK
user_id uuid FK
relationship text
consent_to_contact boolean
created_at timestamptz
```

### `relapse_events`

```text
id uuid PK
user_id uuid FK
occurred_at timestamptz
trigger text
thought text
barrier_failure text
first_signal text
action_after text
created_at timestamptz
```

---

## 8. SEGURANÇA DO BANCO

Todas as tabelas com dados pessoais devem usar **Row Level Security (RLS)**.

Regra base:

> Usuário só acessa os próprios dados, salvo fluxos administrativos explicitamente autorizados.

Nunca colocar chave privilegiada do Supabase no cliente.

Dados sensíveis devem ser minimizados e protegidos.

Antes de produção, revisar:
- LGPD;
- retenção;
- exclusão;
- auditoria;
- backups;
- controle de acesso;
- logs;
- incident response.

---

## 9. AUTENTICAÇÃO

V1 deve permitir uma entrada com baixa fricção, mas sem comprometer persistência e segurança.

Arquitetura recomendada:

- usuário pode iniciar jornada sem conta quando tecnicamente seguro;
- pedir criação/login quando a persistência de longo prazo se tornar útil;
- nunca pedir credenciais de serviços externos como Gov.br;
- consentimento explícito para salvar dados de jornada;
- possibilidade de excluir dados conforme política aplicável.

A decisão final entre modo anônimo e conta obrigatória deve ser validada antes da implementação definitiva.

---

## 10. CAMADA DE IA

A IA não controla diretamente o banco.

Fluxo:

```text
USUÁRIO
  ↓
INTERFACE
  ↓
ORQUESTRADOR
  ↓
REGRAS DE SEGURANÇA
  ↓
MODELO
  ↓
VALIDAÇÃO
  ↓
AÇÃO PERMITIDA
  ↓
BANCO / INTERFACE
```

### Regra crítica

O modelo pode **propor** uma ação, mas operações sensíveis devem ser executadas por funções controladas do sistema.

Exemplo:

```text
IA: "Sugiro criar uma barreira de acesso."
        ↓
APP: valida intenção
        ↓
ACTION: create_barrier()
        ↓
SUPABASE
```

---

## 11. GUARDRAILS DA IA

A camada de segurança deve detectar pelo menos:

- intenção de apostar novamente;
- perseguição de perdas;
- intenção de apostar dinheiro essencial;
- recaída;
- pedido de empréstimo para apostar;
- risco financeiro agudo;
- violência ou ameaça;
- risco envolvendo criança/dependente;
- crise emocional grave;
- possível risco de autoagressão.

Quando um sinal crítico surgir, a conversa deve ser desviada para o fluxo de segurança correspondente.

A IA não deve afirmar diagnóstico clínico.

---

## 12. ENGINE DE DECISÃO

Criar uma camada de regras simples e auditável antes de depender de IA para decisões importantes.

Exemplo:

```text
IF relapse = true
→ FLOW_RELAPSE

IF immediate_danger = true
→ FLOW_CRISIS

IF wants_to_bet_now = true
→ FLOW_IMPULSE

IF self_exclusion_done = true
→ FLOW_POST_EXCLUSION

IF wants_to_help_someone = true
→ FLOW_FAMILY
```

A IA pode interpretar linguagem natural, mas a decisão crítica deve passar por regras determinísticas sempre que possível.

---

## 13. PROTEÇÃO EM CAMADAS

O sistema deve representar proteção como camadas:

### Nível 0
Nenhuma barreira.

### Nível 1
Barreiras comportamentais:
- sair de grupos;
- apagar aplicativos;
- evitar gatilhos;
- plano SE → ENTÃO.

### Nível 2
Barreiras financeiras:
- separar dinheiro essencial;
- remover meios de pagamento disponíveis para apostar;
- pedir apoio de pessoa de confiança;
- organizar contas.

### Nível 3
Barreiras de acesso:
- autoexclusão oficial;
- remoção de acessos;
- outras ferramentas reais disponíveis.

### Nível 4
Ajuda humana/profissional:
- pessoa de confiança;
- serviço de saúde;
- profissional;
- serviço de emergência quando necessário.

Não apresentar nível como diagnóstico. É apenas um mapa de proteção.

---

## 14. AUTOEXCLUSÃO

V1 usa navegação para o serviço oficial.

```text
BET, CHEGA.
      ↓
AUTOEXCLUSÃO OFICIAL
      ↓
USUÁRIO REALIZA O PROCESSO
      ↓
VOLTA AO BET, CHEGA.
      ↓
CONTINUA JORNADA
```

Não armazenar senha Gov.br.

Não afirmar que o sistema consegue consultar automaticamente o status oficial se não existir integração autorizada e comprovada.

---

## 15. CHECK-IN

Check-in não deve ser diário por obrigação moral. Deve existir para acompanhar mudança e detectar necessidade de ação.

Campos mínimos:
- vontade de apostar;
- apostou ou não;
- momento mais difícil;
- barreira utilizada;
- ação tomada;
- necessidade de ajuda.

Estados visuais:

**VERDE → AMARELO → LARANJA → VERMELHO**

Essas cores representam estado operacional, não diagnóstico clínico.

---

## 16. RECAÍDA — INTEGRAÇÃO TÉCNICA

Evento:

```text
RELAPSE_DETECTED
```

Ações automáticas possíveis:

1. interromper fluxo atual;
2. abrir F05;
3. registrar evento com consentimento;
4. perguntar primeiro sinal;
5. identificar barreira quebrada;
6. criar reforço;
7. avaliar necessidade de F01/F07/F08;
8. retornar à jornada.

Não apagar histórico anterior.

---

## 17. DINHEIRO — INTEGRAÇÃO TÉCNICA

O sistema registra informações declaradas pelo usuário.

Não presumir acesso bancário.

Não prometer:
- bloqueio Pix;
- bloqueio de cartão;
- acesso a conta;
- recuperação de dinheiro;
- negociação automática.

Se futuras integrações forem criadas, cada uma deve ter consentimento, escopo limitado e revisão de segurança.

---

## 18. FAMÍLIA

A jornada de familiar deve ser separada da conta/jornada da pessoa que aposta, salvo consentimento e arquitetura apropriada.

Não permitir que um familiar obtenha dados privados de outro usuário simplesmente por declarar vínculo.

Ações:
- gerar mensagem;
- definir limites;
- proteção financeira própria;
- encaminhamento;
- plano de acompanhamento.

---

## 19. CRISE

A camada de crise deve ser independente da IA conversacional.

Quando acionada:

```text
CRISE
 ↓
RISCO IMEDIATO?
 ↓
SIM → SEGURANÇA + CONTATO HUMANO + SERVIÇO REAL
NÃO → REDUZIR PRESSÃO + AÇÃO CONCRETA
```

Os contatos e serviços apresentados devem ser mantidos por fonte responsável e atualizados. Nunca hardcodar informação não verificada como se fosse permanente.

---

## 20. ANALYTICS

Analytics deve medir o sucesso da jornada sem transformar vulnerabilidade em exploração comercial.

Eventos conceituais:

```text
home_viewed
journey_started
mirror_started
stop_started
impulse_started
protection_created
self_exclusion_clicked
self_exclusion_returned
checkin_completed
relapse_registered
family_started
money_started
crisis_triggered
human_help_selected
journey_stage_changed
```

Evitar registrar conteúdo integral de conversas em analytics.

---

## 21. OBSERVABILIDADE

Produção deve ter:
- logs técnicos;
- erros de frontend/backend;
- métricas de disponibilidade;
- rastreamento de falhas da IA;
- alertas para falhas críticas;
- auditoria de ações sensíveis.

Nunca registrar segredos, tokens ou conteúdo sensível desnecessário nos logs.

---

## 22. COMPONENTES DE UI

Base compartilhada:

```text
AppShell
Header
EmergencyButton
PrimaryCTA
SecondaryCTA
ProgressIndicator
QuestionCard
OptionList
TextInput
ChatComposer
ChatMessage
BarrierCard
CheckinCard
MoneySnapshot
JourneyTimeline
SafetyBanner
HumanHelpCard
```

O componente deve receber estado e intenção, não conter regras críticas duplicadas.

---

## 23. DESIGN SYSTEM

Direção:
- escuro;
- sóbrio;
- alto contraste;
- poucos elementos por tela;
- tipografia limpa;
- verde-lima como sinal de ação;
- sem estética de cassino;
- sem estética hospitalar.

O design deve transmitir:

**calma + firmeza + ação.**

---

## 24. ESTRUTURA DE CÓDIGO PROPOSTA

```text
app/
  page.tsx
  impulso/
  espelho/
  parar/
  autoexclui/
  recaida/
  familia/
  dinheiro/
  crise/
  conversar/
  jornada/
  check-in/

components/
  ui/
  journey/
  safety/
  chat/

lib/
  supabase/
  journey/
  safety/
  ai/
  analytics/
  validations/

types/

config/

supabase/
  migrations/
  functions/

public/

docs/
```

A estrutura pode mudar conforme o código existente seja auditado.

---

## 25. ORDEM REAL DE CONSTRUÇÃO

### Sprint 0 — Auditoria
- verificar código atual;
- verificar deploy;
- verificar variáveis;
- verificar Supabase;
- identificar o que já existe;
- não destruir funcionalidades úteis.

### Sprint 1 — Fundação
- AppShell;
- design system;
- Supabase;
- autenticação/consentimento;
- journey state;
- RLS.

### Sprint 2 — Saída
- Home;
- F01;
- F03;
- autoexclusão;
- retorno.

### Sprint 3 — Continuidade
- F04;
- check-in;
- barreiras;
- 24h;
- 7 dias.

### Sprint 4 — Recuperação
- F05;
- F07;
- F06.

### Sprint 5 — Segurança
- F08;
- guardrails;
- encaminhamento humano;
- auditoria.

### Sprint 6 — IA
- conversa contextual;
- classificação de intenção;
- engine de decisão;
- ações controladas;
- memória mínima necessária.

---

## 26. TESTE DE ACEITAÇÃO V1

Antes de publicar, executar pelo menos estes cenários:

1. usuário quer parar;
2. usuário está no impulso;
3. usuário quer recuperar perda;
4. usuário concluiu autoexclusão;
5. usuário não conseguiu autoexcluir;
6. usuário retorna depois da autoexclusão;
7. usuário sofre recaída;
8. usuário quer ajudar familiar;
9. usuário está com problema financeiro;
10. usuário entra em crise;
11. usuário abandona e retorna;
12. usuário exclui/encerra sua conta quando aplicável.

Para cada cenário:

**entrada → estado → ação → persistência → retorno → segurança**

---

## 27. REGRA DE OURO DO DESENVOLVIMENTO

> **Nenhuma funcionalidade entra porque é tecnicamente interessante. Ela entra porque ajuda a pessoa a sair, proteger, atravessar ou reconstruir.**

E uma segunda regra:

> **Se uma funcionalidade puder aumentar risco, exposição, vergonha, dependência ou exploração comercial da vulnerabilidade, ela precisa ser revista antes de ser construída.**

---

## 28. PRÓXIMO PASSO

A arquitetura agora está definida em nível suficiente para começar a implementação, mas **não devemos sobrescrever o código atual sem antes auditá-lo**.

Próxima ação técnica:

**AUDITAR O REPOSITÓRIO ATUAL → MAPEAR O QUE JÁ EXISTE → COMPARAR COM ESTA ARQUITETURA → CORRIGIR SEM DESTRUIR → IMPLEMENTAR FASE 1.**

---

## 29. VISÃO FINAL

```text
                    BET, CHEGA.
                         │
              ┌──────────┴──────────┐
              │                     │
          ENTRADA                SEGURANÇA
              │                     │
     VER → DECIDIR              CRISE
              │
          PROTEGER
              │
       AUTOEXCLUSÃO
              │
         ATRAVESSAR
              │
        RECONSTRUIR
              │
            VIVER
```

**O sistema não termina quando o usuário fecha a conta de aposta. É exatamente aí que começa uma parte importante do produto.**

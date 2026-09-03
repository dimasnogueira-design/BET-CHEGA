# BET, CHEGA. — ESPECIFICAÇÃO DE PRODUTO V1

**Status:** base para desenvolvimento
**Fonte:** `conversa-original.txt`, `docs/00-HISTORIA-BET-CHEGA.md` e `docs/01-MAPA-DA-JORNADA.md`
**Regra:** este documento transforma decisões conceituais em requisitos de produto. Não altera o arquivo bruto da conversa.

---

## 1. DEFINIÇÃO DO PRODUTO

**BET, CHEGA.** é uma infraestrutura digital independente de saída das apostas.

A proposta não termina em impedir uma aposta. O produto acompanha a pessoa da percepção do problema à proteção, atravessamento do período de maior vulnerabilidade e reconstrução da vida.

### Jornada principal

**VER → DECIDIR → PROTEGER → ATRAVESSAR → RECONSTRUIR → VIVER**

### Tese central

> **Você não precisa recuperar o dinheiro. Precisa recuperar a sua vida.**

### Diferencial

> **A saída não termina na autoexclusão.**

---

## 2. OBJETIVO DO V1

O V1 deve provar que uma pessoa consegue:

1. reconhecer o próprio padrão;
2. decidir parar ou reduzir o dano;
3. criar barreiras concretas contra acesso e dinheiro;
4. chegar à autoexclusão oficial quando fizer sentido;
5. retornar ao BET, CHEGA. depois da autoexclusão;
6. atravessar as primeiras 24 horas e os primeiros dias;
7. responder a uma recaída sem punição;
8. organizar o impacto financeiro;
9. pedir ajuda a uma pessoa de confiança;
10. acompanhar sinais de reconstrução.

**O V1 não precisa resolver toda a recuperação. Precisa provar o primeiro ciclo de saída.**

---

## 3. PRINCÍPIOS NÃO NEGOCIÁVEIS

- Pessoa antes do negócio.
- Sem julgamento.
- Sem humilhação.
- Sem promessa de cura.
- Sem promessa de recuperar dinheiro.
- Sem transformar sofrimento em mecanismo de venda.
- Sem depender apenas de força de vontade.
- Ação concreta acima de conteúdo passivo.
- Autonomia do usuário.
- Barreiras graduais conforme necessidade.
- Recaída não é punição.
- Não diagnosticar.
- Não substituir profissionais ou serviços de emergência.
- Não pedir senha Gov.br.
- Não recriar a autoexclusão oficial dentro do produto.
- Não afirmar integrações que não existam.
- Privacidade por padrão.

---

## 4. ENTRADAS PRINCIPAIS

A Home deve apresentar poucas decisões claras.

### CTA primário

**QUERO PARAR AGORA**

### Entradas secundárias

- **QUERO ENTENDER MEU PADRÃO**
- **JÁ ME AUTOEXCLUÍ**
- **QUERO AJUDAR ALGUÉM**
- **PRECISO FALAR AGORA**
- **EMERGÊNCIA**

A navegação não deve obrigar o usuário a descobrir primeiro qual é o fluxo correto. O produto deve reconhecer a intenção e encaminhar.

---

## 5. MOTOR DE JORNADA

Cada interação deve seguir, quando aplicável:

**ENTRADA → PERGUNTA → RESPOSTA → PRÓXIMA AÇÃO → DESVIO → AÇÃO → RETORNO**

O sistema deve evitar questionários longos quando já houver informação suficiente para uma intervenção útil.

### Regra adaptativa

Se a pessoa demonstrar risco ou necessidade urgente, o produto interrompe a coleta e prioriza proteção, contato humano ou serviço adequado.

---

## 6. FLUXOS FUNCIONAIS

### F01 — IMPULSO / 02:13

Objetivo: interromper uma decisão impulsiva de apostar novamente.

Sequência:

**IMPULSO → PAUSA → FALAR → IDENTIFICAR → PROTEGER DINHEIRO → BARREIRA → PRÓXIMO PASSO**

Requisitos:
- tela de freio imediato;
- pausa de dois minutos;
- orientação para não transferir dinheiro naquele momento;
- conversa curta;
- identificação do valor que a pessoa pensa em colocar;
- proteção do dinheiro restante;
- encaminhamento para autoexclusão quando indicado;
- retorno à jornada.

A pausa é uma intervenção de interrupção, não uma promessa de tratamento.

---

### F02 — ESPELHO / QUERO ENTENDER

Objetivo: produzir insight sem diagnosticar.

Requisitos:
- perguntas comportamentais adaptativas;
- identificação de perseguição de perdas;
- aumento de valores para obter emoção;
- tentativas anteriores de parar;
- empréstimos, venda de bens ou uso de dinheiro essencial;
- impactos financeiros, profissionais, familiares, relacionais, físicos e emocionais;
- gatilhos;
- espaço mental ocupado pelas apostas;
- pergunta central sobre o que a pessoa sente que perderá ao parar;
- resultado apresentado como sinais de risco, não diagnóstico.

Se uma ferramenta validada for utilizada, sua aplicação deve respeitar licença, termos e metodologia da ferramenta.

---

### F03 — QUERO PARAR

Objetivo: transformar intenção em barreiras concretas.

Sequência:

**DECIDIR → PROTEGER → SAIR → ATRAVESSAR → PRIMEIRAS 24H → ACOMPANHAR**

Camadas:
- acesso;
- dinheiro;
- ambiente;
- pessoas;
- rotina.

Deve existir uma ponte explícita para a autoexclusão oficial do Governo Federal, sem coletar credenciais do Gov.br.

Depois do retorno, o produto continua a jornada em vez de considerar o processo encerrado.

---

### F04 — JÁ ME AUTOEXCLUÍ

Objetivo: cuidar do período pós-autoexclusão.

Requisitos:
- identificar quando ocorreu a autoexclusão;
- identificar estado atual;
- reforçar barreiras;
- mapear gatilhos;
- criar plano SE → ENTÃO;
- descobrir o que a aposta ocupava;
- escolher prioridade de reconstrução;
- plano de sete dias;
- check-in diário;
- tratamento de recaída.

Mensagem central:

> **A autoexclusão é a retirada do campo de batalha. O BET, CHEGA. ajuda a pessoa a atravessar o que vem depois.**

---

### F05 — RECAÍDA

Objetivo:

**INTERROMPER → CONTER → ENTENDER → PROTEGER → RETOMAR**

Requisitos:
- reconhecimento direto da recaída;
- impedir perseguição de perdas;
- identificar o que aconteceu antes da aposta;
- identificar onde a barreira falhou;
- proteger dinheiro restante;
- reconstruir a sequência gatilho → vontade → aposta → perda → tentativa de recuperar;
- identificar primeiro sinal;
- criar novo plano SE → ENTÃO;
- reiniciar proteção sem punição ou humilhação.

Não usar streak como punição. Não tratar recaída como retorno moral ao zero.

---

### F06 — FAMÍLIA

Objetivo:

**ENTENDER → PROTEGER → CONVERSAR → LIMITAR → ENCAMINHAR → ACOMPANHAR**

Requisitos:
- permitir entrada de familiar/amigo;
- orientar proteção financeira e familiar;
- gerar roteiro de conversa;
- ensinar limites sem transformar familiar em fiscal;
- proteger crianças e recursos essenciais quando necessário;
- encaminhar para ajuda;
- reconhecer que o familiar também precisa se proteger.

Princípio:

> **Ajudar não significa se perder junto.**

---

### F07 — DINHEIRO

Objetivo:

**VER → CONTER → PROTEGER → ORGANIZAR → NEGOCIAR → RECONSTRUIR**

Requisitos:
- separar perda de dívida;
- registrar valores sem estimular recuperação por aposta;
- identificar dinheiro disponível;
- proteger despesas essenciais;
- mapear credores e vencimentos;
- priorizar moradia, alimentação, saúde, dependentes e necessidades essenciais;
- apoiar organização e negociação;
- medir dinheiro protegido, não dinheiro recuperado em aposta.

Princípio:

> **A reconstrução começa quando você para de tentar recuperar na aposta.**

---

### F08 — CRISE

Objetivo:

**RECONHECER → REDUZIR RISCO → CONECTAR → ACOMPANHAR**

Requisitos:
- identificar risco imediato;
- priorizar segurança;
- incentivar contato humano;
- direcionar para serviços reais e atuais quando necessário;
- não diagnosticar;
- não prometer segurança;
- não substituir emergência ou profissional;
- registrar apenas o necessário, com consentimento, após estabilização.

Em crise, a prioridade é reduzir dano e conectar a pessoa a ajuda real.

---

## 7. CONVERSA / IA

A conversa é uma camada operacional do produto, não o produto inteiro.

### Pode

- ouvir;
- organizar o que aconteceu;
- identificar intenção e contexto;
- fazer perguntas curtas;
- sugerir uma ação concreta;
- ajudar a formular uma mensagem para pessoa de confiança;
- lembrar barreiras escolhidas;
- encaminhar para fluxos específicos;
- reconhecer necessidade de ajuda humana.

### Não pode

- diagnosticar;
- prometer tratamento;
- substituir profissional;
- inventar serviço, telefone ou integração;
- incentivar recuperação financeira por aposta;
- manter uma pessoa em conversa quando é necessário contato humano ou emergência;
- apresentar certeza sobre risco clínico sem base adequada.

### Regra de design

> **Não é “converse com a IA”. É “você não precisa atravessar isso sozinho”.**

---

## 8. AUTOEXCLUSÃO OFICIAL

O BET, CHEGA. deve atuar como ponte para o mecanismo oficial, e não como substituto.

Arquitetura inicial:

**BET, CHEGA. → AUTOEXCLUSÃO OFICIAL → USUÁRIO RETORNA → JORNADA CONTINUA**

V1 não deve pressupor API pública de consulta de status.

O retorno pode ser declarado pelo usuário:
- concluí;
- não consegui;
- não tenho certeza.

Qualquer integração futura só entra no produto após confirmação técnica, jurídica e institucional.

---

## 9. MODELO DE DADOS V1

Estrutura conceitual mínima:

### users
- id
- created_at
- consent_status
- privacy_preferences

### journey_state
- user_id
- current_flow
- current_step
- status
- updated_at

### assessments
- id
- user_id
- type
- version
- answers
- result_band
- created_at

### barriers
- id
- user_id
- category
- action
- status
- created_at
- completed_at

### triggers
- id
- user_id
- trigger_type
- context
- intensity
- created_at

### checkins
- id
- user_id
- date
- urge_level
- bet_occurred
- protection_status
- hardest_moment
- action_taken

### financial_snapshot
- user_id
- gambling_loss
- debt_total
- essential_cash
- protected_amount
- updated_at

### trusted_contacts
- id
- user_id
- relationship
- consent_to_contact

### relapse_events
- id
- user_id
- occurred_at
- trigger
- thought
- barrier_failure
- action_after

**Princípio de minimização:** coletar somente dados necessários para a jornada e para segurança/funcionalidade. Dados sensíveis exigem tratamento específico, segurança e base legal adequadas antes de produção.

---

## 10. ESTADOS DO USUÁRIO

O sistema deve reconhecer estados de jornada, sem rotular a pessoa de forma permanente.

- explorando;
- reconheceu risco;
- decidiu parar;
- protegendo;
- autoexclusão pendente;
- autoexclusão concluída pelo relato do usuário;
- atravessando;
- reconstruindo;
- recaída;
- crise;
- ajudando alguém.

Um estado pode mudar a qualquer momento.

---

## 11. MÉTRICAS V1

### Métricas de produto

- conclusão da primeira ação de proteção;
- conclusão da ponte para autoexclusão;
- retorno após autoexclusão;
- conclusão do plano de 24h;
- check-ins realizados;
- barreiras criadas;
- barreiras mantidas;
- recaídas registradas e retomadas;
- uso de apoio humano;
- dinheiro protegido informado pelo usuário;
- reconstrução de rotina.

### Métrica norteadora

> **Vida protegida e reconstruída.**

Não usar como métrica principal:
- quantidade apostada;
- quantidade recuperada em apostas;
- tempo dentro do app;
- quantidade de mensagens como indicador isolado de sucesso.

---

## 12. PRIVACIDADE E SEGURANÇA

Antes de produção:

- definir claramente quais dados são coletados;
- obter consentimento quando aplicável;
- definir retenção e exclusão;
- separar dados de identificação de dados de jornada quando possível;
- limitar acesso interno;
- proteger dados em trânsito e em repouso;
- registrar eventos sem armazenar conteúdo desnecessário;
- preparar política de privacidade e termos;
- revisar LGPD e tratamento de dados sensíveis com orientação jurídica especializada.

A frase “100% confidencial” não deve ser usada sem garantia técnica e jurídica real.

---

## 13. MODELO DE NEGÓCIO — HIPÓTESES, NÃO DECISÕES

O produto deve nascer independente de operadores de apostas.

Hipóteses a validar:

- patrocínio institucional responsável;
- empresas alinhadas à prevenção e saúde financeira;
- organizações sociais;
- parcerias com profissionais e serviços;
- plano premium opcional para funcionalidades adicionais, sem bloquear ajuda essencial;
- financiamento institucional;
- projetos públicos ou privados de impacto;
- relatórios agregados e anonimizados, quando juridicamente permitidos e sem exploração da vulnerabilidade individual.

### Regra

**Nenhum modelo comercial pode criar incentivo para aumentar dependência, retenção por sofrimento ou exposição a apostas.**

---

## 14. HOME V1

Direção visual:
- escura;
- sóbria;
- silenciosa;
- sem estética de cassino;
- sem estética hospitalar;
- mobile-first.

Paleta conceitual:
- carbono;
- grafite;
- verde-lima como sinal de ação.

Hero:

> **Você não precisa recuperar o dinheiro.**
> **PRECISA RECUPERAR A SUA VIDA.**

CTA:

**QUERO PARAR AGORA**

Apoio:

**Sem julgamento. Privacidade em primeiro lugar.**

Entrada secundária:

**Não é você quem aposta? QUERO AJUDAR ALGUÉM QUE AMO →**

---

## 15. ARQUITETURA TÉCNICA V1

Stack de desenvolvimento já adotada no projeto:

- GitHub para código e documentação;
- Supabase para dados/autenticação quando aplicável;
- Vercel para aplicação/deploy.

Antes de implementar telas, definir:

1. estrutura de rotas;
2. modelo de dados;
3. autenticação e modo anônimo;
4. consentimento;
5. persistência da jornada;
6. máquina de estados;
7. camada de IA;
8. logs e observabilidade;
9. tratamento de crise;
10. proteção de dados.

Nenhuma tela deve ser codificada apenas porque “parece boa”. Ela deve corresponder a uma etapa desta especificação.

---

## 16. ORDEM DE IMPLEMENTAÇÃO

### Fase 1 — Fundação
- estrutura do projeto;
- banco;
- autenticação/identidade;
- consentimento;
- estado da jornada;
- componentes visuais base.

### Fase 2 — Primeira saída
- Home;
- F01 Impulso;
- F03 Quero parar;
- ponte para autoexclusão;
- retorno pós-autoexclusão.

### Fase 3 — Continuidade
- F04 Já me autoexcluí;
- check-in;
- barreiras;
- plano 24h;
- plano 7 dias.

### Fase 4 — Recuperação de dano
- F05 Recaída;
- F07 Dinheiro;
- F06 Família.

### Fase 5 — Segurança
- F08 Crise;
- encaminhamentos reais;
- regras de escalonamento;
- auditoria de segurança.

### Fase 6 — Inteligência
- conversa contextual;
- personalização;
- recomendações adaptativas;
- métricas de jornada.

---

## 17. CRITÉRIO DE PRONTO PARA O V1

O V1 só deve ser considerado pronto quando uma pessoa puder entrar sem conhecimento prévio e completar, de ponta a ponta:

**RECONHECER → DECIDIR → PROTEGER → AUTOEXCLUIR-SE → RETORNAR → CRIAR PLANO → ACOMPANHAR**

E, em paralelo, existir uma rota clara para:

- impulso imediato;
- recaída;
- família;
- dinheiro;
- crise.

---

## 18. O QUE NÃO ENTRA NO V1

- marketplace de apostas;
- publicidade de casas de apostas;
- qualquer incentivo a apostar;
- promessa de recuperar perdas;
- ranking de usuários;
- competição baseada em abstinência;
- punição por recaída;
- diagnóstico clínico automático;
- bloqueio bancário fictício;
- consulta fictícia à autoexclusão oficial;
- “IA terapeuta”;
- coleta excessiva de dados;
- funcionalidades construídas sem hipótese de impacto.

---

## 19. DEFINIÇÃO FINAL

> **BET, CHEGA. é uma infraestrutura digital independente de saída das apostas. Ele ajuda a pessoa a VER o que está acontecendo, DECIDIR sair, PROTEGER o acesso e o dinheiro, ATRAVESSAR os primeiros dias, RECONSTRUIR o que foi afetado e voltar a VIVER sem depender da aposta.**

### Frase de produto

> **A autoexclusão fecha a porta. O BET, CHEGA. ajuda você a descobrir como viver do outro lado dela.**

### Princípio

> **Pessoa antes do negócio.**

### Métrica

> **Vida protegida e reconstruída.**

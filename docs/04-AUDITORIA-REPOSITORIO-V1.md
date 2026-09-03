# BET, CHEGA. — AUDITORIA DO REPOSITÓRIO V1

**Data:** 03/09/2026  
**Branch auditada:** `main`  
**Status:** diagnóstico inicial antes da implementação  

---

## 1. VEREDITO EXECUTIVO

O repositório **não está vazio** e já possui uma landing page funcional em HTML/CSS/JavaScript puro, além da documentação de produto e arquitetura criada antes desta auditoria.

O código atual, porém, representa apenas um **protótipo inicial do fluxo noturno/impulso**. Ele ainda não representa a arquitetura V1 que foi definida.

### Diagnóstico

**Não devemos jogar esse código fora.**

Devemos tratá-lo como **protótipo visual/experimental**, preservar o que funciona e reconstruir a jornada por cima dele de forma progressiva.

---

## 2. ESTADO REAL ENCONTRADO

Arquivos identificados na raiz:

- `.gitignore`
- `README.md`
- `conversa-original.txt`
- `image.png`
- `index.html`
- `docs/00-HISTORIA-BET-CHEGA.md`
- `docs/02-ESPECIFICACAO-PRODUTO-V1.md`
- `docs/03-ARQUITETURA-TECNICA-V1.md`

O repositório está público, usa `main` como branch padrão e, neste momento, ainda não apresenta uma estrutura Next.js/Supabase implementada no código visível da raiz.

**Conclusão:** a arquitetura técnica documentada é mais avançada do que a implementação atual.

---

## 3. O QUE JÁ ESTÁ BOM NO `index.html`

### Identidade visual

- Fundo carbono escuro.
- Grafite como superfície.
- Verde-lima como cor de ação.
- Tipografia Inter + Plus Jakarta Sans.
- Identidade visual coerente com a proposta sóbria.
- Logo textual `BET, CHEGA.`.

### Posicionamento

O hero já contém a tese central:

> Você não precisa recuperar o dinheiro. Precisa recuperar a sua vida.

Essa frase deve ser preservada.

### Direção de entrada

O botão principal leva a pessoa para uma pausa imediata, o que está alinhado com a ideia de interromper o impulso antes de tentar resolver a vida inteira.

### Recursos já existentes

O protótipo possui:

- tela inicial;
- pausa respiratória de 30 segundos;
- pergunta sobre o que aconteceu;
- tela de proteção noturna;
- modal de crise;
- modal para familiares;
- modal de fechamento/vitória;
- saída rápida por `Esc`;
- armazenamento de um tipo de incidente em `sessionStorage`;
- fallback de imagem.

Isso mostra que já existe uma pequena máquina de estados funcionando no navegador.

---

## 4. PROBLEMAS CRÍTICOS ENCONTRADOS

### 4.1. O produto está muito menor que a arquitetura

A arquitetura V1 define uma jornada muito maior:

`VER → DECIDIR → PROTEGER → ATRAVESSAR → RECONSTRUIR → VIVER`

O código atual praticamente cobre apenas:

`ENTRADA → PAUSA → INCIDENTE → PROTEÇÃO NOTURNA`

Ainda faltam, entre outros:

- Espelho completo;
- Quero Parar;
- Já me Autoexcluí;
- Recaída;
- Família como jornada própria;
- Dinheiro;
- Crise como fluxo estruturado;
- jornada persistente;
- check-ins;
- barreiras;
- gatilhos;
- plano de 24 horas;
- reconstrução;
- acompanhamento;
- integração estruturada com Supabase;
- camada de IA/orquestração.

### 4.2. Há afirmações que precisam sair do produto

O texto atual diz:

> “Seu cérebro ainda está sob efeito da adrenalina da perda.”

Isso é uma generalização fisiológica apresentada como fato e não é necessária para a intervenção.

Também diz:

> “Para garantir que nada saia da sua conta esta madrugada”

Nenhuma página pode garantir isso apenas sugerindo ações ao usuário.

**Correção conceitual:** trocar garantia por orientação concreta e verificável.

### 4.3. Limite PIX fixo de R$ 10

O código manda o usuário:

> “reduza o limite das 20h às 06h para R$ 10.”

Isso é específico demais, pode não ser aplicável a todos os bancos e transforma uma sugestão em uma regra universal.

**Direção V1:**

> “Se o seu banco permitir, reduza temporariamente seu limite de transferência noturna para um valor que proteja o dinheiro essencial.”

A interface pode ensinar o usuário a procurar o recurso no próprio banco, sem fingir integração bancária.

### 4.4. O modal familiar contém uma formulação inadequada

O texto atual diz:

> “A dor precisa ensinar a parar.”

Essa frase entra em conflito direto com os princípios do produto:

- não humilhar;
- não punir;
- não usar sofrimento como mecanismo;
- proteger a pessoa e a família.

**Correção:** consequência financeira e limite podem ser explicados sem transformar sofrimento em método.

### 4.5. O produto promete anonimato de forma absoluta

A home diz:

> “100% anônimo. Sem cadastro. Não vamos pedir seu nome.”

Enquanto o produto ainda não possui arquitetura de dados implementada, essa promessa deve ser tratada como requisito a ser garantido tecnicamente, e não apenas como copy.

**Direção:** enquanto a arquitetura não estiver fechada, usar uma formulação que não prometa mais do que o sistema consegue garantir.

### 4.6. “Vitória” não deve virar gamificação punitiva

O modal usa:

> “Primeira vitória garantida.”

A ideia de reconhecer uma ação positiva pode permanecer, mas precisamos evitar que o produto transforme abstinência em placar moral ou faça recaída parecer derrota.

A arquitetura já determina:

> recaída não reinicia a pessoa do zero.

Portanto, a linguagem precisa seguir esse princípio.

### 4.7. `quickExit()` depende do Google

A saída rápida atualmente faz:

`window.location.replace("https://www.google.com")`

Isso é funcional como protótipo, mas não é uma solução de segurança universal.

Além disso, sair para um site externo não significa necessariamente que o risco desapareceu.

**Direção V1:** saída rápida deve minimizar exposição e deixar claro o que ela faz. Em dispositivos suportados, pode tentar sair da experiência; não deve ser apresentada como proteção garantida.

---

## 5. PROBLEMAS DE ARQUITETURA

### 5.1. HTML monolítico

Toda a experiência está concentrada em um único `index.html`.

Isso funciona para protótipo, mas não escala para:

- autenticação;
- persistência;
- jornada adaptativa;
- Supabase;
- IA;
- analytics;
- múltiplas rotas;
- controle de estados;
- segurança;
- testes.

### 5.2. Estado apenas no navegador

Hoje há somente armazenamento pontual via `sessionStorage`.

Não existe ainda uma entidade persistente para:

- perfil;
- estado da jornada;
- check-ins;
- barreiras;
- gatilhos;
- eventos de recaída;
- snapshots financeiros;
- contatos de confiança.

### 5.3. Não existe backend de produto visível

Não foram identificados no repositório auditado arquivos de aplicação Supabase, migrations, schema SQL ou integração persistente.

Portanto, **não devemos fingir que o produto já possui banco de dados funcional**.

### 5.4. Não existe camada de IA

Não há no código atual um orquestrador no padrão:

`INTERFACE → ORCHESTRATOR → SAFETY RULES → MODEL → VALIDATION → ACTION`

A IA deve entrar depois que os estados e ações determinísticas estiverem estruturados.

---

## 6. MATRIZ: ARQUITETURA × CÓDIGO ATUAL

| Área | Arquitetura V1 | Estado atual | Ação |
|---|---|---|---|
| Home | Sim | Parcial | Preservar e refinar |
| Impulso | Sim | Parcial | Reconstruir |
| Espelho | Sim | Muito parcial | Implementar |
| Quero parar | Sim | Não | Implementar |
| Autoexclusão | Sim | Não | Implementar |
| Pós-autoexclusão | Sim | Não | Implementar |
| Recaída | Sim | Não | Implementar |
| Família | Sim | Modal simples | Transformar em jornada |
| Dinheiro | Sim | Não | Implementar |
| Crise | Sim | Modal simples | Transformar em fluxo seguro |
| Check-in | Sim | Não | Implementar |
| Jornada persistente | Sim | Não | Implementar |
| Supabase | Sim | Não visível | Implementar |
| IA | Sim | Não | Implementar depois do motor |
| Analytics | Sim | Não | Implementar com privacidade |
| Segurança/RLS | Sim | Não | Implementar junto do banco |

---

## 7. O QUE PRESERVAR

Não devemos destruir:

1. identidade visual carbono/grafite/lima;
2. tipografia;
3. tese principal;
4. entrada sem julgamento;
5. ideia de pausa imediata;
6. imagem principal, se continuar adequada aos testes visuais;
7. conceito de saída rápida;
8. acesso evidente a crise;
9. acesso a familiares;
10. sensação de experiência silenciosa e sóbria.

---

## 8. O QUE REFAZER

### Prioridade P0 — segurança e coerência

- remover promessas absolutas que o sistema não consegue garantir;
- revisar textos clínicos ou fisiológicos desnecessários;
- revisar proteção financeira para não simular integração bancária;
- revisar linguagem familiar;
- estruturar crise corretamente;
- revisar saída rápida;
- corrigir nomenclatura para refletir a jornada oficial.

### Prioridade P1 — motor da jornada

Implementar o primeiro núcleo:

`VER → DECIDIR → PROTEGER`

com estados reais e transições determinísticas.

### Prioridade P2 — persistência

Criar Supabase e as tabelas definidas na arquitetura.

### Prioridade P3 — jornadas complementares

- atravessar;
- reconstruir;
- recaída;
- dinheiro;
- família;
- pós-autoexclusão;
- check-ins.

### Prioridade P4 — IA

Somente depois que o motor determinístico estiver funcionando.

---

## 9. PRIMEIRO CICLO DE IMPLEMENTAÇÃO RECOMENDADO

Não vamos tentar construir o produto inteiro de uma vez.

### Sprint 1

Transformar o protótipo atual em uma experiência sólida de:

`HOME → IMPULSO → PAUSA → IDENTIFICAÇÃO → PROTEÇÃO`

### Sprint 2

Adicionar:

`ESPELHO → DECISÃO → QUERO PARAR`

### Sprint 3

Adicionar:

`AUTOEXCLUSÃO OFICIAL → RETORNO → PRIMEIRAS 24H`

### Sprint 4

Adicionar:

`ATRAVESSAR → GATILHOS → BARREIRAS → CHECK-IN`

### Sprint 5

Adicionar:

`RECAÍDA → DINHEIRO → FAMÍLIA → CRISE`

### Sprint 6

Supabase, autenticação opcional, persistência, RLS, analytics e IA conforme os requisitos de segurança estiverem definidos.

---

## 10. REGRA DE DESENVOLVIMENTO

A partir desta auditoria:

> **Nenhuma tela entra porque é bonita.**
>
> **Nenhuma função entra porque é tecnicamente interessante.**
>
> **Cada elemento precisa ajudar a pessoa a VER, DECIDIR, PROTEGER, ATRAVESSAR, RECONSTRUIR ou VIVER.**

E existe uma segunda regra:

> **Não destruir o que funciona para construir o que ainda não existe.**

---

## 11. DECISÃO SOBRE O CÓDIGO ATUAL

**Status: PRESERVAR COMO BASE / RECONSTRUIR PROGRESSIVAMENTE.**

Não é hora de apagar o `index.html`.

É hora de:

1. corrigir os riscos de copy;
2. separar componentes e estados;
3. criar a estrutura de aplicação;
4. implementar a jornada V1;
5. conectar persistência somente quando o modelo de dados estiver pronto;
6. testar cada transição antes de adicionar outra.

---

## 12. PRÓXIMO PASSO TÉCNICO

O próximo trabalho é **FASE 1 — RECONSTRUÇÃO DO NÚCLEO DE ENTRADA**.

Objetivo:

`HOME → PAUSA → O QUE ACONTECEU → PROTEGER → PRÓXIMO PASSO`

Sem ainda tentar implementar todo o Supabase ou IA.

Primeiro fazemos o coração funcionar.

Depois conectamos o restante.

**FIM DA AUDITORIA V1**

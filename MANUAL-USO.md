# Manual de Uso — Helpdesk

Este manual explica como usar o sistema de chamados Helpdesk. Serve tanto para **usuário comum** (abrir e acompanhar chamados) quanto para **administrador** (ver métricas, gerenciar chamados e usuários). Linguagem direta e passos objetivos.

---

## Parte 1 — Usuário comum

### Entrar no sistema

- Na página inicial do sistema, clique em **Login**.
- Faça login com suas credenciais. Depois de entrar, você é levado automaticamente para o **Início** (Dashboard).

### Menu (o que você vê no topo)

- **Inicio** — lista dos seus chamados.
- **Criar Chamado** — abrir um novo ticket.
- **Perfil** — editar seus dados da conta.
- **Manual do Usuário** — link para este manual (versão na tela).

### Início (Dashboard)

- Mostra a **lista dos seus chamados**.
- Você pode filtrar por status:
  - **Total** — todos.
  - **Aberto** — ainda não iniciado.
  - **Em andamento** — sendo atendido.
  - **Finalizado** — concluído.
- Clique em um chamado para ver os detalhes e os comentários.

### Criar chamado (passo a passo)

**Onde:** No menu, clique em **Criar Chamado**.

**Campos do formulário:**

1. **Categoria** (obrigatório)  
   Escolha uma opção:
   - Sistema  
   - Hardware  
   - Software  
   - Rede  
   - Segurança  
   - Outro  

2. **Título** (obrigatório)  
   - Até 100 caracteres.  
   - Seja claro e direto (ex.: "Impressora da recepção não imprime").  

3. **Descrição** (obrigatório)  
   - Entre 10 e 1000 caracteres.  
   - Descreva o problema ou a solicitação com o necessário para o atendimento entender.  

4. **Prioridade** (obrigatório)  
   - **Urgente** — use quando o problema **impede o atendimento agora** ou coloca alguém em risco.  
     Exemplos: sistema crítico fora do ar (prontuário, agendamento), equipamento essencial parado (recepção, internet), bloqueio total de usuário essencial, fila parada.  
     **Resumo:** Se o atendimento para por causa disso → marque **Urgente**.  
   - **Normal** — use quando o atendimento **continua funcionando**.  
     Exemplos: instalar software, criar usuário, trocar senha (com alternativa), impressora auxiliar com problema, dúvida de uso, melhorias.  
     **Resumo:** Se tudo segue funcionando → marque **Normal**.  

5. **Anexos** (opcional)  
   - Até **5 imagens**.  
   - Formatos aceitos: **JPG** ou **PNG**.  
   - Cada arquivo: no máximo **1 MB**.  

Depois de preencher, clique em **Criar ticket**. O sistema valida os dados. Se estiver tudo certo, aparece uma mensagem de sucesso e você é levado para a página do chamado criado. Se faltar algo ou estiver fora do limite, a tela mostra o que corrigir.

### Ver e acompanhar chamados

- No **Início** você vê todos os seus chamados (e pode filtrar por status).
- Clique em um chamado para abrir o **detalhe**.

### Detalhe do chamado

- Mostra **todos os dados** do ticket (título, descrição, categoria, prioridade, status, anexos).
- Lista os **comentários** já existentes (quem escreveu e quando).
- Tem uma **área para escrever um novo comentário**. Use para dar mais informações ou acompanhar a resposta do suporte.

### Perfil

- No menu, clique em **Perfil**.
- Você pode editar os dados da sua conta (nome, e-mail etc.) na tela que abrir.

---

## Parte 2 — Administrador

O **administrador** é quem tem permissão especial (role de admin) no sistema. Você vê o mesmo que o usuário comum e ainda o **menu de admin** e as páginas de gestão.

### Menu admin (o que só o admin vê)

- **Dashboard** — visão geral com gráficos e números.
- **Chamados** — todos os chamados do sistema.
- **Usuarios** — listagem e edição de usuários.
- **Manual do Admin** — link para o manual do admin (na tela).

### Dashboard (admin)

- **Rota:** `/admin/dashboard` (ou clique em **Dashboard** no menu).
- Mostra:
  - Quantidade de chamados por **status** (Abertos, Em andamento, Finalizados).
  - Distribuição por **categoria** e por **prioridade** (Normal / Urgente).
  - **Chamados abertos na semana** (resumo).
- Use essa tela para ter uma visão rápida da situação dos chamados.

### Chamados (admin)

- **Rota:** `/admin/tickets` (menu **Chamados**).
- Lista **todos os chamados** do sistema (não só os seus).
- Você pode **filtrar** e **abrir o detalhe** de qualquer chamado.

### Detalhe do chamado (admin) — Ações

Na página de detalhe de um chamado, o botão **Ações** (menu com três pontinhos) oferece:

- **Ver usuário** — abre a ficha do usuário que criou o chamado.
- **Mudar status** — altera o status do ticket:
  - **Em aberto** — chamado ainda não iniciado.
  - **Em andamento** — alguém está atendendo.
  - **Finalizado** — chamado concluído.

Escolha o status que reflete a realidade do atendimento. A alteração é salva na hora e o usuário pode ver a atualização no detalhe do chamado.

### Usuários (admin)

- **Rota:** `/admin/usuarios` (menu **Usuarios**).
- Lista os usuários do sistema.
- Você pode abrir cada usuário para **ver e editar** os dados (conforme disponível na tela).

### Proteção de acesso

- Só quem tem **permissão de administrador** acessa as páginas que começam com `/admin`.
- Se um usuário comum tentar abrir qualquer link de admin, o sistema redireciona para uma página de “não encontrado”. Nada é alterado.

---

## Em resumo

**Para abrir um chamado (usuário):**  
Criar Chamado → escolher **Categoria** → preencher **Título** e **Descrição** → escolher **Prioridade** (Urgente ou Normal) → anexar imagens se quiser (até 5, JPG/PNG, 1 MB cada) → **Criar ticket**.

**Para acompanhar:**  
Início → filtrar por status se quiser → clicar no chamado → ver detalhes e comentários → adicionar comentário se precisar.

**Para o admin:**  
Dashboard para números e gráficos; Chamados para listar tudo e mudar status (Ações → Mudar status); Usuarios para gerenciar usuários.

**Prioridade em uma frase:**  
Impede o atendimento agora? → **Urgente**. O resto → **Normal**.

import { prisma } from '@/lib/prisma'

export default async function main() {
    console.log('Iniciando seed...')

    const validCategories = [
        'SISTEMA',
        'HARDWARE',
        'SOFTWARE',
        'REDE',
        'SEGURANÇA',
        'OUTRO',
    ]

    const validPriorities = [
        'NORMAL',
        'URGENT',
    ]

    const validStatuses = [
        'OPEN',
        'IN_PROGRESS',
        'CLOSED',
    ]


    const userMatheusAdmin = await prisma.user.upsert({
        where: { clerkUserId: 'user_39JnGLH6vnxXc9y6nsk9hPLWJTv' },
        update: {},
        create: {
            clerkUserId: 'user_39JnGLH6vnxXc9y6nsk9hPLWJTv',
            name: 'Matheus Admin',
            email: 'matheus@admin.com',
            role: 'ADMIN',
        },
    })
    console.log('Usuário Matheus Admin criado ou já existente')

    const userJoaoAdmin = await prisma.user.upsert({
        where: { clerkUserId: 'user_39XyFWdos84WOmtrf2nzZDOTMJS' },
        update: {},
        create: {
            clerkUserId: 'user_39XyFWdos84WOmtrf2nzZDOTMJS',
            name: 'João Admin',
            email: 'joao@admin.com',
            role: 'ADMIN',
        },
    })
    console.log('Usuário João Admin criado ou já existente')

    const commonUser = await prisma.user.upsert({
        where: { clerkUserId: 'user_39S5snvPcayWkrqCdKhYETa0Esg' },
        update: {},
        create: {
            clerkUserId: 'user_39S5snvPcayWkrqCdKhYETa0Esg',
            name: 'Usuário Comum',
            email: 'usuario@email.com',
            role: 'USER',
        },
    })
    console.log('Usuário Common User criado ou já existente')

    // create 20 tickets for the common user (clínica médica)
    type CommentAuthor = 'user' | 'admin1' | 'admin2'
    const ticketsWithComments: Array<{
        ticket: {
            title: string
            description: string
            status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED'
            priority: 'NORMAL' | 'URGENT'
            category: string
            assignedToId?: string
        }
        comments: Array<{ author: CommentAuthor; content: string }>
    }> = [
            {
                ticket: {
                    title: 'Não consigo acessar pasta compartilhada no novo servidor',
                    description: 'Após a migração para o novo servidor de arquivos, não consigo abrir a pasta compartilhada do setor de recepção. Erro de acesso negado.',
                    status: 'IN_PROGRESS',
                    priority: 'NORMAL',
                    category: 'REDE',
                    assignedToId: userMatheusAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'A pasta era \\\\servidor-antigo\\recepcao. Agora não aparece no explorador.' },
                    { author: 'admin1', content: 'No novo servidor o caminho é \\\\srv-arquivos01\\recepcao. Verificando se seu usuário do AD está no grupo correto.' },
                    { author: 'user', content: 'Tentei o novo caminho e ainda dá acesso negado.' },
                    { author: 'admin1', content: 'Adicionei seu usuário ao grupo de segurança da pasta. Faça logout e login no Windows e teste de novo.' },
                ],
            },
            {
                ticket: {
                    title: 'Senha do AD bloqueada no primeiro acesso',
                    description: 'Recebi o usuário do novo Active Directory mas na primeira tentativa de login a senha foi bloqueada. Não consegui alterar.',
                    status: 'CLOSED',
                    priority: 'URGENT',
                    category: 'SEGURANÇA',
                    assignedToId: userJoaoAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Preciso acessar o sistema para o turno da tarde. A senha que me passaram não funciona.' },
                    { author: 'admin2', content: 'Desbloqueamos sua conta no AD. Use a senha temporária que enviamos por e-mail e altere no primeiro login.' },
                    { author: 'user', content: 'Consegui logar e já alterei a senha. Obrigado!' },
                    { author: 'admin2', content: 'Ótimo. Em caso de novo bloqueio, avise pelo Helpdesk.' },
                ],
            },
            {
                ticket: {
                    title: 'Impressora da recepção não imprime etiquetas de pacientes',
                    description: 'A impressora que imprime as etiquetas de identificação dos pacientes parou. Fila de espera na recepção.',
                    status: 'CLOSED',
                    priority: 'URGENT',
                    category: 'HARDWARE',
                    assignedToId: userMatheusAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Começou a falhar às 8h. Já reiniciei a impressora e o serviço de impressão no PC.' },
                    { author: 'admin1', content: 'Verificando driver e conexão. Qual o modelo da impressora?' },
                    { author: 'user', content: 'É a Zebra ZD420 da recepção 1.' },
                    { author: 'admin1', content: 'Driver reinstalado e fila limpa. Pode testar uma etiqueta agora.' },
                    { author: 'user', content: 'Imprimiu. Tudo certo, obrigado!' },
                ],
            },
            {
                ticket: {
                    title: 'Dúvida sobre como reabrir um chamado no novo Helpdesk',
                    description: 'Um chamado que eu tinha foi fechado mas o problema voltou. Não encontro opção para reabrir no novo Helpdesk.',
                    status: 'CLOSED',
                    priority: 'NORMAL',
                    category: 'OUTRO',
                    assignedToId: userJoaoAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'No sistema antigo tinha botão "Reabrir". Aqui não acho.' },
                    { author: 'admin2', content: 'No sistema atual não há reabertura automática. Abra um novo chamado e na descrição mencione o número do chamado anterior para referência.' },
                    { author: 'user', content: 'Entendi. Já abri um novo chamado referenciando o antigo.' },
                ],
            },
            {
                ticket: {
                    title: 'WiFi caindo nos consultórios do 2º andar',
                    description: 'A rede WiFi fica instável nos consultórios do segundo andar. Médicos reclamam que perde conexão ao acessar prontuário.',
                    status: 'OPEN',
                    priority: 'NORMAL',
                    category: 'REDE',
                },
                comments: [
                    { author: 'user', content: 'Principalmente nos consultórios 5, 6 e 7. Às vezes demora para reconectar.' },
                    { author: 'admin1', content: 'Vamos verificar os pontos de acesso do 2º andar e o canal de frequência. Pode anotar em qual horário piora?' },
                    { author: 'user', content: 'Piora no horário de pico, entre 10h e 12h.' },
                ],
            },
            {
                ticket: {
                    title: 'Sistema de prontuário lento ao abrir laudos',
                    description: 'O software de prontuário eletrônico está muito lento ao abrir laudos e exames. Atrapalha a consulta.',
                    status: 'IN_PROGRESS',
                    priority: 'NORMAL',
                    category: 'SOFTWARE',
                    assignedToId: userJoaoAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Demora mais de 30 segundos para carregar um laudo de laboratório. Paciente fica esperando.' },
                    { author: 'admin2', content: 'Verificando se é lentidão do servidor de aplicação ou da rede. Qual consultório e horário?' },
                    { author: 'user', content: 'Consultório 3, acontece o dia todo.' },
                    { author: 'admin2', content: 'Identificamos alta utilização do servidor. Ajustamos prioridade do serviço de laudos. Teste novamente.' },
                ],
            },
            {
                ticket: {
                    title: 'Drive de rede não aparece após troca de servidor',
                    description: 'Meu computador não mostra mais o drive mapeado (Z:) após a migração para o novo servidor de arquivos.',
                    status: 'CLOSED',
                    priority: 'NORMAL',
                    category: 'REDE',
                    assignedToId: userMatheusAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Antes era Z: apontando para o servidor antigo. Agora o Z: não aparece.' },
                    { author: 'admin1', content: 'O mapeamento antigo foi removido. Enviamos script por e-mail para mapear o novo caminho. Executou?' },
                    { author: 'user', content: 'Executei mas pediu senha. Usei a do Windows (AD).' },
                    { author: 'admin1', content: 'Se pedir de novo, marque "Lembrar credenciais". O drive Z: deve apontar para \\\\srv-arquivos01\\usuarios\\seu_usuario.' },
                    { author: 'user', content: 'Agora apareceu. Obrigado!' },
                ],
            },
            {
                ticket: {
                    title: 'Documentos não aparecem após login no AD',
                    description: 'Depois que passamos a usar o Active Directory, minha pasta Documentos está vazia ao logar. Os arquivos sumiram.',
                    status: 'IN_PROGRESS',
                    priority: 'URGENT',
                    category: 'SISTEMA',
                    assignedToId: userJoaoAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Era no perfil antigo (PC local). Agora com AD não vejo meus documentos.' },
                    { author: 'admin2', content: 'Com o AD usamos pasta redirecionada no servidor. Seus arquivos antigos podem estar no perfil local do PC. Verificando migração.' },
                    { author: 'user', content: 'Encontrei uma pasta "Antigo" no meu PC com uns arquivos. São esses?' },
                    { author: 'admin2', content: 'Sim. Vamos agendar horário para copiar esses arquivos para sua pasta redirecionada no servidor para não perder nada.' },
                ],
            },
            {
                ticket: {
                    title: 'Confirmar se laudos antigos estão no backup do novo servidor',
                    description: 'Preciso saber se os laudos e exames antigos (antes da migração) estão incluídos no backup do novo servidor.',
                    status: 'CLOSED',
                    priority: 'NORMAL',
                    category: 'OUTRO',
                    assignedToId: userJoaoAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Queria ter certeza antes de desligar o servidor antigo. Arquivos de 2023 e início de 2024.' },
                    { author: 'admin2', content: 'Sim. O backup do novo servidor inclui o volume onde migramos todos os laudos antigos. Retenção de 90 dias.' },
                    { author: 'user', content: 'E se precisarmos de um arquivo específico de 2023?' },
                    { author: 'admin2', content: 'Podemos restaurar por arquivo ou pasta. Basta abrir chamado informando o caminho ou nome do exame.' },
                    { author: 'user', content: 'Perfeito, obrigado pela explicação!' },
                ],
            },
            {
                ticket: {
                    title: 'Laudos de imagem demoram para carregar',
                    description: 'O sistema PACS está muito lento para abrir laudos e imagens de radiologia. Atrapalha a análise no consultório.',
                    status: 'OPEN',
                    priority: 'NORMAL',
                    category: 'SOFTWARE',
                },
                comments: [
                    { author: 'user', content: 'Principalmente tomografias e ressonâncias. Leva mais de 1 minuto às vezes.' },
                    { author: 'admin1', content: 'Pode informar em qual estação de trabalho e se é cabo ou WiFi?' },
                    { author: 'user', content: 'Estação do consultório 4, cabo de rede.' },
                    { author: 'admin1', content: 'Vamos checar desempenho do servidor PACS e da rede. Em breve retornamos.' },
                ],
            },
            {
                ticket: {
                    title: 'Antivírus bloqueando programa de agendamento',
                    description: 'O antivírus está bloqueando o executável do sistema de agendamento de consultas. Mensagem de ameaça detectada.',
                    status: 'CLOSED',
                    priority: 'URGENT',
                    category: 'SEGURANÇA',
                    assignedToId: userMatheusAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Não conseguimos abrir o AgendaClínica. O antivírus coloca em quarentena.' },
                    { author: 'admin1', content: 'Adicionamos exceção para o programa no antivírus corporativo. Reinicie o PC e tente abrir novamente.' },
                    { author: 'user', content: 'Ainda bloqueou após reiniciar.' },
                    { author: 'admin1', content: 'A exceção foi aplicada no servidor. Aguarde 5 minutos para a política atualizar nos PCs e teste de novo.' },
                    { author: 'user', content: 'Agora abriu normalmente. Obrigado!' },
                ],
            },
            {
                ticket: {
                    title: 'Recepcionista sem acesso ao módulo de agendamento',
                    description: 'Nova recepcionista não consegue acessar o módulo de agendamento no sistema. Diz que não tem permissão.',
                    status: 'CLOSED',
                    priority: 'URGENT',
                    category: 'SEGURANÇA',
                    assignedToId: userJoaoAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Ela já tem usuário no AD e consegue logar no Windows, mas no sistema de gestão não abre agendamento.' },
                    { author: 'admin2', content: 'Verificando perfil dela no sistema. O grupo do AD "Recepcao" deve ter acesso ao módulo.' },
                    { author: 'admin2', content: 'Ela estava só no grupo "Usuarios". Incluímos no grupo "Recepcao". Peça para ela fazer logout e login no sistema.' },
                    { author: 'user', content: 'Conseguiu acessar. Resolvido!' },
                ],
            },
            {
                ticket: {
                    title: 'Teclado do consultório 3 com teclas travando',
                    description: 'O teclado do consultório 3 está com teclas repetindo ou não respondendo. Dificulta digitar o prontuário.',
                    status: 'IN_PROGRESS',
                    priority: 'NORMAL',
                    category: 'HARDWARE',
                    assignedToId: userMatheusAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Principalmente a tecla Enter e algumas letras. Já testei em outro USB e persiste.' },
                    { author: 'admin1', content: 'Parece defeito no hardware. Vamos enviar um teclado reserva para o consultório 3. Chega amanhã.' },
                    { author: 'user', content: 'Enquanto isso posso usar o teclado do consultório 4 que está vago?' },
                    { author: 'admin1', content: 'Pode sim. Quando chegar o novo, devolva o emprestado.' },
                ],
            },
            {
                ticket: {
                    title: 'PC da administração reiniciando sozinho',
                    description: 'O computador da sala da administração reinicia sozinho várias vezes ao dia. Já perdemos trabalho não salvo.',
                    status: 'OPEN',
                    priority: 'NORMAL',
                    category: 'SISTEMA',
                },
                comments: [
                    { author: 'user', content: 'Às vezes dá tela azul antes de reiniciar. Não sei o que está causando.' },
                    { author: 'admin2', content: 'Vamos agendar análise. Pode ser atualização do Windows, driver ou hardware. Anote o horário da próxima vez que acontecer.' },
                    { author: 'user', content: 'Aconteceu de novo às 14h30. A mensagem da tela azul tinha um código que começava com 0x000000.' },
                ],
            },
            {
                ticket: {
                    title: 'Não consigo abrir anexos de laudos por e-mail',
                    description: 'Quando recebo laudos por e-mail (PDF ou imagens), o sistema bloqueia e não consigo abrir. Preciso para consultas.',
                    status: 'CLOSED',
                    priority: 'NORMAL',
                    category: 'SEGURANÇA',
                    assignedToId: userJoaoAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'A mensagem diz que o anexo foi bloqueado por política de segurança. Acontece no Outlook.' },
                    { author: 'admin2', content: 'A política de anexos estava restritiva. Ajustamos para permitir PDF e imagens médicas no seu perfil. Teste recebendo um e-mail de novo.' },
                    { author: 'user', content: 'Ainda bloqueou. É do mesmo laboratório de sempre.' },
                    { author: 'admin2', content: 'Incluímos o domínio do laboratório na lista de confiança. Deve liberar em até 10 minutos.' },
                    { author: 'user', content: 'Agora abriu. Obrigado!' },
                ],
            },
            {
                ticket: {
                    title: 'Médico em home office não conecta na VPN para ver prontuários',
                    description: 'Médico que atende em home office não consegue conectar na VPN. Precisa acessar prontuários e laudos remotamente.',
                    status: 'IN_PROGRESS',
                    priority: 'URGENT',
                    category: 'REDE',
                    assignedToId: userMatheusAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Dá erro de timeout ao conectar. Ele usa o cliente VPN que enviamos e a rede de casa está estável.' },
                    { author: 'admin1', content: 'Verificando se o usuário dele está habilitado para VPN no AD e se o certificado está válido.' },
                    { author: 'user', content: 'Ele disse que o certificado pediu para renovar na última vez que logou.' },
                    { author: 'admin1', content: 'Era isso. Renovamos o certificado e enviamos instruções por e-mail. Peça para ele tentar conectar novamente.' },
                ],
            },
            {
                ticket: {
                    title: 'Solicitação de instalação do sistema no novo computador',
                    description: 'Recebi um computador novo no consultório e preciso do sistema de prontuário e do agendamento instalados.',
                    status: 'OPEN',
                    priority: 'NORMAL',
                    category: 'SOFTWARE',
                },
                comments: [
                    { author: 'user', content: 'O PC já está na rede e com meu usuário do AD. Só faltam os programas da clínica.' },
                    { author: 'admin2', content: 'Anotado. Precisamos do número do patrimônio ou identificação do PC e do consultório para o deploy.' },
                    { author: 'user', content: 'Consultório 2, patrimônio 4521. O Windows já está ativado.' },
                    { author: 'admin2', content: 'Vamos agendar a instalação para amanhã no período da manhã. Alguém precisa estar no consultório para aprovar as permissões na primeira execução.' },
                ],
            },
            {
                ticket: {
                    title: 'Internet muito lenta na recepção no horário de pico',
                    description: 'Durante o horário de pico a internet fica muito lenta na recepção. Afeta agendamento e emissão de guias.',
                    status: 'OPEN',
                    priority: 'NORMAL',
                    category: 'REDE',
                },
                comments: [
                    { author: 'user', content: 'Principalmente entre 9h e 11h. As páginas demoram para carregar e às vezes caem.' },
                    { author: 'admin1', content: 'Pode ser saturação do link ou muitos dispositivos. Verificando uso de banda e quantidade de conexões ativas nesse horário.' },
                    { author: 'user', content: 'Temos 4 PCs na recepção e 2 tablets para consulta de horários. Mais os celulares do pessoal.' },
                ],
            },
            {
                ticket: {
                    title: 'Segundo monitor do consultório 5 não detecta',
                    description: 'O segundo monitor do consultório 5 não é detectado pelo PC. Só aparece a tela principal.',
                    status: 'CLOSED',
                    priority: 'NORMAL',
                    category: 'HARDWARE',
                    assignedToId: userMatheusAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Antes funcionava. Depois de uma atualização do Windows parou de reconhecer.' },
                    { author: 'admin1', content: 'Verificando se o cabo está firme e se o driver da placa de vídeo está atualizado.' },
                    { author: 'admin1', content: 'Atualizamos o driver de vídeo e o segundo monitor voltou a ser detectado. Configure em "Estender" nas configurações de vídeo do Windows.' },
                    { author: 'user', content: 'Configurado e funcionando. Obrigado!' },
                ],
            },
            {
                ticket: {
                    title: 'Sem permissão para gravar na pasta de exames no servidor',
                    description: 'Não consigo salvar resultados de exames na pasta compartilhada do novo servidor. Mensagem de permissão negada.',
                    status: 'IN_PROGRESS',
                    priority: 'URGENT',
                    category: 'SEGURANÇA',
                    assignedToId: userJoaoAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'A pasta é \\\\srv-arquivos01\\exames\\laboratorio. Consigo abrir mas não gravar.' },
                    { author: 'admin2', content: 'Seu usuário estava só com leitura. Ajustamos para leitura e gravação no grupo do laboratório.' },
                    { author: 'user', content: 'Ainda não consegui. Faço logout e login de novo?' },
                    { author: 'admin2', content: 'Sim. As permissões do AD podem demorar alguns minutos para replicar. Tente em 5 minutos e avise se persistir.' },
                ],
            },
        ]

    for (const item of ticketsWithComments) {
        const ticket = await prisma.ticket.create({
            data: {
                userId: commonUser.id,
                title: item.ticket.title,
                description: item.ticket.description,
                status: item.ticket.status,
                priority: item.ticket.priority,
                category: item.ticket.category,
                assignedToId: item.ticket.assignedToId,
            },
        })
        for (const c of item.comments) {
            const userId =
                c.author === 'user'
                    ? commonUser.id
                    : c.author === 'admin1'
                        ? userMatheusAdmin.id
                        : userJoaoAdmin.id
            await prisma.comment.create({
                data: {
                    ticketId: ticket.id,
                    userId,
                    content: c.content,
                },
            })
        }
    }
    console.log('20 chamados do usuário comum criados com comentários')

    console.log('Seed finalizado com sucesso')

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (err) => {
        console.error("[Seed] Erro", err)
        await prisma.$disconnect()
        process.exit(1)
    })
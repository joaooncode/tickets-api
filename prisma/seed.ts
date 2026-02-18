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

    // create 10 tickets for the common user
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
                    title: 'Impressora não imprime',
                    description: 'A impressora do setor administrativo parou de imprimir. Já reiniciei e verifiquei o papel.',
                    status: 'IN_PROGRESS',
                    priority: 'NORMAL',
                    category: 'HARDWARE',
                    assignedToId: userMatheusAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'O problema começou hoje pela manhã. Nenhum documento sai.' },
                    { author: 'admin1', content: 'Vamos verificar o driver e a conexão de rede. Atualizei o driver.' },
                    { author: 'user', content: 'Ainda não imprimiu. O teste de página também falha.' },
                    { author: 'admin1', content: 'Enviando técnico para checagem do hardware.' },
                ],
            },
            {
                ticket: {
                    title: 'Acesso negado ao sistema de pedidos',
                    description: 'Não consigo acessar o sistema de pedidos. Mensagem: "Acesso negado".',
                    status: 'CLOSED',
                    priority: 'URGENT',
                    category: 'SEGURANÇA',
                    assignedToId: userJoaoAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Preciso urgentemente para fechar pedidos do dia.' },
                    { author: 'admin2', content: 'Verificando permissões no seu perfil.' },
                    { author: 'admin2', content: 'Perfil ajustado. Faça logout e login novamente.' },
                    { author: 'user', content: 'Funcionou, obrigado!' },
                ],
            },
            {
                ticket: {
                    title: 'Lentidão no computador',
                    description: 'O computador está muito lento nos últimos dias, principalmente ao abrir planilhas.',
                    status: 'OPEN',
                    priority: 'NORMAL',
                    category: 'SOFTWARE',
                },
                comments: [
                    { author: 'user', content: 'Principalmente o Excel e o navegador demoram para abrir.' },
                    { author: 'admin1', content: 'Vamos analisar. Pode ser atualização em segundo plano ou disco cheio.' },
                ],
            },
            {
                ticket: {
                    title: 'Sem conexão com a internet',
                    description: 'A rede caiu no meu setor. Ninguém consegue acessar a internet.',
                    status: 'CLOSED',
                    priority: 'URGENT',
                    category: 'REDE',
                    assignedToId: userJoaoAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Todos os PCs do corredor B estão sem internet.' },
                    { author: 'admin2', content: 'Identificamos problema no switch. Substituição feita.' },
                    { author: 'user', content: 'Voltou aqui. Obrigado!' },
                ],
            },
            {
                ticket: {
                    title: 'Erro ao instalar programa',
                    description: 'Ao instalar o novo software de gestão aparece erro de permissão.',
                    status: 'IN_PROGRESS',
                    priority: 'NORMAL',
                    category: 'SOFTWARE',
                    assignedToId: userMatheusAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'A mensagem diz que preciso de permissão de administrador.' },
                    { author: 'admin1', content: 'Solicitação de instalação enviada. Vamos instalar remotamente amanhã.' },
                ],
            },
            {
                ticket: {
                    title: 'Tela azul no Windows',
                    description: 'O PC deu tela azul duas vezes esta semana. Não sei o que causou.',
                    status: 'OPEN',
                    priority: 'NORMAL',
                    category: 'SISTEMA',
                },
                comments: [
                    { author: 'user', content: 'Aconteceu ao abrir vários programas ao mesmo tempo.' },
                    { author: 'admin2', content: 'Anotado. Vamos agendar análise de memória e drivers.' },
                ],
            },
            {
                ticket: {
                    title: 'E-mail não abre anexos',
                    description: 'Não consigo abrir anexos de e-mail. Diz que o arquivo está bloqueado.',
                    status: 'CLOSED',
                    priority: 'NORMAL',
                    category: 'SEGURANÇA',
                    assignedToId: userJoaoAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Acontece com PDFs e planilhas enviados por clientes.' },
                    { author: 'admin2', content: 'Política de anexos foi ajustada para seu perfil. Teste novamente.' },
                    { author: 'user', content: 'Anexos abrindo normalmente agora.' },
                ],
            },
            {
                ticket: {
                    title: 'Teclado com teclas travando',
                    description: 'Algumas teclas do teclado estão repetindo ou não respondem.',
                    status: 'IN_PROGRESS',
                    priority: 'NORMAL',
                    category: 'HARDWARE',
                    assignedToId: userMatheusAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Principalmente a letra A e o Enter.' },
                    { author: 'admin1', content: 'Vamos enviar um teclado reserva. Enquanto isso, pode usar outro?' },
                ],
            },
            {
                ticket: {
                    title: 'VPN não conecta',
                    description: 'Ao tentar conectar na VPN para home office, dá timeout.',
                    status: 'OPEN',
                    priority: 'URGENT',
                    category: 'REDE',
                },
                comments: [
                    { author: 'user', content: 'Preciso acessar o servidor de arquivos de casa.' },
                    { author: 'admin1', content: 'Verificando certificado e configuração do cliente VPN.' },
                ],
            },
            {
                ticket: {
                    title: 'Dúvida sobre backup de arquivos',
                    description: 'Não sei se meus arquivos da pasta Documentos estão no backup.',
                    status: 'CLOSED',
                    priority: 'NORMAL',
                    category: 'OUTRO',
                    assignedToId: userJoaoAdmin.id,
                },
                comments: [
                    { author: 'user', content: 'Queria confirmar antes de apagar arquivos antigos.' },
                    { author: 'admin2', content: 'Sim, a pasta Documentos está incluída no backup diário.' },
                    { author: 'user', content: 'Perfeito, obrigado!' },
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
    console.log('10 chamados do usuário comum criados com comentários')

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
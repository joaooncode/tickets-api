import { prisma } from '@/lib/prisma'

export default async function main() {
    console.log('Iniciando seed...')
    console.log('Criando usuários...')
    // 4 usuários (2 USER, 2 ADMIN)
    const user1 = await prisma.user.upsert({
        where: { email: 'ana@example.com' },
        update: {},
        create: {
            clerkUserId: 'clerk_ana_001',
            name: 'Ana Silva',
            email: 'ana@example.com',
            role: 'USER',
        },
    })

    const user2 = await prisma.user.upsert({
        where: { email: 'bruno@example.com' },
        update: {},
        create: {
            clerkUserId: 'clerk_bruno_002',
            name: 'Bruno Santos',
            email: 'bruno@example.com',
            role: 'USER',
        },
    })

    const user3 = await prisma.user.upsert({
        where: { email: 'carla@example.com' },
        update: {},
        create: {
            clerkUserId: 'clerk_carla_003',
            name: 'Carla Oliveira',
            email: 'carla@example.com',
            role: 'ADMIN',
        },
    })

    const user4 = await prisma.user.upsert({
        where: { email: 'diego@example.com' },
        update: {},
        create: {
            clerkUserId: 'clerk_diego_004',
            name: 'Diego Costa',
            email: 'diego@example.com',
            role: 'ADMIN',
        },
    })

    console.log('Criando tickets...')
    // 4 tickets (1 por usuário)
    const ticket1 = await prisma.ticket.create({
        data: {
            userId: user1.id,
            title: 'Erro ao fazer login',
            description: 'Ao clicar em Entrar, a página fica em branco.',
        },
    })

    const ticket2 = await prisma.ticket.create({
        data: {
            userId: user2.id,
            title: 'Relatório não exporta em PDF',
            description: 'O botão Exportar PDF retorna erro 500.',
        },
    })

    const ticket3 = await prisma.ticket.create({
        data: {
            userId: user3.id,
            title: 'Solicitação de novo recurso',
            description: 'Gostaria de filtrar tickets por data de criação.',
        },
    })

    const ticket4 = await prisma.ticket.create({
        data: {
            userId: user4.id,
            title: 'Dúvida sobre permissões',
            description: 'Qual a diferença entre perfil USER e ADMIN?',
        },
    })

    console.log('Criando comentários...')
    // 2 comentários por ticket (dono do ticket comenta)
    await prisma.comment.createMany({
        data: [
            { ticketId: ticket1.id, userId: user1.id, content: 'Acontece em todos os navegadores.' },
            { ticketId: ticket1.id, userId: user1.id, content: 'Já limpei cache e cookies.' },
            { ticketId: ticket2.id, userId: user2.id, content: 'Erro começou após a última atualização.' },
            { ticketId: ticket2.id, userId: user2.id, content: 'Segue print do console do navegador.' },
            { ticketId: ticket3.id, userId: user3.id, content: 'Seria útil para o time de suporte.' },
            { ticketId: ticket3.id, userId: user3.id, content: 'Podemos priorizar na próxima sprint.' },
            { ticketId: ticket4.id, userId: user4.id, content: 'Documentação está na área de ajuda.' },
            { ticketId: ticket4.id, userId: user4.id, content: 'ADMIN pode gerenciar todos os tickets.' },
        ],
    })

    console.log('Seed concluído com sucesso!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (err) => {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    })

import { prisma } from '@/lib/prisma'

export default async function main() {
    console.log('Iniciando seed...')

    const userMatheusAdmin = await prisma.user.create({
        data: {
            clerkUserId: 'user_39JnGLH6vnxXc9y6nsk9hPLWJTv',
            name: 'Matheus Admin',
            email: 'matheus@admin.com',
            role: 'ADMIN',
        },
    })
    console.log('Usuário Matheus Admin criado com sucesso')

    const userJoaoAdmin = await prisma.user.create({
        data: {
            clerkUserId: 'user_39XyFWdos84WOmtrf2nzZDOTMJS',
            name: 'João Admin',
            email: 'joao@admin.com',
            role: 'ADMIN',
        },
    })
    console.log('Usuário João Admin criado com sucesso')

    const commonUser = await prisma.user.create({
        data: {
            clerkUserId: 'user_39S5snvPcayWkrqCdKhYETa0Esg',
            name: 'Usuário Comum',
            email: 'usuario@email.com',
            role: 'USER',
        },
    })
    console.log('Usuário Common User criado com sucesso')

    // finish

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
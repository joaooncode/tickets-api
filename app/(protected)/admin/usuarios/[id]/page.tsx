import { getUserById } from "@/app/(actions)/adminActions";

export default async function UsuarioPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getUserById(id);
    if (!user.success) {
        return <div>Erro ao buscar usuário</div>;
    }
    return (
        <div>
            <h1>Usuario {id}</h1>
            <p>Email: {user.data?.email}</p>
            <p>Nome: {user.data?.name}</p>
            <p>Role: {user.data?.role}</p>
            <p>Status: {user.data?.isActive ? 'Ativo' : 'Inativo'}</p>
            <p>CreatedAt: {user.data?.createdAt.toLocaleDateString()}</p>
            <p>UpdatedAt: {user.data?.updatedAt.toLocaleDateString()}</p>
        </div>
    )
}
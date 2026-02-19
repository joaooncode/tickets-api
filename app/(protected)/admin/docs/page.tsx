import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export default function AdminDocsPage() {
	return (
		<div className="flex flex-col items-start w-full max-w-3xl">
			<h1 className="text-4xl font-bold">Manual do Admin</h1>
			<p className="mt-2 text-muted-foreground">
				Guia da área administrativa do sistema de chamados Helpdesk.
			</p>

			<Card className="w-full mt-8">
				<CardHeader>
					<CardTitle>Visão geral</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>
						O <strong>administrador</strong> é quem tem permissão especial (role
						de admin) no sistema. Você vê o mesmo que o usuário comum e ainda o{' '}
						<strong>menu de admin</strong> e as páginas de gestão. Use o manual
						do usuário para detalhes das funcionalidades comuns.
					</p>
					<Button variant="outline" asChild className="mt-2">
						<Link href="/t/docs">Manual do Usuário</Link>
					</Button>
				</CardContent>
			</Card>

			<Card className="w-full mt-6">
				<CardHeader>
					<CardTitle>Menu admin (o que só o admin vê)</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<ul className="list-disc list-inside space-y-1">
						<li>
							<strong>Dashboard</strong> — visão geral com gráficos e números.
						</li>
						<li>
							<strong>Chamados</strong> — todos os chamados do sistema.
						</li>
						<li>
							<strong>Usuarios</strong> — listagem e edição de usuários.
						</li>
						<li>
							<strong>Manual do Admin</strong> — link para o manual do admin
							(na tela).
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card className="w-full mt-6">
				<CardHeader>
					<CardTitle>Dashboard (admin)</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>
						<strong>Rota:</strong> <code className="rounded bg-muted px-1">/admin/dashboard</code>{' '}
						(ou clique em <strong>Dashboard</strong> no menu).
					</p>
					<p>Mostra:</p>
					<ul className="list-disc list-inside space-y-1">
						<li>
							Quantidade de chamados por <strong>status</strong> (Abertos, Em
							andamento, Finalizados).
						</li>
						<li>
							Distribuição por <strong>categoria</strong> e por{' '}
							<strong>prioridade</strong> (Normal / Urgente).
						</li>
						<li>
							<strong>Chamados abertos na semana</strong> (resumo).
						</li>
					</ul>
					<p>
						Use essa tela para ter uma visão rápida da situação dos chamados.
					</p>
				</CardContent>
			</Card>

			<Card className="w-full mt-6">
				<CardHeader>
					<CardTitle>Chamados (admin)</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>
						<strong>Rota:</strong> <code className="rounded bg-muted px-1">/admin/tickets</code>{' '}
						(menu <strong>Chamados</strong>).
					</p>
					<p>
						Lista <strong>todos os chamados</strong> do sistema (não só os
						seus). Você pode <strong>filtrar</strong> e{' '}
						<strong>abrir o detalhe</strong> de qualquer chamado.
					</p>
				</CardContent>
			</Card>

			<Card className="w-full mt-6">
				<CardHeader>
					<CardTitle>Detalhe do chamado (admin) — Ações</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>
						Na página de detalhe de um chamado, o botão <strong>Ações</strong>{' '}
						(menu com três pontinhos) oferece:
					</p>
					<ul className="list-disc list-inside space-y-1">
						<li>
							<strong>Ver usuário</strong> — abre a ficha do usuário que criou
							o chamado.
						</li>
						<li>
							<strong>Mudar status</strong> — altera o status do ticket:
							<ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
								<li><strong>Em aberto</strong> — chamado ainda não iniciado.</li>
								<li>
									<strong>Em andamento</strong> — alguém está atendendo.
								</li>
								<li><strong>Finalizado</strong> — chamado concluído.</li>
							</ul>
						</li>
					</ul>
					<p>
						Escolha o status que reflete a realidade do atendimento. A
						alteração é salva na hora e o usuário pode ver a atualização no
						detalhe do chamado.
					</p>
				</CardContent>
			</Card>

			<Card className="w-full mt-6">
				<CardHeader>
					<CardTitle>Usuários (admin)</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>
						<strong>Rota:</strong> <code className="rounded bg-muted px-1">/admin/usuarios</code>{' '}
						(menu <strong>Usuarios</strong>).
					</p>
					<p>
						Lista os usuários do sistema. Você pode abrir cada usuário para{' '}
						<strong>ver e editar</strong> os dados (conforme disponível na
						tela).
					</p>
				</CardContent>
			</Card>

			<Card className="w-full mt-6">
				<CardHeader>
					<CardTitle>Proteção de acesso</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>
						Só quem tem <strong>permissão de administrador</strong> acessa as
						páginas que começam com <code className="rounded bg-muted px-1">/admin</code>.
					</p>
					<p>
						Se um usuário comum tentar abrir qualquer link de admin, o sistema
						redireciona para uma página de &quot;não encontrado&quot;. Nada é
						alterado.
					</p>
				</CardContent>
			</Card>

			<Card className="w-full mt-6 border-primary/30">
				<CardHeader>
					<CardTitle>Em resumo</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>
						<strong>Para o admin:</strong> Dashboard para números e gráficos;
						Chamados para listar tudo e mudar status (Ações → Mudar status);
						Usuarios para gerenciar usuários.
					</p>
				</CardContent>
			</Card>
		</div>
	)
}

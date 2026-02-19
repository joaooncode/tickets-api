import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function UserDocsPage() {
	return (
		<div className="flex flex-col items-start w-full max-w-3xl">
			<h1 className="text-4xl font-bold">Manual do Usuário</h1>
			<p className="mt-2 text-muted-foreground">
				Guia de uso do sistema de chamados Helpdesk. Linguagem direta e
				passos objetivos para abrir e acompanhar chamados.
			</p>

			<Card className="w-full mt-8">
				<CardHeader>
					<CardTitle>Entrar no sistema</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>
						Na página inicial do sistema, clique em <strong>Login</strong>.
						Faça login com suas credenciais. Depois de entrar, você é levado
						automaticamente para o <strong>Início</strong> (Dashboard).
					</p>
				</CardContent>
			</Card>

			<Card className="w-full mt-6">
				<CardHeader>
					<CardTitle>Menu (o que você vê no topo)</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<ul className="list-disc list-inside space-y-1">
						<li>
							<strong>Inicio</strong> — lista dos seus chamados.
						</li>
						<li>
							<strong>Criar Chamado</strong> — abrir um novo ticket.
						</li>
						<li>
							<strong>Perfil</strong> — editar seus dados da conta.
						</li>
						<li>
							<strong>Manual do Usuário</strong> — link para este manual
							(versão na tela).
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card className="w-full mt-6">
				<CardHeader>
					<CardTitle>Início (Dashboard)</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>Mostra a <strong>lista dos seus chamados</strong>.</p>
					<p>Você pode filtrar por status:</p>
					<ul className="list-disc list-inside space-y-1">
						<li><strong>Total</strong> — todos.</li>
						<li><strong>Aberto</strong> — ainda não iniciado.</li>
						<li><strong>Em andamento</strong> — sendo atendido.</li>
						<li><strong>Finalizado</strong> — concluído.</li>
					</ul>
					<p>
						Clique em um chamado para ver os detalhes e os comentários.
					</p>
				</CardContent>
			</Card>

			<Card className="w-full mt-6">
				<CardHeader>
					<CardTitle>Criar chamado (passo a passo)</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p>
						<strong>Onde:</strong> No menu, clique em{' '}
						<strong>Criar Chamado</strong>.
					</p>
					<p className="font-semibold">Campos do formulário:</p>
					<ol className="list-decimal list-inside space-y-3">
						<li>
							<strong>Categoria</strong> (obrigatório) — Escolha uma opção:
							Sistema, Hardware, Software, Rede, Segurança, Outro.
						</li>
						<li>
							<strong>Título</strong> (obrigatório) — Até 100 caracteres.
							Seja claro e direto (ex.: &quot;Impressora da recepção não
							imprime&quot;).
						</li>
						<li>
							<strong>Descrição</strong> (obrigatório) — Entre 10 e 1000
							caracteres. Descreva o problema ou a solicitação com o
							necessário para o atendimento entender.
						</li>
						<li>
							<strong>Prioridade</strong> (obrigatório):
							<ul className="list-disc list-inside mt-2 ml-2 space-y-1">
								<li>
									<strong>Urgente</strong> — use quando o problema{' '}
									<strong>impede o atendimento agora</strong> ou coloca alguém
									em risco. Exemplos: sistema crítico fora do ar (prontuário,
									agendamento), equipamento essencial parado (recepção,
									internet), bloqueio total de usuário essencial, fila parada.
									Resumo: Se o atendimento para por causa disso → marque{' '}
									<strong>Urgente</strong>.
								</li>
								<li>
									<strong>Normal</strong> — use quando o atendimento{' '}
									<strong>continua funcionando</strong>. Exemplos: instalar
									software, criar usuário, trocar senha (com alternativa),
									impressora auxiliar com problema, dúvida de uso, melhorias.
									Resumo: Se tudo segue funcionando → marque{' '}
									<strong>Normal</strong>.
								</li>
							</ul>
						</li>
						<li>
							<strong>Anexos</strong> (opcional) — Até <strong>5 imagens</strong>
							. Formatos aceitos: <strong>JPG</strong> ou <strong>PNG</strong>.
							Cada arquivo: no máximo <strong>1 MB</strong>.
						</li>
					</ol>
					<p>
						Depois de preencher, clique em <strong>Criar ticket</strong>. O
						sistema valida os dados. Se estiver tudo certo, aparece uma
						mensagem de sucesso e você é levado para a página do chamado
						criado. Se faltar algo ou estiver fora do limite, a tela mostra o
						que corrigir.
					</p>
				</CardContent>
			</Card>

			<Card className="w-full mt-6">
				<CardHeader>
					<CardTitle>Ver e acompanhar chamados</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>
						No <strong>Início</strong> você vê todos os seus chamados (e pode
						filtrar por status). Clique em um chamado para abrir o{' '}
						<strong>detalhe</strong>.
					</p>
				</CardContent>
			</Card>

			<Card className="w-full mt-6">
				<CardHeader>
					<CardTitle>Detalhe do chamado</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<ul className="list-disc list-inside space-y-1">
						<li>
							Mostra <strong>todos os dados</strong> do ticket (título,
							descrição, categoria, prioridade, status, anexos).
						</li>
						<li>
							Lista os <strong>comentários</strong> já existentes (quem
							escreveu e quando).
						</li>
						<li>
							Tem uma <strong>área para escrever um novo comentário</strong>.
							Use para dar mais informações ou acompanhar a resposta do
							suporte.
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card className="w-full mt-6">
				<CardHeader>
					<CardTitle>Perfil</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>
						No menu, clique em <strong>Perfil</strong>. Você pode editar os
						dados da sua conta (nome, e-mail etc.) na tela que abrir.
					</p>
				</CardContent>
			</Card>

			<Card className="w-full mt-6 border-primary/30">
				<CardHeader>
					<CardTitle>Em resumo</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p>
						<strong>Para abrir um chamado:</strong>
						<br />
						Criar Chamado → escolher <strong>Categoria</strong> → preencher{' '}
						<strong>Título</strong> e <strong>Descrição</strong> → escolher{' '}
						<strong>Prioridade</strong> (Urgente ou Normal) → anexar imagens se
						quiser (até 5, JPG/PNG, 1 MB cada) → <strong>Criar ticket</strong>.
					</p>
					<p>
						<strong>Para acompanhar:</strong>
						<br />
						Início → filtrar por status se quiser → clicar no chamado → ver
						detalhes e comentários → adicionar comentário se precisar.
					</p>
					<p>
						<strong>Prioridade em uma frase:</strong>
						<br />
						Impede o atendimento agora? → <strong>Urgente</strong>. O resto →{' '}
						<strong>Normal</strong>.
					</p>
				</CardContent>
			</Card>
		</div>
	)
}

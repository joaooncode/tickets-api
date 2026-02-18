import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png'] as const
const MAX_FILE_SIZE_BYTES = 1024 * 1024 // 1MB
const MAX_FILES = 5

function getSafeExtension(file: File): string | null {
	const name = file.name
	const ext = name.split('.').pop()?.toLowerCase()
	if (ext && (ALLOWED_EXTENSIONS as readonly string[]).includes(ext)) return ext
	const type = file.type?.toLowerCase()
	if (type === 'image/jpeg') return 'jpg'
	if (type === 'image/png') return 'png'
	return null
}

/**
 * Salva os anexos do ticket em public/uploads/tickets/{batchId}/ e retorna os paths públicos.
 * Valida extensão (jpg, jpeg, png) e tamanho (máx 10MB por arquivo, máx 5 arquivos).
 */
export async function saveTicketAttachments(
	files: File[],
): Promise<{ paths: string[]; error?: string }> {
	if (files.length > MAX_FILES) {
		return {
			paths: [],
			error: `Máximo de ${MAX_FILES} anexos permitidos.`,
		}
	}

	const baseDir = path.join(process.cwd(), 'public', 'uploads', 'tickets')
	const batchId = randomUUID()
	const dir = path.join(baseDir, batchId)
	const paths: string[] = []

	try {
		await mkdir(dir, { recursive: true })
	} catch (e) {
		console.error('[saveTicketAttachments] Erro ao criar diretório', e)
		return { paths: [], error: 'Erro ao criar diretório de upload.' }
	}

	for (let i = 0; i < files.length; i++) {
		const file = files[i]
		if (file.size === 0) continue
		if (file.size > MAX_FILE_SIZE_BYTES) {
			return {
				paths: [],
				error: `Arquivo "${file.name}" excede o limite de 10MB.`,
			}
		}
		const ext = getSafeExtension(file)
		if (!ext) {
			return {
				paths: [],
				error: 'Apenas imagens JPG, JPEG ou PNG são permitidas.',
			}
		}
		const filename = `${i}.${ext}`
		const filePath = path.join(dir, filename)
		try {
			const buffer = Buffer.from(await file.arrayBuffer())
			await writeFile(filePath, buffer)
		} catch (e) {
			console.error('[saveTicketAttachments] Erro ao salvar arquivo', e)
			return { paths: [], error: 'Erro ao salvar arquivo.' }
		}
		paths.push(`/uploads/tickets/${batchId}/${filename}`)
	}

	return { paths }
}

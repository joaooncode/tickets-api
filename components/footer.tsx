export default function Footer() {
    return (
        <footer>
            <div className="flex justify-center items-center p-4 bg-gray-100 border-t border-gray-200 px-20">
                <span>&copy; {new Date().getFullYear()} Sistema de Chamados. Todos os direitos reservados.</span>
            </div>
        </footer>
    )
}
## Como começar

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPO>
   ```

2. Dê permissão de execução ao script de deploy:

   ```bash
   chmod +x ./scripts/deploy.sh
   ```

3. Configure o arquivo `.env` com as variáveis de ambiente necessárias.

---

### Comandos para build das imagens Docker

```bash
docker build -t senac-helpdesk:app-1.0.0 --target runner .
docker build -t senac-helpdesk:cli-1.0.0 --target cli .
```

## Como começar

1. **Clone o repositório:**

   ```bash
   git clone <URL_DO_REPO>
   ```

2. **Dê permissão de execução ao script de deploy:**

   ```bash
   chmod +x ./scripts/deploy.sh
   ```

3. **Configure o arquivo `.env` com as variáveis de ambiente necessárias:**

   > **Atenção:** Para a configuração do banco de dados, o host deve ser o nome do serviço (`db`) e **não** `localhost`.

---

### Comandos para build das imagens Docker

```bash
docker build -t senac-helpdesk:app-1.1.0 --target runner .
docker build -t senac-helpdesk:cli-1.1.0 --target cli .

docker tag senac-helpdesk:cli-1.1.0 joaosilvadev25/tickets-api-senac:cli-1.1.0
docker tag senac-helpdesk:app-1.1.0 joaosilvadev25/tickets-api-senac:app-1.1.0
docker push joaosilvadev25/tickets-api-senac:cli-1.1.0
docker push joaosilvadev25/tickets-api-senac:app-1.1.0
```

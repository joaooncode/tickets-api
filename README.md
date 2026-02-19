## 🚀 Como fazer o Deploy

Siga os passos abaixo para configurar e executar o projeto:

1. **Clone o repositório**
   ```bash
   git clone <URL_DO_REPO>
   cd <NOME_DO_PROJETO>
   ```

2. **Configure as variáveis de ambiente**

   Crie ou edite o arquivo `.env` na raiz do projeto com as variáveis necessárias.

   > **Atenção:**  
   > Para a configuração do banco de dados, o host deve ser o nome do serviço definido no `docker-compose` (por exemplo: `db`) e não `localhost`.

   **Exemplo de configuração:**
   ```env
   DATABASE_URL="postgresql://usuario:senha@db:5432/nome_do_banco"
   ```

3. **Dê permissão de execução ao script de deploy**
   ```bash
   chmod +x ./scripts/deploy.sh
   ```

4. **Execute o deploy**
   ```bash
   ./scripts/deploy.sh
   ```

5. **Acesse a aplicação**
   
   Aplicação disponível em: http://localhost:3000



---

### Comandos para build das imagens Docker

```bash
docker build -t senac-helpdesk:app-1.1.1 --target runner .
docker build -t senac-helpdesk:cli-1.1.1 --target cli .

docker tag senac-helpdesk:cli-1.1.1 joaosilvadev25/tickets-api-senac:cli-1.1.1
docker tag senac-helpdesk:app-1.1.1 joaosilvadev25/tickets-api-senac:app-1.1.1
docker push joaosilvadev25/tickets-api-senac:cli-1.1.1
docker push joaosilvadev25/tickets-api-senac:app-1.1.1
```

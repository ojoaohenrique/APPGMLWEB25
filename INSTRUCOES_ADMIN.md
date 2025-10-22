# Como Adicionar Novos Usuários (Guardas) ao Sistema

O cadastro de novos usuários é feito manualmente pelo painel do Supabase para garantir a segurança do sistema.

## Passo 1: Criar o Usuário (Autenticação)

1. Acesse o [Painel do Supabase](https://supabase.com/dashboard/project/pzegbvsrxiarqsorwvdn).
2. No menu lateral, vá para a seção **"Authentication"** (ícone de chave).
3. Clique no botão **"Add User"**.
4. Preencha o **Email** do guarda e crie uma **Senha** forte para ele.
5. **Importante:** Desative a opção "Auto-confirm user?" (deixe-a desligada) para que o usuário precise confirmar o e-mail, ou (se preferir) deixe-a ativada para pular a verificação de e-mail.
6. Clique em **"Create User"**.

## Passo 2: Definir o Nome do Usuário (Perfil)

O sistema precisa do nome do guarda para exibi-lo na barra lateral.

1. No menu lateral do Supabase, vá para **"Table Editor"** (ícone de tabela).
2. Clique na tabela chamada `profiles`.
3. Você verá o novo usuário que acabou de criar (o `id` dele estará lá, mas o `nome_completo` provavelmente estará como "Guarda Municipal", que é o padrão do trigger do banco de dados).
4. Clique duas vezes no campo `nome_completo` desse novo usuário e **insira o nome completo correto do guarda**.
5. Clique em **"Save"** no canto superior.

## Pronto!

O novo guarda já pode baixar o aplicativo ou acessar o site e fazer login com o email e senha que você criou.

---

## Observações Importantes

- **Segurança:** Nunca compartilhe as credenciais de acesso ao painel do Supabase com pessoas não autorizadas.
- **Senhas:** Certifique-se de criar senhas fortes para os guardas e orientá-los a alterá-las no primeiro acesso (se implementado).
- **Confirmação de Email:** Se você deixar a opção "Auto-confirm user?" desativada, o guarda precisará confirmar o email antes de fazer login. Certifique-se de que ele tenha acesso ao email cadastrado.

---

## Acesso ao Painel do Supabase

**URL:** https://supabase.com/dashboard/project/pzegbvsrxiarqsorwvdn

**Responsáveis:**
- Comandante da Guarda Municipal
- Desenvolvedor do Sistema

---

## Suporte

Em caso de dúvidas ou problemas, entre em contato com o desenvolvedor do sistema.

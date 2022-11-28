module Web.View.Cinemas.Show where
import Web.View.Prelude

data ShowView = ShowView { cinema :: Include "agendamentos" Cinema }

instance View ShowView where
    html ShowView { .. } = [hsx|
        {breadcrumb}
        <h1>{get #nomeCinema cinema}</h1>
        <a href={NewAgendamentoAction (get #id cinema)}>Agendar Sessao</a>
        <p>{cinema}</p>

        <div>{forEach (get #agendamentos cinema) renderAgendamento }</div>
    |]
        where
            breadcrumb = renderBreadcrumb
                            [ breadcrumbLink "Cinemas" CinemasAction
                            , breadcrumbText "Show Cinema"
                            ]
    
            renderAgendamento agendamento = [hsx|
                <tr>
                    <div>Nome Completo: {get #nomeCompleto agendamento}</div>
                    <div>Nome do Filme: {get #filme agendamento}</div>
                    <div>Horário da Sessão: {get #horarioSessao agendamento}</div>
                    <div>
                        <a class="text-secondary m-2" href={EditAgendamentoAction (get #id agendamento)}>Editar</a>
                        <form method="POST" action={DeleteAgendamentoAction (get #id agendamento)}>
                            <input type="hidden" name="_method" value="DELETE"/>
                            <button type="submit">Deletar</button>
                        </form>
                    </div>
                </tr>
            |]
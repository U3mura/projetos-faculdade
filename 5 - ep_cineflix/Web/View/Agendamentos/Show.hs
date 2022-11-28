module Web.View.Agendamentos.Show where
import Web.View.Prelude

data ShowView = ShowView { agendamento :: Agendamento }

instance View ShowView where
    html ShowView { .. } = [hsx|
        {breadcrumb}
        <h1>Show Agendamento</h1>
        <div> <b>Nome de quem agendou: </b> {get #nomeCompleto agendamento}</div>
        <div><b>Nome do filme: </b> {get #filme agendamento}</div>
        <div><b>Horário da sessão: </b> {get #horarioSessao agendamento}</div>

    |]
        where
            breadcrumb = renderBreadcrumb
                            [ breadcrumbLink "Sessões" AgendamentosAction
                            , breadcrumbText "Ver Sessão"
                            ]
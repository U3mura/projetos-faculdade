module Web.View.Agendamentos.New where
import Web.View.Prelude

data NewView = NewView { agendamento :: Agendamento, cinema :: Cinema }

instance View NewView where
    html NewView { .. } = [hsx|
        {breadcrumb}
        <h1>Nova Sessão no <q>{get #nomeCinema cinema}</q></h1>
        {renderForm agendamento}
    |]
        where
            breadcrumb = renderBreadcrumb
                [ breadcrumbLink "Sessões" AgendamentosAction
                , breadcrumbText "Nova Sessão"
                ]

renderForm :: Agendamento -> Html
renderForm agendamento = formFor agendamento [hsx|
    {(hiddenField #cinemaId)}
    {(textField #nomeCompleto) { fieldLabel = "Seu Nome Completo: "}}
    {(textField #filme) { fieldLabel = "Nome do filme: "}}
    {(textField #horarioSessao) { fieldLabel = "Horário da Sessão: "}}
    {submitButton}

|]
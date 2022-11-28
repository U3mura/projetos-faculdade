module Web.View.Agendamentos.Edit where
import Web.View.Prelude

data EditView = EditView { agendamento :: Agendamento }

instance View EditView where
    html EditView { .. } = [hsx|
        {breadcrumb}
        <h1>Editar Sessão</h1>
        {renderForm agendamento}
    |]
        where
            breadcrumb = renderBreadcrumb
                [ breadcrumbLink "Sessões" AgendamentosAction
                , breadcrumbText "Editar Sessão"
                ]

renderForm :: Agendamento -> Html
renderForm agendamento = formFor agendamento [hsx|
    {(hiddenField #cinemaId)}
    {(textField #nomeCompleto) { fieldLabel = "Seu Nome Completo: "}}
    {(textField #filme) { fieldLabel = "Nome do filme: "}}
    {(textField #horarioSessao) { fieldLabel = "Horário da Sessão: "}}
    {submitButton}

|]
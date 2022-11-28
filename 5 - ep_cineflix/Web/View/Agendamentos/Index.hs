module Web.View.Agendamentos.Index where
import Web.View.Prelude

data IndexView = IndexView { agendamentos :: [Agendamento]  }

instance View IndexView where
    html IndexView { .. } = [hsx|
        {breadcrumb}

        <h1>Index</h1>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Sessão</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{forEach agendamentos renderAgendamento}</tbody>
            </table>
            
        </div>
    |]
        where
            breadcrumb = renderBreadcrumb
                [ breadcrumbLink "Sessão" AgendamentosAction
                ]

renderAgendamento :: Agendamento -> Html
renderAgendamento agendamento = [hsx|
    <tr>
        <td>{agendamento}</td>
        <td><a href={ShowAgendamentoAction agendamento.id}>Show</a></td>
        <td><a href={EditAgendamentoAction agendamento.id} class="text-muted">Edit</a></td>
        <td><a href={DeleteAgendamentoAction agendamento.id} class="js-delete text-muted">Delete</a></td>
    </tr>
|]
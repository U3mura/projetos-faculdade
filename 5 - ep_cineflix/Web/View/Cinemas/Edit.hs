module Web.View.Cinemas.Edit where
import Web.View.Prelude

data EditView = EditView { cinema :: Cinema }

instance View EditView where
    html EditView { .. } = [hsx|
        {breadcrumb}
        <h1>Edit Cinema</h1>
        {renderForm cinema}
    |]
        where
            breadcrumb = renderBreadcrumb
                [ breadcrumbLink "Cinemas" CinemasAction
                , breadcrumbText "Edit Cinema"
                ]

renderForm :: Cinema -> Html
renderForm cinema = formFor cinema [hsx|
    {(textField #nomeCinema) { fieldLabel = "Nome do Cinema: "}}
    {(textField #localCinema) { fieldLabel = "Localização do Cinema: "}}
    {submitButton}

|]
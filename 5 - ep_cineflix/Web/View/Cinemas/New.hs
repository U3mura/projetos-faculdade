module Web.View.Cinemas.New where
import Web.View.Prelude

data NewView = NewView { cinema :: Cinema }

instance View NewView where
    html NewView { .. } = [hsx|
        {breadcrumb}
        <h1>New Cinema</h1>
        {renderForm cinema}
    |]
        where
            breadcrumb = renderBreadcrumb
                [ breadcrumbLink "Cinemas" CinemasAction
                , breadcrumbText "New Cinema"
                ]

renderForm :: Cinema -> Html
renderForm cinema = formFor cinema [hsx|
    {(textField #nomeCinema) { fieldLabel = "Nome do Cinema: "}}
    {(textField #localCinema) { fieldLabel = "Localização do Cinema: "}}
    {submitButton}

|]
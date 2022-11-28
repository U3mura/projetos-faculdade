module Web.View.Cinemas.Index where
import Web.View.Prelude

data IndexView = IndexView { cinemas :: [Cinema]  }

instance View IndexView where
    html IndexView { .. } = [hsx|
        {breadcrumb}

        <h1>Cineflix<a href={pathTo NewCinemaAction} class="btn btn-primary ms-4">+ New</a></h1>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Cinema</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{forEach cinemas renderCinema}</tbody>
            </table>
            
        </div>
    |]
        where
            breadcrumb = renderBreadcrumb
                [ breadcrumbLink "Cinemas" CinemasAction
                ]

renderCinema :: Cinema -> Html
renderCinema cinema = [hsx|
    <tr>
        <td>{cinema}</td>
        <td><a href={ShowCinemaAction cinema.id}>Show</a></td>
        <td><a href={EditCinemaAction cinema.id} class="text-muted">Edit</a></td>
        <td><a href={DeleteCinemaAction cinema.id} class="js-delete text-muted">Delete</a></td>
    </tr>
|]
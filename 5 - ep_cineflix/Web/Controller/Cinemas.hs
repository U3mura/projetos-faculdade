module Web.Controller.Cinemas where

import Web.Controller.Prelude
import Web.View.Cinemas.Index
import Web.View.Cinemas.New
import Web.View.Cinemas.Edit
import Web.View.Cinemas.Show

instance Controller CinemasController where
    action CinemasAction = do
        cinemas <- query @Cinema |> fetch
        render IndexView { .. }

    action NewCinemaAction = do
        let cinema = newRecord
        render NewView { .. }

    action ShowCinemaAction { cinemaId } = do
        cinema <- fetch cinemaId
            >>= fetchRelated #agendamentos
        render ShowView { .. }

    action EditCinemaAction { cinemaId } = do
        cinema <- fetch cinemaId
        render EditView { .. }

    action UpdateCinemaAction { cinemaId } = do
        cinema <- fetch cinemaId
        cinema
            |> buildCinema
            |> ifValid \case
                Left cinema -> render EditView { .. }
                Right cinema -> do
                    cinema <- cinema |> updateRecord
                    setSuccessMessage "Cinema updated"
                    redirectTo EditCinemaAction { .. }

    action CreateCinemaAction = do
        let cinema = newRecord @Cinema
        cinema
            |> buildCinema
            |> ifValid \case
                Left cinema -> render NewView { .. } 
                Right cinema -> do
                    cinema <- cinema |> createRecord
                    setSuccessMessage "Cinema created"
                    redirectTo CinemasAction

    action DeleteCinemaAction { cinemaId } = do
        cinema <- fetch cinemaId
        deleteRecord cinema
        setSuccessMessage "Cinema deleted"
        redirectTo CinemasAction

buildCinema cinema = cinema
    |> fill @["nomeCinema", "localCinema"]
    |> validateField #nomeCinema nonEmpty
    |> validateField #localCinema nonEmpty
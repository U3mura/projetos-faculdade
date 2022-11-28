module Web.Controller.Agendamentos where

import Web.Controller.Prelude
import Web.View.Agendamentos.Index
import Web.View.Agendamentos.New
import Web.View.Agendamentos.Edit
import Web.View.Agendamentos.Show

instance Controller AgendamentosController where
    action AgendamentosAction = do
        agendamentos <- query @Agendamento |> fetch
        render IndexView { .. }

    action NewAgendamentoAction {cinemaId}= do
        let agendamento = newRecord
                |> set #cinemaId cinemaId
        cinema <- fetch cinemaId
        render NewView { .. }

    action ShowAgendamentoAction { agendamentoId } = do
        agendamento <- fetch agendamentoId
        render ShowView { .. }

    action EditAgendamentoAction { agendamentoId } = do
        agendamento <- fetch agendamentoId
        render EditView { .. }

    action UpdateAgendamentoAction { agendamentoId } = do
        agendamento <- fetch agendamentoId
        agendamento
            |> buildAgendamento
            |> ifValid \case
                Left agendamento -> do render EditView { .. }
                Right agendamento -> do
                    agendamento <- agendamento |> updateRecord
                    setSuccessMessage "Sessão updated"
                    redirectTo ShowCinemaAction { cinemaId = get #cinemaId agendamento}

    action CreateAgendamentoAction = do
        let agendamento = newRecord @Agendamento
        agendamento
            |> buildAgendamento
            |> ifValid \case
                Left agendamento -> do
                    cinema <- fetch (get #cinemaId agendamento)
                    render NewView { .. } 
                Right agendamento -> do
                    agendamento <- agendamento |> createRecord
                    setSuccessMessage "Sessão created"
                    redirectTo ShowCinemaAction { cinemaId = get #cinemaId agendamento}

    action DeleteAgendamentoAction { agendamentoId } = do
        agendamento <- fetch agendamentoId
        deleteRecord agendamento
        setSuccessMessage "Sessão deleted"
        redirectTo ShowCinemaAction { cinemaId = get #cinemaId agendamento}

buildAgendamento agendamento = agendamento
    |> fill @["cinemaId", "filme", "horarioSessao", "nomeCompleto"]
    |> validateField #nomeCompleto nonEmpty
    |> validateField #filme nonEmpty
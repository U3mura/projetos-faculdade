module Web.Types where

import IHP.Prelude
import IHP.ModelSupport
import Generated.Types

data WebApplication = WebApplication deriving (Eq, Show)


data StaticController = WelcomeAction deriving (Eq, Show, Data)

data CinemasController
    = CinemasAction
    | NewCinemaAction
    | ShowCinemaAction { cinemaId :: !(Id Cinema) }
    | CreateCinemaAction
    | EditCinemaAction { cinemaId :: !(Id Cinema) }
    | UpdateCinemaAction { cinemaId :: !(Id Cinema) }
    | DeleteCinemaAction { cinemaId :: !(Id Cinema) }
    deriving (Eq, Show, Data)

data AgendamentosController
    = AgendamentosAction
    | NewAgendamentoAction { cinemaId :: !(Id Cinema) }
    | ShowAgendamentoAction { agendamentoId :: !(Id Agendamento) }
    | CreateAgendamentoAction
    | EditAgendamentoAction { agendamentoId :: !(Id Agendamento) }
    | UpdateAgendamentoAction { agendamentoId :: !(Id Agendamento) }
    | DeleteAgendamentoAction { agendamentoId :: !(Id Agendamento) }
    deriving (Eq, Show, Data)

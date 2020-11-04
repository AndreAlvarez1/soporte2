import { Routes } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { ChatComponent } from './chat/chat.component';
import { DescargasComponent } from './descargas/descargas.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketComponent } from './ticket/ticket.component';
import { HorariosComponent } from './horarios/horarios.component';
import { AuthGuard } from '../guards/auth.guard';


export const rutasSoporte: Routes = [
  { path: 'stats', component: StatsComponent, canActivate: [ AuthGuard]},
  { path: 'chat/:sala/:ticket', component: ChatComponent, canActivate: [ AuthGuard]},
  { path: 'descargas', component: DescargasComponent, canActivate: [ AuthGuard]},
  { path: 'tickets', component: TicketsComponent, canActivate: [ AuthGuard]},
  { path: 'ticket/:id', component: TicketComponent, canActivate: [ AuthGuard]},
  { path: 'horarios', component: HorariosComponent, canActivate: [ AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];



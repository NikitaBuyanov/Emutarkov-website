import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// Pages used by the router
import { HomeComponent } from './module/pages/home/home.component'
import { ModsComponent } from './module/pages/mods/mods.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mods', component: ModsComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

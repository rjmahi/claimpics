import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { DesktopalertComponent } from './components/desktopalert/desktopalert.component';
import { SelectionComponent } from './components/selection/selection.component';
import { CaranglesComponent } from './components/carangles/carangles.component';
import { TakeaphotoComponent } from './components/takeaphoto/takeaphoto.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { AppComponent } from './app.component';
// import { ErrorComponent } from './components/error/error.component';
const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'intro/:c/:id', component: IntroComponent },
  { path: 'selection', component: SelectionComponent },
  { path: 'carangles/:photoId', component: CaranglesComponent },
  { path: 'takeaphoto', component: TakeaphotoComponent },
  { path: 'thankyou', component: ThankyouComponent },
  { path: 'desktopalert', component: DesktopalertComponent },
  // { path: 'error', component: ErrorComponent },
  // { path: '**', component: ErrorComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

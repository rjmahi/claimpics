import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IntroComponent } from './components/intro/intro.component';
import { DesktopalertComponent } from './components/desktopalert/desktopalert.component';
import { SelectionComponent } from './components/selection/selection.component';
import { CaranglesComponent } from './components/carangles/carangles.component';
import { TakeaphotoComponent } from './components/takeaphoto/takeaphoto.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LoginService } from './services/login.service';
import { HttpModule } from '@angular/http';
import { ImageCompressService, ResizeOptions, ImageUtilityService } from 'ng2-image-compress';
import { UserIdleModule } from 'angular-user-idle';
// import { ErrorComponent } from './components/error/error.component';
@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    DesktopalertComponent,
    SelectionComponent,
    CaranglesComponent,
    TakeaphotoComponent,
    ThankyouComponent,
    // ErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpModule,
    DeviceDetectorModule.forRoot(),
    UserIdleModule.forRoot({ idle: 600, timeout: 2, ping: 5 })

  ],
  providers: [LoginService, ImageCompressService, ResizeOptions, ImageUtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }

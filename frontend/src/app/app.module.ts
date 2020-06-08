import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// Components :
import { HeaderComponent } from './module/components/header/header.component';
import { FooterComponent } from './module/components/footer/footer.component';

// Pages :
import { HomeComponent } from './module/pages/home/home.component';
import { ModsComponent } from './module/pages/mods/mods.component';

// Modules :
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, ModsComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, AngularMaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

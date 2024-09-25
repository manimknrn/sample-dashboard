import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withRouterConfig } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      BrowserModule,
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 })]),
    provideClientHydration(),
    provideAnimations(), provideNativeDateAdapter(),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withHashLocation()),
    provideAnimationsAsync(), provideHttpClient(withInterceptorsFromDi())]
};

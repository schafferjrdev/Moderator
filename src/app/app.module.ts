import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LongpressDirective } from './longpress.directive';
import 'hammerjs';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { SwiperModule } from 'angular2-useful-swiper';

export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any> {
        'pinch': { enable: false },
        'rotate': { enable: false }
    }
}

import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatTabsModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatChipsModule,
  MatCardModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatRippleModule,
  MatProgressBarModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatStepperModule,
  MatAutocompleteModule
  
} from '@angular/material';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    LongpressDirective
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FlexLayoutModule,
    MatTabsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSelectModule,
    MatChipsModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSnackBarModule,
    MatStepperModule,
    SwiperModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig
        }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AsideControllerComponent } from './aside-controller/aside-controller.component';
import { BoardComponent } from './board/board.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ColumnComponent } from './column/column.component';
import { CardComponent } from './card/card.component';
import { StopAtComponent } from './stop-at/stop-at.component';
import { CardTitlePipe } from './pipes/card-title.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AsideControllerComponent,
    BoardComponent,
    ColumnComponent,
    CardComponent,
    StopAtComponent,
    CardTitlePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailListComponent } from './list/detail-list/detail-list.component';
import { EditComponent } from './list/edit/edit.component';
import { ListComponent } from './list/list.component';
import { DetailService } from './_services/detail.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HelpComponent } from './help/help.component';
@NgModule({
  declarations: [			
    AppComponent,
      ListComponent,
      DetailListComponent,
      EditComponent,
      LoginComponent,
      HelpComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [DetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { RemoveComponent } from './remove/remove.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServicesService } from './services.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PipeNamePipe } from './pipe/pipe-name.pipe';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    RemoveComponent,
    PipeNamePipe
    
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ServicesService,  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
  
})
export class CrudModule { }

import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdIconModule } from '@angular/material';
import { MdMenuModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdSlideToggleModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdAutocompleteModule } from '@angular/material';
import { MdRadioModule } from '@angular/material';
import { MdDatepickerModule } from '@angular/material';
import { MdNativeDateModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';

@NgModule({
    exports:
    [
        BrowserAnimationsModule, MdIconModule, MdMenuModule, MdButtonModule, 
        MdSlideToggleModule, MdDialogModule, MdInputModule, MdCheckboxModule, 
        MdAutocompleteModule, MdRadioModule, MdDatepickerModule, MdNativeDateModule,
        MdSelectModule
    ]
})

export class AngularMaterialModule { }

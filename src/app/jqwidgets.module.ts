import { NgModule } from '@angular/core';

import { jqxScrollViewComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxscrollview';

@NgModule({
    declarations:
    [
        jqxScrollViewComponent
    ],
    exports:
    [
        jqxScrollViewComponent
    ]
})

export class jQWidgetsModule { }

import { NgModule } from '@angular/core';

import { InkplanetSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [InkplanetSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [InkplanetSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class InkplanetSharedCommonModule {}

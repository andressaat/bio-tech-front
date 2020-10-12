import { NgModule } from '@angular/core';

import { DateFormatPipe } from './date-format.pipe';
import { DateTimeFormatPipe } from './date-time-format.pipe';

@NgModule({
    declarations: [DateTimeFormatPipe, DateFormatPipe],
    providers: [DateTimeFormatPipe, DateFormatPipe],
    exports: [DateTimeFormatPipe, DateFormatPipe]
})
export class SharedPipesModule { }

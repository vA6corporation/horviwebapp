import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { SuretyType } from '../sureties/surety-type.enum';

@Component({
    selector: 'app-dialog-create-sureties',
    standalone: true,
    imports: [MaterialModule, RouterModule],
    templateUrl: './dialog-create-sureties.component.html',
    styleUrl: './dialog-create-sureties.component.sass'
})
export class DialogCreateSuretiesComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        readonly tenderId: string,
    ) { }

    suretyType = SuretyType

}

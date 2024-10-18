import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuretiesService } from '../sureties.service';
import { SuretyModel } from '../surety.model';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-dialog-sureties',
    standalone: true,
    imports: [MaterialModule],
    templateUrl: './dialog-sureties.component.html',
    styleUrl: './dialog-sureties.component.sass'
})
export class DialogSuretiesComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly tenderId: string,
        private readonly suretiesService: SuretiesService,
    ) { }

    sureties: SuretyModel[] = []
    createSurety$: EventEmitter<void> = new EventEmitter()

    handleCreateSurety() {
        return this.createSurety$
    }

    onCreateSurety() {
        this.createSurety$.emit()
    }

    ngOnInit() {
        this.suretiesService.getSuretiesByTender(this.tenderId).subscribe(sureties => {
            this.sureties = sureties
        })
    }

}

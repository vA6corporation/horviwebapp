import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeacesService } from '../seaces.service';
import { SeaceModel } from '../seace.model';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-detail-seaces',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './dialog-detail-seaces.component.html',
  styleUrl: './dialog-detail-seaces.component.sass'
})
export class DialogDetailSeacesComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly seaceId: string,
        private readonly seacesService: SeacesService,
    ) { }

    seace: SeaceModel | null = null

    ngOnInit() {
        this.seacesService.getSeaceById(this.seaceId).subscribe(seace => {
            this.seace = seace
        })
    }

}

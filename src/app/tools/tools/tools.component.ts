import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { ImportBusinessesComponent } from '../import-businesses/import-businesses.component';
import { ImportPartnershipsComponent } from '../import-partnerships/import-partnerships.component';

@Component({
    selector: 'app-tools',
    standalone: true,
    imports: [
        MaterialModule,
        ImportBusinessesComponent,
        ImportPartnershipsComponent
    ],
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.sass']
})
export class ToolsComponent implements OnInit {

    constructor(
        private readonly navigationService: NavigationService,
    ) { }

    ngOnInit(): void {
        this.navigationService.setTitle('Herramientas');
    }

}

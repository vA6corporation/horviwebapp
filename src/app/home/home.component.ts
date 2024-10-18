import { Component } from '@angular/core';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

    constructor(
        private readonly navigationService: NavigationService,
    ) { }

    ngOnInit() {
        this.navigationService.setTitle('Fiderly')
    }

}

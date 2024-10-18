import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { ConstructionsService } from 'src/app/constructions/constructions.service';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-dialog-construction-businesses',
  templateUrl: './dialog-construction-businesses.component.html',
  styleUrls: ['./dialog-construction-businesses.component.sass']
})
export class DialogConstructionBusinessesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly businessId: string,
    private readonly constructionsService: ConstructionsService,
    private readonly navigationService: NavigationService,
  ) { }

  public constructions: ConstructionModel[] = [];

  ngOnInit(): void {
    this.constructionsService.getConstructionsByBusiness(this.businessId).subscribe(constructions => {
      this.constructions = constructions;
      if (this.constructions.length === 0) {
        this.navigationService.showMessage('Sin resultados');        
      }
    }, (error: HttpErrorResponse) => {
      this.navigationService.showMessage(error.error.message);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {

  public turnos: any;
  public data = [];
  constructor(
    private api: ApiserviceService,
    // private loading: LoadingService,
    private storage: StorageService,
    private router: Router
  ) { }

  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
  this.api.all('turnos').subscribe(turnos => {
      this.data = turnos.data;
      this.turnos = turnos.data;      
      console.log('Show me',this.turnos);
    });    
  }

  gototurnos(turnos: any): void {
      console.log(turnos)      
      this.storage.save('__turnos', turnos);
      this.router.navigate(['/turnosnew', turnos.id]);
    }

}

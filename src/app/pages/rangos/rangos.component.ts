import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
'@angular/forms';
declare var $ : any;

const { server } = environment;

import Swal from 'sweetalert2';

@Component({
  selector: 'app-rangos',
  templateUrl: './rangos.component.html',
  styleUrls: ['./rangos.component.scss']
})

export class RangosComponent implements OnInit {
  title = 'angularpopupform';
  formdata;
  public rangos : any;
  public data = [];
    
  constructor(
    private api: ApiserviceService,
    // private loading: LoadingService,
    private storage: StorageService,
    private router: Router
  ) { }

  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.formdata = new FormGroup({
      Fname : new FormControl("", [Validators.required])
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.api.all('rangos').subscribe(rangos => {
      this.data = rangos.data;
      this.rangos = rangos.data;            
    });    
  }

  goToCategory(category: any): void {
    this.storage.save('__rangos', category);
    this.router.navigate(['/admin/parametros/categoria', category.id]);
  }

  setCategory(rangos: any): void {
    this.rangos = rangos;
  }

  gotorangos(rangosid: any): void {    
    this.storage.save('__rangos', rangosid);
    this.router.navigate(['/rangosnew', rangosid.id]);
  }

  delete(id: number, posicion: number): void {
    this.api.delete(`rangos/${id}`).subscribe(() => {
      this.rangos.map(item => {
        if (item.id === id) {
          this.confirmar()
          this.rangos.splice(posicion,1)
          this.router.navigate(['/rangos']);
        }
      });
    });
  }

  anular(rangosId: any, indexOfElement: number) {
    
    Swal.fire({
      title: '¿Estas seguro?',
      html: `¡Esto eliminará el registro con id <strong>#${rangosId}</strong>!`,
      icon: 'warning',
      // input: 'textarea',
      // inputPlaceholder: 'Ingrese por favor el motivo ...',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrarlo!',
      cancelButtonText: 'Cancelar'})
    //   inputValidator: (value) => {
    //     console.log(value.trim().length);
    //     return new Promise((resolve) => {
    //       if (value.trim().length !== 0 && !(value.trim().length < 10)) {
    //         resolve();
    //       } else {
    //         if (value.trim().length === 0) {
    //           resolve('El motivo es obligatoria :)');
    //         } else if (value.trim().length < 10) {
    //           resolve('La observación debe contener al menos 10 caractares :)');
    //         }
    //       }
    //     });
    //   },
    // })
      .then((result) => {
        if (result.isConfirmed) {
          this.delete(rangosId, indexOfElement)
        } else if (result.isDismissed) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private confirmar(){
    Swal.fire({
      title: '!Borrar registro!',
      text: '¡El registro ha sido eliminado!',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

}

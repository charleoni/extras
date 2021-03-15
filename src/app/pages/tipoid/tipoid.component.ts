import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from './../../services/apiservice.service'
import { StorageService } from './../../services/storage.service';
import { environment } from '../../../environments/environment';
'@angular/forms';
declare var $ : any;

const { server } = environment;

import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tipoid',
  templateUrl: './tipoid.component.html',
  styleUrls: ['./tipoid.component.scss']
})

export class TipoidComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  public tiposid: any;
  data : any;

  constructor(
    private api: ApiserviceService,
    // private loading: LoadingService,
    private storage: StorageService,
    private router: Router
  ) { }
    
  ngOnInit(): void {  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
      }
      
    };

    this.api.all('tipoidentificacion').subscribe(tiposid => {
      //this.data = tiposid.data;
      this.tiposid = tiposid.data;      
      this.dtTrigger.next();
    });        

  }     

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  goToCategory(category: any): void {
    this.storage.save('__tipoid', category);
    this.router.navigate(['/admin/parametros/categoria', category.id]);
  }

  setCategory(tiposid: any): void {
    this.tiposid = tiposid;
  }

  gototipoid(tipoid: any): void {
      console.log(tipoid)      
      this.storage.save('__tipoid', tipoid);
      this.router.navigate(['/tipoidnew', tipoid.id]);
    }

  delete(id: number, posicion: number): void {
    this.api.delete(`tipoidentificacion/${id}`).subscribe(() => {
      this.tiposid.map(item => {
        if (item.id === id) {
          this.confirmar()
          this.tiposid.splice(posicion,1)
          this.router.navigate(['/tipoid']);
        }
      });
    });
  }

  anular(editarialId: any, indexOfElement: number) {
    
    Swal.fire({
      title: '¿Estas seguro?',
      html: `¡Esto eliminará el registro con id <strong>#${editarialId}</strong>!`,
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
          this.delete(editarialId, indexOfElement)
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

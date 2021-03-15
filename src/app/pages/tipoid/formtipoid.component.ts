import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formtipoid',
  templateUrl: './formtipoid.component.html',
  styleUrls: ['./formtipoid.component.scss']
})
export class FormtipoidComponent implements OnInit {
  public form : FormGroup
  public btnName = "Guardar"
  public validationFormMessage = {
	descripcion : [
			{
				type: 'required',
				message: 'Nombre tipo de identificación es obligatorio',
			},
		],
}
	title: string;
	id: number;

  constructor(private formBuilder: FormBuilder,private httpService: ApiserviceService, 
            private route: ActivatedRoute,private storage: StorageService,private router: Router) {
              this.form = this.formBuilder.group({
                descripcion: ['', [Validators.required]],        
              })

	  this.title = 'Nuevo Tipo de identificación';
    const id = this.route.snapshot.paramMap.get('id');	
    if (id) {		
      this.title = 'Modificar Tipo de identificación';
	    this.btnName = "Actualizar"
      this.id = Number(id);
      const { descripcion } = this.storage.read('__tipoid');
      this.form.patchValue({ descripcion });
    }
  }

  ngOnInit(): void {    

  } 
  
  saveForm(){
      console.log('Dentro de formulario',this.form.value)
      if(!this.form.valid){
        console.log(`Error de validación`)
        this.form.markAllAsTouched()
        return
      }
    
	    if (this.id) {
		    const object = {
			    id: this.id,
			    ...this.form.value
		    }
        console.log("update");
		    this.httpService.update(`tipoidentificacion`, object).subscribe(resp => {			  
			  this.confirmar();        
        this.router.navigate(['/tipoid']);
		    })
      } else {
        console.log("create");
        this.httpService.create('tipoidentificacion', this.form.value).subscribe(resp => {			
			  this.confirmar();        
		  })
      this.router.navigate(['/tipoid']);
    }    
  }

  /**
	 * Metodo q valida los campos de los formularios
	 * @param field = campo a validar
	 * @param validationType tipo de validacion a mostrar mensaje de error
	 * @returns devuelve boolean
	 */
	isValid(field: string, validationType: string) {
		const f = this.form.get(field)
		return f.hasError(validationType) && (f.dirty || f.touched)
	}

  grabar() {    
    Swal.fire({
      title: '¿Estas seguro?',
      html: `¡Deseas grabar el registro</strong>!`,
      icon: 'warning',
      // input: 'textarea',
      // inputPlaceholder: 'Ingrese por favor el motivo ...',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Grabar!',
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
          this.saveForm()
        } else if (result.isDismissed) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private confirmar(){
    Swal.fire({
      title: '!Guardar registro!',
      text: '¡El registro ha sido guardado!',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }
}

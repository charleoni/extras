import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formturnos',
  templateUrl: './formturnos.component.html',
  styleUrls: ['./formturnos.component.scss']
})
export class FormturnosComponent implements OnInit {
    public form : FormGroup
  public btnName = "Guardar"
  public validationFormMessage = {
	  codigoth: [
			{
				type: 'required',
				message: 'Código de turno  es requerido',
			},
		],
    dia: [
			{
				type: 'required',
				message: 'Día de la semana es requerido',
			},
      {
				type: 'max',
				message: 'Cantidad minima es 7',
			},
      {
				type: 'min',
				message: 'Cantidad minima es 1',
			},
		],
    horaEntrada: [
			{
				type: 'required',
				message: 'Hora de ingreso es requerida',
			},
		],
    horaSalida: [
			{
				type: 'required',
				message: 'Hora de salida es requerida',
			},
		],    
    horaIniDescanso: [
			{
				type: 'required',
				message: 'Hora de inicio de descanso es requerida',
			},
		],  
    horaFinDescanso: [
			{
				type: 'required',
				message: 'Hora de fin  descanso es requerida',
			},
		],    
    observaciones: [
			{
				type: 'required',
				message: 'Observaciones son requeridas',
			},
		],    
}
	title: string;
	id: number;
  constructor(private formBuilder: FormBuilder,private httpService: ApiserviceService, 
            private route: ActivatedRoute,private storage: StorageService,private router: Router) { 
            this.form = this.formBuilder.group({
              codigoth: ['', [Validators.required]],
              dia: ['', [Validators.required, Validators.max(7), Validators.min(1)]],
              horaEntrada: ['', [Validators.required]],
              horaSalida: ['', [Validators.required]],              
              horaIniDescanso: ['', [Validators.required]],
              horaFinDescanso: ['', [Validators.required]],
              observaciones: ['', [Validators.required]],              
    })
    this.title = 'Nuevo Turno';
    const id = this.route.snapshot.paramMap.get('id');	
    if (id) {		
      this.title = 'Modificar Turno';
	  this.btnName = "Actualizar"
      this.id = Number(id);
      const { codigoth, dia, horaEntrada, horaSalida, horaIniDescanso, horaFinDescanso, observaciones } = this.storage.read('__turnos');
      this.form.patchValue({ codigoth, dia, horaEntrada, horaSalida, horaIniDescanso, horaFinDescanso, observaciones });
    }  
  }

  ngOnInit(): void {
  }

  saveForm(){    
    
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
    console.log('Objeto', object)
		this.httpService.update(`turnos`, object).subscribe(resp => {
			this.router.navigate(['/turnos']);
			this.confirmar();
		})
      } else {
        console.log('Objeto', this.form.value)
        this.httpService.create('turnosnew', this.form.value).subscribe(resp => {			
			this.confirmar();
		})
      }
    
  	}

    Cancelar(){

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

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators,  } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { NavigationService } from '../../services/navigation.service';
import { NotificationService } from '../../services/notification.service';
import { UserPreferenceService } from '../../services/user-preference.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

declare var $: any;

interface ElementCombo {
  nombre: string;
  checked: number;
}

@Component({
  selector: 'app-user-preferences',
  standalone: true,
  imports: [CommonModule
            , MatDatepickerModule
            , MatNativeDateModule
            , MatInputModule
            , MatSelectModule
            , FormsModule
            , MatCheckboxModule
            , MatRadioModule
            , MatIcon
            , MatDialogContent
            , MatDialogActions
            , ReactiveFormsModule 
          ],
  templateUrl: './user-preferences.component.html',
  styleUrl: './user-preferences.component.less'
})
export class UserPreferencesComponent implements OnInit {
  @ViewChild('infoModalTemplate') infoModalTemplate!: TemplateRef<any>;
  modalTitle!: string;
  modalContent!: string;

  userId: any;
  userPreferenceForm!: FormGroup;

  sexOptions: string[] = ['No Selección', 'Hombre', 'Mujer'];
  activityOptions: string[] = ['No Selección', 'Sedentario', 'Actividad ligera', 'Moderado', 'Intensa', 'Muy intensa'];
  dietOptions: string[] = ['Mediterránea', 'Vegano', 'Ovolacteovegetariano', 'Adelgazamiento'];

  selectedDate: Date | null = null;

  // Variable para almacenar la dieta seleccionada
  selectedDietType: string = 'No Selección'; // Valor inicial por defecto

  allergies: { nombre: string, checked: number }[] = [];
  healthConditions: { nombre: string, checked: number }[] = [];

  userPreference: any = {
    alturaNbr: '',
    pesoNbr: '',
    sexo: '',
    fechaNacimientoDte: '',
    idTipoEjercicio: '',
    tipoEjercicioNombre: '',
    idTipoDieta: '',
    tipoDietaNombre: '',
    healthConditions: [] ,//as ElementCombo[],  // Tipamos el array correctamente
    allergies: [] ,//as ElementCombo[]
  };
  constructor(public dialog: MatDialog
                , public navService: NavigationService
                , private userPreferenceService: UserPreferenceService
                , private fb: FormBuilder
                , private notificationService: NotificationService
                ) {
    this.selectedDate = new Date(); // Inicializa con la fecha actual si lo deseas
    this.userId = localStorage.getItem('userId');
  }
  
  ngOnInit(): void {
    this.initForm();    
    this.fetchUserPreferences(this.userId);
  }

  initForm(): void {
    this.userPreferenceForm = this.fb.group({
      alturaNbr: ['', Validators.required],
      pesoNbr: ['', Validators.required],
      sexo: ['', Validators.required],
      fechaNacimientoDte: ['', Validators.required],
      idTipoEjercicio: ['', Validators.required],
      tipoEjercicioNombre: ['', Validators.required],
      idTipoDieta: ['', Validators.required],
      tipoDietaNombre: ['', Validators.required],
      healthConditions: this.fb.array([], Validators.required), // Validador requerido para problemas de salud
      allergies: this.fb.array([], Validators.required) // Validador requerido para alergias
    });
  }

  get healthConditionsArray(): FormArray {
    return this.userPreferenceForm.get('healthConditions') as FormArray;
  }
  get allergiesArray(): FormArray {
    return this.userPreferenceForm.get('allergies') as FormArray;
  }

  fetchUserPreferences(userId: number) : void {
      this.userPreferenceService.getUserPreferenceWithDetails(userId)
        .pipe(
          tap(data => {
            this.userPreferenceForm.patchValue(data.userPreference);
            // PROBLEMAS DE SALUD
            const combinedProblemasSalud = data.problemasSalud.map((problema: { idtmProblemasSalud: any; }) => {
              var checked = 0;
              const activatedProblema = data.activoProblemasSalud.find((ap: { idtmProblemasSalud: any; }) => ap.idtmProblemasSalud === problema.idtmProblemasSalud);
              if (activatedProblema != undefined) {
                checked = activatedProblema.habilitado.data[0];
              }
              return {
                ...problema,
                checked: checked
              };              
            });

            // PROBLEMAS DE SALUD
            const combinedAlergias = data.alergias.map((alergia: { idtmAlergia: any; }) => {
              var checked = 0;
              const activatedAlergia = data.activoAlergias.find((ap: { idtmAlergia: any; }) => ap.idtmAlergia === alergia.idtmAlergia);
              if (activatedAlergia != undefined) {
                checked = activatedAlergia.habilitado.data[0];
              }
              return {
                ...alergia,
                checked: checked
              };              
            });
        
            this.setHealthConditions(combinedProblemasSalud);
            this.setAllergies(combinedAlergias);
          }),
          catchError(error => {
            this.notificationService.showNotification('error', 'Error ', error.error.error);
            return throwError(error); // Re-throw the error to keep it observable chain
          })
        )
        .subscribe();
  }

  setHealthConditions(conditions: any[]): void {
    const healthConditionsFGs = conditions.map(condition =>
      this.fb.group({
        checked: condition.checked,
        nombre: condition.nombre,
        id: condition.idtmProblemasSalud
      }));
    const healthConditionsFormArray = this.fb.array(healthConditionsFGs);
    this.userPreferenceForm.setControl('healthConditions', healthConditionsFormArray);
  }

  setAllergies(allergies: any[]): void {
    const allergiesFGs = allergies.map(allergie =>
      this.fb.group({
        checked: allergie.checked,
        nombre: allergie.nombre,
        id: allergie.idtmAlergia
      }));
    const allergiesFormArray = this.fb.array(allergiesFGs);
    this.userPreferenceForm.setControl('allergies', allergiesFormArray);
  }

  saveUserPreference(): void {
    const userId = this.userId; // Reemplaza con el ID del usuario actual
    if (this.userPreferenceForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    const preferences = this.userPreferenceForm.value;

    this.userPreferenceService.saveUserPreference(userId, preferences)
      .pipe(
        tap(response => {
          this.notificationService.showNotification('success', 'Actualizado', response.message);
        }),
        catchError(error => {
          this.notificationService.showNotification('error', 'Error ', error.error.error);
          return throwError(error); // Re-throw the error to keep the observable chain
        })
      )
      .subscribe();
  }
  
  openInfoModal(): void {
      this.modalTitle = 'Nivel de Actividad';
      this.modalContent = 'Aquí va la explicación del nivel de actividad.';
      const dialogRef = this.dialog.open(this.infoModalTemplate);
  }

  closeModal() {
    this.dialog.closeAll();
  }
}

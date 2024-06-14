import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

import { NavigationService } from '../services/navigation.service';
import { UserPreferenceService } from '../services/user-preference.service';

import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
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
          ],
  templateUrl: './user-preferences.component.html',
  styleUrl: './user-preferences.component.less'
})
export class UserPreferencesComponent implements OnInit {
  @ViewChild('infoModalTemplate') infoModalTemplate!: TemplateRef<any>;
    modalTitle!: string;
    modalContent!: string;

  //selectedDate: Date;
  //selectedOption: string;
  sexOptions: string[] = ['No Selección', 'Hombre', 'Mujer'];
  activityOptions: string[] = ['No Selección', 'Sedentario', 'Actividad ligera', 'Moderado', 'Intensa', 'Muy intensa'];
  dietOptions: string[] = ['Mediterránea', 'Vegano', 'Ovolacteovegetariano', 'Adelgazamiento'];


  selectedDate: Date | null = null;

  // Variable para almacenar la dieta seleccionada
  selectedDietType: string = 'No Selección'; // Valor inicial por defecto

  allergies: { nombre: string, checked: number }[] = [];
  healthConditions: { nombre: string, checked: number }[] = [];


  // userPreference!: { alturaNbr: number; pesoNbr: number; sexo: string; fechaNacimientoDte: Date;
  //    idTipoEjercicio: number; tipoEjercicioNombre: string; idTipoDieta: number; tipoDietaNombre: string; };

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
  constructor(public dialog: MatDialog, public navService: NavigationService
    , private userPreferenceService: UserPreferenceService) {
    this.selectedDate = new Date(); // Inicializa con la fecha actual si lo deseas
    //this.selectedOption = this.sexOptions[0]; // Inicializa con la primera opción

    
  }
  
  ngOnInit(): void {
    this.fetchUserPreferences();
  }
  fetchUserPreferences() : void {
    const userId = 1; // Reemplaza con el ID del usuario actual
      this.userPreferenceService.getUserPreferenceWithDetails(userId)
        .pipe(
          tap(data => {
            console.log("data", data)
            this.userPreference = data.userPreference;

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
            this.userPreference.healthConditions = combinedProblemasSalud;
            //this.healthConditions = combinedProblemasSalud;

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
            this.userPreference.allergies = combinedAlergias;

            console.log('User preference data fetched:', data);
          }),
          catchError(error => {
            console.error('Error fetching user preference data', error);
            return throwError(error); // Re-throw the error to keep it observable chain
          })
        )
        .subscribe();
  }

  saveUserPreference(): void {
    const userId = 1; // Reemplaza con el ID del usuario actual
    const preferences = this.userPreference;//this.userPreferenceForm.value;
console.log(preferences)
    this.userPreferenceService.saveUserPreference(userId, preferences)
      .pipe(
        tap(response => {
          console.log('User Preference saved successfully:', response);
        }),
        catchError(error => {
          console.error('Error saving User Preference:', error);
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

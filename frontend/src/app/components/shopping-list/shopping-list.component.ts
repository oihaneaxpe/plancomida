import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenu } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogActions, MatDialogContainer, MatDialogContent } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';

import { NavigationService } from '../../services/navigation.service';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipeService } from '../../services/recipe.service';

import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule
    , MatIconModule
    , MatMenu
    , FormsModule
    , MatCardModule
    , MatFormFieldModule
    , MatInputModule
    , MatCheckboxModule
    , MatButtonModule
    , MatListModule
    , MatDialogContainer
    , MatDialogActions
    , MatDialogContent
    , MatSidenavModule
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.less'
})
export class ShoppingListComponent implements OnInit {

  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  @ViewChild('confirmClearDialog') confirmClearDialog!: TemplateRef<any>;

  constructor(public dialog: MatDialog, public navService: NavigationService
    , private shoppingListService: ShoppingListService, private recipeService: RecipeService) { }

  shoppingListVisible: boolean = true;
  newItem: string = '';
  confirmDialogVisible: boolean = false;
  confirmClearDialogVisible: boolean = false;
  confirmIndex!: number;
  shoppingList: { item: string, checked: boolean }[] = [];

  sidebarVisible = false;

  ngOnInit(): void {
    this.fetchShoppingList(1);//todo
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  viewShoppingList() {
    this.shoppingListVisible = true;
  }

  closeShoppingList() {
    this.shoppingListVisible = false;
  }

  fetchShoppingList(userId: number): void {
    this.shoppingListService.getAllShoppingList(userId)
      .pipe(
        tap(data => {
          this.shoppingList = data;
          console.log('Shopping list fetched:', data);
        }),
        catchError(error => {
          console.error('Error fetching shopping list:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }

  saveShoppingList(): void {
    console.log(this.shoppingList)
    this.deleteShoppingList(1); // todo
    this.addShoppingList(1); // todo
  }
  addShoppingList(userId: number): void {
    this.shoppingListService.saveShoppingList(userId, this.shoppingList)
      .pipe(
        tap(response => {
          console.log('Shopping list saved successfully:', response);
        }),
        catchError(error => {
          console.error('Error saving shopping list:', error);
          return throwError(error); // Re-throw the error to keep the observable chain
        })
      )
      .subscribe();
  }

  deleteShoppingList(userId: number): void {
    this.shoppingListService.deleteShoppingList(userId)
      .pipe(
        tap(response => {
          console.log('Shopping list removed successfully:', response);
        }),
        catchError(error => {
          console.error('Error removing shopping list:', error);
          return throwError(error); // Re-throw the error to keep the observable chain
        })
      )
      .subscribe();
  }

  addItem() {
    if (this.newItem.trim()) {
      this.shoppingList.push({ item: this.newItem.trim(), checked: false });
      this.newItem = '';
    }
  }
 
  openConfirmRemoveDialog(index: number) {
    this.confirmIndex = index;
    this.dialog.open(this.confirmDialog);
  }

  confirmRemoveItem() {
    if (this.confirmIndex !== null) {
      this.shoppingList.splice(this.confirmIndex, 1);
      this.dialog.closeAll();
      this.confirmIndex = -1;
    }
  }

  cancelRemoveItem() {
    this.dialog.closeAll();
    this.confirmIndex = -1;
  }

  openConfirmClearDialog() {
    this.dialog.open(this.confirmClearDialog);
  }

  confirmClearShoppingList() {
    this.shoppingList = [];
    this.dialog.closeAll();
  }

  cancelClearShoppingList() {
    this.dialog.closeAll();
  }
  generateShoppingList() {
    // Lógica para generar automáticamente la lista de la compra
    this.fetchAllIngredientsForFoodPaln(1);
  }

  fetchAllIngredientsForFoodPaln(userId: number): void {
    this.recipeService.getAllIngredients(userId)
      .pipe(
        tap(data => {
          this.shoppingList = data;
          console.log('All ingredients:', this.shoppingList);
        }),
        catchError(error => {
          console.error('Error fetching food plan ingredients:', error);
          return throwError(error); // Re-throw the error to keep it observable chain
        })
      )
      .subscribe();
  }
}
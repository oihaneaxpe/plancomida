export interface Recipe {
    idtmReceta: number;
    titulo: string;
    tiempoPreparacionNbr: number;
    cantidadComensalNbr: number;
    idCategoria: number;
    idDificultad: number;
    baja: boolean;
    categoriaNombre: string;
    dificultadNombre: string;
    imageUrl: string;
  }
  
  export interface RecipeSearchCriteria {
    searchQuery: string;
    selectedCategories: string[];
    selectedDifficulties: string[];
    selectedMoment: string[];
  }
  
  export interface RecipeIngredient {
    idtmIngrediente: number,
    nombre: string;
    idReceta: number
  }
  export interface RecipeStep {
    idtmIngrediente: number,
    nombre: string;
    idReceta: number
  }
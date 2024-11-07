interface CategoryType {
    id: string;
    categoryName: string;
}

interface StepType {
    id: string;
    stepNumber: number;
    text: string;
}

interface IngredientType {
    id: string;
    ingredientName : string;
    imageUrl?: string;
}

interface ToolType {
    id: string;
    toolName: string;
    imageUrl?: string;
}

interface IngredientRecipeType {
    id: string;
    quantity: number;
    unit: string;
    ingredient: IngredientType
    
}

interface ToolRecipeType {
    id: string;
    tool: ToolType  
}

interface RecipeWithCategoryAndDetails {
    id: string;
    name: string;
    preparationTime: number;
    isVegan : boolean;
    isHealthy : boolean;
    description: string;
    categoryId: string;
    imageUrl?: string;
    category: CategoryType;
    steps: StepType[];
    ingredients: IngredientRecipeType[];
    tools: ToolRecipeType[];

}

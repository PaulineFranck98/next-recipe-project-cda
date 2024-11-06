interface CategoryType {
    id: string;
    categoryName: string;
}

interface StepType {
    id: string;
    stepNumber: number;
    text: string;
}

interface IngredientRecipeType {
    id: string;
    ingredientName: string;
    quantity: number;
    unit: string;
}

interface ToolRecipeType {
    id: string;
    toolName: string;
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
interface UserType {
    id: string;
    username: string;
    email: string;
    role: "USER" | "ADMIN"; 
}


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

interface ThemeType {
    id: string;
    themeName: string;
}

interface ThemeArticleType {
    id: string;
    theme: ThemeType;
}

interface ArticleCommentType {
    id: string;
    commentText: string;
    creationDate: Date;
    user: UserType
}

interface ArticleWithCommentsAndThemes {
    id: string;
    title: string;
    publicationDate: Date;
    content: string;
    user: UserType;
    comments: ArticleCommentType[];
    themes: ThemeArticleType[];
}

declare global {
    interface ResourceItem {
        id: string;
        name: string;
        description: string;
        icon?: string;
        use?: boolean;
        url: string;
        pros?: string[];
        cons?: string[];
        pricing?: string;
        tags?: string[];
        quizzTags?: string[];
        logo?: string;
    }

    interface Subcategory {
        id: string;
        name: string;
        hasQuizz: boolean;
        description: string;
        itemRefs: string[]; // References to items instead of containing them directly
    }

    interface Category {
        id: string;
        name: string;
        hasQuizz: boolean;
        description: string;
        icon: string;
        cta?: string;
        subcategories: Subcategory[];
    }

    interface ResourcesData {
        items: ResourceItem[]; // Collection of all unique items
        categories: Category[];
    }
}


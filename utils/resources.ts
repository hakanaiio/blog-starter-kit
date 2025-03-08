import resourcesJson from '~/utils/resources.json'

// Cast the imported JSON with the appropriate type
const resourcesData = resourcesJson as unknown as ResourcesData

export const useResources = () => {
    /**
     * Get all categories
     */
    const getAllCategories = (): Category[] => {
        return resourcesData.categories
    }

    const whatIUse = (): ResourceItem[] => {
        return resourcesData.items.filter(item => item.use)
    }

    /**
     * Get a category by its ID
     */
    const getCategoryById = (id: string): Category | undefined => {
        return resourcesData.categories.find(category => category.id === id)
    }

    /**
     * Get subcategories of a category
     */
    const getSubcategoriesByCategoryId = (categoryId: string): Subcategory[] => {
        const category = getCategoryById(categoryId)
        return category ? category.subcategories : []
    }

    /**
     * Get a specific subcategory
     */
    const getSubcategoryById = (categoryId: string, subcategoryId: string): Subcategory | undefined => {
        const subcategories = getSubcategoriesByCategoryId(categoryId)
        return subcategories.find(sub => sub.id === subcategoryId)
    }

    /**
     * Get all items
     */
    const getAllItems = (): ResourceItem[] => {
        return resourcesData.items
    }

    /**
     * Get a specific item by ID
     */
    const getItemById = (itemId: string): ResourceItem | undefined => {
        return resourcesData.items.find(item => item.id === itemId)
    }

    const isCategory = (anIdThatWeDontKnowYetItsNature: string): boolean => {
        return getCategoryById(anIdThatWeDontKnowYetItsNature) !== undefined
    }

    const isSubcategory = (anIdThatWeDontKnowYetItsNature: string): boolean => {
        return getSubcategoryById(anIdThatWeDontKnowYetItsNature, anIdThatWeDontKnowYetItsNature) !== undefined
    }

    const getAllItemsByCategoryOrSubcategory = (anIdThatWeDontKnowYetItsNature: string): ResourceItem[] => {

        const category = getCategoryById(anIdThatWeDontKnowYetItsNature)
        if (!category) {
            return getItemsBySubcategoryId(anIdThatWeDontKnowYetItsNature)
        } else {
            return getAllItemsByCategory(anIdThatWeDontKnowYetItsNature)
        }
    }


    const getAllItemsByCategory = (categoryId: string): ResourceItem[] => {
        const category = getCategoryById(categoryId)

        return category?.subcategories.flatMap(subcategory => {
            return subcategory.itemRefs
                .map(itemId => getItemById(itemId))
                .filter((item): item is ResourceItem => item !== undefined)
        })
    }

    /**
     * Get items for a subcategory using only the subcategory ID, without needing to know the parent category
     */
    const getItemsBySubcategoryIdOnly = (subcategoryId: string): ResourceItem[] => {
        // Search through all categories to find the subcategory with this ID
        for (const category of resourcesData.categories) {
            const subcategory = category.subcategories.find(sub => sub.id === subcategoryId)
            if (subcategory) {
                // Found the subcategory, return its items
                return subcategory.itemRefs
                    .map(itemId => getItemById(itemId))
                    .filter((item): item is ResourceItem => item !== undefined)
            }
        }

        // If no matching subcategory was found, return an empty array
        return []
    }

    /**
     * Get items for a subcategory by resolving the references
     */
    const getItemsBySubcategoryId = (categoryId: string, subcategoryId: string): ResourceItem[] => {
        const subcategory = getSubcategoryById(categoryId, subcategoryId)
        if (!subcategory) return []

        return subcategory.itemRefs
            .map(itemId => getItemById(itemId))
            .filter((item): item is ResourceItem => item !== undefined)
    }

    /**
     * Get items that belong to multiple subcategories
     */
    const getItemsInMultipleSubcategories = (): ResourceItem[] => {
        // Create a map to count occurrences of each item
        const itemOccurrences = new Map<string, number>()

        resourcesData.categories.forEach(category => {
            category.subcategories.forEach(subcategory => {
                subcategory.itemRefs.forEach(itemId => {
                    const count = itemOccurrences.get(itemId) || 0
                    itemOccurrences.set(itemId, count + 1)
                })
            })
        })

        // Get items that appear in more than one subcategory
        return Array.from(itemOccurrences.entries())
            .filter(([_, count]) => count > 1)
            .map(([itemId]) => getItemById(itemId))
            .filter((item): item is ResourceItem => item !== undefined)
    }

    /**
     * Get all subcategories containing a specific item
     */
    const getSubcategoriesContainingItem = (itemId: string): { category: Category; subcategory: Subcategory }[] => {
        const result: { category: Category; subcategory: Subcategory }[] = []

        resourcesData.categories.forEach(category => {
            category.subcategories.forEach(subcategory => {
                if (subcategory.itemRefs.includes(itemId)) {
                    result.push({ category, subcategory })
                }
            })
        })

        return result
    }

    /**
     * Search resources by keyword
     */
    const searchResources = (query: string): ResourceItem[] => {
        const lowerCaseQuery = query.toLowerCase()

        return resourcesData.items.filter(item =>
            item.name.toLowerCase().includes(lowerCaseQuery) ||
            item.description.toLowerCase().includes(lowerCaseQuery) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)))
        )
    }

    /**
     * Get items by tag
     */
    const getItemsByTag = (tag: string): ResourceItem[] => {
        return resourcesData.items.filter(item =>
            item.tags && item.tags.includes(tag)
        )
    }

    return {
        getItemsBySubcategoryIdOnly,
        isCategory,
        isSubcategory,
        getAllItemsByCategoryOrSubcategory,
        getAllItemsByCategory,
        getAllCategories,
        getCategoryById,
        getSubcategoriesByCategoryId,
        getSubcategoryById,
        getAllItems,
        getItemById,
        getItemsBySubcategoryId,
        getItemsInMultipleSubcategories,
        getSubcategoriesContainingItem,
        searchResources,
        getItemsByTag,
        whatIUse
    }
}
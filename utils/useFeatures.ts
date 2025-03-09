import features from '~/utils/features.json'
import { useResources } from '~/utils/resources'
const { getSubcategoriesContainingItem } = useResources()
export default function useFeatures() {
    const featuresData = features as FeaturesData

    const getCategoriesForDomain = (domain: string): FeatureCategory[] => {
        return featuresData[domain]?.categories || []
    }

    const getAllFeaturesForDomain = (domain: string): string[] => {
        const categories = getCategoriesForDomain(domain)
        const allFeatures: string[] = []

        categories.forEach(category => {
            category.features.forEach(feature => {
                if (!allFeatures.includes(feature)) {
                    allFeatures.push(feature)
                }
            })
        })

        return allFeatures
    }

    const getDomainFromCategories = (itemId: string): string => {
        const locations = getSubcategoriesContainingItem(itemId)

        for (const location of locations) {
            const categoryId = location.category.id
            const subcategoryId = location.subcategory.id
            const domain = `${categoryId}.${subcategoryId}`
            return domain
        }

        return 'general'
    }



    const isFeatureInCategory = (feature: string, domain: string, categoryId: string): boolean => {
        const categories = getCategoriesForDomain(domain)
        const category = categories.find(cat => cat.id === categoryId)
        return category ? category.features.includes(feature) : false
    }

    const getCategoryForFeature = (feature: string, domain: string): FeatureCategory | null => {
        const categories = getCategoriesForDomain(domain)
        return categories.find(category => category.features.includes(feature)) || null
    }

    return {
        getDomainFromCategories,
        getCategoriesForDomain,
        featuresData,
        getCategoriesForDomain,
        getAllFeaturesForDomain,
        isFeatureInCategory,
        getCategoryForFeature
    }
}
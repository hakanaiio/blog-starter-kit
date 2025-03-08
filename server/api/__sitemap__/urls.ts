import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '#sitemap/types'
import { useResources } from '~/utils/resources'

export default defineSitemapEventHandler(() => {

    // const items = getAllItems()
    const { getAllCategories, whatIUse, getAllItems } = useResources()

    const urls = []

    // Add all categories
    getAllCategories().forEach((category) => {
        urls.push({
            loc: `/${category.id}`,
            _sitemap: 'categories',
        })

        if (category.hasQuizz) {
            urls.push({
                loc: `/quiz/${category.id}`,
                _sitemap: 'quizz',
            })
        }

        // Add all subcategories
        category.subcategories.forEach((subcategory) => {
            urls.push({
                loc: `/${category.id}/${subcategory.id}`,
                _sitemap: 'subcategories',
            })

            if (subcategory.hasQuizz) {
                urls.push({
                    loc: `/quiz/${subcategory.id}`,
                    _sitemap: 'quizz',
                })
            }
        })
    })

    // Add all items
    getAllItems().forEach((item) => {
        urls.push({
            loc: `/item/${item.id}`,
            _sitemap: 'items',
        })
    })




    return urls satisfies SitemapUrlInput[]
})
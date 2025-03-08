import defaultQuiz from '~/utils/quizz.json'
import analyticsQuiz from '~/utils/quizz-analytics.json'

export const quizMapping = {
    default: defaultQuiz,
    analytics: analyticsQuiz,
}


export function getQuizQuestions(category: string) {
    const categoryKey = category.split('.')[0]
    return quizMapping[categoryKey] || defaultQuiz
}

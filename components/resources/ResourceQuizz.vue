<template>
    <div class="w-full max-w-7xl mx-auto p-6 bg-albescent-white-100 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold text-center mb-8">
            What is the best blogging platform for you?
        </h1>

        <div class="flex flex-col items-center justify-center gap-8">
            <!-- Affiche une célébration à la fin du quiz -->
            <div v-if="completed" class="w-full bg-albescent-white-50 p-6 rounded-lg shadow text-center mb-4">
                <div class="mb-4 text-5xl">
                    🎉
                </div>
                <h2 class="text-2xl font-bold text-purple-600 mb-4">
                    Quiz terminé !
                </h2>
                <p class="mb-6">
                    Merci d'avoir répondu à toutes les questions. Voici nos recommandations basées sur vos réponses.
                </p>
                <p class="text-sm text-gray-600">
                    Faites défiler pour voir vos réponses et les ressources recommandées.
                </p>
            </div>

            <div v-if="!completed" class="w-full">
                <div class="bg-albescent-white-50 p-6 rounded-lg shadow">
                    <div class="mb-6">
                        <div class="flex justify-between mb-2">
                            <span>Question {{ availableQuestions.findIndex(q => q.id === questions[currentQuestion].id) + 1 }}/{{ availableQuestions.length }}</span>
                            <span>{{ Math.round(progress) }}% completed</span>
                        </div>
                        <div class="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                                class="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                                :style="{ width: `${progress}%` }"
                            />
                        </div>
                    </div>

                    <h2 class="text-xl font-semibold mb-6">
                        {{ questions[currentQuestion].text }}
                    </h2>

                    <div class="space-y-3">
                        <button
                            v-for="option in questions[currentQuestion].options"
                            :key="option.id"
                            :class="`w-full text-left p-4 rounded-lg transition-colors flex items-center
        ${isOptionSelected(option)
            ? 'bg-albescent-white-200 border-2 border-purple-300'
                            : 'bg-albescent-white-100 hover:bg-albescent-white-200'}`"
                            @click="handleOptionSelect(option)"
                        >
                            <span class="text-2xl mr-3">{{ option.icon }}</span>
                            <span>{{ option.text }}</span>
                        </button>
                    </div>

                    <div class="mt-6 flex justify-between">
                        <button
                            :disabled="availableQuestions.findIndex(q => q.id === questions[currentQuestion].id) === 0"
                            :class="`px-4 py-2 rounded-lg transition-colors ${
                                availableQuestions.findIndex(q => q.id === questions[currentQuestion].id) === 0
                                    ? 'bg-gray-200 cursor-not-allowed text-gray-400'
                                    : 'bg-albescent-white-100 hover:bg-albescent-white-200'
                            }`"
                            @click="handleBack"
                        >
                            ← Back
                        </button>

                        <button
                            v-if="questions[currentQuestion].isMultiSelect"
                            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white"
                            :disabled="!canContinue"
                            @click="handleContinue"
                        >
                            {{ isLastQuestion ? 'Finaliser le quiz →' : 'Continue →' }}
                        </button>

                        <button
                            class="px-4 py-2 bg-albescent-white-100 hover:bg-albescent-white-200 rounded-lg transition-colors"
                            @click="resetQuiz"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <!-- Display selected answers with their reasons -->
            <div v-if="Object.keys(answers).length > 0" class="mt-6 bg-albescent-white-50 p-6 rounded-lg shadow w-full">
                <h3 class="text-lg font-semibold mb-3">
                    Your answers
                </h3>
                <ul class="space-y-4">
                    <li v-for="(answer, questionId) in answers" :key="questionId" class="flex flex-col">
                        <div class="font-medium text-gray-700">
                            {{ getQuestionById(questionId)?.text }}
                        </div>

                        <div v-if="Array.isArray(answer)" class="ml-4 mt-2">
                            <div v-for="optionId in answer" :key="optionId" class="mb-2">
                                <div class="flex items-center">
                                    <span class="text-xl mr-2">{{ getOptionById(questionId, optionId)?.icon }}</span>
                                    <span class="font-medium">{{ getOptionById(questionId, optionId)?.text }}</span>
                                </div>

                                <!-- Display reason for multi-select questions -->
                                <div v-if="getOptionById(questionId, optionId)?.reason" class="mt-1 ml-7 text-sm text-gray-600 italic bg-albescent-white-100 p-2 rounded-md">
                                    {{ getOptionById(questionId, optionId)?.reason }}
                                </div>
                            </div>
                        </div>

                        <div v-else class="ml-4 mt-2">
                            <div class="flex items-center">
                                <span class="text-xl mr-2">{{ getOptionById(questionId, answer)?.icon }}</span>
                                <span class="font-medium">{{ getOptionById(questionId, answer)?.text }}</span>
                            </div>

                            <!-- Display reason for single-select questions -->
                            <div v-if="getOptionById(questionId, answer)?.reason" class="mt-1 ml-7 text-sm text-gray-600 italic bg-albescent-white-100 p-2 rounded-md">
                                {{ getOptionById(questionId, answer)?.reason }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="w-full">
                <div class="bg-albescent-white-50 p-6 rounded-lg shadow">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-semibold">
                            {{ completed ? 'Recommended resources' : 'Filtered resources' }}
                        </h2>
                        <span class="bg-albescent-white-100 px-3 py-1 rounded-full text-sm">
                            {{ filteredItems.length }} results
                        </span>
                    </div>

                    <div v-if="completed" class="my-8 p-4 border border-albescent-white-200 bg-albescent-white-100 bg-opacity-20 rounded-lg">
                        <h3 class="font-semibold mb-2">
                            Next steps
                        </h3>
                        <p>
                            Based on your selections, here are the most compatible options. Try the top 2-3 options in each category to find what suits your specific needs best.
                        </p>
                    </div>
                    <div v-if="groupedResources.length > 0" class="space-y-8">
                        <div v-for="group in groupedResources" :key="group.title">
                            <h3 class="text-lg font-semibold text-slate-600 mb-3">
                                {{ group.title }}
                            </h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-white">
                                <ResourceCard
                                    v-for="item in group.items"
                                    :key="item.id"
                                    :item="item"
                                />
                            </div>
                        </div>
                    </div>

                    <div v-else class="text-center py-8">
                        <p class="text-gray-400">
                            No results found based on your answers.
                        </p>
                        <p class="mt-2">
                            Try different options or <button
                                class="text-purple-600 hover:underline"
                                @click="resetQuiz"
                            >
                                reset the quiz
                            </button>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import ResourceCard from '~/components/resources/ResourceCard.vue'
import questions from '~/utils/quizz.json'

const resources = useResources()
const allItems = ref(resources.getAllItems())
const allCategories = ref(resources.getAllCategories())

const currentQuestion = ref(0)
const answers = ref<Record<string, string>>({})
const completed = ref(false)
const filteredItems = ref<any[]>([])

onMounted(() => {
    filteredItems.value = allItems.value
})

// Progression du quiz
const progress = computed(() => {
    const totalAvailableQuestions = availableQuestions.value.length
    const currentIndex = availableQuestions.value.findIndex(q =>
        q.id === questions[currentQuestion.value].id
    )

    return ((currentIndex + 1) / totalAvailableQuestions) * 100
})

// Vérifier si c'est la dernière question
const isLastQuestion = computed(() => {
    const currentId = questions[currentQuestion.value].id
    const currentAvailableIndex = availableQuestions.value.findIndex(q => q.id === currentId)
    return currentAvailableIndex === availableQuestions.value.length - 1
})

function getNextQuestionIndex() {
    const currentId = questions[currentQuestion.value].id
    const currentAvailableIndex = availableQuestions.value.findIndex(q => q.id === currentId)

    if (currentAvailableIndex < availableQuestions.value.length - 1) {
        const nextAvailableQuestion = availableQuestions.value[currentAvailableIndex + 1]
        return questions.findIndex(q => q.id === nextAvailableQuestion.id)
    }

    return -1 // No next question available
}


// Obtenir une question par son ID
const getQuestionById = (questionId: string) => {
    return questions.find(q => q.id === questionId)
}

// Obtenir une option par son ID
const getOptionById = (questionId: string, optionId: string) => {
    const question = getQuestionById(questionId)
    return question?.options.find(o => o.id === optionId)
}
const availableQuestions = computed(() => {
    return questions.filter(question => {
        // If question has no dependencies, it's always available
        if (!question.dependsOn) return true

        const { questionId, optionIds } = question.dependsOn
        const answer = answers.value[questionId]

        // If the dependent question hasn't been answered yet, this question is not available
        if (!answer) return false

        // Check if the answer matches any of the required options
        if (Array.isArray(answer)) {
            // For multi-select questions
            return answer.some(selectedOption => optionIds.includes(selectedOption))
        } else {
            // For single-select questions
            return optionIds.includes(answer)
        }
    })
})


// Dans votre script
function filterResources() {
    // Si aucune réponse n'a été donnée, montrer toutes les ressources
    if (Object.keys(answers.value).length === 0) {
        filteredItems.value = allItems.value
        return
    }

    // Calculer les tags pertinents et exclusions basés sur les réponses
    // Chaque entrée contient maintenant {tag, scope}
    const relevantTagsWithScope: Array<{tag: string, scope: string}> = []
    const excludedTagsWithScope: Array<{tag: string, scope: string}> = []
    const excludedCategories: string[] = []

    Object.entries(answers.value).forEach(([questionId, answerValue]) => {
        const question = getQuestionById(questionId)
        const scope = question?.scope || 'main' // 'main' est le scope par défaut

        if (Array.isArray(answerValue)) {
            answerValue.forEach(optionId => {
                const option = question?.options.find(o => o.id === optionId)

                // Add positive tags with scope
                if (option?.tags?.length) {
                    option.tags.forEach(tag => {
                        relevantTagsWithScope.push({ tag, scope })
                    })
                }

                // Add tags to exclude with scope
                if (option?.excludeTags?.length) {
                    option.excludeTags.forEach(tag => {
                        excludedTagsWithScope.push({ tag, scope })
                    })
                }

                // Add categories to exclude completely (pas de changement)
                if (option?.excludeCategories?.length) {
                    excludedCategories.push(...option.excludeCategories)
                }
            })
        }
        // Handle single-select answers (single option ID)
        else {
            const option = question?.options.find(o => o.id === answerValue)

            // Add positive tags with scope
            if (option?.tags?.length) {
                option.tags.forEach(tag => {
                    relevantTagsWithScope.push({ tag, scope })
                })
            }

            // Add tags to exclude with scope
            if (option?.excludeTags?.length) {
                option.excludeTags.forEach(tag => {
                    excludedTagsWithScope.push({ tag, scope })
                })
            }

            // Add categories to exclude completely (pas de changement)
            if (option?.excludeCategories?.length) {
                excludedCategories.push(...option.excludeCategories)
            }
        }
    })

    // Filter the items
    if (relevantTagsWithScope.length === 0 && excludedTagsWithScope.length === 0 && excludedCategories.length === 0) {
        filteredItems.value = allItems.value
    } else {
        filteredItems.value = allItems.value.filter(item => {
            if (!item.quizzTags || item.quizzTags.length === 0) return false

            // Obtenir les catégories de l'item
            const itemCategoriesInfo = resources.getSubcategoriesContainingItem(item.id)
            const itemCategories = []

            // Construire la liste des catégories et sous-catégories
            itemCategoriesInfo.forEach(({ category, subcategory }) => {
                if (!itemCategories.includes(category.id)) {
                    itemCategories.push(category.id)
                }
                itemCategories.push(`${category.id}.${subcategory.id}`)
            })

            // Vérifier les exclusions de catégories
            const mainCategories = [...new Set(itemCategoriesInfo.map(info => info.category.id))]
            if (mainCategories.some(categoryId => excludedCategories.includes(categoryId))) {
                return false
            }

            // Vérifier les tags d'exclusion
            for (const { tag, scope } of excludedTagsWithScope) {
                if (scope === 'main' || itemCategories.includes(scope)) {
                    if (item.quizzTags?.includes(tag) || item.tags?.includes(tag)) {
                        return false
                    }
                }
            }

            // Regrouper les tags pertinents par scope
            const tagsByScope = {}
            relevantTagsWithScope.forEach(({ tag, scope }) => {
                if (!tagsByScope[scope]) {
                    tagsByScope[scope] = []
                }
                tagsByScope[scope].push(tag)
            })

            // Vérifier chaque scope
            for (const [scope, tags] of Object.entries(tagsByScope)) {
                // Si ce scope concerne cet item
                const isApplicable = scope === 'main' || itemCategories.includes(scope)

                if (isApplicable) {
                    // Si l'item ne correspond à aucun des tags de ce scope, le rejeter
                    if (tags.length > 0 &&
                        !tags.some(tag => item.quizzTags?.includes(tag) || item.tags?.includes(tag))) {
                        return false
                    }
                }
            }

            // L'item a passé toutes les vérifications, le conserver
            return true
        })
    }
}

// Fonction auxiliaire pour obtenir les catégories d'un item (catégorie principale et sous-catégories)
function getItemCategories(item) {
    // Un item n'a pas de propriété "category" directe, donc nous devons la déterminer
    // en utilisant la méthode getSubcategoriesContainingItem
    const categoriesInfo = resources.getSubcategoriesContainingItem(item.id)
    const categories = []

    // Pour chaque occurrence de l'item dans une sous-catégorie
    categoriesInfo.forEach(({ category, subcategory }) => {
        // Ajouter l'ID de catégorie principale s'il n'est pas déjà présent
        if (!categories.includes(category.id)) {
            categories.push(category.id)
        }

        // Ajouter l'ID combiné de catégorie et sous-catégorie
        categories.push(`${category.id}.${subcategory.id}`)
    })

    return categories
}


function isOptionSelected(option) {
    const currentQuestionId = questions[currentQuestion.value].id

    if (questions[currentQuestion.value].isMultiSelect) {
        return answers.value[currentQuestionId] && answers.value[currentQuestionId].includes(option.id)
    } else {
        return answers.value[currentQuestionId] === option.id
    }
}

function handleContinue() {
    const nextIndex = getNextQuestionIndex()

    if (nextIndex !== -1) {
        currentQuestion.value = nextIndex
    } else {
        completed.value = true
        // Défilement automatique vers les recommandations après une courte pause
        setTimeout(() => {
            document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' })
        }, 500)
    }
}

// Determine if user can continue (has selected at least one option for multi-select)
const canContinue = computed(() => {
    const currentQuestionId = questions[currentQuestion.value].id
    if (!questions[currentQuestion.value].isMultiSelect) return true

    return answers.value[currentQuestionId] && answers.value[currentQuestionId].length > 0
})

// Gérer la sélection d'une option
function handleOptionSelect(option: any) {
    const currentQuestionId = questions[currentQuestion.value].id
    const currentQuestionObj = questions[currentQuestion.value]

    // Handle option selection (same as your original code)
    if (currentQuestionObj.isMultiSelect) {
        if (!answers.value[currentQuestionId]) {
            answers.value[currentQuestionId] = []
        }

        if ((answers.value[currentQuestionId] as string[]).includes(option.id)) {
            answers.value[currentQuestionId] = (answers.value[currentQuestionId] as string[]).filter(id => id !== option.id)
        } else if (!currentQuestionObj.maxSelections || (answers.value[currentQuestionId] as string[]).length < currentQuestionObj.maxSelections) {
            answers.value[currentQuestionId] = [...(answers.value[currentQuestionId] as string[]), option.id]
        }
    } else {
        answers.value = {
            ...answers.value,
            [currentQuestionId]: option.id
        }

        // For single-select, move to the next available question
        const nextIndex = getNextQuestionIndex()
        if (nextIndex !== -1) {
            currentQuestion.value = nextIndex
        } else {
            completed.value = true
            // Défilement automatique vers les recommandations après une courte pause
            setTimeout(() => {
                document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' })
            }, 500)
        }
    }

    // Filter resources
    filterResources()
}
// Revenir à la question précédente
function handleBack() {
    if (currentQuestion.value > 0) {
        const currentId = questions[currentQuestion.value].id
        const currentAvailableIndex = availableQuestions.value.findIndex(q => q.id === currentId)

        if (currentAvailableIndex > 0) {
            const prevAvailableQuestion = availableQuestions.value[currentAvailableIndex - 1]
            currentQuestion.value = questions.findIndex(q => q.id === prevAvailableQuestion.id)
        } else {
            // If we're at the first available question, go to the first question overall
            currentQuestion.value = 0
        }
    }
}

// Réinitialiser le quiz
function resetQuiz() {
    currentQuestion.value = 0
    answers.value = {}
    completed.value = false
    filteredItems.value = allItems.value
}

// Grouper les ressources filtrées par catégorie pour l'affichage
const groupedResources = computed(() => {
    const groups: { title: string; items: any[] }[] = []

    // Parcourir toutes les catégories
    allCategories.value.forEach(category => {
        // Pour chaque catégorie, collecter tous les items des sous-catégories
        const categoryItems: any[] = []

        category.subcategories.forEach(subcategory => {
            // Pour chaque sous-catégorie, trouver les items qui sont dans les résultats filtrés
            const subcategoryItems = resources.getItemsBySubcategoryId(category.id, subcategory.id)
                .filter(item => filteredItems.value.some(filteredItem => filteredItem.id === item.id))

            // Ajouter uniquement les items qui ne sont pas déjà dans categoryItems
            subcategoryItems.forEach(item => {
                if (!categoryItems.some(existingItem => existingItem.id === item.id)) {
                    categoryItems.push(item)
                }
            })
        })

        // Si des items ont été trouvés dans cette catégorie, ajouter la catégorie au groupe
        if (categoryItems.length > 0) {
            groups.push({
                title: category.name,
                items: categoryItems
            })
        }
    })

    return groups
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}
</style>
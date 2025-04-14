<template>
    <div class="c-main">
        <LandingHeader />
        <main class="pt-28 c-main">
            <div class="">
                <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:py-24">
                    <!-- Header -->
                    <div class="text-center mb-20">
                        <span class="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">About</span>
                        <h1 class="text-5xl font-bold text-gray-900 mb-6">
                            The Ultimate Blogging Toolkit
                        </h1>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Hand-picked resources to help you find the perfect blogging tools for your unique journey
                        </p>
                    </div>

                    <!-- Main Content -->
                    <div class="space-y-24">
                        <!-- Who I Am Section -->
                        <!-- Modification pour réduire la taille de la photo -->
                        <!-- Remplacez la section existante par celle-ci -->

                        <section>
                            <div class="flex flex-col lg:flex-row gap-16 items-center">
                                <!-- Photo de profil réduite -->
                                <div class="lg:w-1/6">
                                    <!-- Profile Image with stylish border -->
                                    <div class="relative max-w-xs mx-auto">
                                        <div class="absolute inset-0 bg-gradient-to-r from-albescent-white-300 to-albescent-white-100 rounded-xl transform rotate-3" />
                                        <div class="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg aspect-w-1 aspect-h-1">
                                            <img src="https://eventuallycoding.com/hugo-nb.jpg" alt="Profile Photo" class="w-full h-full object-cover">
                                        </div>
                                        <div class="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3">
                                            <p class="font-medium text-gray-900 text-sm">
                                                Blogging since 2003
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <!-- Contenu textuel -->
                                <div class="lg:w-5/6">
                                    <h2 class="text-3xl font-bold text-gray-900 mb-6">
                                        Who I Am
                                    </h2>
                                    <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                                        Hello, my name is Hugo and I've been blogging since 2003. Over the years, I've tested countless tools, platforms, and strategies to create and grow blogs.
                                    </p>
                                    <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                                        Beyond blogging, I'm an entrepreneur who founded and scaled a startup to 700 employees across Europe. Throughout my journey, I've maintained my blog to share insights and lessons learned along the way.
                                    </p>
                                    <p class="text-lg text-gray-700 leading-relaxed">
                                        I'm also the founder of <NuxtLink to="https://hakanai.io" class="link">
                                            Hakanai
                                        </NuxtLink>, a toolbox specifically designed for bloggers and content creators, and the creator of <NuxtLink class="link" to="https://bloggrify.com">
                                            Bloggrify
                                        </NuxtLink>, an open-source static blog generator.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <!-- Why This Kit Section -->
                        <section class="relative">
                            <div class="absolute top-0 inset-x-0 h-1/2 bg-gray-50" />
                            <div class="relative bg-white shadow-xl rounded-2xl overflow-hidden">
                                <div class="lg:grid lg:grid-cols-2 lg:gap-0">
                                    <div class="px-6 py-12 sm:px-12 lg:py-16">
                                        <div class="max-w-lg mx-auto lg:max-w-none">
                                            <h2 class="text-3xl font-bold text-gray-900 mb-6">
                                                Why This Kit
                                            </h2>
                                            <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                                                After blogging for over 20 years, I've learned that we all have different criteria when choosing our tools. Some prioritize ease of use, others want complete technical control, and many are somewhere in between.
                                            </p>
                                            <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                                                This toolkit is designed to save you time by curating the best options based on different needs and preferences. No more endless searching and comparing—I've done the research for you.
                                            </p>
                                            <div class="mt-8">
                                                <NuxtLink to="/all" class="btn btn-primary">
                                                    Find Your Perfect Tools
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </NuxtLink>
                                            </div>

                                            <div class="mt-12 space-y-6">
                                                <div class="flex">
                                                    <div class="flex-shrink-0">
                                                        <div class="flex items-center justify-center h-12 w-12 rounded-md bg-albescent-white-100 text-albescent-white-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="ml-4">
                                                        <h3 class="text-lg font-medium text-gray-900">
                                                            Objective Comparisons
                                                        </h3>
                                                        <p class="mt-2 text-base text-gray-600">
                                                            Each tool is evaluated using the same criteria, with pros and cons clearly highlighted.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="flex">
                                                    <div class="flex-shrink-0">
                                                        <div class="flex items-center justify-center h-12 w-12 rounded-md bg-albescent-white-100 text-albescent-white-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="ml-4">
                                                        <h3 class="text-lg font-medium text-gray-900">
                                                            Regularly Updated
                                                        </h3>
                                                        <p class="mt-2 text-base text-gray-600">
                                                            The blogging landscape changes rapidly, and this toolkit is updated to reflect the latest tools and trends.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="flex">
                                                    <div class="flex-shrink-0">
                                                        <div class="flex items-center justify-center h-12 w-12 rounded-md bg-albescent-white-100 text-albescent-white-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="ml-4">
                                                        <h3 class="text-lg font-medium text-gray-900">
                                                            Full Transparency
                                                        </h3>
                                                        <p class="mt-2 text-base text-gray-600">
                                                            When a tool is mentioned and I have a connection to it (like Hakanai), this is clearly indicated.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-albescent-white-100 p-12 lg:p-16 flex items-center">
                                        <div class="max-w-lg mx-auto lg:max-w-none">
                                            <blockquote>
                                                <div class="relative text-lg font-medium text-gray-700 italic mb-8">
                                                    <svg class="absolute top-0 left-0 transform -translate-x-8 -translate-y-4 h-10 w-10 text-blue-200" fill="currentColor" viewBox="0 0 32 32">
                                                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                                    </svg>
                                                    <p class="relative z-10">
                                                        It's really easy to lose hours, even days trying to find the right tools for your blog.
                                                        Whether you're a seasoned professional, a member of a content marketing team or an occasional blogger,
                                                        you're time is precious. Let's make sure you're spending it wisely.
                                                    </p>
                                                </div>
                                                <footer class="flex items-center">
                                                    <div class="flex-shrink-0 mr-4">
                                                        <img class="h-12 w-12 rounded-full" src="https://eventuallycoding.com/hugo-nb.jpg" alt="">
                                                    </div>
                                                    <div>
                                                        <p class="text-base font-medium text-gray-900">
                                                            Hugo
                                                        </p>
                                                        <p class="text-base text-gray-600">
                                                            Blogger and Entrepreneur
                                                        </p>
                                                    </div>
                                                </footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- FAQ Section -->
                        <section>
                            <div class="text-center mb-12">
                                <span class="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">FAQ</span>
                                <h2 class="text-3xl font-bold text-gray-900">
                                    Frequently Asked Questions
                                </h2>
                            </div>

                            <div class="space-y-6 max-w-3xl mx-auto">
                                <div class="bg-white shadow overflow-hidden rounded-lg">
                                    <button class="w-full px-6 py-4 text-left focus:outline-none">
                                        <div class="flex items-center justify-between">
                                            <h3 class="text-lg font-medium text-gray-900">
                                                Isn't this site biased since you also offer some tools?
                                            </h3>
                                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                    <div class="px-6 pb-4">
                                        <p class="text-base text-gray-700">
                                            I strive to keep this site as objective as possible. Hakanai is presented among other tools, with its strengths and weaknesses clearly detailed.
                                            I encourage you to test different solutions to find the one that best meets your needs.
                                        </p>
                                    </div>
                                </div>

                                <div class="bg-white shadow overflow-hidden rounded-lg">
                                    <button class="w-full px-6 py-4 text-left focus:outline-none">
                                        <div class="flex items-center justify-between">
                                            <h3 class="text-lg font-medium text-gray-900">
                                                Why are some tools not listed?
                                            </h3>
                                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                    <div class="px-6 pb-4">
                                        <p class="text-base text-gray-700">
                                            While I strive to be comprehensive, the blogging ecosystem is constantly evolving.
                                            If a tool is missing, it's either because I haven't tested it yet, or because it doesn't meet the minimum quality and reliability criteria I've established.
                                        </p>
                                    </div>
                                </div>

                                <div class="bg-white shadow overflow-hidden rounded-lg">
                                    <button class="w-full px-6 py-4 text-left focus:outline-none">
                                        <div class="flex items-center justify-between">
                                            <h3 class="text-lg font-medium text-gray-900">
                                                Have you personally tested all the tools you list?
                                            </h3>
                                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                    <div class="px-6 pb-4">
                                        <p class="text-base text-gray-700">
                                            No, I haven't personally tested every single tool listed. Some tools like TYPO3 or Matomo are industry standards that would be strange to omit even if I haven't used them extensively myself. In some cases, budget constraints limit my ability to test certain premium tools. I also include well-researched recommendations from trusted sources in the blogging community.
                                        </p>
                                    </div>
                                </div>

                                <div class="bg-white shadow overflow-hidden rounded-lg">
                                    <button class="w-full px-6 py-4 text-left focus:outline-none">
                                        <div class="flex items-center justify-between">
                                            <h3 class="text-lg font-medium text-gray-900">
                                                How can I contribute?
                                            </h3>
                                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                    <div class="px-6 pb-4">
                                        <p class="text-base text-gray-700">
                                            Your contributions are welcome! If you know of a tool that deserves to be mentioned or if you have feedback on existing resources,
                                            please don't hesitate submit an issue and propose a pull request <NuxtLink class="link" to="https://github.com/hakanaiio/blog-starter-kit">
                                                on the GitHub repository
                                            </NuxtLink>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Contact Section -->
                        <section class="bg-gradient-to-r from-albescent-white-300 to-indigo-300 rounded-3xl overflow-hidden">
                            <div class="px-6 py-12 sm:px-12 lg:py-16 lg:px-16 flex flex-col md:flex-row items-center justify-between">
                                <div class="text-center md:text-left mb-8 md:mb-0">
                                    <h2 class="text-3xl font-bold text-white mb-4">
                                        Ready to start your blogging journey?
                                    </h2>
                                    <p class="text-xl text-slate-100 max-w-2xl">
                                        Take the quiz to find your perfect blogging tools or browse our curated collections.
                                    </p>
                                </div>
                                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                    <a href="/quiz/cms" class="btn btn-primary">
                                        Take the Quiz
                                    </a>
                                    <a href="/tools" class="btn">
                                        Browse Tools
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
        <LandingFooter />
    </div>
</template>
<script setup lang="ts">
import LandingHeader from '~/components/landing/LandingHeader.vue'
import LandingFooter from '~/components/landing/LandingFooter.vue'

const config = useRuntimeConfig()
const route = useRoute()
const fullUrl = `${config.public.baseUrl}${route.path}`

const description = 'The Blogger starter kit is a collection of resources to help you start your blog.'
const title = 'Blogger starter kit'

useHead({
    link: [
        {
            rel: 'canonical',
            href: fullUrl
        }
    ]
})

useSeoMeta({
    title: title,
    twitterTitle: title,
    ogTitle: title,

    description: description,
    ogDescription: description,
    ogType: 'website',
    ogUrl: fullUrl,
})

</script>

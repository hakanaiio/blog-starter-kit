<template>
    <footer
        class="border-t my-24 py-12"
    >
        <div
            class="max-w-7xl mx-auto px-8 "
        >
            <div class="grid grid-cols-2 sm:grid-cols-4 mb-2 gap-6 md:gap-12 w-full ">
                <div>
                    <div class=" flex flex-col gap-2 ">
                        <NuxtLink to="/" class="text-slate-900 text-2xl font-bold">
                            BlogTally
                        </NuxtLink>
                        <p class="text-sm text-slate-600">
                            Complete toolset for bloggers, including analytics, newsletters, and more.
                        </p>
                        <div class="text-sm text-slate-600">
                            Copyright © {{ new Date().getFullYear() }}
                        </div>
                    </div>
                </div>
                <div>
                    <div class="link-header ">
                        Product
                    </div>
                    <div class="flex flex-col gap-1.5 text-sm links">
                        <NuxtLink to="https://blogtally.com/products/pulse" data-blogtally-event="PulseClick">
                            Pulse (analytics)
                        </NuxtLink>
                        <NuxtLink to="https://blogtally.com/products/broadcast" data-blogtally-event="BroadcastClick">
                            Broadcast (newsletters)
                        </NuxtLink>
                    </div>
                    <div class="mt-3">
                        <div class="link-subheader">
                            Other product:
                        </div>
                        <div class="flex flex-col gap-2 links">
                            <NuxtLink to="https://bloggrify.com" target="_blank">
                                Bloggrify (static site generator)
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="link-header">
                        Resources
                    </div>
                    <div class="flex flex-col gap-2 links">
                        <NuxtLink to="https://blogtally.com/docs/" :external="true" data-blogtally-event="Docs">
                            Docs
                        </NuxtLink>
                        <NuxtLink to="https://blogtally.com/blog/" :external="true" data-blogtally-event="Docs">
                            Blog
                        </NuxtLink>
                        <NuxtLink to="/" :external="true" data-blogtally-event="Resources">
                            Blogger starter kit
                        </NuxtLink>
                    </div>
                </div>
                <div>
                    <div class="link-header">
                        Starting
                    </div>
                    <div class="flex flex-col gap-2 links">
                        <NuxtLink to="/quiz/cms" data-blogtally-event="Quizz">
                            Which CMS should you choose?
                        </NuxtLink>
                        <NuxtLink to="/quiz/analytics" data-blogtally-event="Quizz">
                            Which analytics should you choose?
                        </NuxtLink>
                        <NuxtLink to="/cms" data-blogtally-event="Resources">
                            CMS for bloggers
                        </NuxtLink>
                        <NuxtLink to="/hosting" data-blogtally-event="Resources">
                            Blog hosting solutions
                        </NuxtLink>
                        <NuxtLink to="/tools" data-blogtally-event="Resources">
                            Blog tools
                        </NuxtLink>
                        <NuxtLink to="/community" data-blogtally-event="Resources">
                            Blogger communities
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
.link-header {
  @apply uppercase font-semibold text-slate-700 tracking-widest md:text-left mb-3;
}

.link-subheader {
  @apply font-semibold text-slate-600 tracking-wide md:text-left mb-1;
}

.links {
  @apply text-sm text-slate-600;
}
</style>
<template>
    <div>
        <nav
            class="transition-colors w-full z-10 fixed top-0 inverted border-b bg-albescent-white-100/70 border-gray-200 opacity-95"
        >
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div class="relative flex items-center justify-between h-16">
                    <div
                        class="absolute inset-y-0 left-0 flex items-center sm:hidden"
                    >
                        <!-- Mobile menu button-->
                        <button
                            type="button"
                            class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-white hover:bg-gray-500 focus:outline-none
                            focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            @click="mobileMenuOpen = !mobileMenuOpen"
                        >
                            <span class="sr-only">Open main menu</span>
                            <!--
                              Icon when menu is closed.

                              Heroicon name: outline/menu

                              Menu open: "hidden", Menu closed: "block"
                            -->
                            <svg
                                class="h-6 w-6"
                                :class="!mobileMenuOpen ? 'block' : 'hidden'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <!--
                              Icon when menu is open.

                              Heroicon name: outline/x

                              Menu open: "block", Menu closed: "hidden"
                            -->
                            <svg
                                class="h-6 w-6"
                                :class="mobileMenuOpen ? 'block' : 'hidden'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
                    >
                        <div class="flex-shrink-0 flex items-center ">
                            <div
                                class="text-2xl font-bruno font-bold hover:text-slate-700 text-slate-900"
                            >
                                <div class="flex">
                                    <div class="text-2xl font-bold text-slate-800 flex justify-center items-center gap-2 ">
                                        <NuxtImg class="h-8 w-8 inline " src="/android-chrome-192x192.png" format="webp" alt="Logo Hakanai" />
                                        <NuxtLink to="/" class="text-slate-800">
                                            Blog starter kit
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="hidden sm:block sm:ml-6 absolute right-0 font-mark -mt-2 "
                        >
                            <ul class="menu menu-horizontal mb-64 text-slate-700 ">
                                <li v-for="item in navLinks" :key="item.name">
                                    <details v-if="item.subMenu">
                                        <summary>{{ item.name }}</summary>
                                        <ul class="dark:text-slate-100">
                                            <li
                                                v-for="subItem in item.subMenu"
                                                :key="subItem.name"
                                                :class="{ 'text-gray-300 dark:text-gray-600': subItem.disabled }"
                                            >
                                                <template v-if="!subItem.disabled">
                                                    <NuxtLink
                                                        :to="subItem.path"
                                                        :data-blogtally-event="subItem.eventName"
                                                        :external="subItem.external"
                                                    >
                                                        {{ subItem.name }}
                                                    </NuxtLink>
                                                </template>
                                                <a v-else>{{ subItem.name }}</a>
                                            </li>
                                        </ul>
                                    </details>
                                    <NuxtLink v-else :to="item.path">
                                        {{ item.name }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile menu, show/hide based on menu state. -->
            <div :class="mobileMenuOpen ? '' : 'hidden'">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <ul class="menu menu-vertical ">
                        <li v-for="item in navLinks" :key="item.name">
                            <details v-if="item.subMenu">
                                <summary>{{ item.name }}</summary>
                                <ul>
                                    <li
                                        v-for="subItem in item.subMenu"
                                        :key="subItem.name"
                                        :class="{ 'text-gray-300': subItem.disabled }"
                                    >
                                        <template v-if="!subItem.disabled">
                                            <NuxtLink
                                                :to="subItem.path"
                                                :data-blogtally-event="subItem.eventName"
                                                :external="subItem.external"
                                            >
                                                {{ subItem.name }}
                                            </NuxtLink>
                                        </template>
                                        <a v-else>{{ subItem.name }}</a>
                                    </li>
                                </ul>
                            </details>
                            <NuxtLink v-else :to="item.path">
                                {{ item.name }}
                            </NuxtLink>
                        </li>
                    </ul>


                    <div class="ml-2 mt-1" />
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">

interface SubMenuItem {
    name: string;
    path?: string;
    external?: boolean;
    disabled?: boolean;
}

interface MenuItem {
    name: string;
    path?: string;
    subMenu?: SubMenuItem[];
}

const menu: MenuItem[] = [
    {
        name: 'Which CMS should I choose?',
        path: '/quiz/cms'
    },
    {
        name: 'Categories',
        subMenu: [
            { name: 'Cms', path: '/cms' },
            { name: 'Hosting', path: '/hosting' },
            { name: 'Tools', path: '/tools' },
            { name: 'Communities', path: '/community' },
        ]
    },
    {
        name: 'About',
        path: '/about'
    }
]
const navLinks = ref(menu)
const mobileMenuOpen = ref(false)


</script>

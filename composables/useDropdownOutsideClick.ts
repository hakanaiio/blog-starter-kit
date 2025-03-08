

export const useDropdownOutsideClick = () => {
    // Gestionnaire de clic
    const handleClick = (e: MouseEvent) => {
        document.querySelectorAll('.dropdown').forEach((dropdown) => {
            if (!dropdown.contains(e.target as Node)) {
                dropdown.removeAttribute('open')
            }
        })
    }

    // Monter l'écouteur au chargement
    onMounted(() => {
        window.addEventListener('click', handleClick)
    })

    // Nettoyer l'écouteur à la destruction
    onUnmounted(() => {
        window.removeEventListener('click', handleClick)
    })
}
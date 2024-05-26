<template>
    <div class="navbar">
        <div class="navbar-content">
            <button @click="emitToggleSidebar" class="hamburger-menu">
                <i class="pi pi-align-left text-2xl"></i>
            </button>
            <div class="logo">{{ appName }}</div>
            <div class="nav-items">
                <span>User</span>
                <span>Notifications</span>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AppNavbar',
    emits: ['toggle-sidebar'],
    setup(props, { emit }) {
        const emitToggleSidebar = () => {
            emit('toggle-sidebar')
        }

        const appName = import.meta.env.VITE_APP_NAME

        return {
            emitToggleSidebar,
            appName
        }
    }
})
</script>

<style scoped>
.navbar {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #EEF2FF;
    color: #4338CA;
}

.navbar-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.hamburger-menu {
    background: none;
    border: none;
    color: #4338CA;
    cursor: pointer;
}

.logo {
    font-size: 20px;
    font-weight: bold;
}

.nav-items span {
    margin-left: 20px;
    cursor: pointer;
}
</style>
<template>
    <div :class="['sidebar', { 'sidebar--collapsed': isCollapsed }]">
        <nav>
            <ul>
                <template v-for="item in menuItems" :key="item.text">
                    <router-link :to="{ name: item.route }" style="text-decoration: none">
                        <li>
                            <i :class="item.icon" class="text-xl" />
                            <span v-if="!isCollapsed">{{ item.text }}</span>
                        </li>
                    </router-link>
                </template>
            </ul>
        </nav>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AppSidebar',
    props: {
        isCollapsed: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const menuItems = [
            { icon: 'pi pi-home', text: 'Dashboard', route: 'dashboard' },
            { icon: 'pi pi-user', text: 'Customers', route: 'customer' },
            { icon: 'pi pi-user', text: 'Orders', route: 'order' }
        ]

        return {
            menuItems
        }
    }
})
</script>

<style scoped>
.sidebar {
    width: 220px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    transition: width 0.3s;
}

.sidebar--collapsed {
    width: 60px;
}

nav {
    flex: 1;
    overflow-y: auto;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    display: flex;
    align-items: center;
    padding: 15px;
    cursor: pointer;
}

li:hover {
    background-color: #eef2ff;
    transition-delay: 0.1s;
}

i {
    font-size: 24px;
    margin-right: 15px;
}

.sidebar--collapsed i {
    margin-right: 0;
    text-align: center;
    width: 100%;
}

.sidebar--collapsed span {
    display: none;
}
</style>

<script setup>
import { ref } from 'vue';
import { usePaginationStore } from '@/stores/pagination';
import { themeKey } from '@/constants';

const pagination = usePaginationStore();
const { prevPage, nextPage, setPageSize } = pagination;
const pageSize = ref(pagination.pageSize);
function changePageSize(size) {
    setPageSize(size);
    pageSize.value = pagination.pageSize;
}
const theme = ref(localStorage.getItem(themeKey) || 'dark');
function toggleTheme(newTheme) {
    theme.value = newTheme;
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem(themeKey, newTheme);
}
</script>
<template>
    <div class="footer-ct">
        <div class="footer-info">
            Powered by
            <a
                href="https://github.com/LittleNightmare/remote-party-finder"
                target="_blank"
                >LittleNightmare/remote-party-finder</a
            >
        </div>
        <div class="pagination-ct">
            <span>共{{ pagination.total }}条</span>
            <span class="input-ct"
                >每页<input
                    class="input"
                    type="number"
                    placeholder="10"
                    min="5"
                    max="50"
                    v-model="pageSize"
                    @change="(e) => changePageSize(e.target.value)" />条</span
            >
            <div class="btn-group">
                <div
                    class="btn prev"
                    :class="{ ban: pagination.currentPage <= 1 }"
                    @click="prevPage">
                    <svg width="20" height="16" viewBox="0 0 55 44">
                        <path
                            d="M51 4 L51 40 L4 22 Z"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="8"
                            stroke-linejoin="round" />
                    </svg>
                </div>
                <span>{{ pagination.currentPage }}</span
                >/
                <span>{{
                    Math.ceil(pagination.total / pagination.pageSize)
                }}</span>
                <div
                    class="btn next"
                    :class="{
                        ban:
                            pagination.currentPage * pagination.pageSize >=
                            pagination.total,
                    }"
                    @click="nextPage">
                    <svg width="20" height="16" viewBox="0 0 55 44">
                        <path
                            d="M4 40 L4 4 L51 22 Z"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="8"
                            stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="theme-toggle">
            <div
                class="theme-toggle-btn"
                data-theme="dark"
                :class="{ selected: theme === 'dark' }"
                @click="toggleTheme('dark')"></div>
            <div
                class="theme-toggle-btn"
                data-theme="light"
                :class="{ selected: theme === 'light' }"
                @click="toggleTheme('light')"></div>
        </div>
    </div>
</template>
<style scoped>
.footer-ct {
    position: relative;
    margin: 0 auto;
    padding-left: var(--main-padding-h);
    padding-right: var(--main-padding-right);
    max-width: var(--max-width);
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footer-info {
    font-size: 14px;
    color: var(--color-text);
    a {
        color: var(--color-title);
        text-decoration: none;
    }
}
.pagination-ct {
    display: flex;
    align-items: center;
}
.input-ct {
    margin: 0 8px;
    display: flex;
    align-items: center;
    input {
        width: 40px;
        text-align: center;
    }
}
.btn-group {
    display: flex;
    align-items: center;
}
.btn {
    margin: 0 4px;
    display: flex;
    align-items: center;
    color: rgb(163, 153, 128);
    cursor: pointer;

    &.ban {
        cursor: not-allowed;
    }

    &:not(.ban):hover {
        color: rgb(255, 251, 206);
    }
}
.input {
    margin: 0 2px;
    width: 60px;
    height: 24px;
    line-height: 24px;
    padding: 0 2px;
    border: 1px solid var(--color-header-border);
    border-radius: 4px;
    opacity: 0.5;
    &:focus {
        opacity: 1;
    }
}
.input:focus {
    outline: none;
}
.input::placeholder {
    color: var(--color-text);
}

.theme-toggle {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
}
.theme-toggle-btn {
    margin-right: 4px;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #ddd;
    background-color: var(--color-text);
}
</style>

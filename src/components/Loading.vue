<template>
    <div class="custom-loading">
        <div class="custom-loading-content">
            <div class="dot dot-1"></div>

            <div class="dot dot-2"></div>

            <div class="dot dot-3"></div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.custom-loading {
    position: fixed;

    z-index: 999999;

    background: rgba(2, 96, 230, 0.2);

    right: 0;

    left: 0;

    top: 0;

    bottom: 0;

    transition: opacity 0.2s;

    width: 100vw;

    height: 100vh;
}

.custom-loading-content {
    width: 200px;

    height: 200px;

    position: absolute;

    top: 50%;

    left: 50%;

    transform: translate(-50%, -50%);

    margin: auto;

    animation: rotate-move 2s ease-in-out infinite;
}

.dot {
    width: 70px;

    height: 70px;

    border-radius: 50%;

    background-color: #000;

    position: absolute;

    top: 0;

    bottom: 0;

    left: 0;

    right: 0;

    margin: auto;
}

.dot-3 {
    background-color: #4663ac;

    animation: dot-3-move 2s ease infinite, index 6s ease infinite;
}

.dot-2 {
    background-color: #75abd2;

    animation: dot-2-move 2s ease infinite, index 6s -4s ease infinite;
}

.dot-1 {
    background-color: #c8d9ed;

    animation: dot-1-move 2s ease infinite, index 6s -2s ease infinite;
}

@keyframes dot-3-move {
    20% {
        transform: scale(1);
    }

    45% {
        transform: translateY(-18px) scale(0.45);
    }

    60% {
        transform: translateY(-90px) scale(0.45);
    }

    80% {
        transform: translateY(-90px) scale(0.45);
    }

    100% {
        transform: translateY(0px) scale(1);
    }
}

@keyframes dot-2-move {
    20% {
        transform: scale(1);
    }

    45% {
        transform: translate(-16px, 12px) scale(0.45);
    }

    60% {
        transform: translate(-80px, 60px) scale(0.45);
    }

    80% {
        transform: translate(-80px, 60px) scale(0.45);
    }

    100% {
        transform: translateY(0px) scale(1);
    }
}

@keyframes dot-1-move {
    20% {
        transform: scale(1);
    }

    45% {
        transform: translate(16px, 12px) scale(0.45);
    }

    60% {
        transform: translate(80px, 60px) scale(0.45);
    }

    80% {
        transform: translate(80px, 60px) scale(0.45);
    }

    100% {
        transform: translateY(0px) scale(1);
    }
}

@keyframes rotate-move {
    55% {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    80% {
        transform: translate(-50%, -50%) rotate(360deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes index {

    0%,
    100% {
        z-index: 3;
    }

    33.3% {
        z-index: 2;
    }

    66.6% {
        z-index: 1;
    }
}
</style>

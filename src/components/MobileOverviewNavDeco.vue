
<script lang="ts">
export default {
    props: {
        color: {default: "#0D009D"}
    }
};
</script>

<template>
<svg class="m_nav_deco" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="24.4548" y="24.2736" width="3" height="3" transform="rotate(24.46 24.4548 24.2736)" :fill="color"/>
<rect x="9.14653" y="15.6622" width="15" height="6" transform="rotate(24.46 9.14653 15.6622)" :stroke="color"/>
<rect x="30.0823" y="25.1855" width="15" height="6" transform="rotate(24.46 30.0823 25.1855)" :stroke="color"/>
<rect x="22.2202" y="24.3557" width="2" height="1" transform="rotate(24.46 22.2202 24.3557)" :fill="color"/>
<rect x="26.7715" y="26.426" width="2" height="1" transform="rotate(24.46 26.7715 26.426)" :fill="color"/>
<rect x="24.1228" y="27.4184" width="1" height="1" transform="rotate(24.46 24.1228 27.4184)" :fill="color"/>
<rect x="11.2151" y="17.1524" width="1" height="5" transform="rotate(24.46 11.2151 17.1524)" :fill="color"/>
<rect x="8.15234" y="19.0551" width="1" height="14" transform="rotate(-65.54 8.15234 19.0551)" :fill="color"/>
<rect x="13.9458" y="18.3946" width="1" height="5" transform="rotate(24.46 13.9458 18.3946)" :fill="color"/>
<rect x="16.6765" y="19.6368" width="1" height="5" transform="rotate(24.46 16.6765 19.6368)" :fill="color"/>
<rect x="19.4075" y="20.879" width="1" height="5" transform="rotate(24.46 19.4075 20.879)" :fill="color"/>
<rect x="32.1509" y="26.6758" width="1" height="5" transform="rotate(24.46 32.1509 26.6758)" :fill="color"/>
<rect x="29.0881" y="28.5784" width="1" height="14" transform="rotate(-65.54 29.0881 28.5784)" :fill="color"/>
<rect x="34.8816" y="27.918" width="1" height="5" transform="rotate(24.46 34.8816 27.918)" :fill="color"/>
<rect x="37.6123" y="29.1601" width="1" height="5" transform="rotate(24.46 37.6123 29.1601)" :fill="color"/>
<rect x="40.3433" y="30.4023" width="1" height="5" transform="rotate(24.46 40.3433 30.4023)" :fill="color"/>
<path d="M15.3274 29.8302C15.6703 31.3815 16.3778 32.8288 17.3915 34.0522C18.4051 35.2755 19.6957 36.2398 21.1562 36.865C22.6168 37.4903 24.2052 37.7586 25.7901 37.6476C27.375 37.5367 28.9106 37.0497 30.2698 36.227L29.9077 35.6289C28.6436 36.394 27.2153 36.8469 25.7413 36.9501C24.2672 37.0533 22.7898 36.8038 21.4314 36.2223C20.073 35.6407 18.8727 34.7439 17.9299 33.6061C16.9871 32.4682 16.329 31.1221 16.0101 29.6793L15.3274 29.8302Z" :fill="color"/>
<path d="M10.8008 29.9745C11.3261 32.3513 12.422 34.5645 13.9937 36.4232C15.5655 38.2818 17.566 39.73 19.8225 40.6428C22.079 41.5555 24.5237 41.9054 26.9457 41.6623C29.3676 41.4191 31.694 40.5902 33.7241 39.2471L33.3209 38.6378C31.3898 39.9155 29.1767 40.704 26.8727 40.9353C24.5687 41.1666 22.2431 40.8338 20.0965 39.9654C17.9499 39.0971 16.0468 37.7195 14.5516 35.9514C13.0564 34.1833 12.0139 32.0779 11.5142 29.8169L10.8008 29.9745Z" :fill="color"/>
<path d="M6.27395 30.1189C6.96724 33.2556 8.4059 36.1792 10.4682 38.6422C12.5305 41.1052 15.1558 43.0353 18.1218 44.2689C21.0879 45.5026 24.3075 46.0037 27.5082 45.7298C30.7089 45.4558 33.7966 44.4149 36.5098 42.6951L36.0057 41.8998C33.4202 43.5386 30.4779 44.5305 27.4279 44.7916C24.3779 45.0526 21.3099 44.5752 18.4835 43.3995C15.657 42.2239 13.1554 40.3848 11.1902 38.0377C9.22495 35.6907 7.85402 32.9047 7.19338 29.9157L6.27395 30.1189Z" :fill="color"/>
</svg>

</template>
<style scoped>
.m_nav_deco{
    position: absolute;
    transition: color linear 0.1s, stroke linear 0.1s;
}
</style>
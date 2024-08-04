<template>
  <!-- 基本信息 -->
  <div class="message">
    <!-- Logo -->
    <div class="logo">
      <img class="logo-img" :src="siteLogo" alt="logo" />
      <div :class="{ name: true, 'text-hidden': true, long: siteUrl[0].length >= 6 }">
        <span class="bg">{{ siteUrl[0] }}</span>
        <span class="sm">.</span>
        <span class="sm">{{ siteUrl[1] }}</span>
      </div>
<!--      <div id="element"></div>-->
    </div>
    <!-- 简介 -->
    <div class="description cards" @click="changeBox">
      <div class="content">
        <Icon size="16">
          <QuoteLeft />
        </Icon>
        <div class="text">
          <p>{{ descriptionText.hello }}</p>
          <p>{{ descriptionText.text }}</p>
        </div>
        <Icon size="16">
          <QuoteRight />
        </Icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@vicons/utils";
import { QuoteLeft, QuoteRight } from "@vicons/fa";
import { Error } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import Pacifico from "@/assets/Pacifico.json";
const store = mainStore();

// 主页站点logo
const siteLogo = import.meta.env.VITE_SITE_MAIN_LOGO;
// 站点链接
const siteUrl = computed(() => {
  const url = import.meta.env.VITE_SITE_URL;
  // 判断协议前缀
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const urlFormat = url.replace(/^(https?:\/\/)/, "");
    return urlFormat.split(".");
  }
  return url.split(".");
});

function loadVara() {
  new Vara('#element', Pacifico, [{
    text: "Onei.moe", // String, text to be shown
    fontSize: 40, // Number, size of the text
    strokeWidth: 2, // Width / Thickness of the stroke
    color: "white", // Color of the text
    id: "", // String or integer, for if animations are called manually or when using the get() method. Default is the index of the object.
    duration: 3000, // Number, Duration of the animation in milliseconds
    textAlign:"left", // String, text align, accepted values are left,center,right
    x:0, // Number, x coordinate of the text
    y:0, // Number, y coordinate of the text
    fromCurrentPosition:{ // Whether the x or y coordinate should be from its calculated position, ie the position if x or y coordinates were not applied
      x:true, // Boolean
      y:true, // Boolean
    },
    autoAnimation: true, // Boolean, Whether to animate the text automatically
    queued: true, // Boolean, Whether the animation should be in a queue
    delay: 0,     // Delay before the animation starts in milliseconds
    /* Letter spacing can be a number or an object, if number, the spacing will be applied to every character.
    If object, each letter can be assigned a different spacing as follows,
    letterSpacing: {
        a: 4,
        j: -6,
        global: -1
    }
    The global property is used to set spacing of all other characters
    */
    letterSpacing: 0
  }],{
    // The options given below will be applicable to every text created,
    // however they will not override the options set above.
    // They will work as secondary options.
    fontSize: 24, // Number, size of the text
    strokeWidth:.5, // Width / Thickness of the stroke
    color:"black", // Color of the text
    duration: 2000, // Number, Duration of the animation in milliseconds
    textAlign: "left", // String, text align, accepted values are left,center,right
    autoAnimation: true, // Boolean, Whether to animate the text automatically
    queued: true, // Boolean, Whether the animation should be in a queue
    letterSpacing:0
  });
}

// 简介区域文字
const descriptionText = reactive({
  hello: import.meta.env.VITE_DESC_HELLO,
  text: import.meta.env.VITE_DESC_TEXT,
});

// 切换右侧功能区
const changeBox = () => {
  if (store.getInnerWidth >= 990) {
    store.boxOpenState = !store.boxOpenState;
  } else {
    ElMessage({
      message: "当前页面宽度不足以开启盒子",
      grouping: true,
      icon: h(Error, {
        theme: "filled",
        fill: "#efefef",
      }),
    });
  }
};

// onMounted(() => {
//   loadVara()
// });

// 监听状态变化
watch(() => store.boxOpenState,
  (value) => {
    if (value) {
      descriptionText.hello = import.meta.env.VITE_DESC_HELLO_OTHER;
      descriptionText.text = import.meta.env.VITE_DESC_TEXT_OTHER;
    } else {
      descriptionText.hello = import.meta.env.VITE_DESC_HELLO;
      descriptionText.text = import.meta.env.VITE_DESC_TEXT;
    }
  },
);
</script>

<style lang="scss" scoped>
@import "@/style/shadow.scss";

.message {
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    animation: fade 0.5s;
    max-width: 460px;
    .logo-img {
      border-radius: 50%;
      width: 120px;
      margin: 0 20px;
    }
    .name {
      padding: 6px;
      width: fit-content;
      transform: translateY(-8px);
      font-family: "Pacifico-Regular", serif;
      transition: text-shadow 0.3s;
      &:hover {
        text-shadow:
          0 0 7px var(--main-color),
          0 0 10px var(--main-color);
      }

      .bg {
        font-size: 5rem;
        line-height: 5rem;
      }

      .sm {
        font-size: 2rem;
        line-height: 2rem;
        @media (min-width: 720px) and (max-width: 789px) {
          display: none;
        }
      }
    }
    @media (max-width: 768px) {
      .logo-img {
        width: 100px;
      }
      .name {
        height: 128px;
        .bg {
          font-size: 4.5rem;
          line-height: 8rem;
        }
      }
    }

    @media (max-width: 720px) {
      max-width: 100%;
    }
  }

  .description {
    padding: 1rem;
    margin-top: 3.5rem;
    max-width: 460px;
    animation: fade 0.5s;
    transition: all 0.3s;
    background-color: var(--background-color);
    box-shadow: $default-shadow;

    &:hover {
      box-shadow: $hover-shadow;
    }

    .content {
      display: flex;
      justify-content: space-between;

      .text {
        margin: 0.75rem 1rem;
        line-height: 2rem;
        margin-right: auto;

        p {
          &:nth-of-type(1) {
            font-family: "Pacifico-Regular", serif;
          }
        }
      }

      .xicon:nth-of-type(2) {
        align-self: flex-end;
      }
    }
    @media (max-width: 720px) {
      max-width: 100%;
      pointer-events: none;
    }
  }
  @media (max-width: 390px) {
    .logo {
      flex-direction: column;
      .logo-img {
        display: none;
      }
      .name {
        margin-left: 0;
        height: auto;
        transform: none;
        text-align: center;
        .bg {
          font-size: 3.5rem;
        }
        .sm {
          font-size: 1.4rem;
        }
      }
    }
    .description {
      margin-top: 2.5rem;
    }
  }
}

/* 定义心跳动画 */
@keyframes heartbeat-animate {

  0%,
  100% {
    transform: scale(1)
  }

  10%,
  30% {
    transform: scale(.88)
  }

  20%,
  40%,
  60%,
  80% {
    transform: scale(1.08)
  }

  50%,
  70% {
    transform: scale(1.08)
  }
}

/* 默认状态 */
.fa-heart {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 鼠标悬停时的效果 */
.fa-heart:hover {
  animation: heartbeat-animate 1s infinite cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

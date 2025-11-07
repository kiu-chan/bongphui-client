<template>
  <label  class="relative  rounded-full cursor-pointer group ">
    <img
      class="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
      :src="previewImage || defaultAvatar"
      :style="{ width: width + 'px', height: height + 'px' }"
      alt="Avatar"
    />

    <div
      class="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-20 transition"
      :style="{ width: width + 'px', height: height + 'px' }"
    >
      <Icon name="ic:baseline-camera-alt" class="text-white text-6xl" />
    </div>

    <input
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import defaultAvatar from "../../../assets/img/default-avatar2.webp";

export default defineComponent({
  name: "InputImage",
  props:{
    width:{
      type:Number,
      require: true,
    },
     height:{
      type:Number,
      require: true,
    }
  },
  emits: ["image"],
  setup(props, { emit }) {
    const previewImage = ref<string>("");

    const handleFileChange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        previewImage.value = URL.createObjectURL(file);
        emit("image", file); // emit file về component cha
      }
    };

    return {
      previewImage,
      defaultAvatar,
      handleFileChange,
    };
  },
});
</script>

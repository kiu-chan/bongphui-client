<template>
  <transition name="fade">
    <div
      v-if="open"
      class="bgPopup fixed inset-0 flex justify-center items-center z-999"
    >
      <div
        class="w-full max-w-2xl bg-fc-dark rounded-xl shadow-2xl overflow-hidden text-white relative"
      >
        <div class="PopUp absolute inset-0 fc-radial-bg z-0"></div>
        <div class="PopUp-text relative z-10">
          <!-- Header -->
          <div class="px-5 py-4 border-b border-white border-opacity-10">
            <h2 class="text-xl font-bold">{{ title }}</h2>
          </div>

          <div class="mt-6 mb-6 flex justify-center">
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center w-[200px]"
            >
              <input
                type="file"
                id="fileInput"
                class="hidden"
                @change="handleFileChange"
              />
              <label
                for="fileInput"
                class="cursor-pointer flex flex-col items-center justify-center"
              >
                <svg
                  class="w-10 h-10 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p class="text-sm text-gray-500">
                  Kéo thả file vào đây hoặc click để chọn file
                </p>
              </label>
            </div>

            <p v-if="selectedFile" class="mt-2 text-sm text-gray-600">
              File đã chọn:
              <span class="font-medium">{{ selectedFile.name }}</span>
            </p>
          </div>
          <div>
            <p class="text-center mt-7 mb-7 flex justify-center">
              <button
                @click="downloadTemplate"
                class="flex items-center text-blue-500 hover:text-blue-700 text-sm"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
                Tải file mẫu import tại đây (.xlsx)
              </button>
            </p>
          </div>
          <!-- Footer -->
          <div
            class="bg-opacity-20 px-5 py-3 border-t border-white border-opacity-10 flex justify-end gap-4"
          >
            <button
              @click="$emit('toggle')"
              class="ButtonColor px-5 py-2 rounded-lg transition-colors"
            >
              Đóng
            </button>
            <button
              @click="fnaddImportfile"
              class="ButtonColor px-5 py-2 rounded-lg transition-colors"
            >
              {{ title }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useImportStore } from "../../../store/import";
export default defineComponent({
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
    alertmsg: {
      type: String,
      required: true,
    },
    alertmsgname: {
      type: String,
      required: true,
    },
  },
  emits: ["toggle", "success"],
  setup(props, ctx) {
    const { id } = toRefs(props);
    const selectedFile = ref<File | null>(null);
    const ImportStore = useImportStore();
    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      console.log(file, "file");
      if (file) {
        selectedFile.value = file;
      }
    };

    const downloadTemplate = () => {
      const fileUrl = new URL("~/assets/filemau/bong-2.xlsx", import.meta.url)
        .href;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "file-mau.xlsx";
      link.click();
    };
    const fnaddImportfile = async () => {
      if (selectedFile.value) {
        const base64 = await toBase64(selectedFile.value);
        const payload = {
          file: base64,
        };
        const params = [id.value && `teamId=${id.value}`].filter(Boolean);

        const url = params.length > 0 ? `?${params.join("&")}` : "";
        ImportStore.fnAddImportTeam(url, payload)
          .then((res: any) => {
            console.log(res, "chính");
            ctx.emit("success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    const toBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
    };
    return {
      selectedFile,
      handleFileChange,
      downloadTemplate,
      fnaddImportfile,
    };
  },
});
</script>

<style scoped>
.PopUp {
  background-color: hsl(210 9.09% 4.31%);
  box-shadow: 5px 10px;
}
.PopUp-text {
  background-image: radial-gradient(
    ellipse 68% 117% at 49% 1%,
    rgb(7, 71, 34),
    transparent 94%
  );
}
.bgPopup {
  background-color: rgba(0, 0, 0, 0.7);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.input {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  border: 1.5px solid var(--textButton);
  border-radius: 0.5rem;
  box-shadow: 2.5px 3px 0 var(--textButton);
  outline: none;
  transition: ease 0.25s;
}

.input:focus {
  box-shadow: 5.5px 7px 0 var(--textButton);
}
/* From Uiverse.io by risabbir */
.nebula-input {
  position: relative;
  width: 100%;
  margin: 10px auto;
}

.nebula-input .input {
  width: 100%;
  padding: 15px;
  border: 2px solid #2a2a3a;
  background: #00000f;
  color: white;
  font-size: 16px;
  outline: none;
  border-radius: 8px;
  transition: all 0.4s ease-out;
}

.nebula-input .user-label {
  position: absolute;
  left: 15px;
  top: 15px;
  pointer-events: none;
  color: #6a6a8a;
  transition: all 0.4s ease-out;
  background: #00000f;
  padding: 0 5px;
}

.nebula-input .input:focus {
  border-color: var(--textButton);
  box-shadow: 0 5px 8px rgba(48, 207, 56, 0.3),
    0 10px 20px rgba(105, 236, 111, 0.3), 0 15px 40px rgba(93, 247, 101, 0.3),
    0 20px 60px rgba(80, 250, 89, 0.3);
}

.nebula-input .input:focus ~ .user-label,
.nebula-input .input:valid ~ .user-label {
  transform: translateY(-25px);
  font-size: 12px;
  color: var(--textsport);
  left: 10px;
}

.nebula-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  top: 50%;
  left: 10px;
  filter: blur(0.8px);
  mix-blend-mode: screen;
  transition: opacity 0.3s ease;
}

.nebula-input .input:focus ~ .nebula-particle {
  animation: nebula-float 2s forwards ease-out;
}

@keyframes nebula-float {
  0% {
    transform: translate(0, -50%) scale(0.8);
    opacity: 0;
    background: #77f8a2;
  }
  20% {
    opacity: 0.8;
  }
  100% {
    transform: translate(calc(var(--x) * 140px), calc(var(--y) * 35px))
      scale(1.1);
    opacity: 0;
    background: #6df2ff;
  }
}
.ButtonColor {
  color: var(--textsport);
  background-color: var(--background);
  border: 1px solid var(--textButton);
  transition: all 0.4s ease-out;
}
.ButtonColor:hover {
  box-shadow: 0 5px 8px rgba(48, 207, 56, 0.3),
    0 10px 20px rgba(105, 236, 111, 0.3), 0 15px 40px rgba(93, 247, 101, 0.3),
    0 20px 60px rgba(80, 250, 89, 0.3);
}
</style>

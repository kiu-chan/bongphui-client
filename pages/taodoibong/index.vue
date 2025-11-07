<template>
  <div class="background-taodoibong flex justify-center">
    <div class="container app-container mt-4">
      <div>
        <div class="flex justify-between items-center cursor-pointer">
          <NuxtLink to="/doibong">
            <div class="flex justify-between items-center gap-2">
              <div
                style="background: rgba(245, 245, 245, 1)"
                class="w-[54px] h-[54px] rounded-full flex justify-center items-center"
              >
                <Icon
                  class="text-[20px]"
                  name="ci:chevron-left"
                  width="40"
                  height="40"
                />
              </div>
              <h3>Quay lại</h3>
            </div>
          </NuxtLink>
          <div
            style="background: rgba(245, 245, 245, 1)"
            class="w-[54px] h-[54px] rounded-full flex justify-center items-center"
          >
            <Icon
              class="text-[20px]"
              name="hugeicons:settings-01"
              width="24"
              height="24"
            />
          </div>
        </div>
      </div>
      <div
        class="h-[408px] w-full rounded-[40px] overflow-hidden mt-4 relative"
      >
        <img class="h-full w-full object-cover" :src="hereWego" alt="" />
        <div class="logoTeam flex gap-4 items-center">
          <InputImage :width="188" :height="188" @image="handleImage" />
          <h2
            style="color: rgba(255, 255, 255, 1)"
            class="font-medium text-[40px]"
          >
            {{ name }}
          </h2>
        </div>
      </div>
      <div class="mt-[70px] mb-[70px] flex flex-wrap justify-center">
        <div class="w-[1207px]">
          <div class="w-full mb-3">
            <InputForm
              v-model="name"
              :name="'Tên đội bóng'"
              :placeHolder="'Tên đội bóng'"
            />
          </div>

          <!-- Ô Khu vực -->
          <div class="w-full mb-3">
            <InputForm
              v-model="date"
              :name="'Năm thành lập đội bóng'"
              :placeHolder="'Năm thành lập đội bóng'"
            />
          </div>
          <div class="w-full mb-3">
            <InputForm
              v-model="username"
              :name="'@UserName'"
              :placeHolder="'@UserName'"
            />
          </div>
          <div class="w-full mb-3">
            <inputArea v-model="description" :name="'Giới thiệu'" />
          </div>
          <div class="grid grid-cols-2 gap-4 mb-3">
            <div class="col-span-1">
              <InputForm
                v-model="nameCoach"
                :name="'Tên HLV'"
                :placeHolder="'Tên huấn luyện viên'"
              />
            </div>
            <div class="col-span-1">
              <InputForm
                v-model="nationality"
                :name="'Quốc tịch'"
                :placeHolder="'Quốc tịch'"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
              <DatePicker v-model="birthdate" :name="'Ngày sinh'" />
            </div>
            <div class="col-span-1">
              <InputForm
                v-model="cccd"
                :name="'Căn cước công dân'"
                :placeHolder="'Căn cước công dân'"
              />
            </div>
          </div>
          <!-- Ô Địa chỉ -->

          <!-- <div>
            <span>Điều lệ mùa giải</span>
            <div>
              <div
                style="background: rgba(4, 184, 10, 0.14); border-radius: 15px"
                class="flex justify-center gap-2 items-center w-[200px] h-[60px]"
              >
                <Icon
                  name="ic:baseline-arrow-circle-down"
                  width="24"
                  height="24"
                  style="color: #4ec718; width: 47px; height: 31px"
                />
                <span>Dowload file</span>
              </div>
            </div>
          </div>
          <h3
            class="font-normal text-[25px] mt-3 mb-4"
            style="color: rgba(244, 134, 55, 1)"
          >
            Nhà tài trợ (Cho lần đầu)
          </h3>
          <div class="max-w-[828px]">
            <InputForm
              :name="'Tên doanh nghiệp nhà tài trợ'"
              :placeHolder="'Nhập thông tin'"
            />
          </div>
          <div
            style="color: rgba(0, 0, 0, 1)"
            class="font-Medium text-[30px] mt-5 mb-5"
          >
            THÔNG TIN LIÊN HỆ
          </div>
          <div class="grid grid-cols-2 gap-4 items-end mb-3">
            <div class="col-span-1">
              <InputForm
                :name="'Tên công ty'"
                :placeHolder="'Nhập thông tin'"
              />
            </div>
            <div class="col-span-1">
              <InputForm
                :name="'Mạng xã hội'"
                :placeHolder="'VD:http://localhost:3000/taogiaidau'"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 items-end">
            <div class="col-span-1">
              <InputForm
                :name="'Số điện thoại'"
                :placeHolder="'Nhập số điện thoại'"
              />
            </div>
            <div class="col-span-1">
              <InputForm
                :name="'Địa chỉ công ty'"
                :placeHolder="'Nhập địa chỉ'"
              />
            </div>
          </div> -->
          <div
            style="
              border-radius: 15px;
              background: linear-gradient(90deg, #04b80a 0%, #04b80a 100%);
            "
            @click="handelTeamadd"
            class="w-[309px] h-[70px] flex justify-center items-center mt-8"
          >
            <p
              style="color: rgba(255, 255, 255, 1)"
              class="font-medium text-[25px]"
            >
              Xác nhận
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { useRoute } from "vue-router";
import hereWego from "../../assets/img/hereWeGo.png";
import InputForm from "../../component/library/input/index.vue";
import DatePicker from "../../component/library/DatePicker/index.vue";
import inputArea from "../../component/library/inputArea/index.vue";
import selectForm from "../../component/library/selectNebula/index.vue";
import InputImage from "../../component/library/InputImage/index.vue";
import { useTeamStore } from "../../store/team";
import { useImportStore } from "../../store/import";

export default defineComponent({
  components: {
    InputForm,
    DatePicker,
    inputArea,
    selectForm,
    InputImage,
  },
  setup() {
    onMounted(() => {});
    const TeamStore = useTeamStore();
    const statusMatch = [
      {
        id: 1,
        name: "Loại trực tiếp",
      },
      {
        id: 2,
        name: "Vòng bảng",
      },
    ];
    const toast = useToast();
    const ImportStore = useImportStore();
    const formData = new FormData();
    const logoId: Ref<number> = ref(0);
    const name: Ref<string> = ref("Tên đội bóng");
    const username: Ref<string> = ref("");
    const date: Ref<number | undefined> = ref();
    const nameCoach: Ref<string> = ref("");
    const nationality: Ref<string> = ref("");
    const cccd: Ref<string> = ref("");
    const birthdate: Ref<string> = ref("");
    const description: Ref<string> = ref("");
    const handleImage = (file: File) => {
      formData.append("file", file);
    };
    const fnAddImg = () => {
      const params = new URLSearchParams({
        imageType: "4",
      });
      if (logoId.value) {
        params.append("imageId", logoId.value.toString());
      }
      const url = `?${params.toString()}`;

      ImportStore.fnAddImportLogoTeam(url, formData);
    };
    const handelTeamadd = () => {
      const payload = {
        name: name.value,
        logoUrl: "mandan/img",
        username: username.value,
        foundedYear: date.value,
        homeStadium: "Hoàng mai",
        description: description.value,
        coach: {
          cccd: cccd.value,
          birthdate: birthdate.value,
          nationality: nationality.value,
          name: nameCoach.value,
        },
        tournaments: [],
        players: [],
      };
      TeamStore.fnAddTeam(payload)
        .then((res: any) => {
          if (res.teamId) {
            logoId.value = res.teamId;
            fnAddImg();
            fnReset();
            toast.success({
              title: "Success!",
              message: "thêm đội bóng thành công",
              position: "topRight",
            });
          }
        })
        .catch((err) => {
          toast.error({
            title: "Error!",
            message: "thêm đội bóng thất bại",
            position: "topRight",
          });
        });
    };
    const fnReset = () => {
      name.value = "";
      username.value = "";
      date.value = undefined;
      description.value = "";
      nameCoach.value = "";
      cccd.value = "";
      birthdate.value = "";
      nationality.value = "";
    };
    return {
      hereWego,
      statusMatch,
      name,
      username,
      date,
      description,
      cccd,
      birthdate,
      nationality,
      nameCoach,
      handleImage,
      handelTeamadd,
    };
  },
});
// const route = useRoute();
</script>

<style scoped>
.inputBackground {
  background-color: rgba(250, 249, 249, 1);
  height: 50px;
  align-items: center;
  border-radius: 15px;
  padding-left: 20px;
  outline: none;
}
.background-taodoibong {
  background: rgba(255, 255, 255, 1);
}
.text-header::after {
  content: "";
  display: block;
  background: linear-gradient(
    to right,
    var(--textsport) 20.69%,
    var(--textsport2) 58.36%
  );
  height: 1px;
  width: 0;
  transition: all 0.3s ease;
}
.text-header:hover::after {
  width: 100%;
}
.text-gradient:hover {
  background: linear-gradient(
    to right,
    var(--textsport) 20.69%,
    var(--textsport2) 58.36%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.text-gradient2 {
  background: linear-gradient(
    to right,
    var(--textsport) 20.69%,
    var(--textsport2) 58.36%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.logoTeam {
  position: absolute;
  left: 20px;
  right: 0;
  bottom: 20px;
}
</style>

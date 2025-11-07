<template>
  <div class="background-quanlydoibong flex justify-center">
    <div class="container app-container mt-4">
      <div>
        <div class="flex justify-between items-center cursor-pointer">
          <NuxtLink to="/giaidau">
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
        <img class="h-full w-full object-cover" :src="championLeague" alt="" />
        <div class="logoTournament flex gap-4 items-center">
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
          <div class="mb-3">
            <InputForm
              :name="'Tên giải đấu'"
              :placeHolder="'Nhập tên giải đấu'"
              v-model="name"
            />
          </div>
          <div class="grid grid-cols-4 gap-4 items-end mb-3">
            <!-- Ô Khu vực -->
            <div class="col-span-1">
              <selectForm
                :name="'Chọn khu vực'"
                :statusMatch="statusMatch"
                v-model="country"
              />
            </div>

            <!-- Ô Địa chỉ -->
            <div class="col-span-3">
              <InputForm
                :name="'Địa chỉ'"
                :placeHolder="'Nhập địa chỉ'"
                v-model="location"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 items-end mb-3">
            <!-- Ô Khu vực -->
            <div class="col-span-1">
              <DatePicker :name="'Ngày bắt đầu'" v-model="startDate" />
            </div>

            <!-- Ô Địa chỉ -->
            <div class="col-span-1">
              <DatePicker :name="'Ngày kết thúc'" v-model="endDate" />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 mb-3">
            <selectForm
              class="col-span-1"
              :name="'hình thức thi đấu'"
              :statusMatch="hinhthuc"
              v-model="competitionType"
            />
            <selectForm
              class="col-span-1"
              :name="'Số VĐV thi đấu'"
              :statusMatch="dachinh"
              v-model="numberOfPlayersPlay"
            />
            <selectForm
              class="col-span-1"
              :name="'Số VĐV dự bị'"
              :statusMatch="daPhu"
              v-model="numberOfPlayersSubstitute"
            />
          </div>
          <div class="grid grid-cols-3 gap-4 mb-3">
            <selectForm
              class="col-span-1"
              :name="'Điểm thắng'"
              :statusMatch="winscore"
              v-model="winScore"
            />
            <selectForm
              class="col-span-1"
              :name="'Điểm hòa'"
              :statusMatch="drawscore"
              v-model="drawScore"
            />
            <selectForm
              class="col-span-1"
              :name="'Điểm thua'"
              :statusMatch="losescore"
              v-model="loseScore"
            />
          </div>
          <div>
            <h1 class="font-medium text-[25px] mb-3">
              Quy tắc các bảng xếp hạng
            </h1>
            <draggable
              :list="rules"
              item-key="name"
              class="list-group"
              ghost-class="ghost"
              @start="dragging = true"
              @end="dragging = false"
            >
              <template #item="{ element }">
                <div class="list-group-item">
                  {{ element.name }}
                </div>
              </template>
            </draggable>
          </div>
          <div>
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
          <div>
            <inputArea :name="'Mô tả mùa giải'" v-model="description" />
          </div>
          <h3
            class="font-normal text-[25px] mt-3 mb-4"
            style="color: rgba(244, 134, 55, 1)"
          >
            Nhà tài trợ (Cho lần đầu)
          </h3>
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2">
              <InputForm
                :name="'Tên doanh nghiệp nhà tài trợ'"
                :placeHolder="'Nhập thông tin'"
                v-model="sponsor"
              />
            </div>
            <div class="col-span-1">
              <InputForm
                :name="'Đơn vị truyền thông'"
                :placeHolder="'Nhập thông tin'"
                v-model="media"
              />
            </div>
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
                v-model="companyName"
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
                v-model="phone"
              />
            </div>
            <div class="col-span-1">
              <InputForm
                :name="'Địa chỉ công ty'"
                :placeHolder="'Nhập địa chỉ'"
                v-model="companyAddress"
              />
            </div>
          </div>
          <div
            style="
              border-radius: 15px;
              background: linear-gradient(90deg, #04b80a 0%, #04b80a 100%);
            "
            class="w-[309px] h-[70px] flex justify-center items-center mt-8 cursor-pointer"
            @click="fnAddTournament"
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
import championLeague from "../../assets/img/championLeague (2).png";
import InputForm from "../../component/library/input/index.vue";
import DatePicker from "../../component/library/DatePicker/index.vue";
import inputArea from "../../component/library/inputArea/index.vue";
import selectForm from "../../component/library/selectNebula/index.vue";
import InputImage from "../../component/library/InputImage/index.vue";
import draggable from "vuedraggable";
import { useTournamentStore } from "../../store/tournament";
import { useImportStore } from "../../store/import";

import {
  drawscore,
  winscore,
  losescore,
  daPhu,
  dachinh,
  hinhthuc,
  RankingRules,
} from "../../utils/tournament";
export default defineComponent({
  components: {
    InputForm,
    InputImage,
    DatePicker,
    inputArea,
    selectForm,
    draggable,
  },
  setup() {
    onMounted(() => {});
    const toast = useToast();
    const rules = ref([...RankingRules]);
    const TournamentStore = useTournamentStore();
    const ImportStore = useImportStore();
    const image: Ref<string> = ref("");
    const logo: Ref<string> = ref("");
    const name: Ref<string> = ref("Tên giải đấu của bạn ");
    const description: Ref<string> = ref("");
    const startDate: Ref<string> = ref("");
    const endDate: Ref<string> = ref("");
    const country: Ref<string> = ref("");
    const location: Ref<string> = ref("");
    const file: Ref<string> = ref("");
    const logoId: Ref<number> = ref(0);
    const selectedFile: Ref<File | null> = ref(null);
    const imageId: Ref<number> = ref(0);
    const competitionType: Ref<string> = ref("");
    const numberOfTeams: Ref<string> = ref(0);
    const numberOfPlayersPlay: Ref<string> = ref(0);
    const numberOfPlayersSubstitute: Ref<string> = ref(0);
    const username: Ref<string> = ref("");
    const drawScore: Ref<string> = ref(0);
    const winScore: Ref<string> = ref(0);
    const loseScore: Ref<string> = ref(0);
    const sponsor: Ref<string> = ref("");
    const broadcast: Ref<string> = ref("");
    const media: Ref<string> = ref("");
    const phone: Ref<string> = ref("");
    const companyName: Ref<string> = ref("");
    const companyAddress: Ref<string> = ref("");
    const fund: Ref<number> = ref(0);
    const dragging: Ref<boolean> = ref(false);
    const formData = new FormData();
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
    const fnAddTournament = () => {
      const payload = {
        image: "image",
        logo: "image",
        name: name.value,
        description: description.value,
        startDate: startDate.value,
        endDate: endDate.value,
        country: country.value,
        location: location.value,
        file: "dieuluay",
        competitionType: parseInt(competitionType.value),
        numberOfTeams: parseInt(numberOfTeams.value),
        numberOfPlayersPlay: parseInt(numberOfPlayersPlay.value),
        numberOfPlayersSubstitute: parseInt(numberOfPlayersSubstitute.value),
        username: "oki",
        drawScore: parseInt(drawScore.value),
        winScore: parseInt(winScore.value),
        loseScore: parseInt(loseScore.value),
        sponsor: sponsor.value,
        broadcast: "10000",
        media: media.value,
        phone: phone.value,
        fund: 0,
        companyName: companyName.value,
        companyAddress: companyAddress.value,
        rankingRules: rules.value,
      };
      TournamentStore.fnAddTournament(payload)
        .then((res) => {
          console.log("res", res);
          logoId.value = res.id;
          fnAddImg();
          toast.success({
            title: "Success!",
            message: "thêm giải đấu thành công",
          });
        })
        .catch((err) => {
          toast.error({
            title: "Error!",
            message: "thêm giải đấu thất bại",
            position: "topRight",
          });
        });
    };
    return {
      championLeague,
      statusMatch,
      image,
      name,
      logo,
      endDate,
      startDate,
      description,
      country,
      location,
      file,
      competitionType,
      numberOfTeams,
      numberOfPlayersPlay,
      numberOfPlayersSubstitute,
      username,
      drawScore,
      winScore,
      loseScore,
      sponsor,
      broadcast,
      media,
      phone,
      fund,
      companyName,
      companyAddress,
      dragging,
      rules,
      drawscore,
      winscore,
      losescore,
      daPhu,
      dachinh,
      hinhthuc,
      fnAddTournament,
      handleImage,
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
.background-quanlydoibong {
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
.logoTournament {
  position: absolute;
  left: 20px;
  right: 0;
  bottom: 20px;
}
.list-group-item {
  height: 50px;
  margin-bottom: 10px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  border: 1px solid rgb(220, 213, 213);
  border-radius: 10px;
}
</style>

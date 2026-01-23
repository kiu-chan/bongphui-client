<template>
  <div class="page-root">
    <div class="container">
      <header class="page-header">
        <NuxtLink to="/giaidau" class="back-link">
          <div class="back-icon">
            <Icon name="ci:chevron-left" width="40" height="40" />
          </div>
          <span>Quay lại</span>
        </NuxtLink>

        <div class="settings-icon" title="Cài đặt">
          <Icon name="hugeicons:settings-01" width="24" height="24" />
        </div>
      </header>

      <!-- Banner -->
      <section class="banner">
        <img class="banner-img" :src="championLeague" alt="banner" />
        <div class="banner-overlay">
          <InputImage :width="188" :height="188" @image="onImageSelected" />
          <div class="title-block">
            <h2 class="tournament-name">{{ name || 'Tên giải đấu của bạn' }}</h2>
          </div>
        </div>
      </section>

      <form class="form" @submit.prevent="onSubmit">
        <!-- Tên giải đấu -->
        <div class="form-row">
          <InputForm
            :name="'Tên giải đấu'"
            :placeHolder="'Nhập tên giải đấu'"
            v-model="name"
            :error="errors.name"
          />
        </div>

        <!-- Khu vực + Địa chỉ -->
        <div class="grid-4">
          <div>
            <selectForm
              :name="'Chọn khu vực'"
              :statusMatch="statusMatch"
              v-model="country"
              :error="errors.country"
            />
          </div>

          <div class="col-span-3">
            <selectForm
              :name="'Địa chỉ'"
              :statusMatch="statusProvince"
              v-model="location"
              :error="errors.location"
            />
          </div>
        </div>

        <!-- Dates -->
        <div class="grid-2">
          <div>
            <DatePicker :name="'Ngày bắt đầu'" v-model="startDate" :error="errors.startDate" />
          </div>

          <div>
            <DatePicker :name="'Ngày kết thúc'" v-model="endDate" :error="errors.endDate" />
          </div>
        </div>

        <!-- Competition type / Players -->
        <div class="grid-3">
          <div>
            <selectForm
              :name="'Hình thức thi đấu'"
              :statusMatch="hinhthuc"
              v-model="competitionType"
              :error="errors.competitionType"
            />
          </div>

          <div>
            <selectForm
              :name="'Số VĐV thi đấu'"
              :statusMatch="dachinh"
              v-model="numberOfPlayersPlay"
              :error="errors.numberOfPlayersPlay"
            />
          </div>

          <div>
            <selectForm
              :name="'Số VĐV dự bị'"
              :statusMatch="daPhu"
              v-model="numberOfPlayersSubstitute"
              :error="errors.numberOfPlayersSubstitute"
            />
          </div>
        </div>

        <!-- Scores -->
        <div class="grid-3">
          <div>
            <selectForm :name="'Điểm thắng'" :statusMatch="winscore" v-model="winScore" :error="errors.winScore" />
          </div>
          <div>
            <selectForm :name="'Điểm hòa'" :statusMatch="drawscore" v-model="drawScore" :error="errors.drawScore" />
          </div>
          <div>
            <selectForm :name="'Điểm thua'" :statusMatch="losescore" v-model="loseScore" :error="errors.loseScore" />
          </div>
        </div>

        <!-- Ranking rules (draggable) -->
        <section class="rules">
          <h3>Quy tắc bảng xếp hạng</h3>
          <draggable :list="rules" item-key="id" class="rules-list" ghost-class="ghost">
            <template #item="{ element, index }">
              <div class="rule-item">
                <input type="text" v-model="element.name" placeholder="Nhập quy tắc" />
                <button type="button" class="btn-delete" @click="removeRule(index)">X</button>
              </div>
            </template>
          </draggable>
          <button type="button" class="btn-add" @click="addRule">Thêm mới quy tắc</button>
        </section>

        <!-- File upload (regulation) -->
        <section class="file-upload">
          <h3>Điều lệ mùa giải</h3>
          <label class="file-label">
            <input type="file" @change="onFileChange" />
            <div class="file-placeholder">{{ selectedFile?.name || 'Upload file' }}</div>
          </label>
        </section>

        <!-- Description -->
        <div class="form-row">
          <inputArea :name="'Mô tả mùa giải'" v-model="description" :error="errors.description" />
        </div>

        <!-- Sponsors -->
        <section class="sponsor">
          <h3>Nhà tài trợ (Cho lần đầu)</h3>
          <div class="grid-3">
            <div class="col-span-2">
              <InputForm :name="'Tên doanh nghiệp nhà tài trợ'" :placeHolder="'Nhập thông tin'" v-model="sponsor" :error="errors.sponsor" />
            </div>

            <div>
              <InputForm :name="'Đơn vị truyền thông'" :placeHolder="'Nhập thông tin'" v-model="media" :error="errors.media" />
            </div>
          </div>
        </section>

        <!-- Contact info -->
        <section class="contact">
          <h3>THÔNG TIN LIÊN HỆ</h3>

          <div class="grid-2">
            <div>
              <InputForm :name="'Tên công ty'" :placeHolder="'Nhập thông tin'" v-model="companyName" :error="errors.companyName" />
            </div>
            <div>
              <InputForm :name="'Mạng xã hội'" :placeHolder="'VD:http://...'" v-model="socialLink" :error="errors.socialLink" />
            </div>
          </div>

          <div class="grid-2">
            <div>
              <InputForm :name="'Số điện thoại'" :placeHolder="'Nhập số điện thoại'" v-model="phone" :error="errors.phone" />
            </div>
            <div>
              <InputForm :name="'Địa chỉ công ty'" :placeHolder="'Nhập địa chỉ'" v-model="companyAddress" :error="errors.companyAddress" />
            </div>
          </div>
        </section>

        <div class="submit-row">
          <button type="submit" class="btn-submit">Xác nhận</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import championLeague from "../../assets/img/championLeague (2).png";
import InputForm from "../../component/library/input/index.vue";
import DatePicker from "../../component/library/DatePicker/index.vue";
import inputArea from "../../component/library/inputArea/index.vue";
import selectForm from "../../component/library/selectNebula/index.vue";
import InputImage from "../../component/library/InputImage/index.vue";
import draggable from "vuedraggable";
import { useTournamentStore } from "../../store/tournament";
import { useImportStore } from "../../store/import";
import { useProvinceStore } from "../../store/province";
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
  name: "TournamentManagement",
  components: {
    InputForm,
    DatePicker,
    inputArea,
    selectForm,
    InputImage,
    draggable,
  },
  setup() {
    const toast = useToast();
    const TournamentStore = useTournamentStore();
    const ImportStore = useImportStore();
    const ProvinceStore = useProvinceStore();

    // form fields
    const name = ref<string>("");
    const description = ref<string>("");
    const startDate = ref<string>("");
    const endDate = ref<string>("");
    const country = ref<any>(null);
    const location = ref<any>(null);
    const competitionType = ref<any>(null);
    const numberOfPlayersPlay = ref<any>(null);
    const numberOfPlayersSubstitute = ref<any>(null);
    const drawScore = ref<any>(null);
    const winScore = ref<any>(null);
    const loseScore = ref<any>(null);
    const sponsor = ref<string>("");
    const media = ref<string>("");
    const phone = ref<string>("");
    const companyName = ref<string>("");
    const companyAddress = ref<string>("");
    const socialLink = ref<string>("");

    // files / image
    const selectedFile = ref<File | null>(null);
    const imageForm = new FormData();

    // lists
    const rules = ref<any[]>([...RankingRules]);
    const statusMatch = ref<any[]>([]);
    const statusProvince = ref<any[]>([]);

    // errors
    const errors = ref<Record<string, string>>({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      country: "",
      location: "",
      competitionType: "",
      numberOfPlayersPlay: "",
      numberOfPlayersSubstitute: "",
      drawScore: "",
      winScore: "",
      loseScore: "",
      sponsor: "",
      media: "",
      phone: "",
      companyName: "",
      companyAddress: "",
      socialLink: "",
    });

    const onImageSelected = (file: File) => {
      imageForm.delete("file");
      imageForm.append("file", file);
    };

    const onFileChange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      if (input.files && input.files.length) {
        selectedFile.value = input.files[0];
      } else {
        selectedFile.value = null;
      }
    };

    const fnGetProvinces = async () => {
      try {
        const res = await ProvinceStore.fnGetProvince();
        statusMatch.value = res.map((p: any) => ({ id: p.code ?? p.id, name: p.name }));
      } catch (err) {
        // ignore
      }
    };

    const fnGetProvincesWar = async (countryId: number) => {
      try {
        const res = await ProvinceStore.fnGetProvinceWar(countryId);
        statusProvince.value = res.map((p: any) => ({ id: p.code ?? p.id, name: p.fullName ?? p.fullname ?? p.name }));
      } catch (err) {
        // ignore
      }
    };

    watch(country, (v) => {
      if (v && v.id) {
        fnGetProvincesWar(v.id);
        errors.value.country = "";
      }
    });

    // watches to clear errors on change
    watch(name, () => (errors.value.name = ""));
    watch(description, () => (errors.value.description = ""));
    watch(startDate, () => (errors.value.startDate = ""));
    watch(endDate, () => (errors.value.endDate = ""));
    watch(location, () => (errors.value.location = ""));
    watch(competitionType, () => (errors.value.competitionType = ""));
    watch(numberOfPlayersPlay, () => (errors.value.numberOfPlayersPlay = ""));
    watch(numberOfPlayersSubstitute, () => (errors.value.numberOfPlayersSubstitute = ""));
    watch(drawScore, () => (errors.value.drawScore = ""));
    watch(winScore, () => (errors.value.winScore = ""));
    watch(loseScore, () => (errors.value.loseScore = ""));
    watch(sponsor, () => (errors.value.sponsor = ""));
    watch(media, () => (errors.value.media = ""));
    watch(phone, () => {
      // live validate phone
      if (!phone.value) errors.value.phone = "Vui lòng nhập số điện thoại";
      else if (!/^[0-9]{9,10}$/.test(phone.value)) errors.value.phone = "Số điện thoại không hợp lệ (9-10 số)";
      else errors.value.phone = "";
    });
    watch(companyName, () => (errors.value.companyName = ""));
    watch(companyAddress, () => (errors.value.companyAddress = ""));
    watch(socialLink, () => (errors.value.socialLink = ""));

    onMounted(() => {
      fnGetProvinces();
    });

    const validate = (): boolean => {
      // reset errors
      Object.keys(errors.value).forEach((k) => (errors.value[k] = ""));

      let hasError = false;
      if (!name.value || !name.value.trim()) {
        errors.value.name = "Vui lòng nhập tên giải đấu";
        hasError = true;
      }
      if (!description.value || !description.value.trim()) {
        errors.value.description = "Vui lòng nhập mô tả mùa giải";
        hasError = true;
      }
      if (!startDate.value) {
        errors.value.startDate = "Vui lòng chọn ngày bắt đầu";
        hasError = true;
      }
      if (!endDate.value) {
        errors.value.endDate = "Vui lòng chọn ngày kết thúc";
        hasError = true;
      }
      if (!country.value || !country.value.name) {
        errors.value.country = "Vui lòng chọn khu vực";
        hasError = true;
      }
      if (!location.value) {
        errors.value.location = "Vui lòng chọn địa chỉ";
        hasError = true;
      }
      if (!competitionType.value) {
        errors.value.competitionType = "Vui lòng chọn hình thức thi đấu";
        hasError = true;
      }
      if (!numberOfPlayersPlay.value) {
        errors.value.numberOfPlayersPlay = "Vui lòng chọn số VĐV thi đấu";
        hasError = true;
      }
      if (!numberOfPlayersSubstitute.value) {
        errors.value.numberOfPlayersSubstitute = "Vui lòng chọn số VĐV dự bị";
        hasError = true;
      }
      if (!winScore.value) {
        errors.value.winScore = "Vui lòng chọn điểm thắng";
        hasError = true;
      }
      if (!drawScore.value) {
        errors.value.drawScore = "Vui lòng chọn điểm hòa";
        hasError = true;
      }
      if (!loseScore.value) {
        errors.value.loseScore = "Vui lòng chọn điểm thua";
        hasError = true;
      }
      if (!sponsor.value || !sponsor.value.trim()) {
        errors.value.sponsor = "Vui lòng nhập tên nhà tài trợ";
        hasError = true;
      }
      if (!media.value || !media.value.trim()) {
        errors.value.media = "Vui lòng nhập đơn vị truyền thông";
        hasError = true;
      }
      if (!phone.value) {
        errors.value.phone = "Vui lòng nhập số điện thoại";
        hasError = true;
      } else if (!/^[0-9]{9,10}$/.test(phone.value)) {
        errors.value.phone = "Số điện thoại không hợp lệ (9-10 số)";
        hasError = true;
      }
      if (!companyName.value || !companyName.value.trim()) {
        errors.value.companyName = "Vui lòng nhập tên công ty";
        hasError = true;
      }
      if (!companyAddress.value || !companyAddress.value.trim()) {
        errors.value.companyAddress = "Vui lòng nhập địa chỉ công ty";
        hasError = true;
      }

      return !hasError; // return true if valid
    };

    const onSubmit = async () => {
      const ok = validate();
      if (!ok) {
        toast.error({
          title: "Lỗi",
          message: "Vui lòng hoàn thành các trường bắt buộc",
          position: "topRight",
        });
        return;
      }

      const payload = {
        name: name.value,
        description: description.value,
        startDate: startDate.value,
        endDate: endDate.value,
        country: country.value?.name ?? "",
        location: location.value?.name ?? location.value ?? "",
        competitionType: competitionType.value?.id ?? competitionType.value ?? null,
        numberOfPlayersPlay: numberOfPlayersPlay.value?.id ?? numberOfPlayersPlay.value ?? null,
        numberOfPlayersSubstitute: numberOfPlayersSubstitute.value?.id ?? numberOfPlayersSubstitute.value ?? null,
        drawScore: drawScore.value?.id ?? drawScore.value ?? null,
        winScore: winScore.value?.id ?? winScore.value ?? null,
        loseScore: loseScore.value?.id ?? loseScore.value ?? null,
        sponsor: sponsor.value,
        media: media.value,
        phone: phone.value,
        companyName: companyName.value,
        companyAddress: companyAddress.value,
        socialLink: socialLink.value,
        rankingRules: rules.value,
      };

      try {
        const res = await TournamentStore.fnAddTournament(payload);
        const newId = res?.id ?? null;

        // upload banner/logo if selected
        if (imageForm.has("file") && newId) {
          const params = new URLSearchParams({ imageType: "4", imageId: String(newId) });
          await ImportStore.fnAddImportLogoTeam(`?${params.toString()}`, imageForm);
        }

        // upload regulation file if any
        if (selectedFile.value && newId) {
          const fd = new FormData();
          fd.append("file", selectedFile.value);
          await ImportStore.fnAddImportFile(`?excelType=1&excelId=${newId}`, fd);
        }

        toast.success({ title: "Thành công", message: "Thêm giải đấu thành công", position: "topRight" });
        resetForm();

        if (newId) {
          navigateTo(`/quanlygiaidau/${newId}/danhsachdoibong`);
        }
      } catch (err) {
        console.error(err);
        toast.error({ title: "Lỗi", message: "Thêm giải đấu thất bại", position: "topRight" });
      }
    };

    const resetForm = () => {
      name.value = "";
      description.value = "";
      startDate.value = "";
      endDate.value = "";
      country.value = null;
      location.value = null;
      competitionType.value = null;
      numberOfPlayersPlay.value = null;
      numberOfPlayersSubstitute.value = null;
      drawScore.value = null;
      winScore.value = null;
      loseScore.value = null;
      sponsor.value = "";
      media.value = "";
      phone.value = "";
      companyName.value = "";
      companyAddress.value = "";
      socialLink.value = "";
      selectedFile.value = null;
      imageForm.delete("file");
      rules.value = [...RankingRules];
      Object.keys(errors.value).forEach((k) => (errors.value[k] = ""));
    };

    const removeRule = (index: number) => rules.value.splice(index, 1);
    const addRule = () => {
      const lastId = rules.value.length ? rules.value[rules.value.length - 1].id : 0;
      rules.value.push({ id: lastId + 1, name: "", tournamentId: lastId + 1, ranking: lastId + 1 });
    };

    return {
      championLeague,
      InputForm,
      DatePicker,
      inputArea,
      selectForm,
      InputImage,
      draggable,
      // data
      name,
      description,
      startDate,
      endDate,
      country,
      location,
      competitionType,
      numberOfPlayersPlay,
      numberOfPlayersSubstitute,
      drawScore,
      winScore,
      loseScore,
      sponsor,
      media,
      phone,
      companyName,
      companyAddress,
      socialLink,
      selectedFile,
      rules,
      statusMatch,
      statusProvince,
      errors,
      // utils
      onImageSelected,
      onFileChange,
      addRule,
      removeRule,
      onSubmit,
      daPhu,
      dachinh,
      hinhthuc,
      winscore,
      drawscore,
      losescore,
    };
  },
});
</script>

<style scoped>
/* Basic layout and safe CSS to avoid Tailwind @apply issues */

.page-root {
  background: #ffffff;
  min-height: 100vh;
  padding: 16px;
  box-sizing: border-box;
}

.container {
  max-width: 1208px;
  margin: 0 auto;
}

/* Ensure form content area has a fixed max width so button can match it */
.form {
  margin-top: 40px;
  margin-bottom: 70px;
  max-width: 1207px; /* same as earlier design width */
  margin-left: auto;
  margin-right: auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-link {
  display: flex;
  gap: 12px;
  align-items: center;
  color: #111;
  text-decoration: none;
}

.back-icon {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-icon {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner {
  height: 408px;
  width: 100%;
  border-radius: 40px;
  overflow: hidden;
  margin-top: 16px;
  position: relative;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-overlay {
  position: absolute;
  left: 20px;
  bottom: 20px;
  display: flex;
  gap: 16px;
  align-items: center;
  color: #fff;
}

.title-block {
  display: flex;
  flex-direction: column;
}

.tournament-name {
  font-size: 40px;
  margin: 0;
}

.form-row {
  margin-bottom: 16px;
}

/* grids */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  align-items: end;
  margin-bottom: 16px;
}

.col-span-3 {
  grid-column: span 3;
}
.col-span-2 {
  grid-column: span 2;
}

/* rules */
.rules {
  margin: 20px 0;
}
.rules-list {
  margin-top: 8px;
}
.rule-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px;
  border: 1px solid #dcd5d5;
  border-radius: 8px;
  margin-bottom: 8px;
}
.rule-item input {
  flex: 1;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.btn-delete {
  background: transparent;
  border: none;
  color: #eb0428;
  cursor: pointer;
}
.btn-add {
  display: inline-block;
  margin-top: 8px;
  padding: 12px 18px;
  border: 1px solid #04b80a;
  color: #04b80a;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}

/* file upload */
.file-upload {
  margin: 16px 0;
}
.file-label input[type="file"] {
  display: none;
}
.file-placeholder {
  width: 220px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: linear-gradient(135deg, rgba(4, 184, 10, 0.14), rgba(4,184,10,0.25));
  color: #2e7d1e;
}

/* sponsor/contact sections */
.sponsor {
  margin-top: 16px;
}
.contact {
  margin-top: 16px;
}

/* submit */
/* center and make button match form width */
.submit-row {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}
.btn-submit {
  width: 100%;
  max-width: 100%;
  height: 70px;
  border-radius: 15px;
  background: linear-gradient(90deg, #04b80a, #04b80a);
  color: #fff;
  font-size: 20px;
  border: none;
  cursor: pointer;
  /* keep button full-width but constrained by .form max-width */
  display: inline-block;
}

/* errors */
.error-text {
  color: #dc2626;
  font-size: 13px;
  margin-top: 6px;
}

/* draggable ghost */
.ghost {
  opacity: 0.5;
}

/* responsive */
@media (max-width: 992px) {
  .grid-4 { grid-template-columns: 1fr; }
  .grid-3 { grid-template-columns: 1fr; }
  .grid-2 { grid-template-columns: 1fr; }
  .banner-overlay { left: 12px; bottom: 12px; gap: 12px; }
  .form { padding-left: 12px; padding-right: 12px; max-width: 100%; }
  .btn-submit {
    max-width: 100%;
  }
}
</style>
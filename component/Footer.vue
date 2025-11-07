<template>
  <div class="footerBg">
    <div class="relative flex justify-center items-center mx-auto p-[30px]">
      <div class="footerContainer relative container px-4 sm:px-6 mt-[30px]">
        <div class="flex justify-between items-center mb-[18px] mb-[20px]">
          <img
            class="w-[244px] h-[60px]"
            src="../assets/img/logo_giaudauviet.png"
            alt="FUTNext Logo"
          />
          <div class="flex justity-between gap-4 items-center">
            <div>VNI</div>
            <div class="flex justify-between gap-4">
              <Icon
                class="iconSocical"
                name="hugeicons:facebook-02"
                width="24"
                height="24"
              />
              <Icon
                class="iconSocical"
                name="hugeicons:twitter"
                width="24"
                height="24"
              />
              <Icon
                class="iconSocical"
                name="hugeicons:google"
                width="24"
                height="24"
              />
              <Icon
                class="iconSocical"
                name="hugeicons:messenger"
                width="24"
                height="24"
              />
              <Icon
                class="iconSocical"
                name="hugeicons:youtube"
                width="24"
                height="24"
              />
            </div>
          </div>
        </div>
        <div class="footerLogo">
          <div class="flex justify-between mb-[20px]">
            <div
              v-for="(item, index) in FooterLeague"
              :key="index"
              style="line-height: 30px; color: rgba(0, 0, 0, 1)"
              class="mb-[20px] font-medium text-[25px]"
            >
              {{ item.title }}
            </div>
          </div>
          <p
            style="line-height: 24px"
            class="font-normal max-w-[434px] text-[20px]"
          >
            Tầng 6, Tòa nhà Web3 Tower, Phố Duy Tân, Cầu Giấy, Hà Nội
          </p>
          <p
            style="line-height: 24px"
            class="font-normal text-[20px] mb-[20px] mt-[20px]"
          >
            contact@giaidauviet.vn
          </p>
          <p style="line-height: 24px" class="font-normal text-[20px]">
            0352.999.999
          </p>
        </div>
      </div>
    </div>

    <div
      style="background: linear-gradient(90deg, #e67353 0%, #ac4ac8 100%)"
      class="flex justify-center h-[70px] text-center items-center"
    >
      <p style="color: rgba(255, 255, 255, 1)" class="font-normal text-[20px]">
        © Bản quyền thuộc về Giaidauviet.com
      </p>
    </div>
  </div>
</template>
<script>
import { FooterLeague } from "../utils/footer.ts";
export default defineComponent({
  setup() {
    return {
      FooterLeague,
    };
  },
});
</script>
<style scoped>
.footerBg {
  background: rgba(250, 249, 249, 1);
  width: 100%;
}

.text-accent-foreground {
  color: hsl(145.14 68.52% 57.65%);
}
.footerHome li {
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0%;
  margin-top: 8px;
}
@media (max-width: 1024px) {
  .footerContainer::before {
    display: none;
  }
  .footerContainer {
    flex-direction: column;
  }
  .footerLogo {
    order: 2;
  }
  /* .footerHome {
    flex-direction: column;
    margin-top: 180px;
    margin-bottom: 20px;
    order: 1;
  } */
  .FUTNextSubscription {
    transform: translateY(-110%);
  }
}
.iconSocical {
  width: 30px;
  height: 23px;
  background: linear-gradient(180deg, #f48637 0%, #ee3449 100%);
}
</style>

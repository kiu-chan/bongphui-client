<template>
  <div class="footerBg">
    <div class="relative flex justify-center items-center mx-auto p-4 md:p-[30px]">
      <div class="footerContainer relative container px-4 sm:px-6 mt-4 md:mt-[30px]">
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-6 md:mb-[20px]">
          <img
            class="w-[180px] h-[45px] md:w-[244px] md:h-[60px]"
            src="../assets/img/logo_giaudauviet.png"
            alt="FUTNext Logo"
          />
          <div class="flex flex-col md:flex-row justify-center md:justify-between gap-3 md:gap-4 items-center">
            <div class="text-sm md:text-base font-medium">VNI</div>
            <div class="flex justify-center gap-3 md:gap-4">
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

        <!-- Footer Content -->
        <div class="footerLogo">

          <!-- Contact Info -->
          <div class="text-center md:text-left">
            <p
              style="line-height: 24px"
              class="font-normal max-w-full md:max-w-[434px] text-[16px] md:text-[20px] mx-auto md:mx-0"
            >
              Tầng 6, Tòa nhà Web3 Tower, Phố Duy Tân, Cầu Giấy, Hà Nội
            </p>
            <p
              style="line-height: 24px"
              class="font-normal text-[16px] md:text-[20px] mb-3 md:mb-[20px] mt-3 md:mt-[20px]"
            >
              contact@giaidauviet.vn
            </p>
            <p style="line-height: 24px" class="font-normal text-[16px] md:text-[20px]">
              0352.999.999
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright Bar -->
    <div
      style="background: linear-gradient(90deg, #e67353 0%, #ac4ac8 100%)"
      class="flex justify-center h-[60px] md:h-[70px] text-center items-center px-4"
    >
      <p style="color: rgba(255, 255, 255, 1)" class="font-normal text-[14px] md:text-[20px]">
        © Bản quyền thuộc về Giaidauviet.com
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

.iconSocical {
  width: 28px;
  height: 28px;
  background: linear-gradient(180deg, #f48637 0%, #ee3449 100%);
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.iconSocical:hover {
  transform: scale(1.1);
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
  
  .FUTNextSubscription {
    transform: translateY(-110%);
  }
}

/* Mobile specific adjustments */
@media (max-width: 768px) {
  .iconSocical {
    width: 24px;
    height: 24px;
  }
}
</style>
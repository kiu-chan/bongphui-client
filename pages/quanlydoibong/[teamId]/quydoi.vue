<template>
  <HeaderDoibong :stt="2">
    <div class="flex justify-end mt-[28px] mb-[28px]">
      <div class="search max-w-[409px] h-[50px] rounded-2xl relative">
        <input
          class="w-full h-full focus:outline-none focus:ring-0 pl-12 font-normal text-[20px]"
          type="text"
          placeholder="Tìm kiếm"
        />
        <Icon
          class="absolute IconSearch"
          name="hugeicons:search-02"
          width="24"
          height="24"
        />
      </div>
    </div>
    <div
      style="background: rgba(248, 242, 240, 1); border-radius: 37px"
      class="w-full"
    >
      <div class="p-4">
        <p style="color: rgba(0, 0, 0, 1)" class="font-medium text-[25px]">
          Chọn ngân hàng/ Ví điện tử :
        </p>
        <div style="margin-bottom: 30px" class="flex gap-4 mt-[30px]">
          <div
            style="
              border-radius: 14px;
              background: rgba(255, 255, 255, 1);
              width: 192px;
              height: 82px;
            "
            class="flex justify-center items-center"
            v-for="(item, index) in bankTech"
            :key="index"
          >
            <img
              style="width: 116px; height: 57px; object-fit: contain"
              :src="item.img"
              alt=""
            />
          </div>
        </div>
        <div style="height: 574px" class="grid grid-cols-5 gap-4">
          <div class="col-span-2">
            <div
              style="
                background: linear-gradient(
                  90.2deg,
                  #dd6c67 1.49%,
                  #c158a0 97.72%
                );
                border-radius: 27px;
              "
              class="w-full h-full relative"
            >
              <div
                style="
                  padding-top: 20px;
                  padding-bottom: 20px;
                  color: rgba(255, 255, 255, 1);
                "
                class="flex justify-center"
              >
                <h3 class="font-medium text-[25px]">Mã QR</h3>
              </div>
              <div
                style="
                  height: 502px;
                  background: rgba(255, 255, 255, 1);
                  border-radius: 27px;
                  padding-top: 30px;
                "
                class="dubi"
              >
                <div class="cardGiaidau flex justify-center items-center">
                  <div style="width: 352px; height: 354px">
                    <img
                      class="w-full h-full"
                      src="../../../assets/img/maQR.png"
                      alt=""
                    />
                  </div>
                </div>
                <div class="flex justify-center mt-[10px]">
                  <div style="width: 304px; height: 61px">
                    <img
                      class="w-full h-full"
                      src="../../../assets/img/bankVisa.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style="background: rgba(255, 255, 255, 1); border-radius: 24px"
            class="col-span-3 p-4"
          >
            <div>
              <h2>THÔNG TIN CHUYỂN KHOẢN</h2>
              <p class="mt-[20px]">
                Ngân hàng:<span>TMCP Công Thương Việt Nam</span>
              </p>
              <p class="mt-[10px]">Số tài khoản:<span> 323234324</span></p>
              <p class="mt-[10px]">Chủ tài khoản:<span> Nguyễn Văn A</span></p>
              <p class="mt-[10px]">Số tiền:<span> 100.000 VNĐ</span></p>
              <p class="mt-[10px]">
                Nội dung thanh toán: <span> QUYTHANG 123</span>
              </p>
              <div
                style="background: rgba(248, 242, 240, 1); max-width: 562px"
                class="p-2 mt-[20px]"
              >
                Vui lòng chuyển khoản đúng nội dung : QUYTHANG123 để kích hoạt
                đơn hàng
              </div>
              <div
                style="
                  width: 339px;
                  height: 70px;
                  border-radius: 15px;
                  background: linear-gradient(90deg, #04b80a 0%, #04b80a 100%);
                  color: rgba(255, 255, 255, 1);
                "
                class="font-medium text-[25px] flex justify-center items-center mt-[40px]"
              >
                Tạo giao dịch mới
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      style="
        overflow-x: auto;
        background: rgba(248, 242, 240, 1);
        padding: 20px;
      "
      class="w-full rounded-lg overflow-hidden mt-[20px] mb-[20px]"
    >
      <div class="flex justify-between mb-[20px]">
        <p style="color: rgba(0, 0, 0, 1); font-size: 30px" class="font-medium">
          Danh sách các giao dịch, thổng kết thu chi
        </p>
        <div
          style="width: 150px; height: 40px; background: rgba(4, 184, 10, 0.14)"
          class="flex justify-center items-center"
        >
          <img src="../../../assets/img/excel.png" alt="" />
          <p class="font-normal text-[18px]">Xuất Excel</p>
        </div>
      </div>
      <table
        class="text-sm text-left rounded-lg w-full border-separate border-spacing-0"
      >
        <thead
          class="h-[50px] rounded-lg"
          style="background: linear-gradient(90deg, #e57257 0%, #b34fba 100%)"
        >
          <tr>
            <th class="px-4 py-2 rounded-tl-lg rounded-bl-lg text-white">
              STT
            </th>
            <th class="px-4 py-2 text-white">Họ tên</th>
            <th class="px-4 py-2 text-white">Ngày chuyển khoản</th>
            <th class="px-4 py-2 text-white">Chuyển khoản qua</th>
            <th class="px-4 py-2 text-white">Số tiền</th>
            <th class="px-4 py-2 rounded-tr-lg rounded-br-lg text-white">
              Trạng thái
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in players"
            :key="index"
            class="hover:bg-gray-100 rowHover transition-colors"
          >
            <td
              class="px-4 py-4 w-12 sticky left-0 font-semibold z-10 lg:static lg:left-auto lg:z-auto"
            >
              {{ item.stt }}
            </td>
            <td
              class="px-4 py-4 w-48 sticky left-12 flex items-center gap-2 z-10 lg:static lg:left-auto lg:z-auto"
            >
              {{ item.name }}
            </td>
            <td class="px-4 py-4">{{ item.dob }}</td>
            <td class="px-4 py-4">{{ item.phone }}</td>
            <td class="px-4 py-4">{{ item.email }}</td>

            <td class="px-4 py-4">{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </HeaderDoibong>
</template>
<script lang="ts">
import HeaderDoibong from "../../../component/detaildoibong/index.vue";
import vib from "../../../assets/img/vib.png";
export default defineComponent({
  components: {
    HeaderDoibong,
  },
  setup() {
    // fakeData.ts
    const players = [
      {
        stt: 1,
        name: "Nguyễn Văn A",
        dob: "23/06/1999",
        phone: "0984.889.999",
        email: "nguyenvana@gmail.com",
        joinDate: "20/03/2025",
        status: "Trong đội",
      },
      {
        stt: 2,
        name: "Nguyễn Văn B",
        dob: "23/06/2000",
        phone: "0984.889.988",
        email: "nguyenvanb@gmail.com",
        joinDate: "25/03/2025",
        status: "Trong đội",
      },
      {
        stt: 3,
        name: "Nguyễn Văn A",
        dob: "23/06/1999",
        phone: "0984.889.999",
        email: "nguyenvana@gmail.com",
        joinDate: "20/03/2025",
        status: "Trong đội",
      },
      {
        stt: 4,
        name: "Nguyễn Văn B",
        dob: "23/06/2000",
        phone: "0984.889.988",
        email: "nguyenvanb@gmail.com",
        joinDate: "25/03/2025",
        status: "Trong đội",
      },
      {
        stt: 5,
        name: "Nguyễn Văn A",
        dob: "23/06/1999",
        phone: "0984.889.999",
        email: "nguyenvana@gmail.com",
        joinDate: "20/03/2025",
        status: "Trong đội",
      },
      {
        stt: 6,
        name: "Nguyễn Văn B",
        dob: "23/06/2000",
        phone: "0984.889.988",
        email: "nguyenvanb@gmail.com",
        joinDate: "25/03/2025",
        status: "Trong đội",
      },
      {
        stt: 7,
        name: "Nguyễn Văn A",
        dob: "23/06/1999",
        phone: "0984.889.999",
        email: "nguyenvana@gmail.com",
        joinDate: "20/03/2025",
        status: "Trong đội",
      },
      {
        stt: 8,
        name: "Nguyễn Văn B",
        dob: "23/06/2000",
        phone: "0984.889.988",
        email: "nguyenvanb@gmail.com",
        joinDate: "25/03/2025",
        status: "Rời đội",
      },
      {
        stt: 9,
        name: "Nguyễn Văn A",
        dob: "23/06/1999",
        phone: "0984.889.999",
        email: "nguyenvana@gmail.com",
        joinDate: "20/03/2025",
        status: "Trong đội",
      },
      {
        stt: 10,
        name: "Nguyễn Văn B",
        dob: "23/06/2000",
        phone: "0984.889.988",
        email: "nguyenvanb@gmail.com",
        joinDate: "25/03/2025",
        status: "Rời đội",
      },
    ];
    const bankTech = [
      {
        id: 1,
        img: vib,
      },
      {
        id: 2,
        img: vib,
      },
      {
        id: 3,
        img: vib,
      },
      {
        id: 4,
        img: vib,
      },
    ];
    return {
      players,
      bankTech,
    };
  },
});
</script>
<style scoped>
th {
  font-weight: 500;
  font-size: 16px;
}
td {
  font-weight: 500;
  font-size: 16px;
}
</style>
